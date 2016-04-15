import {
    Injectable
} from '@angular/core';

import {Response} from '@angular/http';

import {ProxyChannelRouter} from './ProxyChannelRouter';

@Injectable()
export class ProxyChannelEmptyRouter extends ProxyChannelRouter {

    public tryRoute(error?:Response):boolean {
        return false;
    }
}
