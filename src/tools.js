const axios = require('axios');

module.exports={
    async sendObj (url, data, eventFunc, errorFunc) {
		await axios ({
			method: "post",
			dataType: "json",
			url: url,
			data: data,
		}).then ((response)=>{
			if (response.data.status === "success") {
				try {
					if (window.main.$route.path === response.data.type) {
						console.log("type对1",window.main.$route.path,response.data.type)
						eventFunc (response.data);
					}
				} catch (err){
					console.log("path1",window.main.$route.path, err);
					console.log("path2",response.data);
				}
			} else if (response.data.status === "loss_authority") {
				// 失去权限，跳转到cas登录页面
				if (!locationMutex) {
					locationMutex = true;
					window.location = response.data.home_location;
				}
				return
			} else if (response.data.status === "fail") {
				try {
					if (window.main.$route.path === response.data.type) {
						console.log("type对2",window.main.$route.path,response.data.type)
						errorFunc (response.data);
					}
				} catch (err){
					console.log("path1",window.main.$route.path, err);
					console.log("path2",response.data);
				}
			} else {
				console.log ("服务器错误：", response.data)
				console.log (JSON.parse (response.data))
			}
		})
    },
    timestampToTime(timestamp) {
		var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y+M+D+h+m+s;
	},
}