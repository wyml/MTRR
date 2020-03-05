import dayjs from 'dayjs';


function timeFormat(val) {
	let now = dayjs();
	let day1 = dayjs(val);

	let diff = {
		second: now.diff(day1, 'second'),
		minute: now.diff(day1, 'minute'),
		hour: now.diff(day1, 'hour'),
		day: now.diff(day1, 'day'),
		year: now.diff(day1, 'year'),
	}

	if (diff.second <= 60) {
		return diff.second + '秒前';
	} else if (diff.minute < 60) {
		return diff.minute + '分钟前';
	} else if (diff.hour < 24) {
		return diff.hour + '小时前';
	} else if (diff.day < 365) {
		return diff.day + '天前';
	} else {
		return diff.year + '年前';
	}
}


export {
	timeFormat
}
