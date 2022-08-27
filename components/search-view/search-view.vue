<template>
	<view class="search-container" :style="{'background-color':bgc}">
		<view class="search-box" @click="clickHandler" :style="{'border-radius':radius+'rpx'}">
			<icon type="search" size="18"/>
			<text class="placeholder">请输入搜索内容</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search-view",
		props:{
			bgc:{
				type:String,
				default:'#c00000'
			},
			radius:{
				type:Number,
				default:20
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			clickHandler(){
				this.$emit('clickSearch')
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		height: 100rpx;
		padding: 0 13rpx;
		.search-box {
			width: 100%;
			height: 80rpx;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			.placeholder {
			    font-size: 28rpx;
			    margin-left: 20rpx;
				color: #c3c3c3;
			  }
		}
		
	}
</style>