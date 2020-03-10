import Vue from 'vue'
import App from './App'
import store from 'store'

// 加入HTTP
import {
	http
} from './utils/api'
Vue.prototype.$http = http;

import hot from './pages/rss/index.vue'
import dynamic from './pages/dynamic/dynamic.vue'
import user from './pages/user/index.vue'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('hot', hot)
Vue.component('dynamic', dynamic)
Vue.component('user', user)
Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
