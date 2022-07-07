import { lazy } from 'react';

const Home = lazy(() => import(/* webpackChunkName: "home" */ '@/pages'));

export interface MenuItemState {
  path: string;
  content: string;
  component: React.FC<any>;
  icon?: string;
  authority?: string;
  hidden?: boolean;
  routes?: MenuItemState[];
}

const config = [
  {
    path: '/',
    component: Home,
    label: '主页',
  },
];

export default config;
