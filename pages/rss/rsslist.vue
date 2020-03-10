<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="back">返回</block>
			<block slot="content">RSS源列表</block>
		</cu-custom>
		<view class="cu-bar search bg-white fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="search" @input="overSearch" type="text" placeholder="搜索源关键字" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="searchRss">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{marginTop:(CustomBar-20)+'px'}">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item,index) of rsslist" :key="index" :data-rule="item.rule">
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
	import dayjs from 'dayjs'

	export default {
		data() {
			return {
				rsslist: [],
				search: "",
				CustomBar: this.CustomBar,
			}
		},
		created() {
			uni.showLoading({
				title: '加载中...'
			});
			var sysrsslist = uni.getStorageSync('system_rss_list');
			console.log('OK');
			var system_rss_list_cache_time = uni.getStorageSync('system_rss_list_cache_time');

			if (!sysrsslist || (system_rss_list_cache_time < dayjs().unix())) {
				this.$http.get("/rsslist")
					.then(res => {
						let data = res.data.data;
						this.rsslist = data;
						uni.setStorage({
							key: 'system_rss_list',
							data: JSON.stringify(data)
						});
						uni.setStorage({
							key: 'system_rss_list_cache_time',
							data: dayjs().add(1, 'day').unix()
						});
						uni.hideLoading();
					});
			} else {
				this.rsslist = JSON.parse(sysrsslist);
				uni.hideLoading();
			}
			console.log(system_rss_list_cache_time);
		},
		methods: {
			goToRssInfo(e) {
				let title = e.currentTarget.dataset.title;
				let link = e.currentTarget.dataset.link;
				uni.navigateTo({
					url: `/pages/rss/main?title=${title}&link=${link}`
				})
			},
			subscribe(index) {
				let item = this.rsslist[index];
				uni.navigateTo({
					url: '/pages/rss/subscribe?item=' + encodeURIComponent(JSON.stringify(item))
				});
			},
			searchRss() {
				let key = this.search.toLowerCase();
				uni.showLoading({
					title: '搜索中'
				});
				this.$http.post('/search', {
						key: key
					})
					.then(res => {
						this.rsslist = res.data;
						uni.hideLoading();
					})
					.catch(res => {
						console.log(res);
						uni.hideLoading();
					});
			},
			overSearch() {
				if (this.search == '') {
					this.rsslist = JSON.parse(uni.getStorageSync('system_rss_list'));
				}
			}
		}
	}
</script>

<style>
</style>
