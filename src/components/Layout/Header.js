import React from 'react';
import { Layout, Dropdown, Menu } from 'antd';

import styles from './index.less';
import { authority } from 'utils/authority';

const { Header } = Layout;

export default class HeaderComponent extends React.Component {

  menuClick = (flag) => {
    switch (flag.key) {
      case '1':
        console.log('setting...')
        break;
      case '2':
        authority(-1);
        this.props.history.replace('/login');
        break;
      default:
        break;
    }
  }

  renderMenu = () => {
    return (
      <Menu onClick={this.menuClick}>
        <Menu.Item key={1}>设置密码</Menu.Item>
        <Menu.Item key={2}>退出登录</Menu.Item>
      </Menu>
    )
  }

  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className={styles.operation}>
          <Dropdown
            overlay={this.renderMenu()}
          >
            <span>Admin</span>
          </Dropdown>
        </div>
      </Header>
    );
  }
}
