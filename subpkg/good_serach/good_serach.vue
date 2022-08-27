<template>
	<view class="search-view">
		<view class="search-box">
			<uni-search-bar :radius="100"  cancelButton="none" @input="input" ></uni-search-bar>
		</view>
		<!-- 推荐列表 -->
		<view class="recommend-view" v-if="recommendList.length!==0">
			<view class="recommend-view-item" v-for="(item) in recommendList" :key="item.goods_id" @click="togoodDetail(item.goods_id)">
				<text class="goods-name">{{item.goods_name}}</text>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="recommend-history" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-content">
				<uni-tag :text="item" class="history-content-item" v-for="(item,i) in getSearchHistory" :key="i" @click="gotoGoodsList(item)">
				</uni-tag>
				
			</view>
		</view>
	</view>
	
</template>

<script>
	import {debounce} from'./@/utils/util.js'
	export default {
		computed:{
			getSearchHistory(){
				return [...this.searchHistory].reverse()
			}
		},
		data() {
			return {
				inputValue:'',
				searchHistory:[],
				recommendList:[]
			}
		},
		onLoad() {
			// 如果本地没有数据则给数组[]
			this.searchHistory = JSON.parse(uni.getStorageSync('searchHistory')|| '[]') 
		},
		methods: {
			input:debounce(function({value}){
				this.inputValue = value;
				this.getRecommendList(value)
				},500),
			async getRecommendList(value){
				if(value === ''){
					this.recommendList = []
					return;
				}
				let { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', {query:value})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.recommendList = res.message
				// 如果成功则保存搜索记录
				this.saveSearchHistory(value)
			},
			togoodDetail(goods_id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?good_id=?'+goods_id
				})
				this.recommendList = []
			},
			saveSearchHistory(value){
				console.log(value)
				let set = new Set(this.searchHistory)
				set.delete(value)
				set.add(value)
				this.searchHistory = Array.from(set)
				// 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
				uni.setStorageSync('searchHistory', JSON.stringify(this.searchHistory))
			},
			clearHistory(){
				this.searchHistory = [];
				uni.setStorageSync('searchHistory','[]')
			},
			// 点击跳转到商品列表页面
			gotoGoodsList(item) {
			  uni.navigateTo({
			    url: '/subpkg/goods_list/goods_list?query=' + item
			  })
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		background-color: #c00000;
	}	
	/deep/ .uni-searchbar[data-v-64ee3838] {
		background-color: #c00000;
	}
	.recommend-history {
		padding: 0 10rpx;
	}
	.recommend-view-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		padding: 13rpx 2rpx;
		border-bottom: 1px solid #efefef;
		.goods-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.history-title {
		display: flex;
		justify-content: space-between;
		padding: 15rpx 10rpx;
		border-bottom: 1px solid #efefef;
	}
	.history-content {
		display: flex;
		flex-wrap: wrap;
		.uni-tag {
		  margin-top: 5px;
		  margin-right: 5px;
		}
	}
	
	
</style>
