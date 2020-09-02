// 引入mongoose第三方模块 用来操作数据库
const mongoose = require('mongoose');
// 数据库连接
mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));

// 用户集合规则
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// 文章集合规则
const essaySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

// 用户集合
const Admin = mongoose.model('Admin', adminSchema);
// 文章集合
const Essay = mongoose.model('Essay', essaySchema);

// 创建用户
// Admin.create({
//     name: '彭十六'
// }).then(result => console.log(result));
// 创建文章
// Essay.create({
//     title: '网红一枝花竟是我妻子',
//     author: '5f0d17a3fc3f63119415f096'
// }).then(result => console.log(result));

// 查询文章中author属性的具体来源及信息 这样就和用户集合进行了关联
Essay.find().populate('author').then(result => console.log(result));