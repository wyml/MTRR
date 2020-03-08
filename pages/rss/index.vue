<template>
	<view>
		<view v-if="$store.state.rsslist.length==0">
			<view class="text-center margin-top">
				<view class="text-gray">你尚未订阅任何一个内容呢。快去订阅一个吧~</view>
				<navigator url="/pages/rss/rsslist" class="cu-btn bg-red margin-top round"><text class="cuIcon-notice"></text>
					去订阅</navigator>
			</view>
		</view>
		<scroll-view scroll-y v-else class="bt-bar-m">
			<view @tap="goToMain" class="cu-card article" v-for="(item,index) of items" :key="index" :data-link="item.link"
			 :data-title="item.title">
				<view class="cu-item shadow">
					<view class="title">
						<view class="text-cut">{{item.title}}</view>
					</view>
					<view class="content">
						<view class="desc">
							<view class="text-content">
								<jyf-parser :html="item.description"></jyf-parser>
							</view>
							<view class="action">
								<view class="cu-tag bg-red light sm round">{{item.from}}</view>
								<view class="cu-tag bg-blue light sm round">{{item.pubDate}}</view>
							</view>
						</view>
					</view>

				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import cheerio from 'cheerio';
	import dayjs from 'dayjs';
	const CDATAEXP = /\<\!\[CDATA\[([\s\S]*?)\]\]\>/;
	export default {
		data() {
			return {
				items: []
			}
		},
		created() {
			uni.showLoading({
				title: '加载中...'
			});
			this.getRssList();
			uni.$on('refreshRss', () => {
				this.getRssList();
			});
		},
		methods: {
			getRssList() {
				var rsslist = this.$store.state.rsslist;
				console.log(rsslist[0]);
				if (rsslist.length == 0) {
					uni.hideLoading();
					return;
				}
				var param = [];
				rsslist.forEach((val, index) => {
					param.push(val.rss_url);
				});
				uni.request({
					method: 'POST',
					url: getApp().globalData.baseUrl + '/rssrequire',
					data: {
						path: param,
						rsshub: false
					},
					success: (e) => {
						let data = e.data;
						this.handleData(data);
					}
				});
			},
			handleData(data) {
				if (!Array.isArray(data)) {
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: data
					})
					return;
				}
				let orderList = data;
				// 排序，使得时间较早的RSS在前面
				orderList.sort(function(a, b) {
					var datea = dayjs(a.pubDate).unix();
					var dateb = dayjs(b.pubDate).unix()
					if (datea > dateb) {
						return -1;
					} else if (datea < dateb) {
						return 1;
					} else {
						return 0;
					}
				});
				this.items = orderList;
				uni.hideLoading();
			},
			goToMain(e) {
				let link = e.currentTarget.dataset.link,
					title = e.currentTarget.dataset.title;
				uni.navigateTo({
					url: `/pages/rss/main?link=${link}&title=${title}`,
				});
			}
		}
	}
</script>
