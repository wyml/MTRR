import request from './request';

const http = new request();
http.setConfig((config) => {
	config.baseUrl = 'https://rss.kingsr.cc';
	config.header = {
		...config.header,
		Authorization: uni.getStorageSync('token') || null,
	}
	return config;
});

const uploadRssList = async function() {
	function upload() {
		return new Promise((resolve, reject) => {
			let list = JSON.parse(uni.getStorageSync('rsslist'));
			http.post("/member/uploadRss", {
					rsslist: list
				})
				.then(res => {
					resolve(res);
				})
				.catch(res => {
					reject(res);
				})
		})
	}
	return await upload();
}

export {
	http,
	uploadRssList
}
