<template>
	<view>网络崩溃啦
		<button type="default" @click="goBakc">点我返回</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		goBakc() {
			this.lib.NetWork.On(data => {
				console.log(data)
				if(data) {
					uni.showToast({
						title: '请链接网络'
					})
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

<style></style>
