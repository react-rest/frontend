import { resolve } from 'path';

export default {
  extraBabelPlugins: [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
  alias: {
    assets: resolve(__dirname, 'src/assets'),
    routes: resolve(__dirname, 'src/routes'),
    components: resolve(__dirname, 'src/components'),
    services: resolve(__dirname, 'src/services'),
    utils: resolve(__dirname, 'src/utils'),
    common: resolve(__dirname, 'src/common'),
  },
  proxy: {
    "/api": {
      target: "http://localhost:7001",
      changeOrigin: true,
      // "pathRewrite": { "^/api" : "" }
    }
  }
}
