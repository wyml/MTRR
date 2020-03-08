<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="back">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view>
			<web-view progress="true" :src="link"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(option) {
			this.link = option.link;
			this.title = option.title;
		},
		methods: {

		}
	}
</script>

<style>

</style>
