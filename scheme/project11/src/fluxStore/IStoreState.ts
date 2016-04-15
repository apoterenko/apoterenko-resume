import {IAsyncState} from 'angular2-flux/fluxModels/IAsyncState';

export interface IStoreState extends IAsyncState {

    isLoadingInProgress():boolean;
}
