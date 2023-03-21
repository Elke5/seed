 function getDiffDay(data) {
                // 计算两个日期之间的差值
                const time = data
				const str = time.split('至')
				const data_1 = str[0]
				// console.log(data_1)
				const data_2 = str[1]
				// console.log(data_2)
                const myDate_1 = Date.parse(data_1)
                const myDate_2 = Date.parse(data_2)
                // 将两个日期都转换为毫秒格式，然后做差
                const diffDate = Math.abs(myDate_1 - myDate_2) // 取相差毫秒数的绝对值
                const totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) + 1 // 向下取整
				const total = JSON.stringify(totalDays)
                // console.log(total)    
                return total // 相差的天数
            }
			
export default {
	    getDiffDay,
}
