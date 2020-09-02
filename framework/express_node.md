## Express框架

### 1.Express框架是什么

- Express是一个基于**Node平台**的**web应用开发框架**，它提供了一系列的强大特性，帮助你**创建各种Web应用**。我们可以使用 `npm install express`命令进行下载。

### 2.Express框架特性

- 提供了方便简洁的路由定义方式

- 对获取HTTP请求参数进行了简化处理

- 对模板引擎支持程度高，方便渲染动态HTML页面

- 提供了中间件机制有效控制HTTP请求

- 拥有大量第三方中间件对功能进行扩展

  ```javascript
  // 引入express 框架
  const express = require('express');
  // 创建网站服务器
  const app = express();
  
  app.get('/', (req, res) => {
      // send()
      // 1. send方法内部会检测响应内容的类型
      // 2. send方法会自动设置http状态码
      // 3. send方法会帮我们自动设置响应的内容类型及编码
      res.send('Hello Express');
  })
  
  // 监听端口
  app.listen(3000);
  console.log('网站服务器启动成功');
  ```

### 3. 什么是中间件

- 中间件就是一堆方法，可以接收客户端发来的请求、可以对请求做出响应，也可以将请求继续交给下一个中间件继续处理。

- 中间件主要由两部分构成，**中间件方法**以及**请求处理函数**。

- 中间件方法由Express提供，负责拦截请求，请求处理函数由开发人员提供，负责处理请求。

  + get 和post方法就是中间件。

- 可以针对同一个请求设置多个中间件，对同一个请求进行多次处理。

  + 默认情况下，请求从上到下依次匹配中间件，一旦匹配成功，终止匹配。

  + 可以调用next方法将请求的控制权交给下一个中间件，直到遇到结束请求的中间件。

    ```javascript
    app.get('/request', (req, res, next) => {
        req.name = "张三";
        // 默认情况下，一旦获取到了相同的路由 执行头一个，跳过相同的不再执行，除非添加了next函数，接着执行下一个相同的路由,直到遇到结束请求的路由
        next();
    })
    
    app.get('/request', (req, res) => {
        res.send(req.name);
    })
    ```

### 3.1 app.use中间件用法

- app.use 匹配所有的请求方式，可以直接传入请求处理函数，代表接收所有的请求。

```javascript
// 接收所有请求的中间件
app.use((req, res, next) => {
    console.log('请求走了app.use中间件');
    next();
})
```

- app.use 第一个参数也可以传入请求地址，代表无论什么请求方式，只要是这个请求地址就接收这个请求。

  ```javascript
  // 当客户端访问/request请求的时候走当前中间件
  app.use('/request', (req, res, next) => {
      console.log('请求走了app.use / request中间件');
      next(); //接着执行下一个路径为/request的中间件，直到遇见res.send()结束方法。
  })
  ```

### 3.2 中间件应用

- 路由保护，客户端在访问需要登录的页面时，可以先使用中间件判断用户登录状态，用户如果未登录，则拦截请求，直接响应，禁止用户进入需要登录的页面。

  ```javascript
  // 路由保护
  app.use('/admin', (req, res, next) => {
      // 用户没有登录
      let isLogin = true;
      // 如果用户登录
      if (isLogin) {
          // 让请求继续向下执行
          next();
      } else {
          // 如果用户没有登录 直接对客户端做出响应
          res.send('您还没有登录 不能访问 /admin这个页面');
      }
  })
  ```

  

- 网站维护公告，在所有路由的最上面定义接收所有请求的中间件，直接为客户端做出响应，网站正在维护中。

  ```javascript
  //网站公告
  app.use((req, res, next) => {
      res.send('当前网站正在维护中...');
  })
  ```

  

- 自定义404页面，由于路由是从上到下依次查找并访问的，所以访问不到的路由定义在所有路由的**最下面**。

  ```javascript
  // 如果访问的路由上面都没有 自定义404页面
  app.use((req, res, next) => {
      // 为客户端响应404状态码以及提示信息
      res.status(404).send('当前访问的页面是不存在的');
  })
  ```

### 3.3 错误处理中间件

- 在程序执行的过程中，不可避免的会出现一些无法预料的错误，比如文件读取失败，数据库连接失败。错误处理中间件是一个集中处理错误的地方。

  ```javascript
  // 错误处理中间件
  app.use((err, req, res, next) => {
      //改变路由状态为500并且打印错误信息
      res.status(500).send(err.message);
  })
  ```

- 当程序出现错误时，调用next()方法，并且将错误信息通过参数的形式传递给next()方法，即可触发错误处理中间件。

  ```javascript
  app.get('/index', (req, res, next) => {
      // 抛出个异常，错误处理中间件会接受该错误
      // throw new Error('程序发生了未知错误');
      fs.readFile('./01.js', 'utf8', (err, result) => {
          //err是一个对象，当没有错误时，会传入null则直接执行else；有错误时，传入一个对象
          if (err) {
              //把错误对象传递给next()方法，传递给错误处理中间件
              next(err);
          } else {
              res.send(result);
          }
      })
  })
  ```

