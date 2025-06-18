<template>
	<view class="my-score">
		<view class="list" v-if="scores.length != 0">
			<view class="opt" v-for="item in scores">
				<navigator :url="`../socre/socre?score=${item.score}&right=${item.right2}&wrong=${item.wrong}&stime=${item.time}&nickName=${item.nickName}&name=${item.name}`">
					<view class="name">试卷: {{item.name}}</view>
					<view class="datetime">
						{{item.datetime}}
					</view>
				</navigator>
			</view>
		</view>
		<view v-else>
			<view class="msg">暂无考试成绩~~</view>
		</view>
	</view>
</template>

<script>
	import {
			getScoreList
		} from '../../api/index'
		
		
	const getCurrentDateTime = (time)=> {
		let dt = new Date()
		dt.setTime(time)
		let d = dt.toLocaleDateString();
		let t = dt.toLocaleTimeString();
		return `${d} ${t}`
	}
	
	
	export default {
		data() {
			return {
				scores: []
			}
		},
		
		// 初始化函数
		async onLoad(){
			let token = uni.getStorageSync("ABCTOKEN");
			if(token) {
				await  getScoreList({token})
				.then(
					content=> {
						console.log("列表:",content)
						let {code , result} = content;
						if(code == 200) {
							let arr = result.map(item=> {
								item.datetime = getCurrentDateTime(item.createAt);
								return item;
							})
							this.scores = arr;
						}
					}
				)
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
.my-score {
	padding: 20rpx 30rpx;
	.list {
		.opt {
			padding: 20rpx 0;
			border-bottom: 1px solid #f0f0f0;
			.name {
				font-weight: 700;
			}
			.datetime {
				margin-top: 14rpx;
				font-size: 15px;
			}
		}
	}
	
	.msg {
		width: 100%;
		text-align: center;
		padding: 30rpx 0;
		color: #666;
	}
}
</style>
