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
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
