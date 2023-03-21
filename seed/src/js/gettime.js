function getTime(){
	const time = new Date()
	const Year = time.getFullYear()// 获取当前年份 支持IE和火狐浏览器.
	const Month = time.getMonth() + 1 // 获取中国区月份
	const Day = time.getDate() // 获取几号
	var hours = time.getHours(); //存储时
	var minutes = time.getMinutes(); //存储分
	var seconds = time.getSeconds(); //存储秒
	var CurrentDate = Year
	if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
	  CurrentDate += Month
	} else {
	  CurrentDate += '-0' + Month
	}
	if (Day >= 10) {
	  CurrentDate += '-' + Day
	} else {
	  CurrentDate += '-0' + Day
	}
	if (hours < 10) { // 判断月份和几号是否大于10或者小于10
	  hours = '0' + hours
	}
	if (minutes < 10) {
	  minutes = '0' + minutes
	}
	if (seconds < 10) {
	  seconds = '0' + seconds
	}
	return CurrentDate + '  ' + hours + ':' +minutes + ':' +seconds
}
export default {
	    getTime
}