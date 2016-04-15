import {ICollection} from 'ts-collections';

import {IStore} from '../data/store/IStore';
import {IFluxStoreModel} from './IFluxStoreModel';
import {IAppStateStores} from './IAppStateStores';
import {LoadStoreActionType} from './LoadStoreAction';

export abstract class AppStateStores implements IAppStateStores {
    loadingStores:ICollection<IStore<IFluxStoreModel>>;
    loadingFailedStores:ICollection<IStore<IFluxStoreModel>>;
    emittedLoadStoreActions:ICollection<LoadStoreActionType>;
}
