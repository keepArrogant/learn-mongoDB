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
// 更新集合中的文档(更新一个)
// User.updateOne({
//     name: '李四'
// }, {
//     name: '傻篮子'
// }).then(result => console.log(result));

// 更新集合中的文档(更新多个)
User.updateMany({}, {
    age: 22
}).then(result => console.log(result));