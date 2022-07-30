export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

const CONTENT_TYPE = 'Content-type';
// const TOKEN = 'Bearer';
const ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
const ACCESS_CONTROL_ALLOW_METHODS = 'Access-Control-Allow-Methods';
const ACCESS_CONTROL_ALLOW_HEADERS = 'Access-Control-Allow-Headers';
const CACHE_CONTROL = 'Cache-Control';

interface ObjectBody {
  [key: string]: string | number | boolean;
}

export interface RequestBuilderParams {
  url: string;
  method: HTTP_METHODS;
  body: FormData | ObjectBody;
}

class RequestBuilder {
  private request: Request;

  constructor(params: RequestBuilderParams) {
    this.initialize(params);
  }

  isFormDataBody = (body: RequestBuilderParams['body']): body is FormData => {
    return body instanceof FormData;
  };

  private initialize = (params: RequestBuilderParams) => {
    const { url, method, body } = params;
    const requestInit: RequestInit = {
      method,
      referrerPolicy: 'origin-when-cross-origin',
      headers: new Headers([
        [CONTENT_TYPE, 'application/json'],
        [CACHE_CONTROL, 'no-cache'],
        [ACCESS_CONTROL_ALLOW_ORIGIN, '*'],
        [ACCESS_CONTROL_ALLOW_METHODS, 'GET, PUT, POST, DELETE, OPTIONS'],
        [
          ACCESS_CONTROL_ALLOW_HEADERS,
          'Origin, X-Requested-With, Content-Type, Accept, Cache-Control'
        ]
      ]),
      body: this.isFormDataBody(body) ? body : JSON.stringify(body)
    };

    this.request = new Request(url, requestInit);
  };

  public execute = async () => {
    const response: Response = await this.fetchResponse();
    if (response.ok) {
      return this.parseResponse(response);
    }
    return this.parseApiError(response);
  };

  private fetchResponse = async () => {
    try {
      const response = await fetch(this.request);
      if (response.redirected) {
        return fetch(response.url);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  private parseResponse = async (response: Response) => {
    try {
      const contentTypeHeader = response.headers.get('Content-Type');
      if (contentTypeHeader) {
        if (contentTypeHeader.indexOf('application/json') >= 0) {
          return await response.json().then((result) => result);
        }
        if (contentTypeHeader.indexOf('text/plain') >= 0) {
          return await response.text().then((result) => result);
        }
        if (contentTypeHeader.indexOf('text/html') >= 0) {
          throw new Error('Bad response');
        }
      }
      return response;
    } catch (e) {
      throw new Error('Bad response');
    }
  };

  private parseApiError = async (response: Response) => {
    const error = {
      code: 0,
      message: ''
    };
    try {
      error.code = response.status;
      const contentTypeHeader = response.headers.get('Content-Type');
      if (contentTypeHeader && contentTypeHeader.indexOf('application/json') >= 0) {
        const parseResult = await response.json().then((result) => result);
        error.message = parseResult.message;
      } else {
        error.message = this.getErrorMessageByStatus(error.code);
      }
    } catch (e) {
      throw new Error(error.message);
    }

    if (error.code && error.message) {
      throw new Error(error.message);
    }
  };

  private getErrorMessageByStatus = (status: number) => {
    if (status === 503) {
      return 'Service Unavailable';
    }
    if (status === 401) {
      return 'Authorization error';
    }
    return 'Bad response';
  };
}

export default RequestBuilder;
