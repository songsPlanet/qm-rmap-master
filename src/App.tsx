import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { RegionProvider } from '@/gis/context/RegionContext';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import history from '@/utils/history';
import { ConfigProvider } from 'antd';
import { store } from '@/redux';
import Routers from '@/routers';
import { memo } from 'react';

// 主题色
const THEME_COLOR = import.meta.env.VITE_THEME_COLOR;
// Antd 主题色设置
const ANTD_THEME = {
  token: {
    colorLink: THEME_COLOR,
    colorPrimary: THEME_COLOR,
  },
};

export default memo(() => {
  return (
    <ConfigProvider locale={zhCN} theme={ANTD_THEME}>
      <Provider store={store}>
        <RegionProvider>
          <Router history={history as any}>
            <Routers />
          </Router>
        </RegionProvider>
      </Provider>
    </ConfigProvider>
  );
});
