import * as Promise from 'bluebird';
import {Thenable} from 'bluebird';
import {IDataReader} from './IDataReader';
import {ProxyActionEnum} from './ProxyActionEnum';
import {IProxyChannel} from './IProxyChannel';
import {IProxyConfig} from './IProxyConfig';

export abstract class AbstractProxy {

    constructor(protected proxyConfig:IProxyConfig,
                protected proxyChannel:IProxyChannel) {
    }

    public post<TRequest, TResponse>(path:string, request:TRequest):Promise<TResponse> {
        return this.makeRequest<TRequest, TResponse>(ProxyActionEnum.CREATE, path, request);
    }

    public put<TRequest, TResponse>(path:string, request:TRequest):Promise<TResponse> {
        return this.makeRequest<TRequest, TResponse>(ProxyActionEnum.UPDATE, path, request);
    }

    public get<TResponse>(path:string, reader?:IDataReader<TResponse>):Promise<TResponse> {
        return this.makeRequest<void, TResponse>(ProxyActionEnum.READ, path, null, reader);
    }

    public remove<TResponse>(path:string, reader?:IDataReader<TResponse>):Promise<TResponse> {
        return this.makeRequest<void, TResponse>(ProxyActionEnum.DELETE, path, null, reader);
    }

    private makeRequest<TRequest, TResponse>(action:ProxyActionEnum, path:string, request?:TRequest, reader?:IDataReader<TResponse>):Promise<TResponse> {
        return new Promise<TResponse>((resolve:(value?:(TResponse|Thenable<TResponse>))=>void, reject:(reason?:any)=>void) => {
            return this.proxyChannel.push<TRequest, TResponse>(action, this.proxyConfig.getPath() + path, request)
                .then((result:TResponse) => {
                    resolve(reader ? reader.read(result) : result);
                }).catch((error?:any) => {
                    reject(error);
                });
        });
    }
}
