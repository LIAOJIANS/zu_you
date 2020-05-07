<template>
	<view>
		<uniStatusBar bgcolor='#57B9F9'/>
		<!-- <image class="headImg" src="../../static/common/loginhead.png" mode="widthFix"></image> -->
		<view class="headImg">
			
		</view>
		<view class="icon iconfont icon-fanhui" @click="back"></view>
		<view class="body">
			<template v-if="isPassWord">
				<view class="border">
					<input type="text" v-model="username" placeholder="手机号/昵称/邮箱" />
				</view>
				<view class="border display-center">
					<input type="text" password v-model="password" placeholder="请输入密码"/>
					<view class="forget-pwd">忘记密码？</view>
				</view>
			</template>
			<template v-else>
				<view class="border display-center">
					<view class="phone-top">+86</view>
					<input type="text" v-model="phone" maxlength="11" placeholder="手机号" />
				</view>
				<view class="border display-center">
					<input type="text" v-model="yzm" maxlength="6" placeholder="请输入验证码"/>
					<view class="yzm" @click="countDown">{{ countVal }}</view>
				</view>
			</template>
			<button type="primary" class="user-set-btn" :disabled='isOk' :class="[ isOk ? 'user-set-btn-disable' : '']" @click="submit">登录</button>
			<view class="login-type display-a-j-c" @click="loginType">
				{{ isPassWord ? '验证码登录' : '账号密码登录' }}
				<view class="icon iconfont icon-iconfontjiantou5"></view>
			</view>
		</view>
		<!-- 第三方登陆 -->
		<view class="other-login-title display-a-j-c login-padding login-font-color">第三方登录</view>
		<other-login :noback="false"></other-login>
		
		<!-- 协议 -->
		<view class="login-rule display-a-j-c login-padding login-font-color">
			注册即代表您同意<view>《彭欣姐垃圾协议》</view>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue'
	import otherLogin from "../../components/other-login/other-login.vue";
	
	export default {
		data() {
			return {
				isPassWord: false,
				username: '',
				password: '',
				phone: '',
				isOk: true,
				yzm: '',
				countVal: '获取验证码',
			}
		},
		
		watch: {
			username() {
				this.check()
			},
			
			password() {	
				this.check()
			},
			
			phone() {
				this.check()
			},
			
			yzm() {
				this.check()
			}
		},
		
		created() {
			uni.getStorage({
				key: 'count-val',
				success: res => {
					const data = JSON.parse(res.data)
					if(data.countVal !== '获取验证码' && data) { 
						// 如果当前的时间小于页面死亡时间，那就证明该用户在当前一分钟倒计时内回来，否则，重新计算倒计时
						if ( Math.floor((new Date().getTime() - data.time) / 1000) < data.countVal) this.down(data.countVal)
					}
				}
			})
		},
		
		beforeDestroy() { // 页面死亡前
			const data = JSON.stringify({
				countVal: this.countVal,
				time: new Date().getTime()
			})
			uni.setStorage({
				key: 'count-val',
				data: data,
			})
		},
		
		components: {
			uniStatusBar,
			otherLogin
		},
		
		methods: {
			check() {
				const { username, password, phone, yzm } = this
				if(( username && password  ) || ( phone && yzm )) this.isOk = false
			},
			
			submit() { // 登录提交
				// if(this.isPassWord) { // 密码登录
				// 	return this.user.login({
				// 		url: '/user/login',
				// 		data: {
				// 			username: this.username,
				// 			password: this.password
				// 		}
				// 	})
				// }
				// if(!this.phone || !/^1\d{10}$/.test(this.phone)) return uni.showToast({ title: '手机号为空，或者不正确', icon: 'none' })
				// return this.user.login({
				// 	url: '/user/phonelogin',
				// 	data: {
				// 		phone: this.phone,
				// 		code: this.yzm
				// 	}
				// })
			},
			
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			
			loginType() {
				this.isPassWord = !this.isPassWord
				this.initData()
			},
			
			initData() {
				this.username = '',
				this.password = '',
				this.phone = '',
				this.isOk = true,
				this.yzm = ''
			},
			
			async countDown() { //  倒计时发送验证码
				if(!this.phone || !/^1\d{10}$/.test(this.phone)) return uni.showToast({ title: '手机号为空，或者不正确', icon: 'none' })
				if(this.countVal !== '获取验证码') return uni.showToast({ title: '正在发送，请勿重复点击' })
				// let [err, res] = await this.$http.post('/user/sendcode', { // 请求验证码
				// 	phone: this.phone
				// })
				// if(res.data.errorCode !== 30005) return uni.showToast({ title: res.data.msg, icon: 'none' })
				// uni.showToast({ title: res.data.msg })
				let timer = 60
				this.down(timer)
			},
			
			down(timer) {
				const timeId = setInterval(() => {
					this.countVal = timer--
					if(timer <= 0) {
						this.countVal = '获取验证码'
						clearInterval(timeId)
					}
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../common/form.css");
	.headImg {
		width: 100%;
		height: 400upx;
		background-color: #57B9F9;
	}
	.login-rule {
		font-size: 28upx;
	}
	.icon-fanhui {
		position: fixed;
		top: 60upx;
		left: 30upx;
		font-style: 40upx;
		font-weight: bold;
		color: #fff;
	}
	.icon-iconfontjiantou5 {
		font-size: 32upx;
		padding-left: 10upx;
	}
	.border {
		padding: 20upx 10upx;
		border-bottom: 1px solid #f4f4f4;
		input {
			width: 100%;
			line-height: 50upx;
			flex: 1;
			font-size: 32upx;
			font-weight: bold;
			color: #969696;
		}
		.forget-pwd {
			font-size: 30upx;
		}
		.phone-top {
			margin-right: 15upx;
			font-size: 32upx;
			font-weight: bold;
			color: #333333;
		}
		.yzm {
			width: 180upx;
			line-height: 70upx;
			text-align: center;
			background: #f4f4f4;
			color: #939393;
			font-size: 28upx;
			border-radius: 10upx;
		}
	}
	.login-type {
		margin: 30upx 0;
		text-align: center;
		font-size: 30upx;
		view {
			color: #d5d5d5;
		}
	}
	.other-login-title{
		position: relative;
		font-size: 28upx;
	}
	.other-login-title:before,.other-login-title:after{
		content: "";
		position: absolute;
		background: #BBBBBB;
		height: 1upx;
		width: 100upx;
		top: 50%;
	}
	.other-login-title:before{
		left: 25%;
	}
	.other-login-title:after{
		right: 25%;
	}
	.login-font-color{ 
		color: #BBBBBB;
	}
	.login-padding{ 
		padding: 20upx 0;
	}
</style>
