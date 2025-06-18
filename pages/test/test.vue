<style lang="less">
	@import '../../static/common/variable.less';
	.test {
		padding: 20rpx 30rpx;
		.title {
			// 80rpx = 40px
			height: 80rpx;
			line-height: 80rpx;
			font-weight: 700;
			font-size: 18px;
		}
		.user , .time {
			padding: 10rpx 10rpx;
		}
		.content {
			.opt {
				.question {
					padding: 14rpx 10rpx;
					font-weight: 700;
					line-height: 1.75;
				}
				.option {
					padding: 14rpx 30rpx;
					margin-bottom: 20rpx;
					margin-top: 20rpx;
					// transition: all .5s; 
					&.active {
						background-color: @color;
						color: #fff;
					}
				}
			}
		}
		.footer {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 50rpx;
			// z-index: 100;
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
			box-sizing: border-box;
			.btn {
				background-color: transparent;
				font-size: 16px;
			}
			.btn-1 {
				margin-right: 20rpx;
				border: 1px solid #f00;
				color: #f00;
			}	
			.btn-2 {
				border: 1px solid #0f0;
				color: #0f0;
			}
			.btn-3 {
				background-color: @color;
				color: #fff;
			}
			.left {
				display: flex;
			}
			
		}
	
	
		.show-list {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-content: flex-start;
			background-color: #f0f0f0;
			padding: 20rpx 0;
			margin-top: 30rpx;
			.circle {
				width: 60rpx;
				height: 40rpx;
				border: 1px solid #ccc;
				margin: 10rpx;
				text-align: center;
				line-height: 40rpx;
				background-color: #fff;
				font-size: 28rpx;
				&.active {
					background-color: @color;
					color: #fff;
				}
			}
		}
	}
	
</style>
<template>
	<view class="test">
		 <view class="title">试卷: {{name}}</view>
		 <!-- 
		 <view class="user">
			 <text>用户: </text>
			 <text>{{nickName}}</text>
		 </view>
		  -->
		 <view class="user">
			 <text>账号: </text>
			 <text>{{account}}</text>
		 </view>
		 <view class="time">
			 <text>倒计时: </text>
			 <text>{{message}}</text>
		 </view>
		 
		 <view class="time">
			 <text>数量: </text>
			 <text>{{this.topics.length}} / {{ this.index + 1}}</text>
		 </view>
		 
		 
		 <view class="content" style="margin-top: 20rpx;">
			 <!-- 有多少题目数量，就循环多少次， 每次渲染的是索引值对应的题目-->
			   <view class="opt" v-for="(obj, num) in topics">
				  <view v-if="index == num">
					  <!-- 题目文本 -->
					   <view class="question">[{{num + 1}}] {{obj.question}}</view>
					  					
						<!-- 题目选项 （A,B,C,D） -->
						<view  
						v-for="(item,j) in  obj.opt" 
						:class="['option',item.isSelect == true ?'active':'']"
						@click="addSelectFn(j)"
						>
							{{item.key}}. {{item.value}}
						</view>
				  </view>
			   </view>
		 </view>
		 <view class="footer">
			 <view class="left">
				  <button @click="prevFn" class="btn btn-1">上一题</button>
				  <button @click="nextFn" class="btn btn-2">下一题</button>
			 </view>
			 <view class="right">
				  <button class="btn btn-3" @click="addTest">提交</button>
			 </view>
		 </view>
		 
		 <!-- 给用户提示 哪些题目作答了  哪些题目没有作答 -->
		 <view class="show-list">
			  <view	
			  v-for="(item,index) in topics"
			  :class="['circle', item.isshow == true ? 'active':'']"
			  @click="chooseTopicFn(index)"
			  >
			  {{ index + 1}}
			  </view>
		 </view>
	</view>
</template>

