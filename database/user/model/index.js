const mongoose = require('mongoose');
// 数据库连接  27017 是mongodb数据库的默认端口 用默认端口就可以省略
mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));