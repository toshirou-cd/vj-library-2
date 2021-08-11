import axios, { Method, AxiosResponse } from 'axios';
import store from '@app/store';

import apiLinks from './api-links';

interface Options {
  url: ((al: typeof apiLinks) => string) | string;
  data?: object | string;
  params?: object;
  signal?: AbortSignal;
  contentType?: string;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
}

interface FullOptions extends Options {
  method: Method;
}

const request = (arg: FullOptions): Promise<AxiosResponse> => {
  const {
    method,
    contentType = 'application/json',
    url,
    data,
    params,
    signal,
    onUploadProgress,
  } = arg;

  const source = axios.CancelToken.source();
  if (signal) {
    signal.addEventListener('abort', () => {
      source.cancel();
    });
  }

  const { token } = store.getState().auth;

  return axios.request({
    method,
    headers: {
      'content-type': contentType,
      Authorization: `bearer ${token?.access_token ?? ''}`,
    },
    url: typeof url === 'string' ? url : url(apiLinks),
    data,
    params,
    onUploadProgress,
    cancelToken: source.token,
  });
};

const httpClient = {
  request,
  get: (arg: Options): Promise<AxiosResponse> => {
    return request({ ...arg, method: 'GET' });
  },
  post: (arg: Options): Promise<AxiosResponse> => {
    return request({ ...arg, method: 'POST' });
  },
  put: (arg: Options): Promise<AxiosResponse> => {
    return request({ ...arg, method: 'PUT' });
  },
  delete: (arg: Options): Promise<AxiosResponse> => {
    return request({ ...arg, method: 'DELETE' });
  },
};

export default httpClient;
