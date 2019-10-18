$(function(){
	//获取登录用户信息
	var currentuser  = localStorage.getItem("currentuser");//获取登录时的用户名
	var user =JSON.parse(localStorage.getItem("user"));
	for(var i = 0; i < user.length;i++){
		if(user[i].number == currentuser){
			var currentusername = user[i].username;
		}
	}
	$('.welcome').text(currentusername+" 欢迎你");
	
})
