var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var app=express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'bower_components')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//首页路由
app.use('/',require('./routes/index'));

//下载MetInfo路由
app.use('/download',require('./routes/download'));

//模版路由
app.use('/product',require('./routes/product'));

//案例路由
app.use('/case',require('./routes/case'));

//帮助路由
app.use('/help',require('./routes/help'));

//社区路由
app.use('/bbs',require('./routes/bbs'));

//登录路由
app.use('/login',require('./routes/login'));

//注册路由
app.use('/register',require('./routes/register'));


//忘记密码路由
app.use('/findpass',require('./routes/findpass'));

//修改密码
app.use('/resetting',require('./routes/resetting'));

//后台登录
app.use('/admin',require('./routes/admin'));
/*app.use(function(req,res,text){
	var error=new Error();
	error.code=404;
	error.message='没找到页面';
	text(error)
})*/


app.listen(3000,'127.0.0.1',function(){
	console.log('端口连接3000');
})