### 4. 捕获错误

- 在node.js中，异步API的错误信息都是通过回调函数获取的，支持Promise对象的异步API发生错误可以通过catch方法捕获。异步函数执行如果发生错误要如何捕获错误呢？

- try catch 可以捕获异步函数以及其他同步代码在执行过程中发生的错误，但是不能其他类型API发生的错误。

  ```javascript
  app.get('/index', async (req, res, next) => {
      try {
          await readFile('./01.js');
      } catch (ex) {
          next(ex);//把异常信息传递给错误处理中间件
      }
  })
  ```

### 5. 构建模块化路由

- 为了避免路由数量在同一个文件中罗列过多，所以把路由进行模块化

```javascript
// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();
// 创建路由对象
const home = express.Router();
// 为路由对象匹配请求路径
app.use('/home', home);
// 创建二级路由
home.get('/index', (req, res) => {
    res.send('欢迎来到我的首页页面');
})
```

- 下面以三个文件为例进行路由模块化

  ```javascript
  //app.js
  // 引入express框架
  const express = require('express');
  // 创建网站服务器
  const app = express();
  // 引入路由对象
  const home = require('./route/home');
  const admin = require('./route/admin');
  app.use('/home', home);  //当用户访问/home 下的路由的时候自动到home.js中响应
  app.use('/admin', admin);
  // 监听网站端口
  app.listen(3000);
  console.log('网站服务器启动成功');
  ```

  ```javascript
  //home.js
  const express = require('express');
  const home = express.Router();
  home.get('/index', (req, res) => {
      res.send('欢迎来到博客展示首页');
  })
  
  module.exports = home;
  ```

  ```javascript
  //admin.js
  const express = require('express');
  const admin = express.Router();
  admin.get('/index', (req, res) => {
      res.send('欢迎来到博客管理页面');
  })
  
  module.exports = admin;
  ```

### 6. GET参数的获取

- Express框架中使用req.query即可获取GET参数，框架内部会将GET参数转换为对象并返回

  ```javascript
  //接收地址栏中问号后面的参数
  //例如： http://localhost:3000/index?name=zhangsan&age=18&sex=男
  app.get('/index', (req, res) => {
      // 获取get请求参数
      res.send(req.query); //{"name":"zhangsan","age":"18","sex":"男"}
  })
  ```

### 7. POST参数的获取

- Express中接收post请求参数需要借助第三方包 body-parser

  ```javascript
  // 引入body-parser第三方模块
  const bodyParser = require('body-parser');
  //配置body-parser模块
  app.use(bodyParser.urlencoded({extended: false}));
  //接收请求
  app.post('/add', (req, res) => {
      // 接收post请求参数
      res.send(req.body);
  })
  ```

### 8. Express路由参数

```javascript
//当访问地址为：http://localhost:3000/index/123/谢合鑫/22 时，找到下面路由
app.get('/index/:id/:name/:age', (req, res) => {
    // 接收get请求来的参数并显示到页面上
    res.send(req.params); //{"id":"123","name":"谢合鑫","age":"22"}
})

```

### 9. 静态资源的处理

- 通过Express内置的**express.static** 可以方便地托管静态文件，例如：img、css、JavaScript文件

  ```javascript
  // 访问项目下的静态资源文件  /static是访问路由  后面的参数是静态资源的绝对路径
  app.use('/static', express.static(path.join(__dirname, 'public')));
  ```

- 现在public 目录下面的文件就可以访问了
  +  http://localhost:3000/static/images/1.jpg 
  +  http://localhost:3000/static/article.html 
  +  http://localhost:3000/static/css/index.css 

### 10. express-art-template 模板引擎

- 为了使art-template模板引擎能够更好的和Express框架配合，模板引擎官方在原art-template模板引擎的基础上封装了express-art-template。

- 使用 **npm install art-template express-art-template** 命令进行安装

  ```javascript
  // 1.告诉express框架使用什么模板引擎渲染什么后缀的模板文件
  // 参数解释： 1.模板后缀 2.使用的模板引擎
  app.engine('art', require('express-art-template'));
  // 2.告诉express框架模板存放的位置是什么
  app.set('views', path.join(__dirname, 'views'));
  // 3.告诉express框架模板的默认后缀是什么
  app.set('view engine', 'art');
  
  app.get('/index', (req, res) => {
      res.render('index', {
          // render()方法为我们做了四件事
          // 1.拼接模板路径
          // 2.拼接模板后缀
          // 3.哪一个模板和哪一个数据进行拼接
          // 4.将拼接的结果响应给了客户端
          msg: 'index page'
      })
  });
  ```

### 11. app.locals 对象

- 将变量设置到app.locals对象下面，这个数据在所有的模板中都可以获取到

  ```javascript
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
  ```

  

