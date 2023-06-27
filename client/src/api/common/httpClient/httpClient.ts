import axios from 'axios';

const httpClient = axios.create();

const headers = {
  'Content-Type': 'application/json'
};

httpClient.defaults.headers.post = headers;
httpClient.defaults.headers.put = headers;
httpClient.defaults.headers.common.Accept = 'application/json';

httpClient.interceptors.response.use((response) => {
  // TODO: remove after testing
  // eslint-disable-next-line no-console
  // debugger;
  // console.log(response);
  // console.log(response.config.data);
  return response;
});

export { httpClient };
