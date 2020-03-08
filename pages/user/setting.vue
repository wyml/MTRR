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
					<text class="text-grey text-sm">清除前备份一下咯</text>
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
			}
		},
		methods: {
			logout() {
				this.$store.commit('logout');
				uni.navigateBack();
			},
			backup() {
				let _data = uni.getStorageSync('rsslist');
				uni.setStorageSync('mtrr_backup', _data);
				uni.showToast({
					title: '备份完成',
					icon: 'none'
				})
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
