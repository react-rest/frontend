import { routerRedux } from 'dva/router';

import * as user from 'services/user';
import { authority } from 'utils/authority';

export default {
  namespace: 'login',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      if (history.location.pathname === '/login' && authority()) {
        history.replace('/');
      } else if (!authority() && history.location.pathname !== '/register') {
        history.replace('/login');
      }
    },
  },
  effects: {
    * login({ payload }, { call, put }) {
      const response = yield call(user.login, payload);
      if (response) {
        authority(response);
        yield put(routerRedux.push('/'));
      }
    },
    * register({ payload }, { call, put }) {
      const response = yield call(user.register, payload);
      if (response) {
        // authority(response);
        yield put(routerRedux.push('/login'));
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
