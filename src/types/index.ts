import React from 'react';
import type { RouteProps } from 'react-router-dom';
import { ResData } from '@/utils/request';

/** 路由Props */
export interface IRouteProps extends RouteProps {
  /** 国际化键值 */
  label: React.ReactNode;
  /** 路径 */
  path?: string;
  /** 组件 */
  component: React.LazyExoticComponent<React.FC<any>> | null;
  /** 子路由 */
  routes?: IRouteProps[];
  /** 隐藏 */
  hidden?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 图标 */
  icon?: React.ReactNode;
  type?: 'group';
  /** 权限码 - todo */
  // authcode?: string;
}

/** useRequest 返回类型 */
export interface IResponseProps<TParams> {
  loading: boolean;
  data?: ResData;
  error?: Error;
  params: TParams | [];
  run: (params: TParams) => void;
  runAsync: (params: TParams) => Promise<ResData>;
  refresh: () => void;
  refreshAsync: () => Promise<ResData>;
  mutate: (data?: ResData | ((oldData?: ResData) => ResData | undefined)) => void;
  cancel: () => void;
}
export interface IRequsetOptionsProps<TParams> {
  manual?: boolean;
  defaultParams?: TParams;
  onBefore?: (params: TParams) => void;
  onSuccess?: (data: ResData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: ResData, e?: Error) => void;
}
