import {Response} from '@angular/http';

import {IProxyChannelRouter} from './ProxyBaseChannel';

export abstract class ProxyChannelRouter implements IProxyChannelRouter {

    abstract tryRoute(error?:Response):boolean;
}
