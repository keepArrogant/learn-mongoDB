## `mongoDB`

### 1. 数据库相关概念

- 在一个数据库软件中可以包含多个数据仓库，在每个数据仓库中可以包含多个数据集合，每个数据集合中可以包含多条文档(具体的数据)。

|    术语    |                         解释说明                         |
| :--------: | :------------------------------------------------------: |
|  database  |     数据库，`mongoDB`数据库软件中可以建立多个数据库      |
| collection |    集合，一组数据的集合，可以理解为JavaScript中的数组    |
|  document  |    文档，一条具体的数据，可以理解为JavaScript中的对象    |
|   field    | 字段，文档中的属性名称，可以理解为JavaScript中的对象属性 |

### 2. `Mongoose`第三方包

- 使用`Node.js `操作`MongoDB`数据库需要依赖`Node.js `第三方包`mongoose`
- 使用`npm install mongoose`命令下载

### 3. 启动`MongoDB`

- 停止`mongoDB`： `net stop mongodb`
- 启动`mongoDB`： `net start mongodb`

### 4.数据库连接

使用mongoose 提供的connect方法即可连接数据库

```JavaScript
//加载mongoose模块
const mongoose = require('mongoose');
//建立数据库连接      数据库     连接本机    数据库的名字
mongoose.connect('mongodb://localhost/playground', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('数据库连接成功')) //成功的函数
    .catch(err => console.log(err, '数据库连接失败'));//失败的函数
```

### 5. 创建数据库

- 在`MongoDB`中不需要显示创建数据库，如果正在使用的数据库不存在，`MongoDB`会自动创建。

### 6.创建集合

- 创建集合分为两步，一是对集合设定规则，二是创建集合，创建`mongoose.Schema`构造函数的实例即可创建集合。

  ```javascript
  //创建集合规则
  const courseSchema = new mongoose.Schema({
      name: String,
      author: String,
      isPublished: Boolean
  });
  
  // 使用规则创建集合
  // model()方法中 第一个参数是集合名词  第二个参数是集合规则
  const Course = mongoose.model('Course', courseSchema); //数据库创建courses
  ```

### 7. 创建文档

- 创建文档实际上就是向集合中插入数据。
  + 创建集合实例。
  + 调用实例对象下的save方法将数据保存到数据库中

**第一种**

```javascript
//创建集合实例对象
const course = new Course({
    name: 'MongoDB',
    author: '基础学习',
    isPublished: true
});

course.save(); //把文档插入到数据库中
```

第二种

```javascript
// 向集合中插入文档
Course.create({
    name: 'JavaScript',
    author: '古力娜扎',
    isPublished: false
}, (err, result) => {
    console.log(err); //成功返回null
    console.log(result); //返回插入的数据
});
```

第三种

```javascript
Course.create({
        name: 'JavaScript123',
        author: '迪丽热巴',
        isPublished: false
    })
    .then(result => {
        console.log(result)
    });
```

### 8.从外部导入数据到`mongoDB`

- 全程在命令窗口执行

  + 格式：  `mongoimport -d 数据库名称 -c 集合名称 --file 要导入的数据文件`

    ```javascript
    //例如：
    mongoimport -d playground -c users --file ./user.json
    ```

- 注意事项：
  + 如果执行`mongoimport`显示不是内部命令，就是环境变量没有加载`mongoDB`系统文件里的bin文件夹。
  + 要导入的文件要注意路径 是根据你当前打开的命令窗口的路径来寻找的。

### 9. 查询文档

- **查询文档返回的都是数组形式的集合**。

  ```javascript
  // 查询用户集合中的所有文档  前面的User是自己创建的集合对象
  User.find().then(result => console.log(result));
  ```

  + 可以通过集合的属性名来查找字段 在find里面输入要查找的关键字 例子如下：

    ```javascript
    //查找第一个name为李四的字段
    User.findOne({name: '李四'}).then(result => console.log(result));
    //通过_id属性来查找字段
    User.find({
        _id: '5c09f2b6aeb04b22f846096a'}).then(result =>console.log(result));
    ```

  ```javascript
  //查询用户集合中年龄字段大于20并且小于40的文档  $gt表示大于 $lt表示小于
  User.find({
      age: {
          $gt: 20,
          $lt: 40
      }
  }).then(result => console.log(result));
  
  ```

  ```javascript
  //查询用户集合中爱好字段包含足球的文档  $in 表示包含  因为字段中爱好是以数组的形式保存的所以足球要加[]
  User.find({
      hobbies: {
          $in: ['足球']
      }
  }).then(result => console.log(result));
  ```

  ```javascript
  //选择要查询的字段  字段前面加 - 表示不想看见该字段
  User.find().select('name email -_id').then(result => console.log(result));
  ```

  ```javascript
  //根据年龄字段进行升序排列
  User.find().sort('age').then(result => console.log(result));
  ```

  ```javascript
  //根据年龄字段进行降序排列  就在字段的前面加上- 表示相反
  User.find().sort('-age').then(result => console.log(result));
  ```

  ```javascript
  //查找跳过前两条数据 总共显示3条数据  skip方法表示跳过多少条数据  limit限制查询数量
  User.find().skip(2).limit(3).then(result => console.log(result));
  ```

