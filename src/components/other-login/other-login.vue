<template>
	<view class="other-login display-center">
		<!-- #ifdef APP-PLUS || MP-ALIPAY -->
		<block v-for="(item,index) in providerList" :key="index">
			<view class="display-a-j-c u-f1" @tap="tologin(item)">
				<view class="icon iconfont display-a-j-c" 
				:class="['icon-' + item.icon]">
				<!-- #ifdef MP-ALIPAY -->
				支
				<!-- #endif -->
				</view>
			</view>
		</block>
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">微信登录</button>
		<!-- #endif -->
		
	</view>
</template>

<script>
	export default {
		props:{
			noback:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				providerList: []
			}
		},
		created() {
			console.log(this.providerList)
			// #ifdef APP-PLUS || MP-ALIPAY
			this.getLoginAuth();
			// #endif
		},
		methods:{
			// #ifdef MP-WEIXIN
			mpGetUserInfo(result) {
				uni.showLoading({ title: '登录中...', mask: true });
				// 获取失败
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					uni.hideLoading();
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + result.detail.errMsg,
						showCancel: false
					});
					return;
				}
				let userinfo = result.detail.userInfo;
				uni.login({
					provider:"weixin",
					success: (res) => {
						this.MpLogin({
							url:"/wxlogin",
							code:res.code,
							nickName:userinfo.nickName,
							avatarUrl:userinfo.avatarUrl
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				})
			},
			// #endif
			MpLogin(options){
				console.log(options)
			},
			// 获取当前登录渠道
			getLoginAuth(){
				uni.getProvider({
					service: 'oauth',
					success: (result) => {
						this.providerList = result.provider.map((value) => {
							let providerName = '';
							let icon='';
							switch (value) {
								case 'weixin':
									providerName = '微信登录';
									icon='weixin';
									break;
								case 'qq':
									providerName = 'QQ登录';
									icon='QQ';
									break;
								case 'sinaweibo':
									providerName = '新浪微博登录';
									icon='xinlangweibo';
									break;
								// #ifdef MP-ALIPAY
								case 'alipay':
									providerName = '支付宝登录';
									icon='changyonglogo30';
									break;
								// #endif
							}
							return {
								name: providerName,
								icon:icon,
								id: value
							}
						});
						console.log(this.providerList)
					},
					fail: (error) => {
						console.log('获取登录通道失败', error);
					}
				});
			},
			// 登录
			tologin(provider) {
				uni.login({
					provider: provider.id,
					// #ifdef MP-ALIPAY
					scopes: 'auth_user',  //支付宝小程序需设置授权类型
					// #endif
					success: (res) => {
						uni.showLoading({
							title: '登陆中...',
							mask: false
						});
						/*
						*/
						console.log(res)
						
						uni.getUserInfo({
						  provider: provider.id,
						  success: (infoRes)=> {
							  console.log(infoRes)
							  // 支付宝登录
							  // #ifdef MP-ALIPAY
							  this.MpLogin({
							  	url:"/alilogin",
							  	code:res.code,
							  	avatarUrl:infoRes.userInfo.avatarUrl,
							  	nickName:infoRes.userInfo.nickName
							  })
							  // #endif
					
							// app登录
							// #ifndef MP-ALIPAY
							console.log(JSON.stringify(infoRes.userInfo))
							let data = this.user.__formatOtherLogin(provider.id,Object.assign(infoRes,res));
							this.loginEvent(data);
							// #endif
						  }
						});
						
						// 更新保存在 store 中的登录状态
						console.log('登录成功，保存到本地存储，修改当前用户登录状态')
					},
					fail: (err) => {
						console.log('login fail:', err);
					},
					complete:()=>{
						uni.hideLoading();
					}
				});
			},
			loginEvent(data){
				console.log('登录成功', data)
				// 登录成功，重新加载数据
				this.$emit('logining')
			}
		}
	}
</script>

<style lang="scss">
.other-login{
	padding: 20upx 80upx;
}
.other-login>view>view{
	width: 100upx;
	height: 100upx;
	border-radius: 100%;
	font-size: 55upx!important;
	color: #FFFFFF!important;
}
.other-login .icon-QQ{
	background: #2CAEFC;
}
.other-login .icon-weixin{
	background: #2BD19B;
}
.other-login .icon-xinlangweibo{
	background: #FC7729;
}
.other-login .icon-changyonglogo30{
	background: #007AFF;
}
</style>
