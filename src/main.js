import Vue from 'vue'
import App from './App'

import lib from './common/lib.js'
Vue.prototype.lib = lib

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
