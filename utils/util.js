	/**
	 * 简单实现防抖方法
	 * @param fn 要防抖的函数
	 * @param delay 防抖的毫秒数
	 * @returns {Function}
	 */
export function debounce(fn,delay = 1000 ){
	let time = null;
	return function (){
		let args = arguments;
		if(time !== null){
			clearTimeout(time)
		}
		time = setTimeout(()=>{
			fn.apply(this,args)
		},delay)
	}
}