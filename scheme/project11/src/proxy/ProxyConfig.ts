import {IProxyConfig} from './IProxyConfig';

export class ProxyConfig implements IProxyConfig {

    constructor(protected path:string) {
    }

    public getPath():string {
        return this.path;
    }
}
