// 引入express框架
const express = require('express');
// 引入路径模块
const path = require('path');

// 创建网站服务器
const app = express();

// 访问项目下的静态资源文件
app.use('/static', express.static(path.join(__dirname, 'public')));

// 监听网站端口
app.listen(3000);
console.log('网站服务器启动成功');