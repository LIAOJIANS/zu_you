<template>
	<view class="broken" >
		<image src="../../static/common/broken.png" mode="widthFix"></image>
		<view class="title">Oops,网络扑街了</view>
		<button class="shuax u-f1" @click="goBakc">点击刷新</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			broken: false
		};
	},
	methods: {
		async goBakc() {
			await this.lib.NetWork.On(data => {
				if(data) {
					uni.navigateTo({
						url: '/pages/broken-net/broken-net'
					});
				} else {
					uni.navigateBack({
						data: 1
					})
				}
			});		
		}
	}
};
</script>

<style lang="scss">
	.broken {
		text-align: center;
		image {
			margin-top: 200upx;
			width: 400upx;
		}
		.title {
			color: #7e7e7e;
			font-size: 36upx;
			font-weight: bold;
		}
		.shuax {
			margin-top: 40upx;
			width: 200upx;
			border: 2upx solid #7e7e7e;
			color: #7e7e7e;
			border-radius: 10upx;
			font-size: 32upx;
			line-height: 70upx;	
			font-weight: bold;
		}
	}
</style>
