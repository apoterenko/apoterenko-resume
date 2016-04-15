import {
    Inject
} from '@angular/core';

import * as Promise from 'bluebird';
import {LoggerFactory, ILogger} from 'angular2-smart-logger';
import {Collections, ICollection} from 'ts-collections';

import {AsyncAction, ActionFactory} from 'angular2-flux/flux_core/Action';

import {IStoresDispatcher} from './IStoresDispatcher';
import {IFluxStoreModel} from './IFluxStoreModel';
import {IAppStateStores} from './IAppStateStores';
import {IStore} from '../data/store/IStore';
import {StoresDispatcher} from './StoresDispatcher';
import {AppStateStores} from './AppStateStores';
import {LoadStoresAction} from './LoadStoresAction';

export type LoadStoreActionType = {new (...args:any[]):LoadStoreAction};

export abstract class LoadStoreAction extends AsyncAction<LoadStoresAction> {

    private loader:Promise<ICollection<IFluxStoreModel>>;

    /**
     * Has action been started in the group or action has started as a single action.
     * If is equal false then global state (queue) is not modified
     */
    private groupAction:LoadStoresAction;

    constructor(protected dispatcher:IStoresDispatcher,
                protected store:IStore<IFluxStoreModel>,
                protected actionFactory:ActionFactory,
                protected successActionCtor:{new (...args):SuccessLoadStoreAction} = SuccessLoadStoreAction) {
        super();
    }

    /**
     * @override
     */
    public startAsyncChain(groupAction:LoadStoresAction) {
        this.groupAction = groupAction;

        if (this.store.isLoadingInProgress()) {
            return;
        }

        this.loader = this.load().then((data:ICollection<IFluxStoreModel>):ICollection<IFluxStoreModel> => {
            this.onLoadStoreSuccess(data);
            return data;
        }, () => {
            this.onLoadStoreFail(Collections.emptyList<IFluxStoreModel>());
        });
    }

    /**
     * @public
     */
    public getStore():IStore<IFluxStoreModel> {
        return this.store;
    }

    /**
     * @public
     */
    public getLoader():Promise<ICollection<IFluxStoreModel>> {
        return this.loader;
    }

    /**
     * Has action been started as a part of the group or as a single action?
     * @returns {boolean} True - as a part of the group
     */
    public hasActionBeenStartedWithinGroup():boolean {
        return !!this.groupAction;
    }

    protected onLoadStoreSuccess(data:ICollection<IFluxStoreModel>) {
        this.dispatcher.loadStoreDone.emit(
            this.actionFactory.createAsyncAction(this.successActionCtor, this.getPayload(data))
        );
    }

    protected onLoadStoreFail(data:ICollection<IFluxStoreModel>) {
        this.dispatcher.loadStoreFail.emit(
            this.actionFactory.createAsyncAction(FailureLoadStoreAction, this.getPayload(data))
        );
    }

    private getPayload(data:ICollection<IFluxStoreModel>):ILoadStoreActionPayload {
        return {
            rootAction: this,
            store: this.store,
            data: data,
            groupAction: this.groupAction
        };
    }

    protected abstract load():Promise<ICollection<IFluxStoreModel>>;
}

export interface ILoadStoreActionPayload {
    rootAction?: LoadStoreAction;
    store?:IStore<IFluxStoreModel>;
    data?:ICollection<IFluxStoreModel>;
    groupAction:LoadStoresAction;
}

abstract class AbstractLoadStoreAction extends AsyncAction<ILoadStoreActionPayload> {

    /**
     * Has action been started in the group or action has started as a single action.
     * If is equal false then global state (queue) is not modified
     */
    protected groupAction:LoadStoresAction;

    protected store:IStore<IFluxStoreModel>;

    constructor() {
        super();
    }

    /**
     * Has action been started as a part of the group or as a single action?
     * @returns {boolean} True - as a part of the group
     */
    public hasActionBeenStartedWithinGroup():boolean {
        return !!this.groupAction;
    }

    /**
     * @public
     */
    public getStore():IStore<IFluxStoreModel> {
        return this.store;
    }

    /**
     * @public
     */
    public getGroupAction():LoadStoresAction {
        return this.groupAction;
    }

    public abstract startAsyncChain(payload:ILoadStoreActionPayload);
}

export class SuccessLoadStoreAction extends AbstractLoadStoreAction {

    private static _logger:ILogger = LoggerFactory.makeLogger(SuccessLoadStoreAction);

    private data:ICollection<IFluxStoreModel>;

    /**
     * The action is a parent of the current action
     */
    private rootAction:LoadStoreAction;

    constructor(@Inject(StoresDispatcher) protected dispatcher:IStoresDispatcher,
                @Inject(AppStateStores) protected appState:IAppStateStores) {
        super();
    }

    /**
     * @override
     */
    public startAsyncChain(payload:ILoadStoreActionPayload) {
        this.store = payload.store;
        this.data = payload.data;
        this.groupAction = payload.groupAction;
        this.rootAction = payload.rootAction;

        if (payload.groupAction
            && this.appState.loadingFailedStores.isEmpty()) {

            SuccessLoadStoreAction._logger.debug(() => {
                const preview:string = this.appState.loadingStores.map({
                    map: (store:IStore<IFluxStoreModel>):string => [store.constructor.name, store.isLoadingInProgress()].join(':')
                }).join('; ');

                return `[$SuccessLoadStoreAction][startAsyncChain] The stores current loading states: ${preview}`;
            });

            if (this.appState.loadingStores.getSize() > 1) {
                // Not all stores have reached the barrier, ie, there is at least one store, that is not loaded yet.
                return;
            }

            // This is success load callback of the store. If the queue size is 1, then the queue contains ONLY the current
            // payload store, therefore all the stores are have loaded at the moment.

            this.registerSimpleActionToLaunch(payload, this.dispatcher.loadStoresDone);
        }
    }

    /**
     * @public
     */
    public getData():ICollection<IFluxStoreModel> {
        return this.data;
    }

    /**
     * @public
     */
    public getRootActionType():LoadStoreActionType {
        return this.rootAction.constructor as LoadStoreActionType;
    }
}

export class FailureLoadStoreAction extends AbstractLoadStoreAction {

    private static _logger:ILogger = LoggerFactory.makeLogger(FailureLoadStoreAction);

    constructor(@Inject(StoresDispatcher) protected dispatcher:IStoresDispatcher,
                @Inject(AppStateStores) protected appState:IAppStateStores) {
        super();
    }

    /**
     * @override
     */
    public startAsyncChain(payload:ILoadStoreActionPayload) {
        this.store = payload.store;
        this.groupAction = payload.groupAction;

        if (payload.groupAction) {

            // We must emit the event only once for all group
            if (this.appState.loadingFailedStores.isEmpty()) {

                FailureLoadStoreAction._logger.debug(() => {
                    const preview:string = this.appState.loadingStores.map({
                        map: (store:IStore<IFluxStoreModel>):string => [store.constructor.name, store.isLoadingInProgress()].join(':')
                    }).join('; ');

                    return `[$FailureLoadStoreAction][startAsyncChain] The stores current loading states: ${preview}`;
                });

                this.registerSimpleActionToLaunch(payload, this.dispatcher.loadStoresFail);
            }
        }
    }
}
