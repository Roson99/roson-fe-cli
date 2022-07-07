import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';
import routers from '@/routers';

const { Content } = Layout;

interface ContentWrapProps {}
const ContentWrap: React.FC<ContentWrapProps> = (props) => {
  return (
    <Content>
      <Suspense fallback={<Spin />}>
        <Routes>
          {routers.map(({ path, component: Element }) => {
            return <Route key={path} path={path} element={<Element />} />;
          })}
        </Routes>
      </Suspense>
    </Content>
  );
};
export default ContentWrap;
