<template>
	<view class="category">
		<view class="left">
			<view class="ul">
				<view 
				v-for="(item,index) in categorys"
				:class="['li', index == num ?'active':'']" 
				@click="chooseCategory(index, item.id)"
				>
					 {{item.text}}
				</view>
			</view>
		</view>
		<view class="right">
			 <view class="content" v-if="exams.length != 0">
				 <view class="opt" v-for="item in exams">
					 <navigator :url="`../testpaper/testpaper?eid=${item.eid}`">
						 <view class="title">试卷: {{item.name}}</view>
						 <view class="text">
							 <text>满分: {{item.total}}</text>
							 
							 <text class="ml-20">及格线: {{item.passline}}</text>
						 </view>
					 </navigator>
				 </view>
			 </view>
			 <view class="content" v-else> 
				 <view 
				 style="padding: 30rpx 0; text-align: center; color: #666;">
				 暂无对应的试卷~~
				 </view>
			 </view>
		</view>
	</view>
</template>

<script>
	// 导入网络请求接口
	import { getCategory , getEaxmList } from '../../api/index'
	
	export default {
		// 存储程序所需的数据
		data() {
			return {
				num: 0, // 控制左侧栏点击背景高亮
				categorys: [],//分类列表的数组
				exams: [] //试卷列表的数组
			}
		},
		
		// 初始化
		onLoad(options){
			this.getCategoryFn();
			if(options.id) {
				this.getEaxmListFn(options.id)
			}
		},
		
		
		// 编写业务逻辑的
		methods: {
			// 编写获取试卷列表的方法
			async getEaxmListFn(id){
				await getEaxmList({id})
				.then(
				  content=> {
					  let {code, result} = content;
					  // console.log("检查：",result);
					  if(code == 200) {
						  this.exams = result;
					  }
				  }
				)
				
				// 设置左侧栏菜单背景高亮
				for(let i = 0 ; i < this.categorys.length ; i ++){
					if(id == this.categorys[i].id){
						this.num = i;//设置左侧栏菜单索引
						break;//跳出循环
					}
				}
			},
			
			// 获取分类列表的方法
			async getCategoryFn(){
				await getCategory()
				.then(
					content=>{
						let {code, result} = content;//取值
						// console.log(result)
						if(code == 200) {
							this.categorys = result;
						}
					}
				)
			},
			
			// 切换分类
			chooseCategory(index,id){
				this.num = index;
				if(id){
					// 点击获取试卷列表
					this.getEaxmListFn(id);
				}
			},
		}
	}
</script>

<style lang="less">
@import "../../static/common/variable.less";
.category {
	width: 100%;
	display: flex;
	.left {
		width: 200rpx;
		background-color: #f0f0f0;
		min-height: 1400rpx;
		.ul {
			.li {
				width: 100%;
				// 1rpx = 0.5px
				// 90rpx = 45px
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				border-bottom: 1px solid #ccc;
				&.active {
					background-color: @color;
					color: #fff;
				}
			}
		}
	}
	.right {
		width: calc(100% - 200rpx);
		height: 1400rpx;
		background-color: #fbf5f5;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		.content {
			.opt {
				width: 100%;
				background-color: #fff;
				margin-bottom: 20rpx;
				padding: 20rpx  10rpx;
				box-sizing: border-box;
				.title {
					font-size: 16px;
				}
				.text {
					font-size: 14px;
					margin-top: 18rpx;
					color: #666;
					.ml-20 {
						margin-left: 20rpx;
					}
				}
			}
		}
	}
}

</style>
