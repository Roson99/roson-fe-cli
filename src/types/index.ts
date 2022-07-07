import type { RouteProps } from 'react-router-dom';

/** 路由Props */
export interface IRouteProps extends RouteProps {
  label: string;
  path: string;
  routes?: IRouteProps[];
  component?: any;
  hidden?: boolean;
  // icon?: string;
  // code: string;
  // authority?: string;
}
