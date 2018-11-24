export interface Addon {
    name: string;
    enabled: boolean;
}

export interface IQuery {
    getAddons(): Addon[] | Promise<Addon[]>;
    getServiceInfo(): ServiceInfo[] | Promise<ServiceInfo[]>;
    temp__(): boolean | Promise<boolean>;
}

export interface ServiceInfo {
    name: string;
    mode: string;
    status: string;
}
