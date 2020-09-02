// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();
// 引入路由对象
const home = require('./route/home');
const admin = require('./route/admin');
app.use('/home', home);
app.use('/admin', admin);
// 监听网站端口
app.listen(3000);
console.log('网站服务器启动成功');