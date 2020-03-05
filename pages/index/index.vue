<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">{{PageTitle}}</block>
		</cu-custom>
		<hot v-if="PageTitle==='动态'"></hot>
		<user v-if="PageTitle==='我的'"></user>
		<view class="cu-bar tabbar bg-white foot">
			<view @tap="NavChange" class="action" :class="PageTitle==='动态'?'text-blue':'text-gray'" data-cur="动态">
				<view :class="PageTitle==='动态'?'cuIcon-hotfill':'cuIcon-hot'"></view> 动态
			</view>
			<view @tap="NavChange" class="action" :class="PageTitle==='发现'?'text-blue':'text-gray'" data-cur="发现">
				<view :class="PageTitle==='发现'?'cuIcon-wefill':'cuIcon-we'"></view> 发现
			</view>
			<view @tap="NavChange" class="action" :class="PageTitle==='我的'?'text-blue':'text-gray'" data-cur="我的">
				<view :class="PageTitle==='我的'?'cuIcon-myfill':'cuIcon-my'"></view> 我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageTitle: '动态'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageTitle = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
