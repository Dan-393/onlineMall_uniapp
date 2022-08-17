<template>
	<view>
		<!-- 搜索栏 -->
		<!-- 轮播图 -->
		<swiper circular :indicator-dots="indicatorDots" :autoplay="autoplay">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
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
			};
		},
		onLoad() {
			this.getSwiperList()
		},
		methods:{
			// 请求轮播图数据
			async getSwiperList(){
				const{data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status !== 200){
					return uni.showToast({
						title:"请求数据失败",
						icon:'none'
					})
				}
				this.swiperList = res.message
			}
		},
		
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;
		swiper-item image {
			width: 100%;
			height: 100%;
		}
	}
	
</style>
