<template>
	<view>
		<image src="../../static/bg.png" mode="scaleToFill" class="bg-img flex align-center justify-center" style="width: 100%;"></image>
		<view class="cu-bar bg-white margin-bottom-sm">
			<view class="action border-title">
				<text class="text-xl text-bold">注册</text>
				<text class="bg-green" style="width:2rem"></text>
			</view>
		</view>
		<form>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input v-model="form.email" name="email" type="text"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">昵称</view>
				<input v-model="form.username" name="username" type="text"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input v-model="form.password" name="password" type="password"></input>
			</view>
		</form>
		<view class="action margin-top padding-lr-sm">
			<button :disabled="dis" class="cu-btn bg-green block" @tap="reg">注册</button>
		</view>
		<view class="action margin-top-sm padding-lr-sm">
			<button :disabled="dis" class="cu-btn bg-blue block" @tap="goTologin">登录</button>
		</view>
	</view>
</template>

<script>
	const url = getApp().globalData.baseUrl + "/register";
	export default {
		data() {
			return {
				form: {
					email: '',
					username: '',
					password: ''
				},
				dis: false,
			}
		},
		created() {
			let _this = this;
			if (this.$store.state.isLogin) {
				uni.redirectTo({
					url: '/pages/index/index'
				});
			}
		},
		methods: {
			reg() {
				if (!this.form.email || !this.form.username || !this.form.password) {
					uni.showToast({
						icon: 'none',
						title: '邮箱、用户名或密码不能为空！'
					});
					return;
				}
				let data = this.form;
				this.dis = true;
				console.log(url);
				uni.request({
					method: 'POST',
					url: url,
					data: data,
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 1) {
							uni.showModal({
								title: '注册成功',
								content: '注册成功',
								showCancel: false,
								success: (res) => {
									if (res.confirm) {
										uni.navigateBack();
									}
								}
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							});
							this.dis = false;
						}
					},
					fail: (res) => {
						console.log(res);
					}
				});
			},
			goTologin() {
				uni.navigateBack();
			}
		}
	}
</script>

<style>
</style>
