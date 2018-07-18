import * as wxConfig from 'services/wxConfig';
import { message } from "antd";

export default {
  namespace: 'wxConfig',
  state: {
    loading: true,
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(location => {
        switch (location.pathname) {
          case '/user/config':
            dispatch({
              type: 'getConfig'
            });
            break;
          case '/wx/users':
            dispatch({
              type: 'getFollowers',
              payload: location.search,
            });
            break;
          default:
            break;
        }
      })
    },
  },
  effects: {
    * getConfig({ payload }, { call, put }) {
      const response = yield call(wxConfig.getConfig, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    * getFollowers({ payload }, { call, put }) {
      const response = yield call(wxConfig.getFollowers, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: {
            loading: false,
            ...response,
          },
        });
      }
    },
    * saveConfig({ payload }, { call, put }) {
      const response = yield call(wxConfig.saveConfig, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: payload,
        });
        message.success('保存成功', 1.5);
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
