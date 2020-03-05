<template>
	<view>
		<view class="bg-img flex align-center justify-center" style="background-image: url('../../static/user.jpeg');height: 420upx;">
			<view class="padding-xl text-white">
				<view class="padding-xs">
					<view class="cu-avatar round xl" :style="{backgroundImage:'url('+user.avatar+')'}"></view>
				</view>
				<view class="padding-xs text-lg text-center text-black text-bold">
					{{user.nick}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {}
			}
		},
		created() {
			
		},
		methods: {
			timeFormat(val) {
				
			}
		}
	}
</script>

<style>
</style>
