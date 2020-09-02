// 导入模板引擎
const template = require('art-template');
const path = require('path');

const views = path.join(__dirname, 'views', '02.art');

const html = template(views, {
    name: '李四',
    age: 17
});

console.log(html);