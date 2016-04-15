import {
    Injectable,
    Inject
} from '@angular/core';


import {ActionFactory} from 'angular2-flux/flux_core/Action';

import {LoadStoreAction} from './LoadStoreAction';
import {IStoresDispatcher} from './IStoresDispatcher';
import {StoresDispatcher} from './StoresDispatcher';
import {AppStateStores} from './AppStateStores';
import {IAppStateStores} from './IAppStateStores';
import {LoadStoresAction} from './LoadStoresAction';

@Injectable()
export class LoadStoreActionFactory {

    constructor(@Inject(StoresDispatcher) protected dispatcher:IStoresDispatcher,
                @Inject(ActionFactory) private actionFactory:ActionFactory,
                @Inject(AppStateStores) private appState:IAppStateStores) {
    }

    public emitLoadStoreAction(ctor:{new (...args):LoadStoreAction}) {
        this.dispatcher.loadStore.emit(
            this.actionFactory.createAsyncAction(ctor)
        );
    }

    public emitLoadStoresAction(ctor:{new (...args):LoadStoresAction}) {
        this.dispatcher.loadStores.emit(
            this.actionFactory.createAsyncAction(ctor)
        );
    }
}
