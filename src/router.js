import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import Authority from 'components/Authority';
import IndexPage from './routes/IndexPage';
import ProductsPage from './routes/Products';
import LoginPage from 'routes/public/Login';
import ConfigPage from 'routes/systerm/ConfigPage';
import CustomButtonPage from 'routes/button/CustomPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Authority>
          <Route path="/" exact component={IndexPage} />
          <Route path="/products" exact component={ProductsPage} />
          <Route path="/user/config" exact component={ConfigPage} />
          <Route path="/button/custom" exact component={CustomButtonPage} />
        </Authority>
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
