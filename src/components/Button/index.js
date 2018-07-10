import React from 'react';
import { Form, Input, Select } from 'antd';
import _ from 'lodash';

import styles from './index.less';
import { buttonConfig } from 'utils/constrains';

const FormItem = Form.Item;
const { Option } = Select;

const defaultItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
}

@Form.create()

export default class ButtonPage extends React.Component {

  state = {
    currentType: 'view',
    selectedButton: {},
  }

  defaultMenu = []

  getButtonConfig = () => {
    const html = [];
    _.forOwn(buttonConfig, (name, value) => {
      html.push(<Option key={value} value={value}>{name}</Option>);
    })
    return html
  }

  getButtonDetail = (getFieldDecorator, selectedButton) => {
    let html = null
    switch (this.state.currentType) {
      case 'view':
        html = (
          <FormItem {...defaultItemLayout} label="跳转url">
            {getFieldDecorator('url', {
              initialValue: selectedButton.url,
              rules: [{ required: true, message: '请输入跳转的url' }],
            })(
              <Input placeholder="请输入跳转的url" />
            )}
          </FormItem>
        )
        break;
      case 'miniprogram':
        html = (
          <div>
            <FormItem {...defaultItemLayout} label="小程序url">
              {getFieldDecorator('url', {
                initialValue: selectedButton.url,
                rules: [{ required: true, message: '请输入跳转的url' }],
              })(
                <Input placeholder="请输入跳转的url" />
              )}
            </FormItem>
            <FormItem {...defaultItemLayout} label="appId">
              {getFieldDecorator('appId', {
                initialValue: selectedButton.appid,
                rules: [{ required: true, message: '请输入appId' }],
              })(
                <Input placeholder="请输入appId" />
              )}
            </FormItem>
            <FormItem {...defaultItemLayout} label="pagepath">
              {getFieldDecorator('pagepath', {
                initialValue: selectedButton.pagepath,
                rules: [{ required: true, message: '请输入pagepath' }],
              })(
                <Input placeholder="请输入pagepath" />
              )}
            </FormItem>
          </div>
        )
        break;
      case 'media_id':
      case 'view_limited':
        html = (
          <FormItem {...defaultItemLayout} label="media_id">
            {getFieldDecorator('media_id', {
              initialValue: selectedButton.media_id,
              rules: [{ required: true, message: '请输入media_id' }],
            })(
              <Input placeholder="请输入media_id" />
            )}
          </FormItem>
        )
        break;
      default:
        html = (
          <FormItem {...defaultItemLayout} label="key">
            {getFieldDecorator('key', {
              initialValue: selectedButton.key,
              rules: [{ required: true, message: '请输入key' }],
            })(
              <Input placeholder="请输入key" />
            )}
          </FormItem>
        )
        break;
    }
    return html
  }

  // 渲染单个button，设置事件
  renderButton = (button, index) => {
    return (
      <div
        key={index}
        className={styles.menu}
        onClick={() => this.setState({ selectedButton: button })}
      >
        {button.name}
      </div>
    )
  }

  // 渲染所有button
  renderMenu = (buttons) => {
    const html = []
    if (buttons.length > 0) {
      buttons.map((item, index) => {
        return html.push(this.renderButton(item, index));
      })
    }
    return html;
  }

  render() {
    const buttons = _.get(this.props, 'button', this.defaultMenu);
    console.log('buttons', buttons);
    const { getFieldDecorator } = this.props.form;
    const selectedButton = _.get(this.state, 'selectedButton', {});
    return (
      <div className={styles.main}>
        <div className={styles.screen}>
          <div className={styles.box}>
            {this.renderMenu(buttons)}
          </div>
        </div>
        <div className={styles.info}>
          <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 4 }} label="菜单名">
            {getFieldDecorator('name', {
              initialValue: selectedButton.name,
              rules: [{ required: true, message: '请输入菜单名' }],
            })(
              <Input placeholder="请输入菜单名" />
            )}
          </FormItem>
          <FormItem {...defaultItemLayout} label="菜单类型">
            {getFieldDecorator('select', {
              initialValue: selectedButton.type,
              rules: [{ required: true, message: '请选择菜单类型' }],
            })(
              <Select
                placeholder="请选择菜单类型"
                style={{ minWidth: 200 }}
                onChange={value => this.setState({ currentType: value })}
              >
                {this.getButtonConfig()}
              </Select>
            )}
          </FormItem>
          {this.getButtonDetail(getFieldDecorator, selectedButton)}
        </div>
      </div>
    )
  }
}
