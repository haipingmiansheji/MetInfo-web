var express=require('express');
var router=express.Router();
router.get('/',function(req,res,text){
	res.render('admin',{'title':'后天登录页'});
})
router.get('/system',function(req,res,text){
	res.render('system',{'title':'后台管理系统'});
})
module.exports=router;