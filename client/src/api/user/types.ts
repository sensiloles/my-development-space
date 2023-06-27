import { RequestParams } from 'api/common/baseAPI/types';

export interface UserAuthenticationParams extends RequestParams {
  login: string;
  password: string;
}
