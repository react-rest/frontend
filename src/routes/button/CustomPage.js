import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';

import ButtonComponent from 'components/Button';

@connect((obj) => (obj))

export default class CustomPage extends React.Component {
  render() {
    const button = _.get(this.props, 'button.button', {})
    return (
      <ButtonComponent button={button}/>
    )
  }
}
