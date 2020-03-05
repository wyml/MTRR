<template>
	<view>
		<image src="../../static/bg.png" mode="aspectFit" style="width: 100%;"></image>

		<view class="flex flex-direction padding">
			<view class="text-bold text-center text-lg margin-tb">登录以获得完整的使用权限</view>
			<button class="cu-btn bg-green margin-tb-sm lg" open-type="getUserInfo" @tap="login">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				provider: null,
			}
		},
		created() {
			let _this = this;
			if (this.$store.isLogin) {
				uni.redirectTo({
					url: '/pages/index/index'
				});
			}
			uni.getProvider({
				service: 'oauth',
				success(res) {
					_this.provider = res.provider;
				}
			});
		},
		methods: {
			login() {
				let _this = this;
				uni.login({
					provider: 'weixin',
					success: (res) => {
						uni.request({
							url: getApp().globalData.baseUrl + 'user/wechatLogin',
							data: {
								code: res.code
							},
							dataType: 'json',
							success: (resp) => {
								uni.getUserInfo({
									provider: 'weixin',
									success: (userinfo) => {
										_this.$store.commit('login', {
											provider: 'weixin',
											user: userinfo.userInfo
										});
										uni.navigateBack();
									}
								});
							}
						})

					}
				})
			}
		}
	}
</script>

<style>
</style>
