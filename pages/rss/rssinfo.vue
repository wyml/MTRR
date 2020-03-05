<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="back">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view>
			<web-view :src="link"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				link: ''
			}
		},
		onLoad(option) {
			this.title = option.title;
			this.link = option.link;
		}
	}
</script>

<style>

</style>
