<template>
	<view class="home-list-item display-space-between-center animated fadeIn fast" 
	hover-class="home-list-hover">
		<view class="display-center">
			<view v-if="item.icon"
			class="icon iconfont"
			:class="[item.icon]"></view>
			{{item.name}}
		</view>
		<view class="icon iconfont" :class="{'icon-iconfontjiantou5':!item.data}">{{ item.data || '' }}</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		methods:{
			
		}
	}
</script>

<style scoped>
.home-list-item{
	padding: 20upx;
	border-top: 1upx solid #F4F4F4;
	border-bottom: 1upx solid #F4F4F4;
}
.home-list-item>view:first-child{
	color: #333333;
}
.home-list-item>view:first-child>view{
	margin-right: 10upx;
}
.home-list-item>view:last-child{
	color: #CCCCCC;
}
.home-list-hover{
	background: #f4f4f4;
}
</style>
