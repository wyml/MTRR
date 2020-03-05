import Vue from 'vue'
import App from './App'

import hot from './pages/rss/index.vue'
import user from './pages/user/index.vue'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('hot', hot)
Vue.component('user', user)
Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
