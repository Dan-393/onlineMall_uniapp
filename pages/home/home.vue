<template>
	<view>
		<!-- 搜索栏 -->
		<view class='search-style'>
			<search-view  @clickSearch = "toSearchView"></search-view>
		</view>
		<!-- 轮播图 -->
		<swiper circular :indicator-dots="indicatorDots" :autoplay="autoplay">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id'+item.goods_id">
				      <!-- 动态绑定图片的 src 属性 -->
				      <image :src="item.image_src"></image>
				    </navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="cate-tab">
			<view class="cate-tab-item" v-for="(item,i) in cateList" :key="i" @click="navTabHandler(item)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层各种类显示 -->
		<view class="floor-select" v-for="(item,i) in floorList" :key="i">
			<view class="floor-title">
				<image :src="item.floor_title.image_src" mode="widthFix"></image>
			</view>
			<view class="product-list" >
				<navigator class="product-left"  :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix" ></image>
				</navigator> 
				<view class="product-right" >
					<navigator class="product-right-item" v-for="(item,i) in item.product_list" :key="i" :url="item.url">
						<block v-if="i !== 0">
							<image :src="item.image_src" :style="{width:item.image_width+'rpx'}" mode="widthFix"  ></image>
						</block>	
					</navigator> 
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList:[],
				// 轮播图配置
				indicatorDots:true,
				autoplay: true,
				// 分类导航
				cateList:[],
				// 楼层的数据列表
				floorList: [],
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getCateList()
			this.getFloorList()
		},
		methods:{
			// 请求轮播图数据
			async getSwiperList(){
				const{data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				this.swiperList = res.message
			},
			// 分类导航的数据
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
			},
			 // 定义获取楼层列表数据的方法
			async getFloorList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 返回的navigator_url属性的值 与实际项目不同，需要进行切割
				res.message.forEach(floor =>{
					floor.product_list.forEach(product=>{
						product.url = '/subpkg/goods_list/goods_list?'+product.navigator_url.split("?")[1]
					})
				})
				this.floorList = res.message
			},
			// 点击分类导航跳转
			navTabHandler(item){
				if(item.name === '分类'){
					uni.switchTab({
						url:'/pages/category/category'
					})
				}
			},
			// 跳到搜索页面
			toSearchView(){
				uni.navigateTo({
					url:'/subpkg/good_serach/good_serach'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-style {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper{
		height: 330rpx;
		.swiper-item {
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.cate-tab {
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;
		.cate-tab-item {
			image {
				width: 135rpx;
				height: 135rpx;
			}
		}
	}
	.floor-title {
		image {
			width: 100%;
			height: 50rpx;
		}
	}
	.product-list {
		display: flex;
		justify-content: space-around;
		padding-left: 10rpx;
		.product-right {
			display: flex;
			flex-wrap:wrap;
			justify-content: space-around;
		}
	}
	
</style>
