import React from 'react';
import { Form, Input, Select, Button } from 'antd';
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
    button: [],
  }

  defaultMenu = []

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ button: _.get(props, 'button', []) })
  }

  // 获取按钮的类型
  getButtonConfig = () => {
    const html = [];
    html.push(<Option key='-1' value=''>主菜单</Option>);
    _.forOwn(buttonConfig, (name, value) => {
      html.push(<Option key={value} value={value}>{name}</Option>);
    })
    return html
  }

  // 渲染按钮详情
  getButtonDetail = (getFieldDecorator, selectedButton) => {
    let html = null
    switch (this.state.currentType) {
      case 'view':
        html = (
          <FormItem {...defaultItemLayout} label="跳转url">
            {getFieldDecorator(`${selectedButton.name}_url`, {
              initialValue: selectedButton.url,
              rules: [{ required: true, message: '请输入跳转的url' }],
              onChange: e => this.onChange(e, 'url'),
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
              {getFieldDecorator(`${selectedButton.name}_url`, {
                initialValue: selectedButton.url,
                rules: [{ required: true, message: '请输入跳转的url' }],
                onChange: e => this.onChange(e, 'url'),
              })(
                <Input placeholder="请输入跳转的url" />
              )}
            </FormItem>
            <FormItem {...defaultItemLayout} label="appId">
              {getFieldDecorator('appId', {
                initialValue: selectedButton.appid,
                rules: [{ required: true, message: '请输入appId' }],
                onChange: e => this.onChange(e, 'appid'),
              })(
                <Input placeholder="请输入appId" />
              )}
            </FormItem>
            <FormItem {...defaultItemLayout} label="pagepath">
              {getFieldDecorator('pagepath', {
                initialValue: selectedButton.pagepath,
                rules: [{ required: true, message: '请输入pagepath' }],
                onChange: e => this.onChange(e, 'pagepath'),
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
            {getFieldDecorator(`${selectedButton.name}_media_id`, {
              initialValue: selectedButton.media_id,
              rules: [{ required: true, message: '请输入media_id' }],
              onChange: e => this.onChange(e, 'media_id'),
            })(
              <Input placeholder="请输入media_id" />
            )}
          </FormItem>
        )
        break;
      case '':
        html = null;
        break;
      default:
        html = (
          <FormItem {...defaultItemLayout} label="key">
            {getFieldDecorator(`${selectedButton.name}_key`, {
              initialValue: selectedButton.key,
              rules: [{ required: true, message: '请输入key' }],
              onChange: e => this.onChange(e, 'key'),
            })(
              <Input placeholder="请输入key" />
            )}
          </FormItem>
        )
        break;
    }
    return html
  }

  // 更改选中菜单
  onChoose = (e, button) => {
    e.stopPropagation();  // 阻止冒泡
    this.setState({ selectedButton: button, currentType: button.type })
  }

  // 渲染二级菜单
  renderSub = (button) => {
    const sub = button.sub_button
    const html = [
      (<div key={-1} onClick={() => this.addSecondMenu(button)}>+</div>)
    ]
    // eslint-disable-next-line array-callback-return
    sub.map((button, index) => {
      html.push(
        this.renderButton(button, index)
      )
    })
    return <div className={styles.sub}>{html}</div>
  }

  // 添加二级菜单
  addSecondMenu = btn => {
    const { button } = this.state;
    _.forOwn(button, (item) => {
      if (_.isEqual(item, btn)) {
        const sub = item.sub_button.reverse()
        if (_.isEqual(sub, btn.sub_button)) {
          sub.push({
            type: 'view',
            name: '',
            sub_button: [],
          });
          item.sub_button = sub.reverse();
        }
      }
    })
    this.setState({ button });
  }

  // 渲染单个button，设置事件
  renderButton = (button, index) => {
    return (
      <div key={index} onClick={e => this.onChoose(e, button)}>
        {!button.type && this.renderSub(button)}
        {button.name}
      </div>
    )
  }

  // 渲染所有button
  renderMenu = (buttons) => {
    const html = []
    if (buttons.length > 0) {
      buttons.map((button, index) => {
        return html.push(
          <div className={styles.menu} key={index}>
            {this.renderButton(button)}
          </div>
        );
      })
    }
    return html;
  }

  // 更改输入
  onChange = (e, type = 'name', isDelete = false) => {
    const value = _.get(e, 'target.value', e)
    const { button, selectedButton } = this.state
    _.forOwn(button, (item, key) => {
      if (_.isEqual(item, selectedButton)) isDelete === false ? item[type] = value : delete button[key];
      // eslint-disable-next-line array-callback-return
      item.sub_button.map((btn, key) => {
        if (_.isEqual(btn, selectedButton)) isDelete === false ? btn[type] = value : item.sub_button.splice(key, 1);
      })
    })
    this.setState({ button })
  }

  // 删除选中的菜单
  deleteChoosed = () => {
    const { button, selectedButton } = this.state
    _.forOwn(button, (item, key) => {
      if (_.isEqual(item, selectedButton)) delete button[key]
      // eslint-disable-next-line array-callback-return
      item.sub_button.map((i, key) => {
        if (_.isEqual(i, selectedButton)) item.sub_button.splice(key, 1)
      })
    })
    this.setState({ button })
  }

  // 保存
  save = () => {
    this.props.save(this.state.button)
  }

  render() {
    const buttons = _.get(this.state, 'button', this.defaultMenu);
    const { getFieldDecorator } = this.props.form;
    const selectedButton = _.get(this.state, 'selectedButton', {});
    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 4 },
      },
    };
    return (
      <div className={styles.main}>
        <div className={styles.screen}>
          <div className={styles.box}>
            {this.renderMenu(buttons)}
          </div>
        </div>
        <div className={styles.info}>
          <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 4 }} label="菜单名">
            {getFieldDecorator(`${selectedButton.name}_name`, {
              initialValue: selectedButton.name,
              rules: [{ required: true, message: '请输入菜单名' }],
              onChange: e => this.onChange(e, 'name'),
            })(
              <Input placeholder="请输入菜单名" />
            )}
          </FormItem>
          <FormItem {...defaultItemLayout} label="菜单类型">
            {getFieldDecorator(`${selectedButton.name}_select`, {
              initialValue: selectedButton.type,
              // rules: [{ required: true, message: '请选择菜单类型' }],
            })(
              <Select
                placeholder="请选择菜单类型"
                style={{ minWidth: 200 }}
                onChange={value => {
                  this.setState({ currentType: value });
                  this.onChange(value, 'type');
                }}
              >
                {this.getButtonConfig()}
              </Select>
            )}
          </FormItem>
          {this.getButtonDetail(getFieldDecorator, selectedButton)}
          <FormItem {...tailFormItemLayout}>
            <Button style={{marginRight: '10px'}} type="danger" htmlType="button" className="login-form-button" onClick={() => this.onChange(null, '', true)}>删除选中</Button>
            <Button type="primary" htmlType="button" className="login-form-button" onClick={this.save}>保存</Button>
          </FormItem>
        </div>
      </div>
    )
  }
}
