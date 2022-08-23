declare module '*.module.css' {
  export const content: Record<string, string>;
  export default content;
}
declare module '*.module.less' {
  export const content: Record<string, string>;
  export default content;
}

declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react';
  export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const path: string;
  export default path;
}

declare module '*.gif' {
  const path: string;
  export default path;
}

declare module '*.jpg' {
  const path: string;
  export default path;
}

declare module '*.jpeg' {
  const path: string;
  export default path;
}

declare module '*.png' {
  const path: string;
  export default path;
}
/** 全局定义，目录类型 */
declare type Dict = Record<string, any>;
declare interface IPaginationProps {
  pageNo: string | number;
  pageSize: string | number;
  totalCount?: string | number;
}
/** 全局添加 分页格式 */
declare interface ITableData<T> extends IPaginationProps {
  data: T[];
}
/** 全局添加 适配下拉字段 */
declare interface IOptionProps {
  label: string | number | any;
  value: string | number;
}
/** 支持的日期转换格式 */
declare type dateTypes =
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY-MM-DD'
  | 'HH:mm:ss'
  | 'YYYY-MM-DD HH:mm'
  | 'HH:mm';

declare module 'react-infinite-scroller' {
  export default InfiniteScroll;
}
