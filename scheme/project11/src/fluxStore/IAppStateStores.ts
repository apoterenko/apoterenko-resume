import {ICollection} from 'ts-collections';

import {IFluxStoreModel} from './IFluxStoreModel';
import {IStore} from '../data/store/IStore';
import {LoadStoreActionType} from './LoadStoreAction';

export interface IAppStateStores {
    loadingStores:ICollection<IStore<IFluxStoreModel>>;
    loadingFailedStores:ICollection<IStore<IFluxStoreModel>>;
    emittedLoadStoreActions:ICollection<LoadStoreActionType>;
}
