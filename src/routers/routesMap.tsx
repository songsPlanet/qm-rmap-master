import React from 'react';
import { Navigate } from 'react-router-dom';
import LazyLoader from '@/components/LazyLoader';
import { UserSwitchOutlined, SolutionOutlined, FileMarkdownOutlined, TeamOutlined } from '@ant-design/icons';

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

  // {
  //   path: '/404',
  //   element: React.createElement(LazyLoader(() => import('../pages/404'))),
  // },
  {
    path: '/',
    element: <Navigate to="/theme-map" />,
  },
];

export default routesMap;
