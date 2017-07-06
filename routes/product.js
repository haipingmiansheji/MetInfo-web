var express=require('express');
var router=express.Router();
router.get('/',function(req,res,text){
	res.render('product',{'title':'模版'});
})
module.exports=router;