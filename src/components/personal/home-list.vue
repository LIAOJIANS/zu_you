<template>
	<view class="p-list display-space-between-center u-f1">
		<block v-for="item in list" :key='item.name'>
			<view class="p-item">
				<view>{{ item.name }}</view>
				<view>{{ item.count }}</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	props: {
		list: Array
	}
};
</script>

<style lang="scss" scoped>
.p-list {
	padding: 80upx 30upx 30upx 20upx;
}
.p-item {
	text-align: center;
	view {
		font-size: 36upx;
		color: #fff;
	}
	view:last-child {
		font-size: 32upx;
		margin-top: 15upx;
		font-weight: bold;
	}
}
</style>
