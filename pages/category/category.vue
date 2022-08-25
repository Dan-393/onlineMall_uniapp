<template>
	<view class="cate-content">
		<!-- 左边选项区域 -->
		<view class="cate-left">
			<scroll-view scroll-y="true" class="scroll-Y" :style="{height:getWindowHeighth+'px'}" >
				<view :class="['cate-left-item', activeCateIndex === i?'active':'']" v-for="(item,i) in cateList" :key="item.cat_id" @click="getCate(i)">
					{{item.cat_name}}
				</view>
			</scroll-view>
		</view>
		<view class="cate-right">
			<scroll-view scroll-y="true" :style="{height:getWindowHeighth+'px'}" :scroll-top="scrollTop">
				<view class="cate-right-item" v-for="(item,i) in rightCateContent" :key="i">
					<view class="cate-second">
						{{item.cat_name}}
					</view>
					<view class="cate-third">
						<view class="cate-third-item" v-for="(item,i) in item.children" :key="i" @click="togoodList(item.cat_id)">
							<image :src="item.cat_icon" mode="widthFix"></image>
							<text>{{item.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
	
<script>
	export default {
		computed:{
			// uiapp中可以通过接口uni.getSystemInfo，获得使用的手机的信息，以及可视窗口，可用窗口的width
			getWindowHeighth(){
				let height = 0;
				uni.getSystemInfo({
					success: function (res) {
							height =  res.windowHeight;
					}
				})
				return height;
			}
		},
		data() {
			return {
				cateList:[],
				activeCateIndex:0,
				rightCateContent:[],
				// 距离顶部的位置
				scrollTop: 0,
				
				
			};
		},
		onLoad() {
			this.getCateList()
		},
		methods:{
			async getCateList(){
				let {data: res} = await uni.$http.get('/api/public/v1/categories')
				// 判断是否获取失败
				if (res.meta.status !== 200) return uni.$showMsg()
				// 转存数据
				this.cateList = res.message;
				this.rightCateContent = this.cateList[0].children;
			},
			getCate(index){
				// 获得用户点击左侧列表的哪个的索引
				this.activeCateIndex = index;
				this.rightCateContent = this.cateList[this.activeCateIndex].children;
				console.log(this.rightCateContent)
				// 动态给scroll-top赋值
				this.scrollTop = this.scrollTop === 0 ? -1:0;
			},
			togoodList(goodId){
				uni.navigateTo({
					url:`.//subpkg/goods_list/goods_list?cid=${goodId}`
				})
			}
		},
		
	}
</script>

<style lang="scss">
	.cate-content{
		display: flex;
	}
	.cate-left {
		width: 25%;
		.cate-left-item {
			line-height: 100rpx;
			background-color: #f7f6f7;
			text-align: center;
			display: block;
			font-size: 26rpx;
			// 同个元素下&
			&.active{
				background-color: #fefefe;
				position: relative;
				&::before {
					content: '';
					display: block;
					width: 5rpx;
					height: 50rpx;
					background-color:#ab0000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
	.cate-right {
		width: 75%;
		
		.cate-second {
			text-align: center;
			font-weight: 700;
			margin: 15rpx;
			background-color:#fefefe
		}
			
		.cate-third {
			display: flex;
			flex-wrap: wrap;
		}
		.cate-third-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 24rpx;
			margin: 15rpx 0;
			image{
				width: 140rpx;
				height: 140rpx;
			}
		}
	}
		
	
</style>
