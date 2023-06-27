import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { httpClient } from '../httpClient';
import { ErrorAPI } from './ErrorAPI';
import { HTTPMethods, RequestParams, Response } from './types';
import { getAxiosErrorMessage, isFailResponse, isSuccessResponse } from './helpers';

export class BaseAPIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAxiosRequestURL = (URLPath: string) => this.baseURL + URLPath;

  private getAxiosRequestConfig<P>(method: HTTPMethods, path: string, requestParams?: P) {
    const axiosConfig: AxiosRequestConfig<P> = { method, url: this.getAxiosRequestURL(path) };
    switch (method) {
      // NOTE: add query params to the request url
      case HTTPMethods.GET:
      case HTTPMethods.DELETE:
        axiosConfig.params = requestParams;
        break;
      default:
        // NOTE: add JSON params to the request body
        axiosConfig.data = requestParams;
    }

    return axiosConfig;
  }

  private getAxiosResponsePromise<T, P>(
    axiosRequestConfig: AxiosRequestConfig
  ): Promise<AxiosResponse<Response<T>, P>> {
    return httpClient<T, AxiosResponse<Response<T>>, AxiosRequestConfig<P>>(axiosRequestConfig);
  }

  private async executeAxiosResponsePromise<T, P>(
    axiosResponsePromise: Promise<AxiosResponse<Response<T>, P>>
  ): Promise<T> {
    try {
      const axiosResponse = await axiosResponsePromise;
      if (isSuccessResponse(axiosResponse)) {
        return axiosResponse.data.data;
      }
      if (isFailResponse(axiosResponse)) {
        throw new ErrorAPI(axiosResponse.status, axiosResponse.data.message);
      }
      throw new ErrorAPI(400, 'Unexpected error while contacting the server');
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ErrorAPI(400, getAxiosErrorMessage(error));
      }
      throw new ErrorAPI(400, 'Unexpected error while contacting the server');
    }
  }

  protected async get<T = boolean, P = RequestParams>(path: string, requestParams?: P) {
    const axiosRequestConfig = this.getAxiosRequestConfig(HTTPMethods.GET, path, requestParams);
    const axiosResponsePromise = this.getAxiosResponsePromise<T, P>(axiosRequestConfig);
    return this.executeAxiosResponsePromise<T, P>(axiosResponsePromise);
  }

  protected async post<T = boolean, P = RequestParams>(path: string, requestParams?: P) {
    const axiosRequestConfig = this.getAxiosRequestConfig(HTTPMethods.POST, path, requestParams);
    const axiosResponsePromise = this.getAxiosResponsePromise<T, P>(axiosRequestConfig);
    return this.executeAxiosResponsePromise<T, P>(axiosResponsePromise);
  }

  protected async put<T = boolean, P = RequestParams>(path: string, requestParams?: P) {
    const axiosRequestConfig = this.getAxiosRequestConfig(HTTPMethods.PUT, path, requestParams);
    const axiosResponsePromise = this.getAxiosResponsePromise<T, P>(axiosRequestConfig);
    return this.executeAxiosResponsePromise<T, P>(axiosResponsePromise);
  }

  protected async delete<T = boolean, P = RequestParams>(path: string, requestParams?: P) {
    const axiosRequestConfig = this.getAxiosRequestConfig(HTTPMethods.DELETE, path, requestParams);
    const axiosResponsePromise = this.getAxiosResponsePromise<T, P>(axiosRequestConfig);
    return this.executeAxiosResponsePromise<T, P>(axiosResponsePromise);
  }
}
