(function(){
	if(localStorage.getItem("user")){
		return;
	}
var user = [
	{
		number:"18911111111",
		username:"eldersles1",
		pwd:"123123",
		product:{
			"电脑":[
				{
					"name":"小米电脑",
					"price":"3200.0",
					"img":"img/jiajudiannao1.jpg"
				}
			]
		}
	},
	{
		number:"18922222222",
		username:"eldersles2",
		pwd:"123123",
		product:{
			"电脑":[
				{
					"name":"小米电脑",
					"price":"3200.0",
					"img":"img/jiajudiannao1.jpg"
				}
			]
		}
	},
	{
		number:"18933333333",
		username:"eldersles3",
		pwd:"123123",
		product:{
			"电脑":[
				{
					"name":"小米电脑",
					"price":"3200.0",
					"img":"img/jiajudiannao1.jpg"
				}
			]
		}
	},
	{
		number:"18944444444",
		username:"eldersles4",
		pwd:"123123",
		product:{
			"电脑":[
				{
					"name":"小米电脑",
					"price":"3200.0",
					"img":"img/jiajudiannao1.jpg"
				}
			]
		}
	}
];
var id = 1;
var product = "product";
for(var i = 0;i<user.length;i++){
	for( key in user[i][product]){
		for(var j = 0;j<user[i][product][key].length;j++){
			user[i][product][key][j].id = Math.random().toString().slice(2) + id;
			id++;
		}
	}
}

localStorage.setItem('user',JSON.stringify(user));
})()
