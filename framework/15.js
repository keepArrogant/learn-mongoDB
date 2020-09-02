// 引入模块
const express = require('express');
const path = require('path');
const app = express();
// 模板配置
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

// locals对象下的所有数据，所有的模板都可以获取到
app.locals.users = [{
    name: '张三',
    age: 20,
    sex: '男'
}, {
    name: '古力娜扎',
    age: 28,
    sex: '女'
}];

app.get('/index', (req, res) => {
    res.render('index', {
        msg: '首页'
    })
});

app.get('/list', (req, res) => {
    res.render('list', {
        msg: '列表页'
    })
})

// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');