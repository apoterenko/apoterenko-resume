import * as Promise from 'bluebird';
import {ProxyActionEnum} from './ProxyActionEnum';
import {IProxyChannel} from './IProxyChannel';

/**
 * @CrossPlatform
 * Framework-independent implementation
 */
export abstract class ProxyChannel implements IProxyChannel {

    abstract push<TRequest, TResponse>(action:ProxyActionEnum, path:string, request?:TRequest):Promise<TResponse>;
}
