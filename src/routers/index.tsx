import React, { lazy } from 'react';
import { IRouteProps } from '@/types';
import { Translation as T } from 'react-i18next';

const A = lazy(() => import(/* webpackChunkName: "A" */ '@/pages/A'));
const B = lazy(() => import(/* webpackChunkName: "B" */ '@/pages/B'));
const Bearing = lazy(() => import(/* webpackChunkName: "Bearing" */ '@/component/Bearing'));

const config: IRouteProps[] = [
  {
    path: '/',
    component: A,
    label: <T key="/bearing">{(t) => t('common.home') + 'A'}</T>,
  },
  {
    path: '/B',
    component: B,
    label: <T key="/bearing">{(t) => t('common.home') + 'B'}</T>,
  },
  {
    path: '/Bearing',
    component: Bearing,
    label: <T key="/bearing">{(t) => t('common.home') + 'Bearing'}</T>,
  },
];

export default config;
