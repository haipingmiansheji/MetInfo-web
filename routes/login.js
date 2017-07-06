var express=require('express');
var MongoClient=require('mongodb').MongoClient;//启动mongodb
var db_conn_str='mongodb://localhost:27017/metinfo';//mongodb数据库路径
var router=express.Router();

router.get('/',function(req,res,text){
	res.render('login',{'title':'会员登陆'})
})
router.get('/get',function(req,res,text){

	//连接数据库
	MongoClient.connect(db_conn_str,function(err,db){
		if(err){
			console.log('Error1'+err);
			return;
		}
		var success={
			code:'',
			insertResult:''
		}
		//连接数据集合
		var collection=db.collection('register');
		collection.find({$and:[{email:req.query.email},{password:req.query.password}]}).toArray(function(err,result){
			if(err){
				console.log('Error2'+err);
				return;
			}
			if(result+''){
				success.code='200';
				success.insertResult=result;
				res.send(success);
			}else{
				success.code='404';
				success.insertResult=result;
				res.send(success);
			}
		})
		db.close();

	})
})
module.exports=router;