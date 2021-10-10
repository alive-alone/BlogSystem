const express = require('../../modules/node_modules/express') // 引入express模块
const mysql = require('../../modules/node_modules/mysql') // 引入mysql模块
const bodyParser = require('../../modules/node_modules/body-parser');/*支持post方法*/
const multer = require('../../modules/node_modules/multer');

const app = express()  // 创建express的实例
const port = 3000  // 定义监听端口
//https://www.cnblogs.com/zhengweijie/p/13026539.html
app.use(bodyParser.json({limit:'512mb'}));// 添加json解析
app.use(bodyParser.urlencoded({limit:'512mb',extended: false }));

// 定义连接的数据库
const connection = mysql.createConnection({
  host: 'localhost',   // 服务器端口
  user: 'root',        // 用户名称
  password: 'Root',  // 密码
  database: 'blog'         // 连接的数据库
});

// 允许接口跨域  这里指定允许所有接口跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


connection.connect();  // 启动连接数据库

// MySQL语法，这句意思为查询 SELECT * FROM表示查询，tets2表示查询的数据表
const showSql02 = 'SELECT * FROM admin'  //管理员信息

 // select account from asdf where account=?
// 服务器响应请求---01物资加载
// const addSql = 'INSERT INTO accounts(name,sex,grade,number,phone,pass,identity) VALUES(?,?,?,?,?,?,?)';
// const addSqlParams = [name,sex,grade,number,phone,pass,identity];

app.get('/account', (req, res) => {
  const showSql01 = 'SELECT name,account,telephone,birthday,real_name,introduction,area FROM account where account=? and pass=?' //账户信息
  const account = req.query.account;
  const pass = req.query.pass;
  const addSqlParams = [account,pass];
  connection.query(showSql01,addSqlParams, function (err, result) {
  if (err) {  // 操作失败报错
    console.log('[SELECT ERROR]:', err.message);
  }
  // console.log(result);  //数据库查询结果返回到result中
    res.send(result)
  });
})

app.get('/check_repet', (req, res) => {
  const showSql02 = 'SELECT account FROM account where account=?' //账户信息
  const account = req.query.account;
  const addSqlParams = [account];
  connection.query(showSql02,addSqlParams, function (err, result) {
  if (err) {  // 操作失败报错
    console.log('[SELECT ERROR]:', err.message);
  }
    res.send(result)
  });
})

//获取帖子
app.get('/get_posts', (req, res) => {
  const showSql02 = 'SELECT * FROM posts' //账户信息
  const account = req.query.account;
  // const addSqlParams = [account];
  connection.query(showSql02, function (err, result) {
  if (err) {  // 操作失败报错
    console.log('[SELECT ERROR]:', err.message);
  }
    res.send(result)
  });
})

// //获取各类申请信息
// app.get('/application', (req, res) => {
//   connection.query(showSql04, function (err, result) {
//     if (err) {  // 操作失败报错
//       console.log('[SELECT ERROR]:', err.message);
//     }
//     // console.log(result);  //数据库查询结果返回到result中
//     res.send(result)
//   });
// })

// /

// //保存用户注册账户信息
app.post('/add_account', function (req, res, next) {
  // const datas = req.body.datas
  // console.log(req.body)
  const name = req.body.name;
  const account = req.body.account;
  const pass = req.body.pass;
  const telephone =req.body.telephone;
  const birthday = req.body.birthday;

  const addSqlParams = [name,account,pass,telephone,birthday];
  // MySQL语法，这句意思为查询 INSERT INTO表示新增，tets2表示查询的数据表 (name,email,age) VALUES(?,?,?) 表示新增的字段
  const addSql = 'INSERT INTO account(name,account,pass,telephone,birthday) VALUES(?,?,?,?,?)';
 
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });

});


// //发送帖子
app.post('/add_posts', function (req, res, next) {
  const name = req.body.name;
  const title = req.body.title;
  const account = req.body.account;
  const content = req.body.content;
  const tags =req.body.tags;
  const article_type = req.body.article_type;
  const state = req.body.state;
  console.log(req.body)

  const addSqlParams = [name,title,account,content,tags,article_type,state];
  // MySQL语法，这句意思为查询 INSERT INTO表示新增，tets2表示查询的数据表 (name,email,age) VALUES(?,?,?) 表示新增的字段
  const addSql = 'INSERT INTO posts(name,title,account,content,tags,article_type,state) VALUES(?,?,?,?,?,?,?)';
 
  connection.query(addSql, addSqlParams, function (err, result) {
    if(err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });

});


//
app.post('/upload_portrait', function (req, res, next) {
  const account = req.body.account;
  const portrait = req.body.portrait;

  console.log(req.body.account)
  console.log(req.body.portrait)
  const modSqlParams = [portrait, account];
  // MySQL语法，这句意思为改数据 UPDATE 表示更改，tets2表示更改的数据表 SET  name= ?,email = ? 表示更改name 和 email字段，WHERE Id = ? 表示更改条件 
  const modSql = 'UPDATE account SET  portrait = ? WHERE account = ?';

  connection.query(modSql, modSqlParams, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    res.json(result);//数据返回结果
  });

});




app.post("/upimg", (req, res, next) => {
  /* console.log(req.files); //文件上传请求信息
  console.log(req.query.uid); */
  let tempPath = req.files[0].path; //找到临时路径
  var obj = req.files[0].fieldname;
  let uid=req.query.uid;
  if(!uid) {
    res.send({
      code: 201,
      msg: '修改失败！'
    });
    return;
  }
  // selfFun.getSuffix(obj)得到上传文件后缀
  // console.log('selfFun.getSuffix(obj): ', selfFun.getSuffix(obj));
  let filename = "user" + uid + '.' + selfFun.getSuffix(obj);
  let targetPath = "views/imgStoreHouse/avatar/" + filename; //将文件放入上传上来的目标路径
  console.log('targetPath: ', targetPath);
  if (myfs.existsSync("./views/imgStoreHouse/avatar/") == false) { //判断upload路径下是否存在该用户的文件夹
      myfs.mkdirSync("./views/imgStoreHouse/avatar/"); //没有的话，就创建一个文件夹
  }
  myfs.rename(tempPath, targetPath, function (err, data) {
    if (err) {
      next(err);
      return;
    }
  });
        //检查图片是否上传到文件夹
  if (!myfs.existsSync(targetPath)) {
    res.send({
        code: 201,
        msg: '上传失败！'
    });
    return;
  }
        //通过前端路由传参来寻找图片路径需要插入的位置，poll为我自己的数据库连接池所引入的模块
  pool.query('update xz_user set avatar=? where uid=?', [targetPath, uid], (err, results) => {
    if (err) {
        next(err);
        return;
    }
    if (results.affectedRows) {
      res.send({
          code: 200,
          msg: '上传成功！'
      });
    }
  });
}); 






// 监听3000端口
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//connection.end(); //结束连接！！！不能一直连着！！