import Vue from 'vue'
import App from './App'

import { $http } from '@escook/request-miniprogram'

uni.$http = $http
$http.baseUrl = "https://api-hmugo-web.itheima.net"

$http.beforeRequest = function(options){
	uni.showLoading({
	    title: '数据加载中...',
	  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  wx.hideLoading()
}


// 在全局中封装提示方法
uni.$showMsg = function( title = '数据加载失败', duration = 1500){
	uni.showToast({
		title:title,
		duration:duration,
		icon:'none'
	})
}

Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
