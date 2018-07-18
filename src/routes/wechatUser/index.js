import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import qs from 'query-string';

// import WechatUserItemComponent from 'components/WechatUser/ItemComponent';

@connect((obj) => (obj))

export default class WechatUserListPage extends React.Component {
  defaults = {
    data: [],
    loading: true,
  }
  colunms = [
    {
      title: 'openid',
      dataIndex: 'openid',
      key: 'openid',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '头像',
      key: 'headimgurl',
      render: (text) => {
        return (
          <img style={{height: '48px', borderRadius: '50%'}} src={text.headimgurl} alt="头像" />
        )
      }
    },
    {
      title: '关注时间',
      key: 'subscribe_time',
      render: text => (moment(text.subscribe_time * 1000).format('YYYY-MM-DD HH:mm'))
    },
    {
      title: '地区',
      key: 'address',
      render: text => (`${text.country}-${text.province}-${text.city}`)
    },
  ]

  nextPage = page => {
    const { history, location } = this.props;
    const search = qs.parse(location.search);
    search.page = page;
    location.search = qs.stringify(search);
    history.replace(location.pathname + '?' + qs.stringify(search));
  }

  render() {
    const data = _.get(this.props, 'wxConfig', this.defaults);
    const { lists, loading, count: total } = data;
    const search = qs.parse(_.get(this.props, 'location.search', ''));
    const page = parseInt(search.page, 10) || 1;
    return (
      <div>
        <Table
          loading={loading}
          dataSource={lists}
          columns={this.colunms}
          rowKey="openid"
          pagination={{
            defaultPageSize: 2,
            current: page,
            total,
            onChange: this.nextPage,
          }}
        />
        {/*<WechatUserItemComponent />*/}
      </div>
    )
  }
}
