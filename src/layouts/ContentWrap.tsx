import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import routers from '@/routers';
import { IRouteProps } from '@/types';
import styles from './index.module.less';
import { ErrorBoundary, Bearing } from '@/component';

const { Content } = Layout;

interface ContentWrapProps {}
const ContentWrap: React.FC<ContentWrapProps> = (props) => {
  function makeRoute(arr?: IRouteProps[]): any {
    return arr?.map(({ path, component, routes, type }) => {
      const Element = component as React.LazyExoticComponent<React.FC<any>>;
      if (type === 'group') return makeRoute(routes);
      return (
        <React.Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
          {routes instanceof Array && makeRoute(routes)}
        </React.Fragment>
      );
    });
  }

  return (
    <Content className={styles.contentRender}>
      <ErrorBoundary>
        <Suspense fallback={<Bearing />}>
          <Routes>
            {makeRoute(routers)}
            <Route key="*" path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Content>
  );
};
export default ContentWrap;
