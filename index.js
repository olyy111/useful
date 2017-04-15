var express = require("express")
var app = express();
app.use(express.static("static")) //静态文件托管
app.get("/", function (req, res){
	console.log(1)
	res.sendFile(__dirname + "/static/html/index.html") 
	//这里是把文件转化成数据发送出去， 并不是静态文件， 而是入口文件，这个入口文件需要路由去处理请求
})
app.listen(9999, " 192.168.1.100", function (){
	console.log('服务已经开启')
})
