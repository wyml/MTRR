<template>
	<view>
		<scroll-view scroll-y="true" class="margin-top-sm bt-bar-m">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item,index) of items" :key="index" :data-rule="item.rule">
					<view class="content padding-tb-sm" :data-title="item.title" :data-link="item.link" @tap="goToRssInfo">
						<view class="text-bold text-xl">
							<view class='cu-tag radius bg-orange margin-right-xs'>{{item.form}}</view> {{item.title}}
						</view>
						<view class="text-gray text-sm">
							<view>{{item.description.replace(/<[^>]*>|<\/[^>]*>/gm,"")}}</view>
						</view>
					</view>
					<view class="action">
						<button class="cu-btn round sm bg-blue margin-left-sm" @tap="subscribe(index)"><text class="cuIcon-notice margin-right-xs"></text>订阅</button>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: []
			}
		},
		created() {
			uni.showLoading({
				title: '加载中'
			});
			this.getList();
		},
		methods: {
			getList() {
				console.log(getApp().globalData.baseUrl+"/index/dynamic");
				uni.request({
					url: getApp().globalData.baseUrl + "/index/dynamic",
					success: (res) => {
						this.items = res.data;
						uni.hideLoading();
					},
					fail: (res) => {
						console.log(res);
						uni.hideLoading();
					}
				})
			},
			goToRssInfo(e) {
				let title = e.currentTarget.dataset.title;
				let link = e.currentTarget.dataset.link;
				uni.navigateTo({
					url: `/pages/rss/main?title=${title}&link=${link}`
				})
			},
		}
	}
</script>
