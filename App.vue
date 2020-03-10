<script>
	import Vue from 'vue'

	export default {
		globalData: {
			version: '1.0.0'
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});

			this.$store.state.isLogin = uni.getStorageSync('isLogin') ? JSON.parse(uni.getStorageSync('isLogin')) : false;
			this.$store.state.user = uni.getStorageSync('user') ? JSON.parse(uni.getStorageSync('user')) : {};
			this.$store.state.rsslist = uni.getStorageSync('rsslist') ? JSON.parse(uni.getStorageSync('rsslist')) : [];

		},
		onShow: function() {
			let token = uni.getStorageSync('token');
			if (token != '') {
				this.$http.post("/checkToken", {
						token: token
					})
					.then(res => {
						if (!res.data[0]) {
							this.$store.commit('logout');
							uni.showToast({
								icon: 'none',
								title: 'Token已过期，请注意重新登录'
							});
						}
					});
			}
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";

	.bt-bar-m {
		margin-bottom: 130upx;
	}
</style>
