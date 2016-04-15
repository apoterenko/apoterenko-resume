import {
    Injectable,
    Inject
} from '@angular/core';

import {
    Http,
    Headers,
    Response,
    RequestOptionsArgs
} from '@angular/http';

import {
    isBlank
} from '@angular/core/src/facade/lang';

import {Observable} from 'rxjs/Rx';
import * as Promise from 'bluebird';
import {Thenable} from 'bluebird';

import {ProxyChannelRouter} from './ProxyChannelRouter';

import {
    ProxyBaseChannel,
    ITransport,
    IRequestOptionsArgs,
    IProxyChannelRouter,
    IResponse
} from './ProxyBaseChannel';

interface HttpRequestOptionsArgs extends IRequestOptionsArgs {
    headers:Headers;
    body:string;        // Angular2 RC5 needs not empty body
}

class HttpTransportWrapper implements ITransport {

    constructor(private http:Http) {
    }

    public post(url:string, body:any, options?:HttpRequestOptionsArgs):Promise<IResponse> {
        return this.toPromise(this.http.post(url, body, body ? options : this.prepareOptions(options)));
    }

    public put(url:string, body:any, options?:HttpRequestOptionsArgs):Promise<IResponse> {
        return this.toPromise(this.http.put(url, body, body ? options : this.prepareOptions(options)));
    }

    public get(url:string, options?:HttpRequestOptionsArgs):Promise<IResponse> {
        return this.toPromise(this.http.get(url, this.prepareOptions(options)));
    }

    public delete(url:string, options?:HttpRequestOptionsArgs):Promise<IResponse> {
        return this.toPromise(this.http.delete(url, this.prepareOptions(options)));
    }

    private prepareOptions(options?:RequestOptionsArgs):RequestOptionsArgs {
        if (isBlank(options)) {
            options = {} as RequestOptionsArgs;
        }
        options.body = isBlank(options.body) ? '' : options.body;
        return options;
    }

    private toPromise(observable:Observable<any>):Promise<IResponse> {
        return new Promise((resolve:(value?:(IResponse|Thenable<IResponse>))=>void, reject:(reason?:any)=>void) => {
            observable.subscribe((response:Response) => {
                resolve(response);
            }, (error:Response) => {
                reject(error);
            });
        });
    }
}

@Injectable()
export class ProxyHttpChannel extends ProxyBaseChannel {

    constructor(@Inject(Http) protected transport:Http,
                @Inject(ProxyChannelRouter) protected proxyChannelRouter:IProxyChannelRouter) {
        super(new HttpTransportWrapper(transport), proxyChannelRouter);
    }

    private getHeaders(): Headers {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    protected getRequestOptions(): RequestOptionsArgs {
        return {
            headers: this.getHeaders(),
            withCredentials: true
        };
    }
}
