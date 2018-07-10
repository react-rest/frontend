import * as button from 'services/button';
import { message } from "antd";

export default {
  namespace: 'button',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      if (history.location.pathname === '/button/custom') {
        dispatch({
          type: 'getCusButton',
        })
      }
    },
  },
  effects: {
    * getCusButton({ payload }, { call, put }) {
      const response = yield call(button.getCusButton, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    * saveCusButton({ payload }, { call, put }) {
      const response = yield call(button.saveCusButton, payload);
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
