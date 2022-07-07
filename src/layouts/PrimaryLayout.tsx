import { Layout } from 'antd';
import ContentWrap from './ContentWrap';
import SideMenu from './SideMenu';
import styles from './index.module.less';

const { Sider, Header, Footer } = Layout;

export interface RouteProps {}
export interface PrimaryLayoutProps {
  routes?: RouteProps[];
  logoHidden?: boolean;
  basename?: string;
}
const PrimaryLayout: React.FC<PrimaryLayoutProps> = (props) => {
  return (
    <Layout>
      <Header>
        <div className={styles.logo}>Logo</div>
      </Header>
      <Layout className={styles.root}>
        <Sider theme="light">
          <SideMenu />
        </Sider>
        <ContentWrap />
      </Layout>
    </Layout>
  );
};

export default PrimaryLayout;
