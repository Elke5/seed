var express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
const cors=require('cors');
let loginRouter = require('./routes/login');
let client = require('./routes/client');
let search = require('./routes/search');
// let upload = require('./routes/upload');
let room = require('./routes/room');
let preroom = require('./routes/preroom');
let canteen = require('./routes/canteen');
let reservation = require('./routes/reservation');
let staff = require('./routes/staff')


let path = require('path')
// 1. 创建app
var app = express();

// 登录路由
app.use('/api/login',loginRouter);
app.use('/api/client',client);
app.use('/api/search',search);
app.use('/api/room',room);
app.use('/api/preroom',preroom);
app.use('/api/canteen',canteen);
app.use('/api/reservation',reservation);
app.use('/api/staff',staff);
// app.use('/api/upload',upload);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
// 配置静态资源目录 整一个文件夹 通过域名能访问
app.use(express.static(path.join(__dirname,"../static")))
//数据模型
//路由配置

//session配置
// app.use(session({
//   //配置加密字符串，他会在原有的基础上和字符串拼接起来去加密
//   //目的是为了增加安全性，防止客户端恶意伪造
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,//无论是否适用Session，都默认直接分配一把钥匙
//   cookie: { secure: true }
// }))


app.listen(3000,function(){
    console.log('服务端正在运行.......');
})