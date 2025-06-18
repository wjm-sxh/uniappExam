<style lang="less">
	@import '../../static/common/variable.less';
	.my {
		padding: 20rpx 30rpx;
		.user-image {
			width: 200rpx;
			height: 200rpx;
			background-color: #f0f0f0;
			text-align: center;
			line-height: 200rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			.img {
				width: 160rpx;
				height: 160rpx;
				vertical-align: middle;
			}
		}
		.link {
			display: block;
		}
		.user-name , .user-createAt , .link{
			margin-top: 10rpx;
			padding: 10rpx 0;
		}
		.content {
			margin-top: 20rpx;
			.opt {
				margin-bottom: 20rpx;
				.btn {
					// background-color: transparent;
					background-color: #f5f5f5;
					border: 0px solid transparent;
					border-bottom: 1px solid #ccc;
					border-radius: 0;
					text-align: left;
					margin-top: 20rpx;
					color: #666;
					&::after {
						border: 0px solid transparent;
						border-radius: 0;
					}
				}
			}
		}
	}
	.mask {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		padding: 40rpx;
		border: 1px solid @color;
		width: 60%;
		border-radius: 10rpx;
		.box {
			.opt {
				padding: 10rpx 10px;
				.label {
					color: @color;
				}
			}
			.opt-1 {
				text-align: center;
				.txt {
					margin-top: 20rpx;
					border: 1px solid @color;
					color: @color;
					padding: 10rpx 20rpx;
					border-radius: 10rpx;
					display: inline-block;
					font-size: 14px;
				}
			}
		}
	}
</style>
<template>
	<view class="my">
		<view class="user-image">
			<image 
			:src="this.user.imgUrl ? this.user.imgUrl: '../../static/i_my.png'" 
			mode="widthFix"
			style="width: 160rpx;"
			class="img"
			></image>
		</view>
		
		<view v-if="isLogin">
			<view class="user-name">
				<text>昵称: </text>
				<text>{{this.user.nickName}}</text>
			</view>
			<view class="user-createAt">
				<text>注册时间: </text>
				<text>{{this.user.createAt}}</text>
			</view>
		</view>
		
		<view v-else>
			<navigator url="../login/login" class="link">
				未登录，请先登录
			</navigator>
		</view>
		
		
		<view class="content">
			<view class="opt">
				<button  class="btn" @click="jumpScoreList">我的考试</button>
				<button  class="btn" @click="jumpMyInfo">我的资料</button>
				<button  class="btn" @click="jumpSetting">账号设置</button>
				<button  class="btn" @click="showAbout">联系我们</button>
			</view>
		</view>
	</view>
	
	<!-- 联系方式 -->
	<view class="mask" v-if="isShow">
		<view class="box">
			<view class="opt">
				<text class="label">微信: </text>
				<text>183888888888</text>
			</view>
			<view class="opt">
				<text class="label">邮箱: </text>
				<text>12188888@qq.com</text>
			</view>
			<view class="opt opt-1">
				<text class="txt" @click="hideAbout">
					关闭
				</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	// 导入网络请求API
	import { getUserInfo,isLogin , url} from '../../api/index'
	
	
	
	export default {
		data() {
			return {
				isShow: false, // 默认 隐藏联系方式
				isLogin: false, // 判断用户是否登录
				user: {}
			}
		},
		
		// 初始化函数
		created(){
		
		},
		onShow() {
			// 只要页面一显示 就重新获取数据
			this.isLoginFn();
			this.getUserInfoFn();
		},
		
		
		
		methods: {
			// 判断用户是否登录（没有登录就跳转登录页）
			async	isLoginFn(){
				let token = uni.getStorageSync("ABCTOKEN")
				if(token){
					await isLogin({token})
					.then(
						content=> {
							let {code,msg} = content;
							if(code == 200) {
								console.log("online ..")
								this.isLogin = true;
							}
							else {
								uni.showToast({
									title:msg,
									icon:"none"
								})
							}
						}
					)
				}
				else {
					uni.showToast({
						title:"您还没登录~",
						icon:"none"
					})
				}
			},
			
			
			//用户详情信息（昵称，账号，头像
			async getUserInfoFn(){
				let token = uni.getStorageSync("ABCTOKEN")
				if(token) {
					await getUserInfo({token})
					.then( 
						content=>{
							// console.log(content)
							let {code , msg , result} = content;
							if(code == 200) {
								// 数据的整合
								let obj = result[0];
								this.user.imgUrl = url+obj.imgUrl//用户头像
								this.user.nickName = obj.nickName;//用户昵称
								let date = new Date()
								date.setTime(obj.createAt);
								let d = date.toLocaleDateString();
								let t = date.toLocaleTimeString();
								this.user.createAt = `${d} ${t}`;// 格式2020/10/31 12:30:59 用户注册时间
							}
						}
					)
				}
				
			},
			// 点击显示 联系我们
			showAbout(){
				this.isShow = true;
			},
			// 点击隐藏 联系我们
			hideAbout(){
				this.isShow = false;
			},
			// 跳转我的成绩
			jumpScoreList(){
				// uni.redirectTo({
				// 	url:"../myscore/myscore"
				// })
				uni.navigateTo({
					url:"../myscore/myscore"
				})
				
			},
			// 跳转我的资料
			jumpMyInfo(){
				// 跳转后没有返回箭头
				// uni.redirectTo({
				// 	url:"../myinfo/myinfo"
				// })
				
				// 跳转后有返回箭头
				uni.navigateTo({
					url:"../myinfo/myinfo"
				})
			},
			// 跳转账号设置
			jumpSetting(){
				// uni.redirectTo({
				// 	url:"../setting/setting"
				// })
				
				uni.navigateTo({
					url:"../setting/setting"
				})
			},
		}
	}
</script>
