import {
    EventEmitter
} from '@angular/core';

import {ActionEmitter} from 'angular2-flux/flux_core/Action';

import {
    LoadStoreAction,
    SuccessLoadStoreAction,
    ILoadStoreActionPayload, 
    FailureLoadStoreAction
} from './LoadStoreAction';
import {LoadStoresAction} from './LoadStoresAction';

export interface IStoresDispatcher  {
    loadStore:ActionEmitter<LoadStoreAction>;
    loadStores:ActionEmitter<LoadStoresAction>;
    loadStoreDone:ActionEmitter<SuccessLoadStoreAction>;
    loadStoreFail:ActionEmitter<FailureLoadStoreAction>;
    loadStoresDone:EventEmitter<ILoadStoreActionPayload>;
    loadStoresFail:EventEmitter<ILoadStoreActionPayload>;
}
