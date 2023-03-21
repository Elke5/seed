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
    connection.query("SELECT * FROM room",function (err,res,fields) {
        let room = res
        let date = {
                  room:room,
                }
                response.send(date)
                }); 
            }); 
			
router.get('/search', function(req, response, next) {
	var date = []
    //   console.log(req)
    let value = req.query.value
        connection.query("SELECT * FROM room WHERE CONCAT(id,type,number,price) LIKE CONCAT('%"+value+"%') ORDER BY id DESC",function (err,res,fields) {
            let room = res
            let date = {
                // banner:banner,
                // channal:channal,
                room:room,
            }
                    response.send(date)
                        
        });  
  });

router.get('/id', function(req, response, next) {
	var date = []
	let id = req.query.id
	connection.query("SELECT * FROM room WHERE id = '"+id+"'", function(err,res,fields) {
	    let room = res
	    let date = {
                  room:room,
                }
                response.send(date)
			    }); 
		    });
			
router.get('/update', function(req, response, next) {   
	let id = req.query.id
	connection.query("SELECT * FROM room WHERE id = '"+id+"'", function(err,res,fields) {
		response.send(res)
		}); 
	});		
					 
router.get('/del', function(req, response, next) {
	let id = req.query.id
	connection.query("DELETE FROM room WHERE id = '"+id+"'",function (err,res,fields) {
		if(err){
			return  response.send({statusCode:0, msg:'删除失败'})
		}else{
            return  response.send({statusCode:200, msg:'已删除'}) 
            }
	    });  
	});
	
router.get('/updatelist', function(req, response, next) {
	let id = req.query.id
    let type = req.query.type
    let number = req.query.number
    let price = req.query.price
	let content = req.query.content
    connection.query("UPDATE room SET type = ?,number = ?,price = ?,content = ? WHERE id = ?",[type,number,price,content,id],function(err,data){
                if(err){
                    throw err
                } else {
                console.log('插入数据成功');
                return response.send({err:200,msg:'修改成功'})
                }
                })  
});

router.get('/add', function(req, response, next) {
    let type =  req.query.type
    let number =  req.query.number
    let price =  req.query.price
	let content =  req.query.content
    connection.query("INSERT INTO room SET  ?",{type:type,number:number,price:price,content:content},function (err,res,fields) {
                    response.send({statusCode:200, msg:'添加成功'})
                        
        });  
  });

module.exports = router;