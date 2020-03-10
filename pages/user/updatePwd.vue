<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="back">返回</block>
			<block slot="content">修改密码</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">旧密码</view>
				<input placeholder="请输入要原密码" v-model="oldPwd" name="oldPwd" type="password"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">新密码</view>
				<input placeholder="请输入要原密码" v-model="pwd" name="pwd" type="password"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">二次确认</view>
				<input placeholder="请输入要原密码" v-model="confirm" name="confirm" type="password"></input>
			</view>
		</form>
		<view class="action margin-top padding-lr-sm">
			<button class="cu-btn bg-green block" @tap="update">修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPwd: '',
				pwd: '',
				confirm: ''
			}
		},
		methods: {
			update() {
				if (this.pwd !== this.confirm) {
					uni.showToast({
						icon: 'none',
						title: '两次密码不一致！'
					});
					return;
				}
				let data = {
					old: this.oldPwd,
					pwd: this.pwd,
					confirm: this.confirm
				}
				this.$http.post("/member/changePwd", data)
					.then(res => {
						if (res.data.cdoe == 1) {
							uni.showModal({
								showCancel: false,
								title: '完成',
								content: '密码修改完成，请重新登录',
								success: (res) => {
									if (res.confirm) {
										this.$store.commit('logout');
										uni.navigateTo({
											url: '/pages/user/login',
										});
									}
								}
							})
						}
					});
			}
		}
	}
</script>

<style>

</style>
