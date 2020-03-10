<template>
	<view class="bt-bar-m">
		<scroll-view scroll-y="true" class="margin-top-sm">
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
		<view class="margin-top action padding-lr-sm">
			<navigator class="cu-btn radius bg-blue block" url="../rss/rsslist" open-type="navigate"><text class="cuIcon-noticefill"></text>
				RSS列表</navigator>
		</view>
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
				this.$http.get("/index/dynamic")
					.then(res => {
						this.items = res.data;
						uni.hideLoading();
					}).catch(res => {
						console.log(res);
						uni.hideLoading();
					});
			},
			goToRssInfo(e) {
				let title = e.currentTarget.dataset.title;
				let link = e.currentTarget.dataset.link;
				uni.navigateTo({
					url: `/pages/rss/main?title=${title}&link=${link}`
				})
			},
			subscribe(index) {
				let item = this.items[index];
				uni.navigateTo({
					url: '/pages/rss/subscribe?item=' + encodeURIComponent(JSON.stringify(item))
				});
			}
		}
	}
</script>
