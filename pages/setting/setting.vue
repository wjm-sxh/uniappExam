<template>
	<view class="setting">
		 <view class="opt">
			  <button @click="jumpSetpwd" class="btn btn-1">设置密码</button>
		 </view>
		 <view class="opt">
		 	  <button @click="removeUser" class="btn btn-2">注销账号</button>
		 </view>
		 <view class="opt">
		 	  <button @click="logout" class="btn btn-3">退出登录</button>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 跳转设置密码
			jumpSetpwd (){
				uni.navigateTo({
					url:"../setpwd/setpwd"
				})
			},
			// 注销账号
			removeUser(){
				uni.showModal({
					title: "提示",
					content:"您还要删除账号?",
					success() {
						
					},
					fail() {
						
					}
				})
			},
			// 退出登录
			logout(){
				uni.showModal({
					title:"提示",
					content:"您要退出登录?",
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.removeStorageSync("ABCTOKEN")
							uni.removeStorageSync("ABCNICKNAME")
							uni.redirectTo({
								url:"../login/login"
							})
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
					
					fail(){}
				})
			}
		}
	}
</script>

<style lang="less">
@import "../../static/common/variable.less";
.setting {
	padding: 20rpx 30rpx;
	.opt {
		margin-top: 20rpx;
		.btn {
			background-color: #fff;
		}
		.btn-1 {
			border: 1px solid green;
			color: green;
		}
		.btn-2 {
			border: 1px solid #F00;
			color: #f00;
			
		}
		.btn-3 {
			border: 1px solid @color;
			color: @color;
		}
	}
}
</style>
