import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import React, { useLayoutEffect, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Outlet, matchPath } from 'react-router-dom';
import { Popover, Layout, Avatar, Menu, message } from 'antd';
import avatarURL from '@/assets/images/avatar.png';
import useReducer from '@/utils/useReducer';
import logo from '@/assets/images/logo.png';
import { filterMenuTree } from '@/routers';
import type { MenuItem } from '@/routers';
import { getLocalStorage } from '@/utils';
import './index.less';

const { Content, Sider, Header, Footer } = Layout;

const initialState = () => {
  return {
    menuItems: [] as MenuItem[],
    selectedMenuKeys: ['/'],
    collapsed: false,
    openKeys: ['/'],
    userName: '',
    avatar: '',
  };
};

const MainLayout: React.FC = () => {
  const [state, setState] = useReducer(initialState);
  const { avatar, userName, menuItems, collapsed, selectedMenuKeys } = state;

  const navigate = useNavigate();
  const location = useLocation();
  const menuItemsRef = useRef<any>(null);
  const permissionsRef = useRef<any>(null);
  // 终止程序

  useLayoutEffect(() => {
    const userInfo = getLocalStorage('USER_INFO');

    // // resourceList 为用户菜单权限
    const { avatar, username: userName, resourceList } = userInfo;
    // console.log('userinfor是什么', userInfo);

    const permissions = flatMenuTree(resourceList || []);
    // console.log('permissions是什么', permissions);

    const menuItems = filterMenuTree(permissions);
    permissionsRef.current = permissions;
    menuItemsRef.current = menuItems;

    setState({ menuItems, avatar, userName });
  }, []);

  useEffect(() => {
    // if (endProcessRef.current) {
    //   message.warning('请先完成用户登录');
    //   navigate('/login');
    //   return;
    // }

    const { pathname } = location;
    // 每当访问 '/' 路径时，重定向到菜单的第一项。
    if (pathname === '/') {
      const firstItem = findFirstMenuItem(menuItemsRef.current);
      firstItem?.key && navigate(firstItem.key);
      return;
    }

    const regexp = /^(\/[^/?#]+)(\/[^/?#]+)+/;
    let openKeys: string[] = [];
    if (regexp.exec(pathname)) openKeys = [RegExp.$1];

    setState({ selectedMenuKeys: [pathname], openKeys });
  }, [location]);

  const handleSelectMenu = useCallback((event: any) => {
    navigate(event.key);
    setState({ selectedMenuKeys: event.selectedKeys });
  }, []);

  const handleChangeOpenKeys = useCallback((keys: any[]) => {
    setState({ openKeys: keys });
  }, []);

  const handleTriggerSlider = () => {
    setState((prevState) => ({ collapsed: !prevState.collapsed }));
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={240} collapsible theme="light" trigger={null} collapsed={!collapsed}>
        <div className="hn-picc-logo">
          <img src={logo} className="hn-picc-logo-img" />
          <div className={`hn-picc-logo-title ${collapsed ? ' hide' : ''}`}>xxx系统</div>
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={menuItems}
          openKeys={state.openKeys}
          onSelect={handleSelectMenu}
          selectedKeys={selectedMenuKeys}
          onOpenChange={handleChangeOpenKeys}
        />
      </Sider>
      <Layout className="hn-picc-body">
        <Header className="hn-picc-body-header">
          <span onClick={handleTriggerSlider}>
            {collapsed ? (
              <MenuUnfoldOutlined className="hn-picc-menu-slider-button" />
            ) : (
              <MenuFoldOutlined className="hn-picc-menu-slider-button" />
            )}
          </span>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer className="hn-picc-body-footer">安徽阡陌网络科技有限公司 ©2022 Created by Qianmo</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

// 将菜单列表扁平化
function flatMenuTree(menuList: any[]) {
  const stack = [...menuList];

  const menuMap = new Map<string, object>();
  while (stack.length) {
    const item = stack.shift();
    const { path, children, name } = item;
    menuMap.set(path, { path, name });
    children?.length && stack.push(...children);
  }

  return menuMap;
}
// 路由守卫
function routerGuard(permissions: Map<string, object>, pathname: string) {
  if (matchPath('/login/:status', pathname) || pathname === '/404') return true;

  if (permissions.has(pathname)) return true;

  return false;
}

// 找出菜单的第一项。
function findFirstMenuItem(menuItems: MenuItem[]) {
  if (!menuItems?.length) return null;

  const stack = [menuItems[0]];
  let firstItem = {} as MenuItem;
  while (stack.length) {
    firstItem = stack.shift()!;
    if (firstItem?.children?.length) stack.push(firstItem.children[0]);
  }

  return firstItem;
}
