// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();

app.get('/request', (req, res, next) => {
    req.name = "张三";
    // 默认情况下，一旦获取到了相同的路由 执行头一个，跳过相同的不再执行，除非添加了next函数，接着执行下一个相同的路由
    next();
})

app.get('/request', (req, res) => {
    res.send(req.name);
})

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');