var express=require('express');
var MongoClient=require('mongodb').MongoClient;
var db_conn_str='mongodb://localhost:27017/metinfo';
var router=express.Router();
router.get('/',function(req,res,text){
	res.render('register',{'title':'会员注册'});
})
router.post('/post',function(req,res,text){
	MongoClient.connect(db_conn_str,function(err,db){
		if(err){
			console.log('Error'+err);
			return;
		}
		var collection=db.collection('register');
		var data=req.body;
		var seccuss={
			code:'',
			insertResult:''
		};
		collection.find({email:data.email}).toArray(function(err,result){
			if(err){
				console.log('Error失败1'+err);
				return;
			}else{
				if(result+''){
					seccuss.code=200;
					seccuss.insertResult=result;
					res.send(seccuss)
					return;
				}else{
					collection.insert(data,function(err,result){
						if(err){
							console.log('Error失败2'+err);
							return;
						}else{
							//res.render('index',{'title':'首页'});
							res.send('/')
						}
					})
					db.close();
				}
			}
		})
		
	})
})
module.exports=router;