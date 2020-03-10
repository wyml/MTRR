<template>
	<view class="bt-bar-m">
		<view class="bg-img flex align-center justify-center" style="background-image: url('http://ec-cdn.kingsr.cc/user.jpeg-webp');height: 420upx;">
			<view class="padding-xl text-white" @tap="goToLogin">
				<view class="padding-xs text-center">
					<view class="cu-avatar round xl bg-white" style="background-image: url('http://ec-cdn.kingsr.cc/72x72.png-webp');"></view>
				</view>
				<view class="padding-xs text-lg text-center text-black text-bold">
					{{isLogin?user.username:'点击头像登录'}}
				</view>
			</view>
		</view>
		<view class="cu-list grid col-3 no-border shadow-warp">
			<view class="cu-item" @tap="goToadd">
				<view class="cuIcon-add text-orange"></view>
				<text>添加源</text>
			</view>
			<view class="cu-item" @tap="scanCode">
				<view class="cuIcon-scan"></view>
				<text>扫描</text>
			</view>
			<view class="cu-item" @tap="goToSetting">
				<view class="cuIcon-settings"></view>
				<text>设置</text>
			</view>
		</view>
		<view class="cu-bar bg-white margin-tb-sm">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>已订阅源</text>
			</view>
		</view>
		<scroll-view scroll-y="true">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item,index) of rsslist" :key="index" :data-rule="item.rule">
					<view class="content padding-tb-sm">
						<view class="text-bold">
							{{item.rss_title}}
						</view>
						<view class="text-gray text-sm">
							<view>RSS规则：{{item.rss_url}}</view>
							<view>刷新间隔：{{item.rss_refresh}}小时</view>
						</view>
						<view class='cu-tag radius bg-red fr' @tap="deleteSub(index)"><text class="cuIcon-delete"></text> 取消订阅</view>
						<view class='cu-tag radius bg-green fr margin-right-xs' @tap="editSub(index)"><text class="cuIcon-edit"></text>
							编辑订阅</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				rsslist: [],
				dialog: false,
			}
		},
		created() {
			this.rsslist = this.$store.state.rsslist;
		},
		computed: mapState(['isLogin', 'user']),
		methods: {
			editSub(index) {
				let item = encodeURIComponent(JSON.stringify(this.rsslist[index]));
				uni.navigateTo({
					url: '/pages/rss/edit?item=' + item + "&type=edit&index=" + index
				});
			},
			deleteSub(index) {
				let title = this.rsslist[index].rss_title;
				uni.showModal({
					title: '确认取消？',
					content: '是否取消该订阅？源信息：' + title,
					success: (res) => {
						if (res.confirm) {
							this.rsslist.splice(index, 1);
							this.$store.commint('removeRssList', index);
							uni.showToast({
								icon: 'success',
								title: '取消成功！'
							})
						}
					}
				})

			},
			goToadd() {
				uni.navigateTo({
					url: '/pages/rss/edit'
				})
			},
			scanCode() {
				uni.scanCode({
					success: (res) => {
						console.log('条码内容：' + res.result);
					}
				})
			},
			goToLogin() {
				if (!this.isLogin) {
					uni.navigateTo({
						url: '/pages/user/login'
					})
				}
			},
			goToSetting() {
				uni.navigateTo({
					url: '/pages/user/setting'
				})
			}
		}
	}
</script>

<style>
</style>
