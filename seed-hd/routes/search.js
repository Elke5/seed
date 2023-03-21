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
    }
    
});

router.get('/', function(req, response, next) {
	var date = []
    //   console.log(req)
    let value = req.query.value
        connection.query("SELECT * FROM user WHERE CONCAT(id,username,account,age,sex,other) LIKE CONCAT('%"+value+"%') ORDER BY id DESC",function (err,res,fields) {
            let client = res
            let date = {
                // banner:banner,
                // channal:channal,
                client:client,
            }
                    response.send(date)
                        
        });  
  });

module.exports = router;