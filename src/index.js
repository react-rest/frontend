import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva({
  initialState: {
    products: [
      { name: 'dva1', id: 1 },
      { name: 'dva2', id: 2 },
      { name: 'dva3', id: 3 },
    ],
    // login: {
    //   status: 'error'
    // },
  }
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/products').default);
app.model(require('./models/login').default);
app.model(require('./models/wxConfig').default);
app.model(require('./models/button').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