### 10. 删除文档

- 返回结果是被删除的文档
- 如果查询条件匹配了多个文档 那么将会删除第一个匹配的文档

```javascript
//查找到一条文档并且删除
User.findOneAndDelete({
    _id: '5c09f1e5aeb04b22f8460965'
}).then(result => console.log(result));

```

```javascript
// 删除多条文档  {}里面为空表示删除全部数据
User.deleteMany({}).then(result => console.log(result));
```

### 11.更新文档

```javascript
//更新集合中的文档(更新一个)
User.updateOne({
    name: '李四'
}, {
    name: '傻篮子'
}).then(result => console.log(result));
```

```javascript
// 更新集合中的文档(更新多个)
User.updateMany({}, {
    age: 22
}).then(result => console.log(result));
```

### 12. mongoose验证

- 在创建集合规则时，可以设置当前字段的验证规则，验证失败就则输入插入失败。

  + required: true 必传字段
  + `minlength`：3  字符串最小长度
  + `maxlength`：20 字符串最大长度
+ min：2 数值最小为2
  + max：100 数值最大为100
  + enum：['html','css','javascript','node.js']
  + trim: true 去除字符串两边的空格
  + validate：自定义验证器
  
  ```javascript
  //制定集合规则
  const postSchema = new mongoose.Schema({
      title: {
          type: String,
          // 必选字段
          required: [true, '请传入文章标题'],
          // 字符串的最小长度
          minlength: [2, '文章长度不能小于2'],
          // 字符串的最大长度
          maxlength: [5, '文章长度最大不能超过5'],
          // 去除字符串两边的空格
          trim: true
      },
      age: {
          type: Number,
          // 数字的范围
        min: 18,
          max: 100
      },
      publishDate: {
          type: Date,
          // 默认值  自动添加
          default: Date.now
      },
      category: {
          type: String,
          // 枚举 列举出当前字段可以拥有的值
          enum: ['html', 'css', 'javascript', 'node.js']
      },
      author: {
          type: String,
          validate: {
              validator: v => {
                  // 返回布尔值 true验证成功  false验证失败  v是要验证的值
                  return v && v.length > 4
              },
              // 自定义错误信息
              message: '传入的值不符合验证规则'
          }
      }
  });
  //实例化集合对象
  const Post = mongoose.model('Post', postSchema);
  //给该集合插入数据
  Post.create({
      title: '   aaa  '
  }).then(result => console.log(result));
  ```

### 13. 打印错误信息

- 首先要在制定的集合规则的属性里指定message错误信息。

  ```javascript
   category: {
          type: String,
          // 枚举 列举出当前字段可以拥有的值
          enum: {
              values: ['html', 'css', 'javascript', 'node.js'],
              message: '分类名称要在一定的范围内才可以'
          }
  
      },
      author: {
          type: String,
          validate: {
              validator: v => {
                  // 返回布尔值 true验证成功  false验证失败  v是要验证的值
                  return v && v.length > 4
              },
              // 自定义错误信息
              message: '传入的值不符合验证规则'
          }
      }
  ```

- 最后在传入的参数里获取并打印错误信息

  ```javascript
  const Post = mongoose.model('Post', postSchema);
  
  Post.create({
          title: '   aaa  ',
          age: 40,
          category: 'java',
          author: 'baba'
      }).then(result => console.log(result))
      .catch(error => {
          // 获取错误信息对象
          const err = error.errors;
          // 循环错误信息对象
          for (var attr in err) {
              // 将错误信息打印倒控制台中
              console.log(err[attr]['message']);
          }
      });
  ```

### 14. 集合关联

- 通常不同集合的数据之间是有关系的，例如文章信息和用户信息存储在不同集合中，但文章是某个用户发表的，要查询文章的所有信息包括发表用户，就需要用到集合关联。

- 使用id对集合进行关联

