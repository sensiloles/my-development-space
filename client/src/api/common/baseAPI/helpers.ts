import { AxiosError, AxiosResponse } from 'axios';
import { Response, SuccessResponse, FailResponse } from './types';

const hasSuccessData = <T>(
  data: AxiosResponse<Response<T>>['data']
): data is SuccessResponse<T> => {
  return Boolean(Object.prototype.hasOwnProperty.call(data, 'data'));
};

const hasFailData = <T>(data: AxiosResponse<Response<T>>['data']): data is FailResponse => {
  return Boolean(Object.prototype.hasOwnProperty.call(data, 'correlationId'));
};

export const isSuccessResponse = <T>(
  axiosResponse: AxiosResponse<Response<T>>
): axiosResponse is AxiosResponse<SuccessResponse<T>> => {
  const isSuccessCode = axiosResponse.status === 200 && axiosResponse.data.isSuccess;
  const isSuccessData = hasSuccessData(axiosResponse.data);
  return Boolean(isSuccessCode && isSuccessData);
};

export const isFailResponse = <T>(
  axiosResponse: AxiosResponse<Response<T>>
): axiosResponse is AxiosResponse<FailResponse> => {
  const isFailCode = axiosResponse.status !== 200 && !axiosResponse.data.isSuccess;
  const isFailData = hasFailData(axiosResponse.data);
  return Boolean(isFailCode && isFailData);
};

export const getAxiosErrorMessage = <T, P>(axiosError: AxiosError<T, P>) => {
  const axiosErrorMessage = `${axiosError.message}: `;
  const axiosConfigUrl = axiosError.config?.url;
  if (axiosConfigUrl) {
    return axiosErrorMessage.concat(`Can't handle the "${axiosConfigUrl}" url`);
  }
  return axiosErrorMessage.concat('Unexpected error while contacting the server');
};
