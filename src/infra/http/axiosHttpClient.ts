import axios, { AxiosInstance, AxiosError } from "axios"; 
import { HttpClient } from "_/data/protocols/http/httpClient";
import { ErrorFromRes } from "_/domain/errors/errorFromRes";
import { ServerError } from "_/domain/errors/serverError";

const headers = {
    'Content-Type': 'application/json'
};

export class AxiosHttpClient implements HttpClient {
    api: AxiosInstance;
    constructor(baseURL: string){
        this.api = axios.create({
            baseURL, 
            headers
        })
    }
   async post <T>(endpoint: string, data: Record<string, any>, config?: any): Promise<T | undefined>  {
        try {
            const response = await this.api.post(endpoint, data, { ...config });
            return response.data as T;
        } catch(error){
            if (error instanceof AxiosError) throw this.handleAxiosError(error)
            throw new ServerError()
        }
   }
    async get <T>(endpoint: string, config?: any, params?: Record<string, any>): Promise<T | undefined> {
        try {
            const response = await this.api.get(endpoint, { ...config, params });
            return response.data as T;
        } catch(error){
            if (error instanceof AxiosError) throw this.handleAxiosError(error)
            throw new ServerError()
        }
    }

    handleAxiosError(error: AxiosError<any, any>) {
        const { status, message } = error
        const errorFromRes = ErrorFromRes(status, message)
        if (errorFromRes) return errorFromRes
        return new ServerError(message)
      }
}