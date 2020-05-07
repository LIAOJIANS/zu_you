<template>
	<view class="bg">
		<view class="body display-center">
			<image class="upic" :src="homeinfo.upic" mode="aspectFill" lazy-load></image>
			<view class="user-info">
				<view class="username">{{ homeinfo.username }}</view>
				<view class="dces">{{ homeinfo.come.isCome ? homeinfo.come.zuName : '未加入' }}</view>
			</view>
			<view class="qiandao" :class="{ active: issignature }" @click="onSignature">
				<view v-if="issignature">已签到√</view>
				<view v-else>签到</view>
			</view>
		</view>
		<home-list :list='list' />
	</view>
</template>

<script>
import homeList from './home-list.vue'
export default {
	props: {
		homeinfo: Object
	},
	components: {
		homeList
	},
	data() {
		return {
			issignature: false,
			list: [
				{ name: '申请人数', count: 6 },
				{ name: '我的申请', count: 6 },
				{ name: '我的发布', count: 6 }
			]
		};
	},
	methods: {
		onSignature() {
			this.issignature = !this.issignature;
		}
	}
};
</script>

<style lang="scss" scoped>
.bg {
	padding: 100upx 0 0 30upx;
	background-color: #57b9f9;
	color: #fff;
	background-image: url('../../static/common/my.png');
	background-size: 100% 100%;
    background-repeat: no-repeat;
	.body {
		position: relative;
	}
	.upic {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
	.dces {
		font-size: 32upx;
		margin-top: 10upx;
	}
	.username {
		font-size: 42upx;
		font-weight: bold;
	}
	.active {
		width: 200rpx;
	}
	.qiandao {
		position: absolute;
		top: 30rpx;
		right: 0rpx;
		box-sizing: border-box;
		height: 80rpx;
		font-size: 30rpx;
		line-height: 80rpx;
		background-color: #eb8439;
		color: #ffffff;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		padding-left: 32rpx;
		padding-right: 10rpx;
		transition: all 2s ease-in-out;
	}
	
}
</style>
