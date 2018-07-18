import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import Authority from 'components/Authority';
import IndexPage from './routes/IndexPage';
import ProductsPage from './routes/Products';
import LoginPage from 'routes/public/Login';
import RegisterPage from 'routes/public/Register';
import ConfigPage from 'routes/systerm/ConfigPage';
import CustomButtonPage from 'routes/button/CustomPage';
import WechatUserListPage from 'routes/wechatUser/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Authority history={history}>
          <Route path="/" exact component={IndexPage} />
          <Route path="/products" exact component={ProductsPage} />
          <Route path="/user/config" exact component={ConfigPage} />
          <Route path="/button/custom" exact component={CustomButtonPage} />
          <Route path="/wx/users" exact component={WechatUserListPage} />
        </Authority>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
