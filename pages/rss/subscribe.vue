<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="back">返回</block>
			<block slot="content">订阅源</block>
		</cu-custom>
		<view class="cu-bar bg-white margin-bottom-sm">
			<view class="action border-title">
				<text class="text-xl text-bold">源信息</text>
				<text class="bg-grey" style="width:2rem"></text>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-circlefill text-orange"></text>
					<text @tap="cp" class="text-orange" :data-url="item.form_link">RSS来源：{{item.form}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-titles text-orange"></text>
					<text class="text-orange">RSS标题：{{item.title}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-info text-orange"></text>
					<text class="text-orange">RSS规则：{{item.rule}}</text>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white margin-tb-sm">
			<view class="action border-title">
				<text class="text-xl text-bold">编辑源</text>
				<text class="bg-blue" style="width:2rem"></text>
			</view>
		</view>
		<form>
			<view class="cu-form-group">
				<view class="title">源标题</view>
				<input placeholder="自己喜欢的标题" v-model="form.title" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">源规则</view>
				<input v-model="form.rule" placeholder="按规则修改参数" name="input"></input>
				<button class='cu-btn bg-green shadow' @tap="cpRule"><text class="cuIcon-copy"></text></button>
			</view>
			<view class="cu-form-group">
				<view class="title">刷新间隔</view>
				<picker @change="pickerChange" v-model="form.refresh" :value="index" :range="refresh">
					<view class="picker">
						{{form.refresh==0?'请选择刷新间隔':form.refresh+'小时'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">严格反爬源使用MTRR源站</view>
				<switch color="#e54d42" @change="formMTRR" :class="formMTRR?'checked bg-green':''" :checked="formMTRR?true:false"></switch>
			</view>
		</form>
		<view class="action margin-top padding-lr-sm">
			<button class="cu-btn bg-blue block" @tap="saveRss"><text class="cuIcon-noticefill"></text> 订阅</button>
		</view>
		<view class="action text-center margin-top text-gray text-ABC">
			<view><text class="cuIcon-infofill margin-left-sm"></text> RSS源由各网站提供，MTRR不保证源的有效性。RSS内容由源提供与MTRR无关且MTRR不负责</view>
			<view><text class="cuIcon-infofill margin-left-sm"></text> MTRR源 fork on RSSHub</view>
		</view>

		<!-- 提示窗口 -->
		<view class="cu-modal" :class="modal.show?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{modal.title}}</view>
					<view class="action" @tap="modal.closeFunc()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{modal.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {},
				form: {
					title: "",
					rule: "",
					refresh: 0,
				},
				refresh: [0.5, 1, 2, 3, 12, 24],
				index: -1,
				formMTRR: false,
				modal: {
					show: false,
					title: '',
					content: ''
				}
			}
		},
		onLoad(option) {
			this.item = JSON.parse(decodeURIComponent(option.item));
		},
		methods: {
			cp(e) {
				let url = e.currentTarget.dataset.url;
				uni.setClipboardData({
					data: url
				})
			},
			cpRule() {
				this.form.rule = this.item.rule;
			},
			pickerChange(e) {
				this.form.refresh = this.refresh[e.detail.value];
			},
			saveRss() {
				var rss = this.form;
				var rss_list = this.$store.state.rsslist;

				if (rss.title == "" || rss.rule == "") {
					uni.showToast({
						icon: "none",
						title: '源标题或规则不能为空！'
					})
					return;
				}
				rss.refresh == 0 ? rss.refresh = 1 : rss.refresh

				this.formMTRR ? rss.link = 'http://rsshub.rss.kingsr.cc' + rss.rule : rss.link = 'https://rsshub.app' + rss.rule;
				this.modal = {
					title: 'MTRR正在验证源',
					content: 'MTRR正在验证源是否可用，请稍后',
					show: true,
					closeFunc: () => {
						this.modal.show = false
					}
				};
				this.$http.post("/rssrequire", {
					path: rss.link,
					rsshub: false
				}).then(res => {
					if (res.data == 'error') {
						this.modal = {
							title: '源规则错误',
							content: '请检查RSS规则是否有误？',
							show: true,
							closeFunc: () => {
								this.modal.show = false;
							}
						};
						return;
					}
					this.$store.commit('pushRssList', {
						'rss_title': rss.title,
						'rss_url': rss.link,
						'rss_rule': rss.rule,
						'rss_refresh': rss.refresh
					});
					this.modal.show = false;
					if (this.$store.state.isLogin) {
						uni.showToast({
							title: '添加成功并已同步到云端',
							icon: 'success',
							success() {
								uni.navigateBack()
							}
						});
					} else {
						this.modal = {
							title: '订阅成功',
							content: '订阅成功，您尚未登录。订阅信息仅保留在本地清除数据后失效！推荐登录享受云端同步！',
							show: true,
							closeFunc: () => {
								uni.$emit('refreshRss');
								uni.navigateBack({});
							}
						};
					}
				});
			},
			validateRss() {

			}
		}
	}
</script>
