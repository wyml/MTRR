<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="back">返回</block>
			<block slot="content">修改信息</block>
		</cu-custom>
		<form class="">
			<view class="cu-form-group margin-top">
				<view class="title">昵称</view>
				<input placeholder="请输入要修改的昵称" v-model="username" name="email" type="email"></input>
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
				username: ''
			}
		},
		methods: {
			update() {
				let data = {
					username: this.username
				};
				this.$http.post("/member/update", data)
					.then(res => {
						if (res.data.code == 1) {
							this.$store.state.user.username = this.username;
							uni.navigateBack();
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						}
					});
			}
		}
	}
</script>

<style>

</style>
