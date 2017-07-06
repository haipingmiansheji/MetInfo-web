var express=require('express');
var router=express.Router();
router.get('/',function(req,res,text){
	res.render('index',{'title':'主页'});
})
module.exports=router