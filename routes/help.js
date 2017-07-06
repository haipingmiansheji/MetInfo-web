var express=require('express');
var router=express.Router();
router.get('/',function(req,res,text){
	res.render('help',{'title':'帮助'})
})
module.exports=router;