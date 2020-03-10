<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="back">返回</block>
			<block slot="content">设置</block>
		</cu-custom>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="./update" open-type="navigate">
					<text class="cuIcon-profilefill text-grey"></text>
					<text class="text-grey">信息</text>
				</navigator>
				<view class="action">
					<text class="text-grey text-sm">修改些个人信息</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="./updatePwd" open-type="navigate">
					<text class="cuIcon-safe text-grey"></text>
					<text class="text-grey">安全</text>
				</navigator>
				<view class="action">
					<text class="text-grey text-sm">修改密码</text>
				</view>
			</view>
			<view class="cu-item arrow margin-top" @tap="backup">
				<view class="content">
					<text class="cuIcon-pullup text-grey"></text>
					<text class="text-grey">备份数据</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{!isLogin?'尚未登录，仅备份到本地':'已登录，双份备份'}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="recovery">
				<view class="content">
					<text class="cuIcon-pulldown text-grey"></text>
					<text class="text-grey">恢复数据</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{!isLogin?'尝试恢复本地备份':'将云端数据恢复至本地'}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="cleanData">
				<view class="content">
					<text class="cuIcon-deletefill text-grey"></text>
					<text class="text-grey">清除数据</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">出现未知错误可以尝试一下~</text>
				</view>
			</view>
			<view class="cu-item arrow margin-top">
				<navigator class="content" hover-class="none" url="../index/about" open-type="navigate">
					<text class="cuIcon-infofill text-grey"></text>
					<text class="text-grey">关于</text>
				</navigator>
				<view class="action">
					<text class="text-grey text-sm">Version：{{version}}</text>
				</view>
			</view>
			<view class="cu-item arrow margin-top" @tap="logout">
				<view class="content">
					<text class="text-grey">退出登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			version() {
				return getApp().globalData.version;
			},
			isLogin() {
				return this.$store.state.isLogin;
			}
		},
		methods: {
			logout() {
				this.$store.commit('logout');
				uni.navigateBack();
			},
			backup() {
				var _data = uni.getStorageSync('rsslist');
				console.log(_data);
				uni.setStorageSync('mtrr_backup', _data);
				if (this.isLogin) {
					this.$http.post("/member/uploadRss", JSON.parse(_data))
						.then(res => {
							if (res.data.code == 1) {
								uni.showToast({
									title: '备份完成',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
							}
						})
				} else {
					uni.showToast({
						title: '本地备份完成',
						icon: 'none'
					})
				}

			},
			recovery() {
				var localBackup = uni.setStorageSync('mtrr_backup', _data);
				if (this.isLogin) {
					uni.showModal({
						title: '询问',
						content: '云端以及本地均有备份，恢复哪处数据？',
						cancelText: '本地',
						confirmText: '云端',
						success: (res) => {
							if (res.confirm) {
								this.$http.get('/member/downloadRss')
									.then(res => {
										if (res.data.code == 1) {
											this.$store.commit('pushRssList', res.data.data);
											uni.showToast({
												title: '恢复成功',
												icon: 'none'
											});
										} else {
											uni.showToast({
												title: res.data.msg,
												icon: 'none'
											});
										}
									})
								return;
							}
							if (res.cancel) {
								if (!localBackup) {
									uni.showToast({
										title: '没有本地备份数据',
										icon: 'none'
									});
								} else {
									this.$store.commit('pushRssList', JSON.parse(localBackup));
									uni.showToast({
										title: '恢复成功',
										icon: 'none'
									});
								}
							}
						}
					})
				}
			},
			cleanData() {
				uni.showModal({
					title: '二次确认',
					content: '确定要清除数据吗？该操作仅清除本地的RSS规则，其他数据不受影响！',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorage({
								key: 'rsslist'
							});
							uni.showToast({
								title: '清除完成',
								icon: 'none'
							});
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
