<template>
	<view class="my-info">
		<view class="opt">
			<text class="label">账号:</text>
			<input class="inp" type="text" value="202410@qq.com" disabled="true">
		</view>
		
		<view class="opt">
			<text class="label">昵称:</text>
			<input class="inp" type="text" placeholder="请输入昵称" >
		</view>
		
		<view class="opt">
			<text class="label">年龄:</text>
			<input class="inp" type="text" placeholder="请输入年龄" >
		</view>
		
		<view class="opt">
			<text class="label">性别:</text>
			<input class="inp" type="text" placeholder="请输入性别" >
		</view>
		
		<view class="opt">
			<text class="label">电话:</text>
			<input class="inp" type="text" placeholder="请输入电话" >
		</view>
		
		<view class="opt">
			<text class="label">地址:</text>
			<input class="inp" type="text" placeholder="请输入地址" >
		</view>
		
		<view class="opt opt-1">
			<button class="btn btn-1">编辑</button>
			<button class="btn btn-2">保存</button>
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
			
		}
	}
</script>

<style lang="less">
@import "../../static/common/variable.less";
.my-info {
	padding: 20rpx 30rpx;
	.opt {
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		.label {
			display: inline-block;
			width: 120rpx;
			height: 80rpx;
			line-height: 80rpx;
			background-color: @color;
			color: #fff;
			text-align: center;
		}
		.inp {
			width: calc(100% - 130px);
			height: 80rpx;
			padding-left: 10rpx;
			border-bottom: 1px solid  @color;
		}
	}
	.opt-1 {
		.btn {
			margin: 0;
			font-size: 16px;
			font-size: 16px;
		}
		.btn-2 {
			margin-left: 20rpx;
			border: 1px solid @color;
			color: @color;
		}
		.btn-1 {
			border: 1px solid #f00;
			color: #f00;
		}
		
	}
}
</style>
