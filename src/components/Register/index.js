import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import classNames from 'classnames';

import styles from '../Login/index.less';

const FormItem = Form.Item;

@Form.create()

export default class RegisterForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password === values.password2)
          this.props.submit(values);
        else
          message.error('两次密码不一致');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={classNames(styles.main)}>
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: 'test',
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
          {getFieldDecorator('password2', {
            initialValue: '123456',
            rules: [{ required: true, message: '请确认密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={classNames(styles['login-form-button'])}>注册</Button>
          <div>
            Or <a href="">login now!</a>
          </div>
        </FormItem>
      </Form>
    );
  }
}
