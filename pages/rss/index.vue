<template>
	<view>
		<scroll-view scroll-y>
			<view @tap="goToMain" class="cu-card article" v-for="(item,index) of items" :key="index" :data-link="item.link"
			 :data-title="item.title">
				<view class="cu-item shadow">
					<view class="title">
						<view class="text-cut">{{item.title}}</view>
					</view>
					<view class="content">
						<view class="desc">
							<view class="text-content">
								<parser :html="item.description"></parser>
							</view>
							<view>
								<view class="cu-tag bg-red light sm round">{{item.form}}</view>
								<view class="cu-tag bg-green light sm round">{{item.pubdate}}</view>
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
			uni.request({
				method: 'POST',
				url: getApp().globalData.baseUrl + '/rssrequire',
				data: {
					path: 'https://rsshub.wgjstc.com/weibo/user/2621448527',
					rsshub: false
				},
				success: (e) => {
					let data = e.data;
					this.handleData(data);
				}
			})
		},
		methods: {
			handleData(data) {
				let $ = cheerio.load(data);
				let title = CDATAEXP.exec($('channel>title').text())[1];
				let items = $('item');
				let _this = this;
				items.map((index, item) => {
					item = $(item);
					let _title = CDATAEXP.exec(
						item
						.find('title')
						.first()
						.text()
					)[1];
					let _description = item
						.find('description')
						.first()
						.text();
					let _pubDate = item
						.find('pubDate')
						.first()
						.text();
					_pubDate = dayjs(_pubDate).format('YYYY-MM-DD HH:mm:ss');
					_this.items.push({
						title: _title,
						link: item.find('link').first()[0].next.data.replace(/[\r\n]/g, ''),
						description: _description,
						form: title,
						pubdate: _pubDate
					})
				});
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
