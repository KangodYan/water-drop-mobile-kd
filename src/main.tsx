import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { client } from './utils/apollo';
import './index.css';
import { ROUTE_CONFIG } from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // 这个项目默认就是中文的，不知道是否其他地方有相关配置
  <ConfigProvider locale={zhCN}>
    {/*
      去掉了React.StrictMode（严格模式会带来许多问题）
      「调用Graphql服务端接口2」包裹ApolloProvider，其他地方都能用到
    */}
    <ApolloProvider client={client}>
      {/* 浏览器导航 */}
      <BrowserRouter>
        <Routes>
          {/* 循环路由配置 */}
          {ROUTE_CONFIG.map((item) => (
            <Route
              key={item.key}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>,
);
