import React from 'react';
import { Layout, Breadcrumb, Affix } from 'antd';
import ContentWrap from './ContentWrap';
import SideMenu from './SideMenu';
import Avatar from '@/component/Avatar';
import styles from './index.module.less';
import findRoutePath from '@/utils/findRoutePath';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Sider, Header } = Layout;

export interface RouteProps {}
export interface PrimaryLayoutProps {
  routes?: RouteProps[];
  logoHidden?: boolean;
  basename?: string;
}
const PrimaryLayout: React.FC<PrimaryLayoutProps> = (props) => {
  const { pathname } = useLocation();
  const routePath = findRoutePath(pathname);

  return (
    <Layout className={styles.app}>
      <Sider className={styles.siderContainer}>
        <SideMenu />
      </Sider>
      <Layout className={styles.rightLayout}>
        <Affix>
          <Header className={styles.header}>
            <Breadcrumb>
              {routePath?.map((i) => (
                <Breadcrumb.Item key={i.path}>{i.label}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <Avatar storeName={''} userName={''} />
          </Header>
        </Affix>
        <ContentWrap />
      </Layout>
    </Layout>
  );
};

export default PrimaryLayout;
