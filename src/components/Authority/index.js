import React from 'react';

import Layout from 'components/Layout';

export default class AuthorityComponent extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
        {this.props.children}
      </Layout>
    )
  }
}
