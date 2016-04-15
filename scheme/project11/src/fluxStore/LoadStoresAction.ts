import {LoggerFactory, ILogger} from 'angular2-smart-logger';

import {AsyncAction, ActionFactory} from 'angular2-flux/flux_core/Action';

import {IStoresDispatcher} from '../../common/fluxStores/IStoresDispatcher';

import {LoadStoreAction, ILoadStoreActionPayload, LoadStoreActionType} from './LoadStoreAction';
import {IAppStateStores} from './IAppStateStores';

export class LoadStoresAction extends AsyncAction<void> {

    constructor(protected dispatcher:IStoresDispatcher,
                protected actionFactory:ActionFactory,
                protected storesActionsToEmit:Array<{new (...args:any[]):LoadStoreAction}>) {
        super();
    }

    /**
     * @override
     */
    public startAsyncChain() {
        if (this.storesActionsToEmit.length) {
            this.storesActionsToEmit.forEach((action:{new (...args:any[]):LoadStoreAction}) => {
                this.registerAsyncActionToLaunch<LoadStoresAction>(
                    this.actionFactory.createAsyncAction<LoadStoresAction, LoadStoreAction>(action, this),
                    this.dispatcher.loadStore
                );
            });
        } else {
            this.registerSimpleActionToLaunch<ILoadStoreActionPayload>({groupAction: this}, this.dispatcher.loadStoresDone);
        }
    }
}

export class FilteredLoadStoresAction extends LoadStoresAction {

    private static _logger:ILogger = LoggerFactory.makeLogger(FilteredLoadStoresAction);

    constructor(dispatcher:IStoresDispatcher,
                appState:IAppStateStores,
                actionFactory:ActionFactory,
                storesActionsToEmit:Array<LoadStoreActionType>) {
        super(
            dispatcher,
            actionFactory,
            storesActionsToEmit.filter(
                (action:LoadStoreActionType):boolean => {
                    return !appState.emittedLoadStoreActions.find((loadedActionCtor:LoadStoreActionType) => loadedActionCtor === action);
                }
            )
        );
    }

    /**
     * @override
     */
    public startAsyncChain() {
        FilteredLoadStoresAction._logger.debug('[$FilteredLoadStoresAction][startAsyncChain] The action is activated using the actions to emit:', this.storesActionsToEmit);
        super.startAsyncChain();
    }
}
