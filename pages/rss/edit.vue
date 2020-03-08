<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="back">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">源标题</view>
				<input placeholder="自己喜欢的标题" v-model="form.rss_title" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">源规则</view>
				<input v-model="form.rss_url" placeholder="按规则修改参数" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">刷新间隔</view>
				<picker @change="pickerChange" v-model="form.rss_refresh" :value="index" :range="rss_refresh">
					<view class="picker">
						{{form.rss_refresh==0?'请选择刷新间隔':form.rss_refresh+'小时'}}
					</view>
				</picker>
			</view>
		</form>
		<view class="action margin-top padding-lr-sm">
			<button class="cu-btn bg-blue block" @tap="saveRss"><text class="cuIcon-post"></text> 保存</button>
		</view>
		<view class="action text-center margin-top text-gray text-ABC">
			<view><text class="cuIcon-infofill margin-left-sm"></text> RSS源由各网站提供，MTRR不保证源的有效性。RSS内容由源提供与MTRR无关且MTRR不负责</view>
			<view><text class="cuIcon-infofill margin-left-sm"></text> MTRR源 fork on RSSHub</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '添加自定义源',
				form: {
					rss_title: '',
					rss_url: '',
					rss_refresh: 0
				},
				rawUrl: '',
				fromMTRR: false,
				index: 0,
			}
		},
		onLoad(option) {
			this.type = option.type;
			if (this.type == 'edit') {
				this.title = '编辑源';
				this.index = option.index;
				this.form = JSON.parse(decodeURIComponent(option.item));
				this.rawUrl = this.form.rss_url;
			}
		},
		methods: {
			saveRss() {
				if (this.type == 'edit') {
					this.$store.commit('editRssList', {
						index: this.index,
						form: this.form
					});
				} else {
					this.$store.commit('pushRssList', this.form);
				}
				uni.showToast({
					title: '保存成功',
					success() {
						uni.navigateBack({

						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
