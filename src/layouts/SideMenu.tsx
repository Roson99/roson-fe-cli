import React from 'react';
import { Menu } from 'antd';
import routers from '@/routers';
import { Link } from 'react-router-dom';
import { IRouteProps } from '@/types/index';

const { SubMenu, Item } = Menu;

interface SideMenuProps {}
const SideMenu: React.FC<SideMenuProps> = (props) => {
  const getMenuList = (routeList: IRouteProps[]) =>
    routeList.map((item) => {
      const { routes, path, hidden, label } = item;
      if (hidden) return null;
      if (routes && routes.length) {
        return (
          <SubMenu key={path} title={label}>
            {getMenuList(routes)}
          </SubMenu>
        );
      }
      return (
        <Item key={path}>
          <Link to={path}>
            <span>{item.label}</span>
          </Link>
        </Item>
      );
    });

  return <Menu>{getMenuList(routers)}</Menu>;
};

export default SideMenu;
