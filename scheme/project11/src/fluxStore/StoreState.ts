import {AsyncState} from 'angular2-flux/fluxModels/AsyncState';

import {IStoreState} from './IStoreState';

export class StoreState extends AsyncState implements IStoreState {

    /**
     * @override
     */
    public isLoadingInProgress():boolean {
        return this.isRunning();
    }
}
