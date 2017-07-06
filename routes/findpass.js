var express=require('express');
var nodemailer=require('nodemailer');
var MongoClient=require('mongodb').MongoClient;
var transporter=nodemailer.createTransport({
	service:'qq',
	auth:{
		user:'827543331@qq.com',
		pass:'ztjkkcjpdpvzbdee'
	}
});
var db_conn_str='mongodb://localhost:27017/metinfo';
var router=express.Router();
router.get('/',function(req,res,text){
	res.render('findpass',{'title':'修改密码'})
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
			if(err){
				console.log('Err2'+err);
				return;
			}else{
				if(result+''){
					transporter.sendMail({
						from:'827543331@qq.com',
						to:req.body.email,
						subject:'metInfo邮件发送',
						html:'<h2>密码修改点击下面地址</h2><p><a href="http://localhost:3000/resetting?email='+req.body.email+'">重置密码</a></p>'
					},function(err,info){
						if(err){
							console.log('Err3'+err);
							return;
						}
						console.log('发送成功')
					})
					success.code='200',
					success.insertResult=result;
					res.send(success);
				}else{
					success.code='404',
					success.insertResult=result;
					res.send(success);
				}
			}
		})
		db.close();
	})
})
module.exports=router;