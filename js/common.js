
function bodyScale(){
	var devicewidth=document.documentElement.clientWidth;
	var scale=devicewidth/640;
	document.body.style.zoom=scale;
}
window.onload=window.onresize=function(){
	bodyScale();	



$(".back").on("touchend",function(){
	window.history.back(-1); 
})


//商品资料


//商品信息


// 购物车更新
// http://datainfo.duapp.com/shopdata/updatecar.php


// 商品添加到购物车

var username = localStorage.getItem("userID");
var num = 0;
var arr1 = $(".add").on("touchend",function(){
	var oId = window.location.href.split("=")[1];
	num++;
	addCar(oId,num);
})


//购物车栏上显示购物车的数量
function addCar(id,num){
	$.ajax({
		type:"post",
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		dataType:"text",
		data:{
			userID:username, 
			goodsID:id, //加入的商品ID
			number:num,
		},
		beforeSend:function(){
			// $(".load").show();
	    },
	    complete:function(){
	        // $(".load").hide();
	    },
		success:function(data){
			
		},
		error:function(str){
			// alert("发生错误33" + str);
		}
	});
}

$.ajax({
	type:"get",
	url:"http://datainfo.duapp.com/shopdata/getCar.php",
	dataType:"jsonp",
	jsonp:"callback",
	async:"true",
	data:{
		userID:username
	},
	beforeSend:function(){
		$("section").html();
		// $(".load").show();
    },
    complete:function(){
        // $(".load").hide();
    },
	success:function(data){
		var money = 0;
		var allnum = 0;
		var newShop = "";
		for(var k =0;k<data.length;k++){
			newShop += '<li><a href="#"><img src="'+data[k][3]+'"></a>'+
				'<div class="xinxi">'+
					'<p>'+data[k][2]+'</p>'+
					'<p class="leibie">'+data[k][7]+'</p>'+
					'<p class="price">单价:<span>￥'+data[k][4]+'</span></p>'+
					'<p>数量：<sapn>'+
					'<input type="button" name="" value="-" class="reduce">'+
					'<input type="text" name="" value="'+data[k][6]+'" class="geshu">'+
					'<input type="button" name="" value="+" class="create">'+
					'</sapn></p></div><span class="delete" id='+data[k][0]+'>'+
					'<i class="iconfont">&#xe68d;</i></span></li>';

					money += parseInt(data[k][6])* parseInt(data[k][4])
					allnum += parseInt(data[k][6]);

		}
		$(".numb").html(allnum);
		$(".allCount").html("￥"+money);
		$(".car").html(newShop);

		// 点击删除
		$(".delete").on("touchend",function(){
			var oId =$(this).attr("id");
			var num = 0;
			addCar(oId,num);
		})


		// 点击增加按钮

		$(".create").on("touchend",function(){
			var par = $(this).parent().parent().parent().parent();
			var oId = par.find(".delete").attr("id");
			var num = $(this).prev().attr("value");
			num++;
			addCar(oId,num);
			// console.log(oId)
		})
		// 点击减少按钮
		$(".reduce").on("touchend",function(){
			var par = $(this).parent().parent().parent().parent();
			var oId = par.find(".delete").attr("id");
			var num = $(this).next().attr("value");
			num--;
			addCar(oId,num);
			console.log(oId,num)
		})
	},
	error:function(str){
		alert("发生错误" + str);
	}
});
}
	