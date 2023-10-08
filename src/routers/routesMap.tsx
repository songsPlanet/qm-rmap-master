import React from 'react';
import { Navigate } from 'react-router-dom';
import LazyLoader from '@/components/LazyLoader';
import {
  UserSwitchOutlined,
  SolutionOutlined,
  FileMarkdownOutlined,
  TeamOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';

export type RouteItem = {
  // 组件
  element?: React.ReactElement;
  // 菜单图标
  icon?: React.ReactElement;
  // 子路由
  children?: RouteItem[];
  // 菜单名称
  label?: string;
  // 路由路径
  path: string;
};

const iconStyle = { fontSize: 18, marginRight: 10 };

const routesMap: RouteItem[] = [
  {
    path: '/theme-map',
    label: '专题地图',
    icon: <FileMarkdownOutlined style={iconStyle} />,
    element: React.createElement(LazyLoader(() => import('../pages/themeMap'))),
  },
  {
    path: '/theme-map-njzy',
    label: '表格地图',
    icon: <FileMarkdownOutlined style={iconStyle} />,
    element: React.createElement(LazyLoader(() => import('../pages/tableMap'))),
  },
  {
    path: '/user',
    label: '用户管理',
    icon: <SolutionOutlined style={iconStyle} />,
    children: [
      {
        label: '用户列表',
        path: '/user/user-list',
        icon: <TeamOutlined style={iconStyle} />,
        element: React.createElement(LazyLoader(() => import('../pages/user/userList'))),
      },
      {
        path: '/user/role-list',
        label: '角色列表',
        icon: <UserSwitchOutlined style={iconStyle} />,
        element: React.createElement(LazyLoader(() => import('../pages/user/roleList'))),
      },
    ],
  },

  {
    path: '/404',
    element: React.createElement(LazyLoader(() => import('../pages/404'))),
  },
  {
    path: '/',
    element: <Navigate to="/theme-map-sqal" />,
  },
];

export default routesMap;
