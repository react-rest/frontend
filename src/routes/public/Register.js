import React, { Component } from 'react';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';

import Register from 'components/Register';

@connect((obj) => (obj))

export default class RegisterPage extends Component {

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    if (values) {
      dispatch({
        type: 'login/register',
        payload: {
          ...values,
        },
      });
    }
  };

  render() {
    return (
      <DocumentTitle title="注册">
        <Register submit={this.handleSubmit} />
      </DocumentTitle>
    );
  }
}