<script>
	// 导入网络请求接口
	import {
		getTopicList,
		isLogin,
		addExamScore,
		getUserInfo
	} from '../../api/index'
	
	// 导入格式化时间的工具函数
	import { formatime } from '../../static/common/common'
	
	
	export default {
		data() {
			return {
				name: "",// 试卷名称
				seconds: 0,//总时间
				nickName: "",
				count: 0,// 倒数时间
				timer: null,
				message: "00:00:00",
				topics: [],// 记录当前这套试卷的题目
				index: 0, // 题目的索引值 （控制上一题 下一题）
				answerArray: [], //记录用户每次点击选择的答案
				isLogin: false,
				account: "",//用户账号
				passline: 0,// 及格线
			}
		},
		
		// 初始化
		onLoad(options){
			let {eid,name,seconds, passline} = options;
			let nickName = uni.getStorageSync("ABCNICKNAME");
			let token =  uni.getStorageSync("ABCTOKEN");
			if(passline) {
				this.passline = passline;
			}
			if(token) {
				isLogin({token})
				.then(
					content=> {
						console.log("账号登录状态:",content)
						let {code , msg} = content;
						if(code == 200) {
							this.isLogin = true;
						}
						else {
							uni.showToast({
								title:msg,
								icon:'none'
							})
						}
					}
				)
				
				getUserInfo({token})
				.then(
					content=> {
						// console.log("账号登录状态:",content)
						let {code , msg, result} = content;
						if(code == 200) {
							this.account = result && result[0].account;
						}
						else {
							uni.showToast({
								title:msg,
								icon:'none'
							})
						}
					}
				)
			}
			if(eid) {
				this.getTopicListFn(eid);
			}
			if(name) {
				this.name = name;
			}
			if(seconds) {
				this.seconds = seconds;// 总秒数
				this.count = seconds;//用于倒数的秒数
			}
			if(nickName){
				this.nickName = nickName;
			}
			// 直接开始倒计时
			this.downTime();
		},
		
		
		
		methods: {
			
			// 编写用户选择答案选项的逻辑
			addSelectFn(current){
				 if(!this.isLogin) {
					 uni.showToast({
					 	title:"请先登录再考试",
					 	icon:'none'
					 })
					 return false;
				 }
				// console.log({current})
				let topic = this.topics[this.index];
				//排他处理
				topic.opt.forEach(op=> {
					op.isSelect = undefined
				})
				// 用户点击的答案选项设置字体高亮
				topic.opt[current].isSelect = true;
				// 记录用户选择的答案
				let key = topic.opt[current].key;
				// console.log("选择:",key);
				// 通过数组来记录（因为有序的数据集合）
				this.answerArray[this.index] = key;
				// 提示这个题目已经作答
				this.topics[this.index].isshow = true;
			},
			
			// 控制显示上一道题目
			prevFn(){
				this.index --;
				if(this.index <=0 ) {
					this.index = 0;
				}
			},
			// 控制显示下一道题目
			nextFn(){
				this.index ++;
				if(this.index >= this.topics.length -1) {
					this.index = this.topics.length -1;
				}
			},
			
			
			// 获取试卷相关的题目列表
			async getTopicListFn(eid){
				await getTopicList({eid})
				.then(
					content=> {
						 let {code , result} = content;
						 // console.log("题目数据:",content)
						 if(code == 200) {
							 let arr = result.map((item,index)=>{
								 let obj = item;
								 obj.opt = JSON.parse(obj.opt);
								 return obj;
							 })
							 this.topics = arr;
						 }
					}
				)
			},
			
			// 倒计时...
			downTime(){
				if(!this.timer) {
					const init = ()=>{
						this.count -- ;
						this.message = formatime(this.count);
						if(this.count == 0) {
							// 停止执行定时器函数
							clearInterval(this.timer)
							uni.showModal({
								title: "考试结束!",
								content: "是否提交试卷~~",
								success(res){
									if(res.confirm) {
										
									}
								}
							})
						}
					}
					
					this.timer = setInterval(init,1000)
					init();// 立即执行倒数时间
				}
			},
			
			
			// 编写提交试卷的方法 （用户的考试成绩）
			async addTest(){
				// console.log(this.answerArray);
			   let len1 =	this.answerArray.length;// 用户选择的答案数量
			   let len2 = this.topics.length;// 试卷的题目总数量
			   if(len1 < len2) {
				   uni.showToast({
				   	title: "您还有题目没有作答~~",
					icon:'none'
				   })
				   return false;
			   }
			   
			   // 提示
			   uni.showLoading({
			   	 title:"正在统计成绩.."
			   })
			   
			   
			   // 统计分数 成绩
			   let score = 0;
			   let right_num = 0;
			   let wrong_num = 0;
			   
			   // 用户完成考试所花的时间
			   let stime = (this.seconds - 0) - this.count;
			   
			   let userTopics = this.answerArray;  // 用户选择答案的数组
			   let topics = this.topics;//后台的题目数组
			   
			   // 循环数组
			   for(let i = 0 ; i < topics.length ; i ++){
				   // 匹配答案
				   if(topics[i].answer === userTopics[i]) {
					   //答对
					   score += topics[i].score
					   right_num ++;
				   }
				   else {
					   wrong_num ++;
				   }
			   }
			   
			 
			   
			   // 添加成绩记录
			   let token = uni.getStorageSync("ABCTOKEN");
			   let nickName = uni.getStorageSync("ABCNICKNAME");
			   let arr = userTopics.map(item=> {return item});
			   let myanswer = JSON.stringify(arr);
			   let time = stime;
			   let account = this.account;
			   let name = this.name;
			   let passText ;
			   if(score >= (this.passline - 0)) {
				  passText = "是" 
			   }
			   else {
				   passText = "否" 
			   }
			   // let wrong = wrong_num;
			   // let right =  right_num;
			   // console.log({nickName,account,name,score:score,wrong:wrong_num, right:right_num ,myanswer,time,token})
			   await addExamScore({nickName,account,name,score:score,wrong:wrong_num, right:right_num ,myanswer,time,token})
			   .then(
					content=> {
						 console.log("提交结果:",content)
						 let {code , msg } = content;
						 if(code == 200) {
							 // 跳转成绩页面
							setTimeout(()=>{
								uni.hideLoading();
								uni.redirectTo({
									url: `/pages/socre/socre?score=${score}&right=${right_num}&wrong=${wrong_num}&stime=${stime}&nickName=${nickName}&name=${name}&passText=${passText}`
								})
							},1000)
						 }
						 else {
							 uni.showToast({
							 	title: msg,
								icon: 'error'
							 })
						 }
					}
			   )
			},
			// 通过底部的“数字” 选择题目
			chooseTopicFn(value){
				this.index = value;
			},
		}
	}
</script>

