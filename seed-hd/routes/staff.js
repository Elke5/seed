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
    }
    
});

router.get('/data', function(req, response, next) {
    //   console.log(req)
    var date = []
                connection.query("SELECT * FROM staff",function (err,res,fields) {
                    let staff = res
                    let date = {
                        staff:staff,
                    }
                    response.send(date)
                }); 
            }); 
			
router.get('/search', function(req, response, next) {
	var date = []
    //   console.log(req)
    let value = req.query.value
        connection.query("SELECT * FROM staff WHERE CONCAT(id,jobnum) LIKE CONCAT('%"+value+"%') ORDER BY id DESC",function (err,res,fields) {
            let staff = res
            let date = {
                staff:staff,
            }
                    response.send(date)
                        
        });  
  });
	  
router.get('/id', function(req, response, next) {
			    //   console.log(req)
			    var date = []
			    let id = req.query.id
			    connection.query("SELECT * FROM staff WHERE id = '"+id+"'", function(err,res,fields) {
			           let staff = res
			           let date = {
			                       staff:staff,
			                    }
			                    response.send(date)
			                }); 
			            });
 router.get('/update', function(req, response, next) {
		         let id = req.query.id
			    connection.query("SELECT * FROM staff WHERE id = '"+id+"'", function(err,res,fields) {
			                    response.send(res)
			                }); 
			            });						 
//删除
router.get('/del', function(req, response, next) {
				 let id = req.query.id
				 connection.query("DELETE FROM staff WHERE id = '"+id+"'",function (err,res,fields) {
					if(err){
						        return  response.send({statusCode:0, msg:'删除失败'}) 
						    }else{
						        return  response.send({statusCode:200, msg:'已删除'}) 
						    }
						});  
					});
					
router.get('/updatelist', function(req, response, next) {
	let id = req.query.id
    let jobnum = req.query.jobnum
    let pass = req.query.pass
    connection.query("UPDATE staff SET jobnum = ?,pass = ? WHERE id = ?",[jobnum,pass,id],function(err,data){
                if(err){
                    throw err
                } else {
                // console.log('插入数据成功');
                return response.send({err:200,msg:'修改成功'})
                }
                })  
});

router.get('/show',function(req,response,next) {
  	let account = req.query.account
  	connection.query("SELECT * FROM staff where jobnum = '"+account+"'",function (err,res,fields) {
  	            response.send(res)
  	        }); 
  });
  
router.get('/add', function(req, response, next) {
    let jobnum =  req.query.jobnum
    let pass =  req.query.pass
    connection.query("INSERT INTO staff SET  ?",{jobnum:jobnum,pass:pass},function (err,res,fields) {
                    response.send({statusCode:200, msg:'添加成功'})
                        
        });  
  });
  
module.exports = router;