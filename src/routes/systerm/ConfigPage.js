import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';
import _ from 'lodash';

import { validateForm } from 'utils/utils';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

@connect((obj) => (obj))
@Form.create()

export default class ConfigPage extends React.Component {

  save = (values) => {
    const id = _.get(this.props, 'wxConfig.id', 0);
    if (id) values.id = id;
    this.props.dispatch({
      type: 'wxConfig/saveConfig',
      payload: values,
    });
  }

  render() {
    const wxConfig = _.get(this.props, 'wxConfig', {});
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <FormItem {...formItemLayout} label="AppID">
          {getFieldDecorator('appId', {
            initialValue: wxConfig.appId,
            rules: [{
              required: true,
              message: '请输入appId',
            }],
          })(
            <Input placeholder="" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="AppSecret">
          {getFieldDecorator('secret', {
            initialValue: wxConfig.secret,
            rules: [{
              required: true,
              message: '请输入secret',
            }],
          })(
            <Input placeholder="" />
          )}
        </FormItem>
        <FormItem {...formTailLayout}>
          <Button type="primary" onClick={() => validateForm(this.props, this.save)}>
            保存
          </Button>
        </FormItem>
      </div>
    );
  }
}
