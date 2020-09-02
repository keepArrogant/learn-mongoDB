// 引入express框架
const express = require('express');
// 引入body-parser第三方模块
const bodyParser = require('body-parser');
// 创建网站服务器
const app = express();

app.use(fn({
    a: 2
}))

function fn(obj) {
    return function (req, res, next) {
        if (obj.a == 1) {
            console.log(req.url);
        } else {
            console.log(req.method);
        }
        next();
    }
}

app.get('/', (req, res) => {
    res.send('ok');
})

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');