import * as Promise from 'bluebird';
import {Thenable} from 'bluebird';
import {ProxyActionEnum} from './ProxyActionEnum';
import {ProxyChannel} from './ProxyChannel';

/**
 * @CrossPlatform
 */
export interface IResponse {
    text():string;
    json():any;
}

/**
 * @CrossPlatform
 */
export interface IRequestOptionsArgs {
}

/**
 * @CrossPlatform
 */
export interface ITransport {
    post(url:string, body:any, options?:IRequestOptionsArgs):Promise<IResponse>;
    put(url:string, body:any, options?:IRequestOptionsArgs):Promise<IResponse>;
    get(url:string, options?:IRequestOptionsArgs):Promise<IResponse>;
    delete(url:string, options?:IRequestOptionsArgs):Promise<IResponse>;
}

/**
 * @CrossPlatform
 */
export interface IProxyChannelRouter {
    tryRoute(error?:IResponse):boolean;
}

/**
 * @CrossPlatform
 * Framework-independent implementation
 */
export abstract class ProxyBaseChannel extends ProxyChannel {

    constructor(protected http:ITransport,
                protected proxyChannelRouter:IProxyChannelRouter) {
        super();
    }

    public push<TRequest, TResponse>(action:ProxyActionEnum, path:string, request?:TRequest):Promise<TResponse> {
        let promise:Promise<IResponse>;
        const options: IRequestOptionsArgs = this.getRequestOptions();
        const body: string = request ? JSON.stringify(request) : null;

        switch (action) {
            case ProxyActionEnum.CREATE:
                promise = this.http.post(path, body, options);
                break;
            case ProxyActionEnum.UPDATE:
                promise = this.http.put(path, body, options);
                break;
            case ProxyActionEnum.READ:
                promise = this.http.get(path, options);
                break;
            case ProxyActionEnum.DELETE:
                promise = this.http.delete(path, options);
                break;
        }

        return new Promise<TResponse>((resolve:(value?:(TResponse|Thenable<TResponse>))=>void, reject:(reason?:any)=>void) => {
            promise.then(
                (response:IResponse) => {
                    try {
                        resolve(response.text() ? <TResponse>response.json() : null);
                    } catch (e) {
                        reject(e);
                    }
                },
                (error?:IResponse) => {
                    reject(this.toError(error));

                    /**
                     * We need to let the main thread has been successfully completed therefore we trying route after
                     * the callback of "reject call" has been completed
                     */
                    this.proxyChannelRouter.tryRoute(error);
                }
            );
        });
    }

    private toError(error:IResponse) {
        try {
            return error.json();
        } catch (e) {
            return error;
        }
    }

    /**
     * IRequestOptionsArgs could contain headers.
     * The headers could change at runtime
     */
    protected abstract getRequestOptions(): IRequestOptionsArgs ;
}
