<style lang="less">
	@import "../../static/common/variable.less";

	.test-paper {
		padding: 20rpx 30rpx;

		.title {
			height: 90rpx;
			line-height: 90rpx;
			font-weight: 700;
			font-size: 18px;
		}

		.opt {
			width: 100%;
			display: flex;

			.label {
				display: block;
				width: 160rpx;
				height: 80rpx;
				text-align: right;
				padding-left: 20rpx;
				font-weight: 700;
			}

			text:nth-child(2) {
				padding-left: 20rpx;
			}
		}
	}

	.footer {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 50rpx;

		.box {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
			box-sizing: border-box;

			.btn {
				margin-left: 0;
				margin-right: 0;
				background-color: transparent;
				height: 80rpx;
				line-height: 80rpx;
			}

			.btn-1 {
				border: 1px solid #f00;
				color: #f00;
			}

			.btn-2 {
				border: 1px solid @color;
				color: @color;
			}
		}
	}
</style>


<template>
	<view>
		<view class="test-paper">
			<view class="title">试卷: {{detail.name}}</view>
			<view class="opt">
				<text class="label">用户昵称: </text>
				<text>{{detail.nickName}}</text>
			</view>
			<view class="opt">
				<text class="label">考试时长:</text>
				<text>{{detail.time}}</text>
			</view>
			<view class="opt">
				<text class="label">总分:</text>
				<text>{{detail.total}}</text>
			</view>
			<view class="opt">
				<text class="label">及格线:</text>
				<text>{{detail.passline}}</text>
			</view>
			<view class="opt">
				<text class="label">题目数量:</text>
				<text>{{detail.num}}</text>
			</view>
			<view class="opt">
				<text class="label">题目类型:</text>
				<text>选择题</text>
			</view>
		</view>

		<view class="footer">
			<view class="box">
				<button @click="backTo" class="btn btn-1">返回</button>
				<button @click="jumpTo" class="btn btn-2">开始考试</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getExamDetail
	} from '../../api/index'
	
	import { formatime } from '../../static/common/common'

	// const formatime = (time) => {
	// 	let h = 0,
	// 	m = 0,
	// 	s = 0; //时分秒
	// 	h = Math.floor(time / 3600);
	// 	m = Math.floor(time % 3600 / 60);
	// 	s = Math.floor(time % 60);
	// 	h = h < 10 ? '0' + h : h;
	// 	m = m < 10 ? '0' + m : m;
	// 	s = s < 10 ? '0' + s : s;
	// 	return `${h}:${m}:${s}`
	// }


	// 脚本 
	export default {
		data() {
			return {
				detail: {}
			}
		},
		onLoad(options) {
			console.log(options)
			if (options.eid) {
				// 获取试卷详情
				this.getExamDetailFn(options.eid);
			}
		},


		methods: {
			//编写获取试卷详情的方法
			async getExamDetailFn(eid) {
				await getExamDetail({
						eid
					})
					.then(
						content => {
							console.log(content)
							let {
								code,
								msg,
								result
							} = content;
							if (code == 200) {
								// 详情
								let obj = result[0];
								this.detail.eid = obj.eid;
								this.detail.name = obj.name; //试卷名称
								this.detail.num = obj.num; //数量
								this.detail.passline = obj.passline; //及格线
								this.detail.total = obj.total; //总分
								this.detail.text = obj.text; //分类名称
								this.detail.seconds = obj.time * 60 * 60 //秒
								this.detail.time = formatime(obj.time * 60 * 60) //秒

								let nickName = uni.getStorageSync("ABCNICKNAME");
								this.detail.nickName = nickName;
							} else {
								uni.showToast({
									title: msg,
									icon: "none"
								})
							}
						}
					)
			},



			// 返回上一页
			backTo() {
				uni.navigateBack()
			},

			// 跳转考试
			jumpTo() {
				
				let url = `/pages/test/test?eid=${this.detail.eid}&name=${this.detail.name}&seconds=${this.detail.seconds}&passline=${this.detail.passline}`
				uni.redirectTo({
					url: url 
				})

				// uni.navigateTo({
				// 	url: `/pages/test/test?id=xxx`
				// })
			}
		}
	}
</script>