import RequestBuilder, { HTTP_METHODS } from 'api/common/RequestBuilder';

class UserAPI {
  authenticate = (body: { login: string; password: string }): Promise<string> => {
    const request = new RequestBuilder({
      url: 'http://localhost:3000/user/auth',
      method: HTTP_METHODS.POST,
      body
    });
    return request.execute();
  };
}

export default UserAPI;
