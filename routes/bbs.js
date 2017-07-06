var express=require('express');
var router=express.Router();
router.get('/',function(req,res,text){
	res.render('bbs',{'title':'社区'});
})
module.exports=router;