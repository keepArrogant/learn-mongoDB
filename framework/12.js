// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();

app.get('/index/:id/:name/:age', (req, res) => {
    // 接收get请求来的参数并显示到页面上
    res.send(req.params); //{"id":"123","name":"谢合鑫","age":"22"}
})

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');