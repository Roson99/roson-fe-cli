import { AxiosRequestConfig } from 'axios';
import service from './http';

export interface ResData {
  success: boolean;
  data: any | null;
  code: number;
  message: string;
}
export interface UrlConfigProps {
  // 服务名
  prefix: string;
  // 模块名称
  module: string;
  // 地址
  address: string;
}

/**
 * @method 格式化请求URL
 * @param prefix 代理前缀
 * @param module 模块名称
 * @param module 请求路径
 */
export const formatUrl = (url: string | UrlConfigProps) => {
  let deaultPrefix = '';
  let defaultModule = '/api';
  let defuleUrl = url;
  if (url instanceof Object) {
    const { prefix = '', module = '', address = '' } = url;
    deaultPrefix = prefix;
    defaultModule = module;
    defuleUrl = address;
  }
  return `${deaultPrefix}${defaultModule}${defuleUrl}`;
};

/**
 * @method 请求
 * @param url 请求地址
 * @param params 请求参数
 */
export const get = <T>(
  url: string | UrlConfigProps,
  params?: any,
  otherOptions?: AxiosRequestConfig,
): Promise<T> =>
  service({
    url: formatUrl(url),
    method: 'get',
    params,
    ...otherOptions,
  }).then(
    (res) => {
      return res?.data || {};
    },
    (res) => {
      return Promise.reject((res?.data || res) as ResData);
    },
  );

/**
 * @method 请求
 * @param url 请求地址
 * @param params 请求参数
 */
export const post = <T>(
  url: string | UrlConfigProps,
  params: any,
  otherOptions?: AxiosRequestConfig,
): Promise<T> =>
  service({
    url: formatUrl(url),
    method: 'post',
    data: params,
    ...otherOptions,
  }).then(
    (res) => {
      return res?.data;
    },
    (res) => {
      return Promise.reject((res?.data || res) as ResData);
    },
  );

/**
 * @method 请求
 * @param url 请求地址
 * @param params 请求参数
 */
export const put = <T>(
  url: string | UrlConfigProps,
  params: any,
  otherOptions?: AxiosRequestConfig,
): Promise<T> => {
  return service({
    url: formatUrl(url),
    method: 'put',
    data: params,
    ...otherOptions,
  }).then(
    (res) => {
      return res?.data;
    },
    (res) => {
      return Promise.reject((res?.data || res) as ResData);
    },
  );
};
