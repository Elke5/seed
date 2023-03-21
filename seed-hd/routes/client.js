let express = require('express');
let router = express.Router();
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

//用户信息
router.get('/data', function(req, response, next) {
    //   console.log(req)
    var date = []
       
                
                connection.query("SELECT * FROM user",function (err,res,fields) {
                    
                    let client = res
                    let date = {
                        // banner:banner,
                        // channal:channal,
                        client:client,
                    }
                    response.send(date)
                }); 
            }); 
			
router.get('/search', function(req, response, next) {
	var date = []
    //   console.log(req)
    let value = req.query.value
        connection.query("SELECT * FROM user WHERE CONCAT(id,username,account,birth,sex) LIKE CONCAT('%"+value+"%') ORDER BY id DESC",function (err,res,fields) {
            let client = res
            let date = {
                // banner:banner,
                // channal:channal,
                client:client,
            }
                    response.send(date)
                        
        });  
  });	
//用户具体信息			
			router.get('/id', function(req, response, next) {
			    //   console.log(req)
			    var date = []
			                let id = req.query.id
			                connection.query("SELECT * FROM user WHERE id = '"+id+"'", function(err,res,fields) {
			                    
			                    let client = res
			                    let date = {
			                        // banner:banner,
			                        // channal:channal,
			                        client:client,
			                    }
			                    response.send(date)
			                }); 
			            });

//用户修改显示
            router.get('/update', function(req, response, next) {
			    //   console.log(req)
			   
			                let id = req.query.id
			                connection.query("SELECT * FROM user WHERE id = '"+id+"'", function(err,res,fields) {
			                   
			                    
			                    
			                    response.send(res)
			                }); 
			            });						 
	
						//删除
						router.get('/del', function(req, response, next) {
						    //   console.log(req)
						    let id = req.query.id
						        connection.query("DELETE FROM user WHERE id = '"+id+"'",function (err,res,fields) {
						            
						            
						            
						                if(err){
						                    return  response.send({statusCode:0, msg:'删除失败'}) 
						                }else{
						                    return  response.send({statusCode:200, msg:'已删除'}) 
						                }
						                    
						    });  
						                        
						         
						  });
router.get('/updatelist', function(req, response, next) {
	let id = req.query.id
    let username = req.query.userName
    let account = req.query.account
    let pass = req.query.pass
	let birth = req.query.birth
    let sex = req.query.sex
    let other = req.query.other
    
// connection.query("SELECT * FROM detailbook WHERE id = '"+id+"'",function (err,res,fields) {
//     let book_name = res[0].title 
//     console.log(book_name)
//     connection.query("UPDATE booklist SET book_price=? WHERE book_name = ?",[price,book_name ],function(err,data){

//             if(err){
//             throw err
//             }else{
//                 console.log(res)
    connection.query("UPDATE user SET username = ?,account = ?,pass = ?,birth = ?,sex = ?,other = ? WHERE id = ?",[username,account,pass,birth,sex,other,id],function(err,data){
            
                if(err){
                    throw err
                } else {
                // console.log('插入数据成功');
                return response.send({err:200,msg:'修改成功'})
                }
                })  
});

router.get('/add', function(req, response, next) {
    let username =  req.query.userName
	let phone =  req.query.Phone
	let pass = req.query.userPassword
    connection.query("INSERT INTO user SET  ?",{username:username,account:phone,pass:pass},function (err,res,fields) {
                    response.send({statusCode:200, msg:'注册成功'})
                        
        });  
  });
  
router.get('/show',function(req,response,next) {
  	let account = req.query.account
  	connection.query("SELECT * FROM user where account = '"+account+"'",function (err,res,fields) {
  	            response.send(res)
  	        }); 
  });
  
router.get('/userchange', function(req, response, next) {
  	  let account = req.query.account
	  let username = req.query.username
	  let sex = req.query.sex
	  let birth = req.query.birth
      connection.query("UPDATE user SET username = ?,sex = ?,birth = ? WHERE account = '"+account+"'",[username,sex,birth],function(err,data){
                  if(err){
                      throw err
                  } else {
                  // console.log('插入数据成功');
                  return response.send({err:200,msg:'修改成功'})
                  }
                  })  
  });

 

module.exports = router;