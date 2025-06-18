<style lang="less">
	@import '../../static/common/variable.less';

	.form {
		padding: 20rpx 30rpx;

		.title {
			height: 80rpx;
			line-height: 80rpx;
			font-weight: 700;
		}

		.opt {
			.inp {
				width: 100%;
				height: 90rpx;
				border: 1px solid #ccc;
				margin-top: 20rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				box-sizing: border-box;
			}

			.btn {
				margin-top: 20rpx;
				background-color: @color;
				color: #fff;
				width: 100%;
			}

			.txt-2,
			.txt-3,
			.txt-4 {
				display: inline-block;
				margin-top: 30rpx;
				color: #666;
			}
		}

		.opt-1 {
			width: 100%;
			display: flex;
			align-items: center;

			.inp {
				width: 220rpx;
			}

			.txt-1 {
				margin-left: 20rpx;
			}
		}

		.opt-2 {
			text-align: center;
		}

		.opt-3 {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.txt-4 {
				color: #ccc;
			}
		}
	}
</style>
<template>
	<view class="form">
		<view class="title">用户登录</view>
		<view class="opt">
			<input v-model="user.account" class="inp" type="text" placeholder="请输入账号(邮箱)" />
		</view>
		<view class="opt">
			<input v-model="user.password" class="inp" type="password" placeholder="请输入密码" />
		</view>
		<view class="opt opt-1">
			<input v-model="vcode" class="inp" type="text" placeholder="验证码" />
			<text class="txt txt-1" @click="sendEmailFn">{{message}}</text>
		</view>
		<view class="opt">
			<button class="btn" @click="loginFn">登录</button>
		</view>
		<view class="opt opt-3">
			<text class="txt txt-2" @click="jumpRegister">没有账号,立即注册</text>
			<text class="txt txt-4" @click="jumpSetpwd">忘记密码?</text>
		</view>
		<view class="opt opt-2">
			<text class="txt txt-3" @click="jumpIndex">跳转首页</text>
		</view>
	</view>
</template>

<script>
	// 导入封装的接口
	import {
		login,
		sendEmail,
		verifyEamil
	} from '../../api/index'
	export default {
		data() {
			return {
				//用户信息
				user: {
					account: "",
					password: ""
				},
				// 验证码信息
				vcode: "",
				// 发送邮箱验证码
				message: "点击发送邮箱验证码"
			}
		},
		methods: {
			//编写登录
			async loginFn() {
				// 获取用户输入的张账号和密码
				let {
					account,
					password
				} = this.user;
				let vcode = this.vcode;

				// 判断输入框是否为空
				if (account && password && vcode) {
					// 定义布尔值
					let isPass = false;
					//校验验证码
					await verifyEamil({
							email: account,
							vcode: vcode
						})
						.then(
							content => {
								let {
									code,
									msg
								} = content;
								if (code == 200) {
									//表示验证码通过验证
									isPass = true;
								} else {
									uni.showToast({
										title: msg,
										icon: "error"
									})
								}
							}
						)

					// 通过邮箱验证
					if (isPass) {
						await login({
							account,
							password
						}).then(
							content => {
								console.log(content)
								let {
									code,
									msg,
									token,
									nickName
								} = content;
								// token: 用户的临时身份
								if (code == 200) {
									// 把用户token记录在本地
									// 判断谁在登录，谁在考试，需要用到token
									uni.setStorageSync("ABCTOKEN", token);
									uni.setStorageSync("ABCNICKNAME", nickName);
									uni.showToast({
										title: msg,
										icon: "success"
									})
									//跳转个人中心
									setTimeout(() => {
										uni.switchTab({
											url: '../my/my'
										})
									}, 300)

								} else {
									// 登录失败
									uni.showToast({
										title: msg,
										icon: "error"
									})
								}
							}
						)
					}
				} else {
					uni.showToast({
						title: "输入框不能为空",
						icon: "error"
					})
				}

			},

			// 编写发送邮箱验证码
			async sendEmailFn() {
				let email = this.user.account;
				if (email) {
					await sendEmail({
							email: email
						})
						.then(
							content => {
								// console.log(content)
								let {
									code,
									msg
								} = content;
								if (code == 200) {
									uni.showToast({
										title: msg,
										icon: 'none'
									})
								} else {
									uni.showToast({
										title: msg,
										icon: 'error'
									})
								}
							}
						)
				}
			},




			jumpRegister() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			jumpIndex() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			jumpSetpwd() {
				uni.navigateTo({
					url: '../setpwd/setpwd'
				})
			}
		}
	}
</script>