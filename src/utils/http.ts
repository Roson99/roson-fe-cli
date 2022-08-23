import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import i18next from 'i18next';

const baseConfig: AxiosRequestConfig = {
  baseURL: '',
  responseType: 'json',
  timeout: 60000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Accept-Language': localStorage.getItem('i18nextLng') || '',
  },
};

/** 判断blob */
const isBlob = (response: AxiosResponse) => {
  return response.config.responseType === 'blob' && response.status === 200;
};

const service = Axios.create(baseConfig);

/** 请求拦截器 **/
service.interceptors.request.use(
  (config: any) => {
    const { contentType, responseType } = config;
    if (contentType === 'formData') {
      config.headers['Content-type'] = 'multipart/form-data';
    }
    if (responseType) {
      config.headers['responseType'] = responseType;
    }
    return config;
  },
  (error: Error) => Promise.reject(error)
);

/** 响应拦截器 **/
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (isBlob(response)) {
      const { type = '' } = response.data ?? {};
      /** 文件下载失败情况处理 */
      if (type == 'application/json') {
        message.error(String(i18next.t('common.download.failed')));
        return Promise.reject();
      }
      return Promise.resolve(response);
    }
    if (response.data.success === true) {
      return Promise.resolve(response.data);
    }

    message.error(response.data.message ?? i18next.t('common.request.failed'));
    return Promise.reject(response.data.message);
  },
  (error) => {
    if (error && error.response) {
      const tips =
        error.response?.data?.message || i18next.t(`common.httpCode.${error.response.status}`);
      message.error(tips ?? i18next.t('common.request.failed'));
      return Promise.reject(error);
    } else {
      if (JSON.stringify(error).includes('timeout')) {
        message.error(String(i18next.t('common.server.timeout')));
      }
      error.message = i18next.t('common.server.failed');
    }
    message.error(error.message);
    return Promise.resolve(error.response);
  }
);

export default service;
