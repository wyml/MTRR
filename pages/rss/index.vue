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
				var cache = uni.getStorageSync('cache_rss');
				if (cache && uni.getStorageSync('cache_rss_time') > dayjs().unix()) {
					this.items = JSON.parse(cache);
					return;
				}
				var rsslist = this.$store.state.rsslist;
				if (rsslist.length == 0) {
					uni.hideLoading();
					return;
				}
				var param = [];
				rsslist.forEach((val, index) => {
					console.log(val);
					param.push(val.rss_url);
				});
				this.$http.post("/rssrequire", {
					path: param,
					rsshub: false
				}).then(res => {
					if (!Array.isArray(res.data)) {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: res.data
						})
						return;
					}
					this.items = res.data;
				}).catch(res => {
					console.log(res);
					uni.hideLoading();
				}).fail(res => {
					console.log(res);
				});
			},
			handleData() {
				// 排序，使得时间较早的RSS在前面
				this.items.sort(function(a, b) {
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
				uni.setStorage({
					key: 'cache_rss',
					data: JSON.stringify(this.items)
				});
				uni.setStorage({
					key: 'cache_rss_time',
					data: dayjs().add(10, 'minut').unix()
				})
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
