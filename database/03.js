const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));

//创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

// 使用规则创建集合
// model()方法中 第一个参数是集合名词  第二个参数是集合规则
const Course = mongoose.model('Course', courseSchema); //数据库创建courses

// 向集合中插入文档
// Course.create({
//     name: 'JavaScript',
//     author: '古力娜扎',
//     isPublished: false
// }, (err, result) => {
//     console.log(err); //成功返回null
//     console.log(result); //返回插入的数据
// });

//第三种方法
Course.create({
        name: 'JavaScript123',
        author: '迪丽热巴',
        isPublished: false
    })
    .then(result => {
        console.log(result)
    });