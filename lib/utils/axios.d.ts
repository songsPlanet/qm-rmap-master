import type { InternalAxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios';
type RequestParams = {
    [key: string]: any;
};
type ResponseData = {
    data?: any;
    code?: number;
    message?: string;
};
declare class Request<AxiosRequestConfig> {
    instance: AxiosInstance;
    constructor(config?: AxiosRequestConfig);
    onFulfilledRequest: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
    onRejectedRequest: (error: any) => Promise<never>;
    onFulfilledResponse: (response: AxiosResponse) => Promise<AxiosResponse>;
    onRejectedResponse: (error: AxiosError) => Promise<never>;
    checkStatus(status: number): void;
    redirectionToLogin(): void;
    get(url: string, params?: RequestParams): Promise<ResponseData>;
    getBlob(url: string, params?: RequestParams): Promise<ResponseData>;
    postBlob(url: string, params?: RequestParams): Promise<ResponseData>;
    delete(url: string, params?: RequestParams): Promise<ResponseData>;
    post(url: string, params?: RequestParams, config?: AxiosRequestConfig): Promise<ResponseData>;
    put(url: string, params?: RequestParams, config?: AxiosRequestConfig): Promise<ResponseData>;
}
declare const _default: Request<unknown>;
export default _default;
