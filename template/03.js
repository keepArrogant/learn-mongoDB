const template = require('art-template');
const path = require('path');

const views = path.join(__dirname, 'views', '03.art');

const html = template(views, {
    users: [{
        name: '张三',
        age: 23,
        sex: '男'
    }, {
        name: '李四',
        age: 24,
        sex: '男'
    }, {
        name: '迪丽热巴',
        age: 28,
        sex: '女'
    }]
})

console.log(html)