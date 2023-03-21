function getOrderNum(data){
	const projectTime = new Date() // 当前中国标准时间
	const Year = projectTime.getFullYear()// 获取当前年份 支持IE和火狐浏览器.
	const str = JSON.stringify(Year)
	const YearLast = str.substr(-2)
	const Month = projectTime.getMonth() + 1 // 获取中国区月份
	const Day = projectTime.getDate() // 获取几号
	const Time = projectTime.getTime()
	const str2 = JSON.stringify(Time)
	const TimeLast = str2.substr(-4)
	
	var CurrentDate = YearLast
	if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
	  CurrentDate += Month
	} else {
	  CurrentDate += '0' + Month
	}
	if (Day >= 10) {
	  CurrentDate += Day
	} else {
	  CurrentDate += '0' + Day
	}
	return CurrentDate += TimeLast
    console.log(data)
}
export default {
	    getOrderNum
}