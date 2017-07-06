var express=require('express');
var MongoClient=require('mongodb').MongoClient;
var db_conn_str='mongodb://localhost:27017/metinfo';
var router=express.Router();
router.get('/',function(req,res,text){
	res.render('resetting',{'title':'重置密码','email':req.query.email});
})
router.post('/post',function(req,res,text){
	MongoClient.connect(db_conn_str,function(err,db){
		if(err){
			console.log('Err1'+err);
			return;
		}
		var collection=db.collection('register');
		var success={
			code:'',
			insertResult:''
		}
		collection.find({email:req.body.email}).toArray(function(err,result){
			console.log(result)
			if(err){
				console.log('Err2'+err);
				return;
			}
			if(result+''){
				collection.update({email:req.body.email},{$set:{password:req.body.password}},function(err,result){
					if(err){
						console.log('Err3'+err);
						return;
					}
					success.code='200',
					success.insertResult=result;
					res.send(success);
				})
				db.close();
			}else{
				success.code='404',
				success.insertResult=result;
				res.send(success);
				
			}
		})
	})
})
module.exports=router;