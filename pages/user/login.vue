<template>
	<view>
		<image src="../../static/bg.png" mode="scaleToFill" class="bg-img flex align-center justify-center" style="width: 100%;"></image>
		<view class="cu-bar bg-white margin-bottom-sm">
			<view class="action border-title">
				<text class="text-xl text-bold">登录</text>
				<text class="bg-blue" style="width:2rem"></text>
			</view>
		</view>
		<form>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input v-model="form.email" name="email" type="email"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input v-model="form.pwd" name="password" type="password"></input>
			</view>
		</form>
		<view class="action margin-top padding-lr-sm">
			<button class="cu-btn bg-green block" @tap="login">登录</button>
		</view>
		<view class="action margin-top-sm padding-lr-sm">
			<button class="cu-btn bg-blue block" @tap="goToReg">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				provider: null,
				form: {
					email: '',
					pwd: '',
				}
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
			login() {
				let data = this.form;
				this.$http.post("/login",data)
				.then(res=>{
					if (res.data.code == 1) {
						var user = res.data.data.user,
						token = res.data.data.token;
						this.$store.commit('login', user);
						uni.setStorage({
							key:'token',
							data:token
						});
						uni.navigateBack();
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				});
			},
			goToReg() {
				uni.navigateTo({
					url: '/pages/user/register'
				})
			}
		}
	}
</script>

<style>
</style>
