<style lang="less">
	@import '../../static/common/variable.less';

	.score {
		// 20rpx = 10px   30rpx = 15px
		padding: 20rpx 30rpx;

		.title {
			font-weight: 700;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 18px;
		}

		.opt {
			width: 100%;
			display: flex;
			height: 80rpx;
			margin-top: 20rpx;

			.label {
				display: block;
				width: 200rpx;
				font-weight: 700;
			}
		}

		.opt-1 {
			position: fixed;
			bottom: 50rpx;
			left: 0;
			width: 100%;
			text-align: center;
			color: #666;
			text-decoration: underline;
		}
	}
</style>
<template>
	<view class="score">
		<view class="title">试卷: {{name}}</view>
		<view class="opt">
			<text class="label">昵称:</text>
			<text>{{nickName}}</text>
		</view>
		<view class="opt">
			<text class="label">成绩:</text>
			<text>{{score}}分</text>
		</view>
		<view class="opt">
			<text class="label">是否及格:</text>
			<text>{{passText}}</text>
		</view>
		<view class="opt">
			<text class="label">答对:</text>
			<text>{{right}}</text>
		</view>
		<view class="opt">
			<text class="label">答错:</text>
			<text>{{wrong}}</text>
		</view>
		<view class="opt">
			<text class="label">用了多久:</text>
			<text>{{message}}</text>
		</view>
		<view class="opt-1">
			<text @click="jumpTo">跳转首页</text>
		</view>
	</view>
</template>

<script>
	// 导入格式化时间的工具函数
	import { formatime } from '../../static/common/common'
	export default {
		data() {
			return {
				score: 0,
				right: 0,
				wrong: 0,
				time: 0,
				nickName: "",
				name: "",
				message:"00:00:00",
				passText: ""
			}
		},
		// 初始化函数
		onLoad(options) {
			this.score = options.score;
			this.right = options.right;
			this.wrong = options.wrong;
			this.time = options.stime;
			this.nickName = options.nickName;
			this.name = options.name;
			this.passText = options.passText;
			if(this.time){
				this.message = formatime(this.time)
			}
		},

		methods: {
			// 跳转首页
			jumpTo() {
				// 因为 ../index/index 这个页面在pages.json中做了tabBar的配置
				// 所以不能使用 navigator 做跳转
				uni.switchTab({
					url: '../index/index'
				})
			}
		}
	}
</script>