// 引入mongoose第三方模块，用来操作数据库
const mongoose = require('mongoose');
// 数据库连接
mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // 连接成功
    .then(() => console.log('数据库连接成功'))
    // 连接失败
    .catch(err => console.log(err, '数据库连接失败'));

// 创建集合规则
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});

// 使用规则创建集合
const User = mongoose.model('User', userSchema);

// 查询用户集合中的所有文档
// User.find().then(result => console.log(result));

// 通过_id字段查找文档
// User.find({
//     _id: '5c09f2b6aeb04b22f846096a'
// }).then(result => console.log(result));

// findOne方法返回一条文档 默认返回当前集合中的第一条文档
// User.findOne({
//     name: '李四'
// }).then(result => console.log(result));

// 查询用户集合中年龄字段大于20并且小于40的文档  $gt表示大于 $lt表示小于
// User.find({
//     age: {
//         $gt: 20,
//         $lt: 40
//     }
// }).then(result => console.log(result));

// 查询用户集合中爱好字段包含足球的文档  $in 表示包含  因为字段中爱好是以数组的形式保存的所以足球要加[]
// User.find({
//     hobbies: {
//         $in: ['足球']
//     }
// }).then(result => console.log(result));

// 选择要查询的字段  字段前面加 - 表示不想看见该字段
// User.find().select('name email -_id').then(result => console.log(result));

// 根据年龄字段进行升序排列
// User.find().sort('age').then(result => console.log(result));

// 根据年龄字段进行降序排列  就在字段的前面加上- 表示相反
// User.find().sort('-age').then(result => console.log(result));

// 查找跳过前两条数据 总共显示3条数据  skip方法表示跳过  limit表示限制
User.find().skip(2).limit(3).then(result => console.log(result));