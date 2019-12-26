import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles' 
import i18n from './i18n'
import './assets/common.css'
import './lib/hotcss/hotcss.js'
import './assets/fonticon/iconfont.css'
import elTableInfiniteScroll from 'el-table-infinite-scroll';
Vue.use(elTableInfiniteScroll);


import JRPCWS from 'vue-json-rpc-websocket'

import Button from '@nutui/nutui/dist/packages/button/button.js';  // 加载构建后的JS
import '@nutui/nutui/dist/packages/button/button.css';  //加载构建后的CSS
Button.install(Vue);
import Cell from '@nutui/nutui/dist/packages/cell/cell.js';  // 加载构建后的JS
import '@nutui/nutui/dist/packages/cell/cell.css';  //加载构建后的CSS
Cell.install(Vue);
import LeftSlip from '@nutui/nutui/dist/packages/leftslip/leftslip.js';  // 加载构建后的JS
import '@nutui/nutui/dist/packages/leftslip/leftslip.css';  //加载构建后的CSS
LeftSlip.install(Vue);
import Icon from '@nutui/nutui/dist/packages/icon/icon.js';  // 加载构建后的JS
import '@nutui/nutui/dist/packages/icon/icon.css';  //加载构建后的CSS
Icon.install(Vue);
import Dialog from '@nutui/nutui/dist/packages/dialog/dialog.js';  // 加载构建后的JS
import '@nutui/nutui/dist/packages/dialog/dialog.css';  //加载构建后的CSS
Dialog.install(Vue);
import Textinput from '@nutui/nutui/dist/packages/textinput/textinput.js';  // 加载构建后的JS
import '@nutui/nutui/dist/packages/textinput/textinput.css';  //加载构建后的CSS
Textinput.install(Vue);
import Tabbar from '@nutui/nutui/dist/packages/tabbar/tabbar.js';  // 加载构建后的JS
import '@nutui/nutui/dist/packages/tabbar/tabbar.css';  //加载构建后的CSS
Tabbar.install(Vue);
import 'lib-flexible'
import "./assets/css/common.css"
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

import VueCookies from 'vue-cookies';
Vue.use (VueCookies);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

let tools=require('./tools.js');
Vue.prototype.$echarts=echarts;
Vue.prototype.$tools=tools;
Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.config.productionTip = false

Vue.use(JRPCWS, 'wss://'+window.location.host+'/http_proxy/api/ws-jsonrpc/v1', {
  reconnectEnabled: true,
  reconnectInterval: 3000,
  recconectAttempts: 9999,
  store:store
})

export function $i18n(path) {
  let locale = i18n.locale;
  let messages = i18n.messages;
  let lang = messages[locale];
  let getText = (path) => {
      const array = path.split('.');
      let current = lang;
      let value = ''
      for (let i = 0, j = array.length; i < j; i++) {
          current = current[array[i]]
          if(!current){
            break;  
          }
          if(i === j - 1){
              value = current;
          }
      }
      return value || path;
  }
  return getText(path)
}

window.main=new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');


import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
