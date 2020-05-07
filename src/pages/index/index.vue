<template>
	<view class="content">
		<!-- <view @click="aaa">首页</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			aaa() {
				uni.navigateTo({
					url: '../broken-net/broken-net'
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
