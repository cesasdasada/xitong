function check(){
	var number = $('#number').val();
	var pwd = $('#password').val();
	var user =JSON.parse(localStorage.getItem("user"));
	var bool = user.length;
	for(var i = 0;i<user.length;i++){
		if(user[i].number == number){
			if(user[i].pwd == pwd){
				alert("登陆成功");
				window.location.href="index.html";
				localStorage.setItem("currentuser",user[i].number);
			}else{
				alert("密码错误");
			}
			bool--;
		}
	}
	if(bool == user.length){
		alert("账户不存在，请注册")
	}
	
}