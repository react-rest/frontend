import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import { getMenuData } from 'common/menu';
import SiderComponent from './Sider';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

const { Content } = Layout;

export default class SiderDemo extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SiderComponent {...this.props} menuData={getMenuData()}/>
        <Layout>
          <HeaderComponent/>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
              <Breadcrumb.Item>home</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <FooterComponent/>
        </Layout>
      </Layout>
    );
  }
}
