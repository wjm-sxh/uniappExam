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
			.txt-3 {
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
	}
</style>
<template>
	<view class="form">
		<view class="title">设置密码</view>
		<view class="opt">
			<input v-model="user.account" class="inp" type="text" placeholder="请输入账号(邮箱)" />
		</view>

		<view class="opt opt-1">
			<input v-model="vcode" class="inp" type="text" placeholder="验证码" />
			<text class="txt txt-1" @click="sendEmailFn">{{message}}</text>
		</view>

		<view class="opt">
			<input v-model="user.password" class="inp" type="password" placeholder="请输入密码" />
		</view>
		<view class="opt">
			<input v-model="user.password2" class="inp" type="password" placeholder="请确认密码" />
		</view>

		<view class="opt">
			<button class="btn" @click="saveInfoFn">保存</button>
		</view>

		<view class="opt opt-2">
			<text class="txt txt-3" @click="jumpIndex">跳转首页</text>
		</view>
	</view>
</template>

<script>
	import {
		setpwd,
		sendEmail,
		verifyEamil
	} from '../../api/index'
	export default {
		data() {
			return {
				// 记录用户的账号和密码
				user: {
					account: "",
					password: "",
					password2: ""
				},
				vcode: "",
				message: "点击发送邮箱验证码"
			}
		},
		methods: {
			// 点击发送验证码的方法
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
				// console.log({email})
			},


			// 点击保存用户新密码
			async saveInfoFn() {
				let {
					account,
					password,
					password2
				} = this.user;
				let vcode = this.vcode;
				if (account && password && password2 && vcode) {
					if (password != password2) {
						uni.showToast({
							title: "两次输入的密码不一致",
							icon: "error"
						})
						return false;
					}

					//先验证邮箱，确认这是一个真实用户
					let isPass = false;
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
									isPass = true;
								} else {
									uni.showToast({
										title: msg,
										icon: "error"
									})
								}
							}
						)

					// 然后再修改密码
					await setpwd({
							account,
							password
						})
						.then(
							content => {
								let {
									code,
									msg
								} = content;
								if (code == 200) {
									uni.showToast({
										title: msg,
										icon: "success"
									})
									//延迟300毫秒
									setTimeout(() => {
										//跳转登录
										uni.navigateTo({
											url: "../login/login"
										})
									}, 300)
								} else {
									uni.showToast({
										title: msg,
										icon: "error"
									})
								}
							}
						)
				} else {
					uni.showToast({
						title: "输入框不能为空",
						icon: "error"
					})
				}
			},


			jumpIndex() {
				uni.switchTab({
					url: "../index/index"
				})
			},
		}
	}
</script>