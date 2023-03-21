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

router.get('/data', function(req, response, next) {
    var date = []
    connection.query("SELECT * FROM preroom",function (err,res,fields) {
        let preroom = res
        let date = {
                  preroom:preroom,
                }
                response.send(date)
                }); 
            }); 
			
router.get('/search', function(req, response, next) {
	var date = []
    //   console.log(req)
    let value = req.query.value
        connection.query("SELECT * FROM preroom WHERE CONCAT(id,ordernum,account,name,phone,type,breakfast,intime,arrtime,other) LIKE CONCAT('%"+value+"%') ORDER BY id DESC",function (err,res,fields) {
            let preroom = res
            let date = {
                // banner:banner,
                // channal:channal,
                preroom:preroom,
            }
                    response.send(date)
                        
        });  
  });

router.get('/id', function(req, response, next) {
	var date = []
	let id = req.query.id
	connection.query("SELECT * FROM preroom WHERE id = '"+id+"'", function(err,res,fields) {
	    let preroom = res
	    let date = {
                  preroom:preroom,
                }
                response.send(date)
			    }); 
		    });
			
router.get('/update', function(req, response, next) {   
	let id = req.query.id
	connection.query("SELECT * FROM preroom WHERE id = '"+id+"'", function(err,res,fields) {
		response.send(res)
		}); 
	});		
					 
router.get('/del', function(req, response, next) {
	let id = req.query.id
	connection.query("DELETE FROM preroom WHERE id = '"+id+"'",function (err,res,fields) {
		if(err){
			return  response.send({statusCode:0, msg:'删除失败'})
		}else{
            return  response.send({statusCode:200, msg:'已删除'}) 
            }
	    });  
	});
	
router.get('/updatelist', function(req, response, next) {
	let id = req.query.id
	let name = req.query.name
	let phone = req.query.phone
    let type = req.query.type
	let breakfast = req.query.breakfast
    let roomnum = req.query.roomnum
	let intime = req.query.intime
    let arrtime = req.query.arrtime
	let other = req.query.other
    connection.query("UPDATE preroom SET name = ?,phone = ?,type = ?,breakfast = ?,roomnum = ?,intime = ?,arrtime = ?,other = ? WHERE id = ?",[name,phone,type,breakfast,roomnum,intime,arrtime,other,id],function(err,data){
                if(err){
                    throw err
                } else {
                console.log('插入数据成功');
                return response.send({err:200,msg:'修改成功'})
                }
                })  
});

router.get('/add', function(req, response, next) {
	let ordernum = req.query.ordernum
	let account = req.query.account
    let name = req.query.name
    let phone = req.query.phone
    let type = req.query.type
    let breakfast = req.query.breakfast
    let roomnum = req.query.roomnum
	let intime = req.query.intime
    let arrtime = req.query.arrtime
	let pretime = req.query.pretime
    let other = req.query.other
    connection.query("INSERT INTO preroom SET  ?",{ordernum:ordernum,account:account,name:name,phone:phone,type:type,breakfast:breakfast,roomnum:roomnum,intime:intime,arrtime:arrtime,pretime:pretime,other:other},function (err,res,fields) {
                    response.send({statusCode:200, msg:'添加成功'})
                        
        });  
  });
  
router.get('/order',function(req,response,next) {
	var date = []
	let account = req.query.account
	connection.query("SELECT * FROM room LEFT JOIN preroom ON room.type = preroom.type where preroom.account = '"+account+"'",function (err,res,fields) {
	    let preroom = res
	    let date = {
	              preroom:preroom,
	            }
	            response.send(date)
	        }); 
});


module.exports = router;