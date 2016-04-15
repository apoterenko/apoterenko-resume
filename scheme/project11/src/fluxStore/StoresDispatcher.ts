import {
    EventEmitter
} from '@angular/core';

import {ActionEmitter} from 'angular2-flux/flux_core/Action';
import {DispatcherT} from 'angular2-flux/flux_core/Dispatcher';

import {IStoreState} from './IStoreState';
import {IStoresDispatcher} from './IStoresDispatcher';
import {
    LoadStoreAction,
    SuccessLoadStoreAction,
    ILoadStoreActionPayload, 
    FailureLoadStoreAction
} from './LoadStoreAction';
import {LoadStoresAction} from './LoadStoresAction';

export type StoresPayload = IStoreState|void|ILoadStoreActionPayload;

export abstract class StoresDispatcher extends DispatcherT<StoresPayload> implements IStoresDispatcher {
    loadStore:ActionEmitter<LoadStoreAction>;
    loadStores:ActionEmitter<LoadStoresAction>;
    loadStoreDone:ActionEmitter<SuccessLoadStoreAction>;
    loadStoreFail:ActionEmitter<FailureLoadStoreAction>;
    loadStoresDone:EventEmitter<ILoadStoreActionPayload>;
    loadStoresFail:EventEmitter<ILoadStoreActionPayload>;
}
