import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import VDistpicker from 'v-distpicker'//省市区

import moment from 'moment'

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

import BaiduMap from 'vue-baidu-map'




/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
// import '../mock' // simulation data

Vue.use(ElementUI, { locale })

Vue.use(VDistpicker)

Vue.config.productionTip = false

Vue.use(Viewer)

//日期格式化
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)

})

Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'PgXF4qF4PvWBAfiwa8TS35m25dbK32kN'
})


new Vue({
  el: '#app',
  router,
  store,
  VDistpicker,
  render: h => h(App)
})
