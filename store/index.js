import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		isLogin: false,
		user: {},
		rsslist: []
	},
	mutations: {
		login(state, userInfo) {
			state.user = userInfo;
			state.isLogin = true;
			uni.setStorage({
				key: 'user',
				data: JSON.stringify(userInfo)
			});
			uni.setStorage({
				key: 'isLogin',
				data: JSON.stringify(true)
			});
		},
		logout(state) {
			state.user = {},
				state.isLogin = false;
			uni.removeStorage({
				key: 'user'
			});
			uni.removeStorage({
				key: 'isLogin'
			});
		},
		pushRssList(state, rss) {
			state.rsslist.push(rss);
			uni.setStorage({
				key: 'rsslist',
				data: JSON.stringify(state.rsslist)
			})
		},
		editRssList(state, param) {
			state.rsslist[param.index] = param.form;
			uni.setStorage({
				key: 'rsslist',
				data: JSON.stringify(state.rsslist)
			})
		},
		removeRssList(state, index) {
			state.rsslist = state.rsslist.splice(index, 1);
			uni.setStorage({
				key: 'rsslist',
				data: JSON.stringify(state.rsslist)
			})
		}
	},
	actions: {

	}
});

export default store;
