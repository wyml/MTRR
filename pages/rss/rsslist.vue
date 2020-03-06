<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="back">返回</block>
			<block slot="content">RSS源列表</block>
		</cu-custom>
		<view class="cu-bar search bg-white fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="search" type="text" placeholder="搜索源关键字" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="searchRss">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{marginTop:CustomBar+10+'px'}">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item,index) of rsslist" :key="index" @tap="goToRssInfo" :data-title="item.title"
				 :data-link="item.link" :data-rule="item.rule">
					<view class="content padding-tb-sm">
						<view class="text-bold text-xl">
							<view class='cu-tag radius bg-orange margin-right-xs'>{{item.form}}</view> {{item.title}}
						</view>
						<view class="text-gray text-sm">
							<view>{{item.description.replace(/<[^>]*>|<\/[^>]*>/gm,"")}}</view>
							<view class='cu-tag radius bg-blue fr' @tap="subscribe"><text class="cuIcon-notice margin-right-xs"></text> 订阅</view>
						</view>
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
				search: "",
				CustomBar: this.CustomBar,
			}
		},
		created() {
			uni.request({
				url: getApp().globalData.baseUrl + "/rsslist",
				success: (e) => {
					let data = e.data.data;
					this.rsslist = data;
				}
			})
		},
		methods: {
			goToRssInfo(e) {
				let title = e.currentTarget.dataset.title;
				let link = e.currentTarget.dataset.link;
				uni.navigateTo({
					url: `/pages/rss/main?title=${title}&link=${link}`
				})
			},
			subscribe() {

			},
			searchRss() {
				let key = this.search.toLowerCase();
				uni.request({
					method: 'POST',
					url: getApp().globalData.baseUrl + '/search',
					data: {
						key: key,
					},
					dataType: 'json',
					success: (res) => {
						this.rsslist = res.data;
					}
				});
			}
		}
	}
</script>

<style>
</style>
