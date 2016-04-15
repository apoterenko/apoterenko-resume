import {
    Inject,
    Injectable,
} from '@angular/core';

import {
    LoggerFactory,
    ILogger,
    IEnvironmentLogger
} from 'angular2-smart-logger';

import {
    SuccessLoadStoreAction,
    LoadStoreAction,
    FailureLoadStoreAction
} from './LoadStoreAction';
import {StoresDispatcher} from './StoresDispatcher';
import {IStoresDispatcher} from './IStoresDispatcher';
import {IAppStateStores} from './IAppStateStores';
import {AppStateStores} from './AppStateStores';
import {IFluxStoreModel} from './IFluxStoreModel';
import {IStore} from '../data/store/IStore';
import {FilteredLoadStoresAction} from './LoadStoresAction';

@Injectable()
export class StoresController {

    private static logger:ILogger = LoggerFactory.makeLogger(StoresController);

    constructor(@Inject(StoresDispatcher) private dispatcher:IStoresDispatcher,
                @Inject(AppStateStores) private appState:IAppStateStores) {

        this.dispatcher.loadStore.subscribe(
            (action:LoadStoreAction)=> {
                const store:IStore<IFluxStoreModel> = action.getStore();

                if (!store.isLoadingInProgress()) {
                    // Modify the store state
                    store.start();
                    store.removeAll();

                    if (action.hasActionBeenStartedWithinGroup()) {
                        if (this.appState.loadingStores.isEmpty()) {
                            // Auto remove the previous failed stores
                            this.appState.loadingFailedStores.removeAll();
                        }

                        this.appState.loadingStores.add(store);
                    }

                    StoresController.logger.debug('[$StoresController][loadStore] The load task of the store', store, 'has started');
                }
            }
        );
        this.dispatcher.loadStoreDone.subscribe(
            (action:SuccessLoadStoreAction)=> {
                const store:IStore<IFluxStoreModel> = action.getStore();

                store.addAll(action.getData());
                store.stop();

                if (action.hasActionBeenStartedWithinGroup()) {
                    this.appState.loadingStores.remove(store);

                    StoresController.logger.debug((logger:IEnvironmentLogger) => {
                        logger.write('[$StoresController][loadStoreDone] The store', store,
                            'has successfully loaded. Store size:', store.getSize(), ', queue size:', this.appState.loadingStores.getSize());
                    });
                } else {
                    StoresController.logger.debug('[$StoresController][loadStoreDone] The store', store, 'has successfully loaded. Store size:', store.getSize());
                }

                if (action.getGroupAction() instanceof FilteredLoadStoresAction) {
                    this.appState.emittedLoadStoreActions.add(action.getRootActionType());
                }
            }
        );
        this.dispatcher.loadStoreFail.subscribe(
            (action:FailureLoadStoreAction)=> {
                const store:IStore<IFluxStoreModel> = action.getStore();

                store.stop();

                if (action.hasActionBeenStartedWithinGroup()) {
                    this.appState.loadingStores.remove(store);
                    this.appState.loadingFailedStores.add(store);
                }

                StoresController.logger.debug('[$StoresController][loadStoreFail] An error occurred while trying to load the store', action.getStore());
            }
        );
        this.dispatcher.loadStoresDone.subscribe(
            ()=> {
                StoresController.logger.debug((logger:IEnvironmentLogger) => {
                    logger.write('[$StoresController][loadStoresDone] All stores are loaded successfully');
                });
            }
        );
        this.dispatcher.loadStoresFail.subscribe(
            ()=> {
                StoresController.logger.debug((logger:IEnvironmentLogger) => {
                    logger.write('[$StoresController][loadStoresFail] An error or the errors occurred while trying to load the stores');
                });
            }
        );
    }
}
