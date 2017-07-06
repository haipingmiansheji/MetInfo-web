$(function(){
	/*头部导航背景颜色*/
	(function(){
		$('#menu').find('a').each(function(index, el) {
			if(window.location.href.indexOf($(el).attr('href'))>-1){
				$(el).css({'color':'#361183','background-color':'#eee'});
			}
		});
	})();
	/*首页轮播*/
	$('.carousel').carousel();
	$(".left").click(function(){
        $('.carousel').carousel('prev');
     });
	$(".right").click(function(){
        $('.carousel').carousel('next');
     });
	$('.carousel-indicators li').each(function(index,domFile){
		$(domFile).click(function(){
			$('.carousel').carousel(index);
		})
	})
	$('[data-toggle="popover"]').popover();


	/*product页面动画*/
	$('.webList').each(function(index, el) {
		$(el).find('img').on('mouseover',function(){
			$(this).animate({
				'top':-$(this).height()+$(el).find('a').height()+'px'
			},3000)
		})
		$(el).find('img').on('mouseout',function(){
			if(parseFloat($(this).css('top'))<=0){
				$(this).animate({
					'top':0+'px'
				},3000)
			}
		})
	});

	/*product分页代码开始*/
	(function aplicationPage(json){
		if(json.id){
			var page=$('#'+json.id);
			var nowNum=json.nowNum||4;
			var allNum=json.allNum||7;
			var callBack=json.callBack||function(){};

			if(nowNum>=2){
		        var oA=document.createElement('a');
		        oA.innerHTML='上一页';
		        oA.href='#'+(nowNum-1);
		        page.append(oA)
		    }else{
		        var oSpan=document.createElement('span');
		        oSpan.innerHTML='上一页';
		        oSpan.className='disable'
		        page.append(oSpan)
		    }
		    if(nowNum>=5 && allNum>=7){
		        var oA=document.createElement('a');
		        oA.innerHTML='...1';
		        oA.href='#1';
		        page.append(oA);
		    }


			if(allNum<=7){
				for(var i=1;i<allNum;i++){
					var oA=document.createElement('a');
					if(nowNum==i){
						oA.className='active';
					}
					oA.href="#"+i;
					oA.innerHTML=i;
					page.append(oA)
				}
				
			}else{
				for(var i=1;i<=7;i++){
					if(nowNum==1 || nowNum==2 || nowNum==3){
						var oA=document.createElement('a');
                        if(nowNum==i){
                            oA.className='active';
                        }
                        oA.href='#'+i;
                        oA.innerHTML=i;
					}else if(allNum-nowNum==0 || allNum-nowNum==1 || allNum-nowNum==2){
						var oA=document.createElement('a');
                        if(allNum-nowNum==0 && i==7){
                            oA.className='active';
                        }
                        if(allNum-nowNum==1 && i==6){
                            oA.className='active';
                        }
                        if(allNum-nowNum==2 && i==5){
                            oA.className='active';
                        }
                        oA.href='#'+(allNum-7+i);
                        oA.innerHTML=allNum-7+i;
                        page.append(oA);
					}else{
						var oA=document.createElement('a');
						if(i==4){
							oA.className='active';
						}
						oA.href='#'+(nowNum-4+i);
	                    oA.innerHTML=nowNum-4+i;
                    }
                    page.append(oA);
				}
			}
			if(allNum-nowNum>=4 && allNum>=7){
	            var oA=document.createElement('a');
	            oA.innerHTML='...'+allNum;
	            oA.href='#'+allNum;
	            page.append(oA)
	        }
	        if(allNum-nowNum!=0){
	            var oA=document.createElement('a');
	            oA.innerHTML='下一页';
	            oA.href='#'+(nowNum+1);
	            page.append(oA)
	        }else{
	            var oSpan=document.createElement('span');
	            oSpan.innerHTML='下一页';
	            oSpan.className='disable'
	            page.append(oSpan)
	        }
		}
		callBack(nowNum,allNum)
		var aA=$('#'+json.id).find('a');
		aA.each(function(index,el){
			$(el).on('click',function(){
				var nowNum=parseInt(this.getAttribute('href').substring(1));
				page.html('');
				aplicationPage({
                id:json.id,
                nowNum:nowNum,
                allNum:allNum,
                callBack:function(nowNum,allNum){
                    //alert(nowNum+':'+allNum)
               		}
            	})
				return false;

			})
		})
	})({
	    id:'page',
	    nowNum:1,
	    allNum:17,
	    callBack:function(nowNum,allNum){
	        //alert(nowNum+':'+allNum)
    	}
	});
	/*product分页代码结束*/
	/*case 移入算法*/

	$('.caseWebList img').each(function(index,el){
		$(el).on('mouseover',function(){
			$(this).prev().animate({
				'left':0+'px'
			},1000,function(){
				$(el).prev().find('input').each(function(index,el){
					$(el).on('mouseover',function(){
						$(this).parent().stop()
					})
				})
				$(el).prev().on('mouseover',function(){
					$(this).stop()
					})
					$(el).prev().on('mouseout',function(){
					$(this).animate({
						'left':-100+'%'
						},1000)
				})

			})

		})	

	});

	/*注册*/
	(function(){
		$('#register').on('click',function(){
			var email=$('#exampleInputEmail1').val();
			var company=$('#exampleInputCompany').val();
			var password=$('#exampleInputPassword').val();
			var confirmPassword=$('#exampleInputConfirmPassword').val();
			var errorMessage=$('.errorMessage');
			var err='';

			//验证邮箱
			if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)){
				err+='ok';
			}else{
				err+='邮箱不正确';
			}

			//验证公司名称
			if(/^[\u4e00-\u9fa5_a-zA-Z0-9-]{1,16}$/.test(company)){
				err+='ok';
			}else{
				err+='/公司名称不正确';
			}

			//验证密码
			if(/^([A-Z]|[a-z]|[0-9]|[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>\/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]){6,20}$/.test(password)){
				if(password===confirmPassword){
					err+='ok';
				}else{
					err+='/密码两次不一样';
				}
			}else{
				err+='/密码不正确';
			}
			

			//错误信息提示
			if(!err){
				errorMessage.find('b').html('请输入邮箱/公司名称/密码');
				errorMessage.css({'display':'block'});
			}if(err==='okokok'){
				registerPost(email,company,password,errorMessage)
			}else{
				err=err.replace(/[ok|\/]/g,'');
				errorMessage.find('b').html(err);
				errorMessage.css({'display':'block'});
			}

		})
		function registerPost(email,company,password,errorMessage){
			$.ajax({
				url:'/register/post',
				data:JSON.stringify({
					'email':email,
					'company':company,
					'password':password
				}),
				type:'POST',
				contentType:'application/json',
				success:function(obj){
					if(obj.code){
						errorMessage.find('b').html('用被户注册');
						errorMessage.css({'display':'block'});
					}else{
						errorMessage.find('b').html('');
						errorMessage.css({'display':'none'});
						alert('注册成功');
						window.location.href='/login';
					}
				}
			})
		}
	})();

	/*登录*/
	(function(){
		$('#login').on('click',function(){
			var email=$('#exampleInputEmail1').val();
			var password=$('#exampleInputPassword').val();
			var errorMessage=$('.errorMessage');
			var err='';

			//验证输入邮箱是否正确
			if(/^\s*$/.test(email)){
				err+='邮箱不能为空';
			}else if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)){
				err+='';
			}else{
				err+='邮箱输入不正确';
			}
			//验证输入密码是否正确
			if(/^\s*$/.test(password)){
				err+='密码不能为空';
			}else if(/^([A-Z]|[a-z]|[0-9]|[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>\/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]){6,20}$/.test(password)){
				err+='';
			}else{
				err+='密码输入不正确';
			}

			if(err){
				errorMessage.find('b').html(err);
				errorMessage.css({'display':'block'});
				$(this).css({'backgroundColor':'#ACACAC','cursor':'not-allowed'})
				$(this).unbind('click');
			}else{
				var _this=$(this);
				errorMessage.find('b').html('');
				errorMessage.css({'display':'none'});
				loginGet(_this,email,password,errorMessage)
			}
		})
		function loginGet(_this,email,password,errorMessage){
			//console.log(email,password)
			$.ajax({
				url:'login/get',
				data:{
					'email':email,
					'password':password
				},
				type:'GET',
				contetnType:'application/json',
				success:function(obj){
					//console.log(obj)
					if(obj.code=='404'){
						errorMessage.find('b').html('邮箱/密码错误');
						errorMessage.css({'display':'block'});
						_this.css({'backgroundColor':'#ACACAC','cursor':'not-allowed'});
						_this.unbind('click');
					}else if(obj.code=='200'){
						alert('登陆成功');
						if(window.localStorage){
							for(var i=0;i<obj.insertResult.length;i++){
								localStorage.setItem('metInfo',obj.insertResult[i].email+','+obj.insertResult[i].company);
							}
							window.location.href="/";
						}
					}
				}

			})
		}
	})();

	//页面登录状态
	(function(){
		if(window.localStorage){
			//var key=localStorage.key('metInfo');
			var value=localStorage.getItem('metInfo');
			var valueArr=value.split(',');
			if(value){
				$('#user-static').removeClass('show').addClass('hidden');
				$('#user-success').find('.btn-default').html(valueArr[1]);
				$('#user-success').removeClass('hidden').addClass('show');
			}else{
				$('#user-success').removeClass('show').addClass('hidden');
				$('#user-success').find('.btn-default').html('');
				$('#user-static').removeClass('hidden').addClass('show');
			}
			$('#exit').on('click',function(){
				localStorage.setItem('metInfo','');
				window.location.href="/";
			})
		}
	})();

	//修改密码
	(function(){
		/*生成验证码*/
		var validateStr='';
		(function(fontNum,fontSize,left,top,fn){
			var myCanvas=document.getElementById('myCanvas');
			if(!myCanvas){
				return;
			}
			var ctx=myCanvas.getContext("2d");
			function randomImg(){
				var arr=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r', 's','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z'];
				for(var i=0,str='';i<fontNum;i++){
					var random=Math.floor(Math.random()*(arr.length));
					str+=arr[random];
				}
				ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
				for(var k=0;k<50;k++){
					var startX=Math.floor(Math.random()*(myCanvas.width));
					var startY=Math.floor(Math.random()*(myCanvas.height));
					var endX=Math.floor(Math.random()*(myCanvas.width));
					var endY=Math.floor(Math.random()*(myCanvas.height));
					ctx.beginPath();
					ctx.moveTo(startX,startY);
					ctx.lineTo(endX,endY);
					ctx.stroke();
				}
				
				ctx.font=fontSize+"px Arial";
				var gradient=ctx.createLinearGradient(0,0,myCanvas.width,0);
				gradient.addColorStop("0","magenta");
				gradient.addColorStop("0.05","blue");
				gradient.addColorStop("0.3","red");
				ctx.fillStyle=gradient;
				ctx.fillText(str,left,top);
				if(fn){
					fn(str);
				}
			}
			randomImg();
			myCanvas.onclick=function(){
				randomImg();
			}
		})(4,40,5,30,function(str){
			validateStr=str;
		});

		$('#nextStep').on('click',function(){
			var email=$('#exampleInputEmail1').val();
			var validate=$('#exampleInputValidate').val();
			var errorMessage=$('.errorMessage');
			var err='';
			if(/^\s*$/.test(email)){
				err+='邮箱不能为空';
			}else if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)){
				err+='';
			}else{
				err+='邮箱不正确';
			}
			if(/^\s*$/.test(validate)){
				err+='验证码不能为空';
			}else if(validate.toLowerCase()==validateStr.toLowerCase()){
				err+='';
			}else{
				err+='验证码不正确';
			}

			if(err){
				errorMessage.find('b').html('')
				errorMessage.find('b').html(err);
				errorMessage.css({'display':'block'});
			}else{
				findpassPost(email,errorMessage);
			}


		})

		function findpassPost(email,errorMessage){
			$.ajax({
				url:'findpass/post',
				data:JSON.stringify({
					'email':email
				}),
				type:'post',
				contentType:'application/json',
				success:function(obj){
					if(obj.code=='200'){
						alert('已发送邮箱');
						errorMessage.find('b').html('');
						errorMessage.css({'display':'none'});
					}else if(obj.code=='404'){
						errorMessage.find('b').html('不是注册邮箱');
						errorMessage.css({'display':'block'});
					}
				}
			})
		}

	})();

	//重置密码
	(function(){
		$('#resetting').on('click',function(){
			var password=$('#exampleInputPassword').val();
			var resetpassword=$('#exampleInpuResetting').val();
			var email=$('#exampleInpuHidden').val();
			var errorMessage=$('.errorMessage');
			var err='';
			if(/^\s*$/.test(password)){
				err+='密码不能为空';
			}else if(/^([A-Z]|[a-z]|[0-9]|[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>\/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]){6,20}$/.test(password)){
				err+='';
			}else{
				err+='密码错误';
			}

			if(/^\s*$/.test(resetpassword)){
				err+='确认密码不能为空';
			}else if(/^([A-Z]|[a-z]|[0-9]|[`~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>\/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]){6,20}$/.test(resetpassword)){
				err+='';
			}else{
				err+='确认密码错误';
			}
			if(err){
				errorMessage.find('b').html('')
				errorMessage.find('b').html(err);
				errorMessage.css({'display':'block'});
			}else{
				if(password==resetpassword){
					errorMessage.find('b').html('')
					errorMessage.css({'display':'none'});
					resettingPost(email,password,errorMessage)
				}else{
					errorMessage.find('b').html('')
					errorMessage.find('b').html('两次密码不一样');
					errorMessage.css({'display':'block'});
				}
			}
		})
		function resettingPost(email,password,errorMessage){
			$.ajax({
				url:'resetting/post',
				data:JSON.stringify({
					'email':email,
					'password':password
				}),
				type:'post',
				contentType:'application/json',
				success:function(obj){
					if(obj.code=='404'){
						errorMessage.find('b').html('')
						errorMessage.find('b').html('重置失败');
						errorMessage.css({'display':'block'});
					}else if(obj.code=='200'){
						console.log(obj)
						errorMessage.find('b').html('')
						errorMessage.css({'display':'none'});
						//window.location.href='/login';
					}
				}
			})
		}
	})();
	//system 操作
	(function(){
		//系统时间
		(function(){
			function time(){
				var date=new Date();
				var year=date.getFullYear()+'';
				var month=date.getMonth()+1;
				month<10?month='0'+month:month=month+'';
				var today=date.getDate();
				today<10?today='0'+today:today=today+'';
				var hours=date.getHours();
				hours<10?hours='0'+hours:hours=hours+'';
				var minutes=date.getMinutes();
				minutes<10?minutes='0'+minutes:minutes=minutes+'';
				var seconds=date.getSeconds();
				seconds<10?seconds='0'+seconds:seconds=seconds+'';
				var week=date.getDay();
				switch(week){
					case 1:
						week='星期一';
						break;
					case 2:
						week='星期二';
						break;
					case 3:
						week='星期三';
						break;
					case 4:
						week='星期四';
						break;
					case 5:
						week='星期五';
						break;
					case 6:
						week='星期六';
						break;
					default:
						week='星期日';
				}
				$('.time').html(year+'年 '+month+'月'+today+'日 '+hours+':'+minutes+':'+seconds+' '+week)
			}
			time()
			setInterval(time,1000)
		})();
		//系统操作
		$('.system-left-switch').find('a').each(function(index,el){
			$(el).on('click',function(){
				$(this).parents('ul').find('a').each(function(index,el){
					$(el).css({'background':'#32323a'})
				})
				$(this).css({'background':'#3c9fe2'})
				$('.system-right-wrap').children().addClass('hidden');
				$('.system-right-wrap').children('.'+$(this).attr('href').slice(1)).removeClass('hidden').addClass('show')
			})
		})
		//模版操作
		$('.system-head-template').find('a').each(function(index,el){
			$(el).on('click',function(){
				$(this).parents('ul').find('a').each(function(index,el){
					$(el).removeClass('active');
				})
				$(this).addClass('active');
				$('.system-body-template').children('.add-template').each(function(index,el){
					$(el).addClass('hidden');
				})
				$($('.system-body-template').children('.add-template')[index]).removeClass('hidden').addClass('show');
			})
		})
		//删除模版
		$('.system-template').find('table a').each(function(index, el) {
			var boolean=true;
			$(el).on('click',function(){
				if(boolean){
					$(this).attr('title',boolean);
					$(this).css({'background-position':'0px -20px'});
					boolean=false;
				}else{
					$(this).attr('title',boolean);
					$(this).css({'background-position':'0px 0'});
					boolean=true;
				}
			})
		});
		$('.system-template .delete-file').find('input').on('click',function(){
			$(this).parents('.system-body-list').find('table a').each(function(index, el) {
				if(el.title=='true'){
					$(el).parents('tr').remove()
				}
			});
		});
		//案例操作
		$('.system-head-case').find('a').each(function(index,el){
			$(el).on('click',function(){
				$(this).parents('ul').find('a').each(function(index,el){
					$(el).removeClass('active');
				})
				$(this).addClass('active');
				$('.system-body-case').children('.add-template').each(function(index,el){
					$(el).addClass('hidden');
				})
				$($('.system-body-case').children('.add-template')[index]).removeClass('hidden').addClass('show');
			})
		})

		//删除案例
		$('.system-case').find('table a').each(function(index, el) {
			var boolean=true;
			$(el).on('click',function(){
				if(boolean){
					$(this).attr('title',boolean);
					$(this).css({'background-position':'0px -20px'});
					boolean=false;
				}else{
					$(this).attr('title',boolean);
					$(this).css({'background-position':'0px 0'});
					boolean=true;
				}
			})
		});
		$('.system-case .delete-file').find('input').on('click',function(){
			$(this).parents('.system-body-list').find('table a').each(function(index, el) {
				if(el.title=='true'){
					$(el).parents('tr').remove()
				}
			});
		});

		//帮助
		$('.system-head-help').find('a').each(function(index,el){
			$(el).on('click',function(){
				$(this).parents('ul').find('a').each(function(index,el){
					$(el).removeClass('active');
				})
				$(this).addClass('active');
				$('.system-body-help').children('.add-template').each(function(index,el){
					$(el).addClass('hidden');
				})
				$($('.system-body-help').children('.add-template')[index]).removeClass('hidden').addClass('show');
			})
		});

		//社区
		$('.system-head-bbs').find('a').each(function(index,el){
			$(el).on('click',function(){
				$(this).parents('ul').find('a').each(function(index,el){
					$(el).removeClass('active');
				})
				$(this).addClass('active');
				$('.system-body-bbs').children('.add-template').each(function(index,el){
					$(el).addClass('hidden');
				})
				$($('.system-body-bbs').children('.add-template')[index]).removeClass('hidden').addClass('show');
			})
		});

		//用户
		$('.system-head-user').find('a').each(function(index,el){
			$(el).on('click',function(){
				$(this).parents('ul').find('a').each(function(index,el){
					$(el).removeClass('active');
				})
				$(this).addClass('active');
				$('.system-body-user').children('.add-template').each(function(index,el){
					$(el).addClass('hidden');
				})
				$($('.system-body-user').children('.add-template')[index]).removeClass('hidden').addClass('show');
			})
		});


		//留言
		var summernote_1=document.getElementById('summernote-1');
		if(summernote_1){
			$('#summernote-1').summernote({
				height:400,
				minHeight: null,
				maxHeight: null,
				focus: true
			});
			$('#summernote-2').summernote({
				height:400,
				minHeight: null,
				maxHeight: null,
				focus: true
			});

		}



	})();

});