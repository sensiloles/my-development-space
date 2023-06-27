export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export type RequestSimpleParamValue = boolean | string | number;
export type RequestParamValue =
  | RequestSimpleParamValue
  | Record<string, RequestSimpleParamValue>
  | Array<RequestSimpleParamValue | Record<string, RequestSimpleParamValue>>;

export interface RequestParams {
  [requestParamKey: string]: RequestParamValue;
}

export interface BaseResponse {
  isSuccess: boolean;
}

export interface SuccessResponse<T> extends BaseResponse {
  data: T;
}

export interface FailResponse extends BaseResponse {
  correlationId: string;
  message: string;
}

export type Response<T> = SuccessResponse<T> | FailResponse;
