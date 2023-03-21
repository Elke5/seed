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
    connection.query("SELECT * FROM reservation",function (err,res,fields) {
        let reservation = res
        let date = {
                  reservation:reservation,
                }
                response.send(date)
                }); 
            });
router.get('/search', function(req, response, next) {
	var date = []
    //   console.log(req)
    let value = req.query.value
        connection.query("SELECT * FROM reservation WHERE CONCAT(id,ordernum,account,name,phone,type,arrtime,other) LIKE CONCAT('%"+value+"%') ORDER BY id DESC",function (err,res,fields) {
            let reservation = res
            let date = {
                // banner:banner,
                // channal:channal,
                reservation:reservation,
            }
                    response.send(date)
                        
        });  
  });

router.get('/id', function(req, response, next) {
	var date = []
	let id = req.query.id
	connection.query("SELECT * FROM reservation WHERE id = '"+id+"'", function(err,res,fields) {
	    let reservation = res
	    let date = {
                  reservation:reservation,
                }
                response.send(date)
			    }); 
		    });
			
router.get('/update', function(req, response, next) {   
	let id = req.query.id
	connection.query("SELECT * FROM reservation WHERE id = '"+id+"'", function(err,res,fields) {
		response.send(res)
		}); 
	});		
					 
router.get('/del', function(req, response, next) {
	let id = req.query.id
	connection.query("DELETE FROM reservation WHERE id = '"+id+"'",function (err,res,fields) {
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
    let seatnum = req.query.seatnum
    let arrtime = req.query.arrtime
	let other = req.query.other
    connection.query("UPDATE reservation SET name = ?,phone = ?,type = ?,seatnum = ?,arrtime = ?,other = ? WHERE id = ?",[name,phone,type,seatnum,arrtime,other,id],function(err,data){
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
	let name =  req.query.name
	let phone =  req.query.phone
    let type =  req.query.type
    let seatnum =  req.query.seatnum
    let arrtime =  req.query.arrtime
	let pretime = req.query.pretime
	let other =  req.query.other
    connection.query("INSERT INTO reservation SET  ?",{ordernum:ordernum,account:account,name:name,phone:phone,type:type,seatnum:seatnum,arrtime:arrtime,pretime:pretime,other:other},function (err,res,fields) {
                    response.send({statusCode:200, msg:'添加成功'})
                        
        });  
  });
  
router.get('/order',function(req,response,next) {
  	var date = []
  	let account = req.query.account
  	connection.query("SELECT * FROM reservation where account = '"+account+"'",function (err,res,fields) {
  	    let reservation = res
  	    let date = {
  	              reservation:reservation,
  	            }
  	            response.send(date)
  	        }); 
  });

module.exports = router;