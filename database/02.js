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

//创建集合实例对象
const course = new Course({
    name: 'MongoDB',
    author: '基础学习',
    isPublished: true
});

course.save(); //把文档插入到数据库中