import {ProxyActionEnum} from './ProxyActionEnum';

/**
 * @CrossPlatform
 * Framework-independent implementation
 */
export interface IProxyChannel {

    push<TRequest, TResponse>(action:ProxyActionEnum, path:string, request?:TRequest):Promise<TResponse>;
}
