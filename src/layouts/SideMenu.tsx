import React from 'react';
import { Menu } from 'antd';
import routers from '@/routers';
import { NavLink, useLocation } from 'react-router-dom';
import { IRouteProps } from '@/types/index';
import styles from './index.module.less';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import findRoutePath from '@/utils/findRoutePath';
import Logo from '@/assets/svgr/logo.svg';
import { CoffeeOutlined } from '@ant-design/icons';

interface SideMenuProps {}
const SideMenu: React.FC<SideMenuProps> = (props) => {
  const { pathname } = useLocation();
  const selectedKeys = findRoutePath(pathname)
    ?.map((i) => i.path)
    ?.filter((i) => !!i) as string[] | undefined;

  const getMenuItems = (routeList: IRouteProps[] = []): ItemType[] => {
    const items = routeList
      .filter((i) => i.hidden !== true)
      .map((item) => {
        const { routes, path, label, icon, disabled, type } = item;
        const children = getMenuItems(routes)?.length ? getMenuItems(routes) : null;
        return {
          key: path || '',
          label: path ? <NavLink to={path}>{label}</NavLink> : label,
          title: label,
          children: children as ItemType[],
          icon,
          disabled,
          type,
        };
      });
    return items;
  };

  return (
    <div className={styles.siderContent}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.menuContainer}>
        <Menu selectedKeys={selectedKeys} items={getMenuItems(routers)} />
      </div>
      <div className={styles.certification}>
        <CoffeeOutlined />
      </div>
    </div>
  );
};

export default SideMenu;
