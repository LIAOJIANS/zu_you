<template>
	<view class="personal animated fadeIn more-share">
		<template v-if="!isLogin">
			<view class="pt30 display-a-j-c">登录租友，体验更多功能</view>
			<!-- 第三方登录 -->
			<other-login :noback="true"></other-login>
			<!-- 账号密码登陆 -->
			<view class="display-a-j-c" @click="openLogin">
				账号密码登陆
				<view class="icon iconfont icon-iconfontjiantou5"></view>
			</view>
		</template>
		<template v-else>
			<home-info :homeinfo="homeinfo"></home-info>
		</template>
		<!-- 广告位 -->
		<view class="home-adv display-a-j-c animated fadeIn fast">
			<image src="https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/demo20.jpg" mode="widthFix" lazy-load></image>
		</view>
		<!-- 功能列表 -->
		<view class="home-list">
			<block v-for="(item, index) in list" :key="index"><home-list-item :item="item" :index="index"></home-list-item></block>
		</view>
	</view>
</template>

<script>
import otherLogin from '../../components/other-login/other-login.vue';
import homeInfo from '../../components/personal/home-info.vue';
import homeListItem from '../../components/personal/home-list-item.vue';
export default {
	data() {
		return {
			isLogin: true, // 是否登录
			homeinfo: {
				upic: 'http://img0.imgtn.bdimg.com/it/u=2568953423,543587131&fm=26&gp=0.jpg',
				username: 'hello',
				sex: 0,
				come: {
					isCome: true,
					zuName: '三帅社团'
				}
			},
			list: [
				{ icon: 'icon-xiaoxi1', name: '浏览历史', clicktype: 'navigateTo', url: '/pages/user-history/user-history' },
				{ icon: 'icon-xiaoxi1', name: '实名认证', clicktype: 'nothing', url: '' },
				{ icon: 'icon-xiaoxi1', name: '审核阿杰', clicktype: 'nothing', url: '' }
			]
		};
	},
	components: {
		otherLogin,
		homeInfo,
		homeListItem
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			uni.navigateTo({
				url: '../setting/setting'
			});
		}
	},
	methods: {
		openLogin() {
			uni.navigateTo({
				url: '../login/login'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pt30 {
	padding-top: 30upx;
}
.home-adv {
	margin: 30upx 0;
	border-radius: 10upx;
}
</style>
