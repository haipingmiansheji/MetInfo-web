var express=require('express');
var router=express.Router();
router.get('/',function(req,res,text){
	res.render('download',{'title':'下载页面'});
})
module.exports=router;