- 使用populate 方法进行关联集合查询

  ```javascript
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
          //把用户表中的id和文章中的author属性绑定
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Admin'
      }
  });
  // 用户集合
  const Admin = mongoose.model('Admin', adminSchema);
  // 文章集合
  const Essay = mongoose.model('Essay', essaySchema);
  // 创建用户
  //Admin.create({
  //    name: '彭十六'
  // }).then(result => console.log(result));
  // 创建文章
  //Essay.create({
  //	title: '网红一枝花竟是我妻子',
  //	author: '5f0d17a3fc3f63119415f096'
  //}).then(result => console.log(result));
  // 查询文章中author属性的具体来源及信息 这样就和用户集合进行了关联
  Essay.find().populate('author').then(result => console.log(result));
  ```

## 模板引擎

- 模板引擎是第三方模块。
- 让开发者更加友好的方式拼接字符串，使项目代码更加清晰、更加易于维护。

### 1 art-template模板引擎

- 在命令行工具中使用 **npm install art-tmplate** 命令进行下载
- 使用**const template = require('art-template')** 引入模板引擎
- 告诉模板引擎要拼接的数据和模板在哪 **const html = template('模板路径', 数据);**

- 模板引擎必须创建带有.art后缀的模板文件 所以要先配置编译器能识别art的配置文件

  - 打开vscode，按Ctrl+shift+P  搜索输入：setting 打开设置 open setting 文件 在对象最后加上下面代码，这样编译器就能把art文件识别为html格式的了。

    ```javascript
    "files.associations": {
            "*.art": "html"
        }
    ```

### 2.模板语法

- art-template同时支持两种模板语法： **标准语法**和**原始语法**。
- **标准语法**可以让模板**更容易读写**，**原始语法**具有**强大的逻辑处理能力**。
  - 标准语法： {{ 数据 }}
  - 原始语法： <%= 数据 %>

- 如果数据中携带HTML标签，默认模板引擎不会解析标签，会将其转义后输出。所以想原文输出就遵循以下格式。
  - 标准语法： {{@ 数据}}
  - 原始语法： <%- 数据%>

```html
<!-- 标准语法 -->
    <p>{{ name }}</p>
    <p>{{ 1 + 1 }}</p>
    <p>{{ 1 + 1 == 2 ? '相等' : '不相等' }}</p>
    <p>{{ content }}</p>
    <p>{{@ content }}</p>
<!-- 原始语法 -->
    <p><%= name %></p>
    <p><%= 1 + 2 %></p>
    <p><%= 1 + 2 == 2 ? '相等' : '不相等' %></p>
    <p><%= content %></p>
    <p><%- content %></p>
```

### 3.条件判断

- 在模板中可以根据条件来决定显示哪块HTML 代码

  ```html
  <!-- 标准语法 -->
  {{if age > 18}}
  年龄大于18
  {{else if age < 15}}
  年龄小于15
  {{else}}
  年龄不符合要求
  {{/if}}
  
  <!-- 原始语法 -->
  <% if (age > 18) { %>
  年龄大于18
  <% } else if (age < 15) { %>
  年龄小于15
  <% } else { %>
  年龄不符合要求
  <% } %>
  ```

### 4. 循环

- 标准语法： {{each 数据}} {{/each}}

- 原始语法：<% for () { %> <% } %>

  ```html
  <!-- 标准语法 -->
  <ul>
      {{each users}}
      <li>
          {{$value.name}}
          {{$value.age}}
          {{$value.sex}}
      </li>
      {{/each}}
  </ul>
  
  <!-- 原始语法 -->
  <ul>
      <% for (var i = 0; i < users.length; i++) {%>
      <li>
          <%= users[i].name %>
          <%= users[i].age %>
          <%= users[i].sex %>
      </li>
      <% } %>
  </ul>
  ```

### 5.子模板

- 使用子模板可以将网站公共区块(头部、底部)抽离到单独的文件中。

  - 标准语法： {{include '模板路径'}}

  - 原始语法： <%include('模板路径') %>

    ```html
    <!-- 标准语法 -->
    {{ include './common/header.art' }}
    <div>{{ msg}}</div>
    {{ include './common/footer.art' }}
    
    <!-- 原始语法 -->
    <% include ('./common/header.art') %>
    <div>{{ msg}}</div>
    <% include ('./common/footer.art') %>
    ```

### 6. 模板继承

