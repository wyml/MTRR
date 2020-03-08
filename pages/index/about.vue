<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="back">返回</block>
			<block slot="content">关于</block>
		</cu-custom>
		<view class="margin-top text-center">
			<image src="../../static/logo.png" style="width: 160upx;height: 160upx;"></image>
			<view class="text-gray">MTRR Version：{{version}}</view>
		</view>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-pullup text-grey"></text>
					<text class="text-grey">版本更新</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="./feedback" open-type="navigate">
					<text class="cuIcon-questionfill text-grey"></text>
					<text class="text-grey">问题反馈</text>
				</navigator>
			</view>
		</view>
		<view class="padding text-gray">
			<view>MlTreeRSSReader(简称：MTRR)是一款依托于UNIAPP编写的RSS阅读器。MTRR灵感来源于平时的朋友圈阅读。因为现有的RSS阅读器对于我来说不够友好，因此制作了这一款阅读器。</view>
			<view class="margin-top-sm">现有的阅读器源一般在国外，并且添加的方式并不友好。所以我依托RSSHub收集了源，在此感谢RSSHub！以及对RSSHub提供规则的大家！</view>
		</view>
		<view class="padding">
			<view><a href="https://blog.kingsr.cc">MTRR</a></view>
			<view><a href="https://rsshub.app">RSSHub</a></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			version() {
				return getApp().globalData.version;
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
