import React, { Component } from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';

import Login from 'components/Login';

@connect(({ login, loading }) => ({
  login,
  // submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  handleSubmit = (values) => {
    const { type } = this.state;
    const { dispatch } = this.props;
    if (values) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  render() {
    return (
      <DocumentTitle title="登录">
        <Login submit={this.handleSubmit} />
      </DocumentTitle>
    );
  }
}