- 使用模板继承可以将网站HTML骨架抽离到单独的文件中，其他页面模板可以继承该骨架文件。

  + 首先把HTML骨架抽离成单独的页面

    ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>布局骨架</title>
        {{block 'link'}} {{/block}}
    </head>
    
    <body>
        {{block 'content'}} {{/block}}
    </body>
    
    </html>
    ```

  + 要传入的数据继承上面的页面  block中间就是要填充的内容，通过自定义的变量名识别

    ```html
    {{extend './common/layout.art' }}
    
    {{block 'content'}}
    <p>{{ msg}}</p>
    {{/block}}
    
    {{block 'link'}}
    <link rel="stylesheet" href="text/css" href="./main.css">
    {{/block}}
    ```

### 7. 模板配置

- 向模板中导入变量 `template.defaults.imports.变量名 = 变量值;`

  例如：模板引擎无法导入一个动态的时间 需要用到`dateformat`模块

  - 首先要加载下载模块：`npm install dateformat`
  - 加载模块并配置

```javascript
//加载模块
const dateFormat = require('dateformat');
// 导入模板变量
template.defaults.imports.dateFormat = dateFormat;
//利用dateformat模块导入时间函数给time
const html = template(views, {
    time: new Date()
});
```

```html
<!-- 在html页面加载模板引擎-->
{{ dateFormat(time, 'yyyy-mm-dd-HH:MM:ss') }}
```

- 设置模板根目录 `template.defaults.root` = 模板目录

  ```javascript
  // 设置模板的根目录   __dirname是当前项目目录  views是文件夹名称
  template.defaults.root = path.join(__dirname, 'views');
  ```

- 配置模板的默认后缀 `template.defaults.extname = '.后缀';`

  ```javascript
  //默认后缀为html
  //template.defaults.extname = '.html';
  //默认后缀为art  
  template.defaults.extname = '.art';
  //应用场景 当路径里的07.art 格式的文件 没写后缀 就能够默认加上.art 识别
  console.log(template('07', {}));
  ```

### 8. 第三方模块 router

- 功能：实现路由 
- 使用步骤：
  + 获取路由对象
  + 调用路由对象提供的方法创建路由
  + 启动路由，使路由生效

```javascript
// 引入router模块
const getRouter = require('router');
// 获取路由对象
const router = getRouter();
// 设置路由
router.get('/add', (req, res) => {
    res.end('test');
})


// 当客户端访问服务器端的时候
app.on('request', (req, res) => {
    // 最后一个回调函数必填，不然报错
    router(req, res, () => {})
});
```

### 9. 第三方模块 serve-static

- 功能：实现静态资源访问服务
- 步骤：
  + 引入serve-static模块获取创建静态资源服务功能的方法
  + 调用方法创建静态资源服务并指定静态资源服务目录
  + 启用静态资源服务功能

### 10. 密码加密 bcrypt

- 哈希加密是单线程加密方式：1234 => abcd

- 在加密的密码中加入随机字符串可以增加密码被破解的难度

  ```javascript
  // 导入bcrypt模块
  const bcrypt = require('bcrypt');
  // 生成随机字符串 gen => generate生成 salt盐
  let salt = await bcrypt.genSalt(10);
  // 使用随机字符串对密码进行加密
  let pass = await bcrypt.hash('明文密码', salt);
  ```

- bcrypt依赖的其他环境

  + python 2.x
  + node-gyp
    + npm install  node-gyp -g

  + windows-build-tools
    + npm install --global --production windows-build-tools

- 密码比对

  ```javascript
  // 密码比对
  let isEqual = await bcrypt.compare('明文密码','加密密码');
  ```

  

## `mongoDB`数据库添加账号

- 以系统管理员的方式运行`powershell`
- 连接数据库 `mongo`
- 查看数据库 `show dbs`
- 切换到`admin`数据库 `use admin`
- 创建超级管理员账户 `db.createUser()`
  -  `db.createUser({user: 'root',pwd:'root',roles:['root']})`
- 切换到要添加账号密码的普通用户的`blog`数据库  `use blog`
- 创建普通账号 `db.createUser()`
  - `db.createUser({user:'xhx',pwd:'xhx',roles:['readWrite']})`

- 卸载`mongodb`服务
  - 停止服务 `net stop mongodb`
  - 卸载服务 `mongod --remove`

- 创建`mongodb`服务

  - `mongod --logpath='D:\Program Files\MongoDB\Server\4.1\log\mongod.log' --dbpath='D:\Program Files\MongoDB\Server\4.1\data' --install --auth`

- 启动`mongodb`服务 `net start mongodb`

- 在项目中使用账号连接数据库

  ```javascript
  //xhx：xhx 分别是账号密码  27017是mongodb默认端口 可以不写 
  mongoose.connect('mongodb://xhx:xhx@localhost:27017/blog', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
      })
      .then(() => console.log('数据库连接成功'))
      .catch(() => console.log('数据库连接失败'));
  ```

  