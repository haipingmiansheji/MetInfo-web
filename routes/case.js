var express=require('express');
var router=express.Router();
router.get('/',function(req,res,text){
	res.render('case',{'title':'案例'});
})
module.exports=router;