<template>
	<view class="index" v-if="!isSearch">
		 <!-- 搜索框 -->
		 <view class="search">
			  <input v-model="inpText" class="inp" type="text" placeholder="请输入关键字">
			  <button @click="addSearch" class="btn">搜索</button>
		 </view>
		 
		 <!-- 轮播图 -->
		 <swiper 
		  :indicator-dots="true" 
		  :autoplay="false"
		  :interval="3000" 
		  :duration="1000"
		  :circular="true"
		   style="height: 170px;" 
		  >
		 	<swiper-item v-for="item in banners">
		 		<view class="swiper-item">
					<image 
					style="width: 100%;"
					:src="item.imgUrl" mode="widthFix"></image>
				</view>
		 	</swiper-item>
		 </swiper>
		 
		 <!-- 导航-->
		 <view class="category">
			 <view  v-for="item in categorys" class="opt">
				 <!-- 链接组件 -->
				 <navigator :url="`../category/category?id=${item.id}`">
					  <image class="img" 
					  :src="item.icon" 
					  mode="widthFix" ></image>
					  <view class="text">{{item.text}}</view>
				 </navigator>
			 </view>
		 </view>
		 
		 <!-- 试卷列表 -->
		 <view class="list">
			  <view class="title">试卷列表</view>
			  <view class="content">
				   <view class="ul">
					    <view class="li" v-for="(item,i) in lists">
							<navigator 
							class="a" 
							:url="`/pages/testpaper/testpaper?eid=${item.eid}`">
								[{{i + 1}}] {{item.name}}
							</navigator>
						</view>
				   </view>
			  </view>
		 </view>
	</view>
	<view class="index" v-if="isSearch">
		<!-- 试卷列表 -->
		<view class="list">
			  <view class="title">搜索列表</view>
			  <view class="content">
				   <view class="ul" v-if="arr.length != 0">
						<view class="li" v-for="(item,i) in arr">
							<navigator 
							class="a" 
							:url="`/pages/testpaper/testpaper?eid=${item.eid}`">
								[{{i + 1}}] {{item.name}}
							</navigator>
						</view>
				   </view>
				   <view v-else style="margin: 50rpx 0; text-align: center;">
						<text>暂无搜索列表~~</text>
				   </view>
			  </view>
			  <view style="margin: 50rpx 0; text-align: center; color: #ccc;">
				  <text @click="closeSearch">关闭搜索</text>
			  </view>
		</view>
	</view>
</template>

<script>
	// 导入网络请求API
	import {indexSearch, getIndexList , getCategory , getBannerList,url } from '../../api/index'
	
	export default {
		data() {
			return {
				//记录轮播图
				banners: [],
				// 记录分类列表
				categorys: [],
				// 记录试卷列表
				lists: [],
				isSearch: false,
				arr: [],
				// 记录输入框的值
				inpText: ""
			}
		},
		// 初始化页面
		onLoad() {
			this.getBannerListFn();
			this.getCategoryFn();
			this.getIndexListFn(1,10);
		},
		methods: {
			//获取轮播图列表的方法
			async getBannerListFn (){
				await getBannerList() 
				.then(
				    content=> {
						let {code , result} = content;
						// console.log(result);
						if(code == 200) {
							//循环数组
							let arr = result.map(item=> {
								return {
									imgUrl: url+item.imgUrl
								}
							})
							// 赋值
							this.banners = arr;
						}
					}
				)
			},
			
			//获取分类列表的方法
			async getCategoryFn (){
				await getCategory() 
				.then(
				    content=> {
						let {code , result} = content;
						// console.log(result);
						if(code == 200) {
							//循环数组
							let arr = result.map(item=> {
								item.icon = url+item.icon;//拼接图片路径的意思
								return item 
							})
							// 赋值
							this.categorys = arr;
						}
					}
				)
			},
			
			//获取主页试卷列表的方法
			async getIndexListFn (page, pageSize){
				await getIndexList({page, pageSize}) 
				.then(
				    content=> {
						let {code , result} = content;
						console.log(result);
						if(code == 200) {
							//循环数组
							let arr = result.map(item=> {
								// item.icon = url+item.icon;//拼接图片路径的意思
								return item 
							})
							// 赋值
							this.lists = arr;
						}
					}
				)
			},
			
			//获取关键搜索的结果
			async indexSearchFn (keyword){
				if(keyword.length == 0) {
					uni.showToast({
						title: "输入框不能为空",
						icon:"none"
					})
					return false;
				}
				
				await indexSearch({keyword}) 
				.then(
				    content=> {
						// 控制搜索列表显示
						this.isSearch = true;
						let {code , result} = content;
						console.log("查询结果:",result);
						if(code == 200) {
							//循环数组
							let arr = result.map(item=> {
								return item 
							})
							// 赋值
							this.arr = arr;
						}
					}
				)
			},
			
			// 编写点击“搜索”按钮的方法
			addSearch(){
				let keyword = this.inpText;
				this.indexSearchFn(keyword)
			},
			
			// 关闭搜索
			closeSearch(){
				this.isSearch = false;
				this.arr = [];
				this.inpText = "";
			}
			
			
		}
	}
</script>

<style lang="less">
	@import "../../static/common/variable.less";
	
	.index {
		// 1rpx = 0.5px
	    // 30rpx = 15px
		padding: 0 30rpx;
		.search {
			width: 100%;
			// 改变盒子大小计算方式的属性 (不让内边距车撑开大小)
			box-sizing: border-box;
			display: flex;
			padding: 20rpx 0;
			.inp {
				border: 1px solid @color;
				width: calc(100% - 140rpx);
				// flex-grow: 1;
				height: 80rpx;
				box-sizing: border-box;
				padding-left: 30rpx;
				font-size: 16px;
				border-bottom-left-radius: 40rpx;
				border-top-left-radius: 40rpx;
			}
			.btn {
				width: 140rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 15px;
				box-sizing: border-box;
				border-radius: 0;
				background-color: @color;
				color: #fff;
				border-bottom-right-radius: 40rpx;
				border-top-right-radius: 40rpx;
			}
		}
	
		.category{
			width: 100%;
			display: grid;
			grid-template-rows: repeat(2,auto);
			grid-template-columns: repeat(4,1fr);
			row-gap: 10rpx;
			column-gap: 10rpx;
			margin-top: 15rpx;
			.opt {
				// border: 1px solid #ccc;
				text-align: center;
				padding: 10rpx;
				.img {
					width: 80rpx;
				}
				.text {
					font-size: 14px;
					color: #333;
				}
			}
		}
	
		.list {
			.title {
				margin-top: 15rpx;
				font-weight: 700;
				font-size: 16px;
			}
			.content {
				margin-top: 15rpx;
				.ul {
					 .li {
						 .a {
							 display: block;
							 padding: 20rpx 15rpx;
							 border-bottom: 1px dashed #ccc;
							 margin-top: 30rpx;
						 }
					 }
				}
			}
		}
	}
</style>
