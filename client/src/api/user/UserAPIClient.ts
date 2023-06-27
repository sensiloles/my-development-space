import { BaseAPIClient } from 'api/common/baseAPI';
import { UserAuthenticationParams } from './types';

export class UserAPIClient extends BaseAPIClient {
  constructor() {
    super('http://localhost:3000/user/');
  }

  authenticate = (requestParams: UserAuthenticationParams) => {
    return this.post<string>('auth', requestParams);
  };
}
