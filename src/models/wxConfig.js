import * as wxConfig from 'services/wxConfig';
import { message } from "antd";

export default {
  namespace: 'wxConfig',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      if (history.location.pathname === '/user/config') {
        dispatch({
          type: 'getConfig',
        })
      }
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
