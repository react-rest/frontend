import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={classNames(styles.main)}>
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: 'admin',
            rules: [{ required: true, message: '请输入账号' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className={classNames(styles['login-form-forgot'])} href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className={classNames(styles['login-form-button'])}>登录</Button>
          <div>
            Or <a href="">register now!</a>
          </div>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);

// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
