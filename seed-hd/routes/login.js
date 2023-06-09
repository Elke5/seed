let express = require('express');
let router = express.Router();
// var CircularJSON = require('circular-json');
//————————————连接数据库——————————
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'seed'
});
 
connection.connect((err)=>{
    if(err){
     console.log(err)
    }else{
        // console.log("数据库连接成功")
    }
    
});
//获取客户端数据
router.get('/getuser', function(req, response, next) {
  // 把从客户端传来的名字，密码赋值到新的变量
    let name = req.query.userName
    let pwd = req.query.userPassword
    // 通过名字查询数据库用户表得到密码
      connection.query("SELECT * FROM user WHERE account = " + connection.escape(name), (err,res,fields) => {
        // 当没有查找到密码时
        // console.log(res[0].user)
              if(err) {
              throw err
               return;
              }else{
              if(res.length>0){
                //将数据库传来的数据转化为JSON格式

              let uPasswordString = JSON.stringify(res[0].pass);
              let userPassword = JSON.parse(uPasswordString);
              let uUser = JSON.stringify(res[0].account);
              let user = JSON.parse(uUser);
              let role = res[0].role;
              // let user = res[0].user;
              // req.session.user = user
              // req.session.password = userPassword
              
              // response.send(pn)
                if(userPassword == pwd){
                  //将数据库的密码userPassword 和服务端 传来的密码相等
                  // console.log(req.session)
                  response.send({statusCode:200, msg:'登录成功',name:user,role:role})
                  return
              }else{
              response.send({ statusCode:0, msg:'密码不正确'})  
              return
            } 
              }
              } 
              //如果没有数据，说明用户名填写错误 
              response.send({ statusCode:0, msg:'账号不正确'})    
                
             
      });   
});


router.get('/getadmin', function(req, response, next) {
  // 把从客户端传来的名字，密码赋值到新的变量
    let name = req.query.userName
    let pwd = req.query.userPassword
    // 通过名字查询数据库用户表得到密码
      connection.query("SELECT * FROM admin WHERE name = " + connection.escape(name), (err,res,fields) => {
        // 当没有查找到密码时
        // console.log(res[0].user)
              if(err) {
              throw err
               return;
              }else{
              if(res.length>0){
                //将数据库传来的数据转化为JSON格式

              let uPasswordString = JSON.stringify(res[0].pwd);
              let userPassword = JSON.parse(uPasswordString);
              let uUser = JSON.stringify(res[0].name);
              let user = JSON.parse(uUser);
              let role = res[0].role;
              // let user = res[0].user;
              // req.session.user = user
              // req.session.password = userPassword
              
              // response.send(pn)
                if(userPassword == pwd){
                  //将数据库的密码userPassword 和服务端 传来的密码相等
                  // console.log(req.session)
                  response.send({statusCode:200, msg:'登录成功',name:user,role:role})
                  return
              }else{
              response.send({ statusCode:0, msg:'密码不正确'})  
              return
            } 
              }
              } 
              //如果没有数据，说明用户名填写错误 
              response.send({ statusCode:0, msg:'账号不正确'})    
                
             
      });   
});

router.get('/getstaff', function(req, response, next) {
  // 把从客户端传来的名字，密码赋值到新的变量
    let jobnum = req.query.jobNum
    let pass = req.query.userPassword
    // 通过名字查询数据库用户表得到密码
      connection.query("SELECT * FROM staff WHERE jobnum = " + connection.escape(jobnum), (err,res,fields) => {
        // 当没有查找到密码时
        // console.log(res[0].user)
              if(err) {
              throw err
               return;
              }else{
              if(res.length>0){
                //将数据库传来的数据转化为JSON格式

              let uPasswordString = JSON.stringify(res[0].pass);
              let userPassword = JSON.parse(uPasswordString);
              let uUser = JSON.stringify(res[0].jobnum);
              let user = JSON.parse(uUser);
              
                if(userPassword == pass){
                  //将数据库的密码userPassword 和服务端 传来的密码相等
                  response.send({statusCode:200, msg:'登录成功',jobnum:user})
                  return
              }else{
              response.send({ statusCode:0, msg:'密码不正确'})  
              return
            } 
              }
              } 
              //如果没有数据，说明用户名填写错误 
              response.send({ statusCode:0, msg:'账号不正确'})    
                
             
      });   
});
module.exports = router;