$(function(){
	var user = JSON.parse(localStorage.getItem("user"));
	var currentuser = JSON.parse(localStorage.getItem("currentuser"));
	console.log('user ==>',user);
	console.log('currentuser ==>',currentuser);
	for(var i = 0 ;i<user.length;i++){
		if(user[i].number == currentuser){
			var currentProducts = user[i].product;
		}
	}
	console.log('currentProducts ==>',currentProducts);
	
	
	initLeftBody(currentProducts);
	initUserProducts(currentProducts);
	function initLeftBody(currentProducts){
		for( key in currentProducts){
		
			var $insertli = $(`<li class="text-secondary" data-type="${key}">${key}</li>`);	
			var $selectli = $(`<li class="text-secondary" data-type="${key}">${key}</li>`);
			//给左边操作列表添加项目
			$(".add").append($insertli);
			$(".showdata").append($selectli);
			
			$('.showdata').find('li').click(function(){
				$(this).addClass('pro-active').siblings().removeClass('pro-active');
			}).eq(0).addClass('pro-active');
			
			$('.rightbody').data('type',$('.showdata').find('li').eq(0).data('type'));
			$('.p-t').text($('.pro-active').text());
			
			$('.inputkind').val($('.add').children().eq(0).text());//自动获取类型
			$('.add-box').data('type',$('.add').find('li').eq(0).data('type'))//获取data-type
			$('.add').find("li").eq(0).text();
		}
	}
	
	var inittype = $('.showdata').children().eq(0).data('type');//初始化时获取类型
	initUserProducts(currentProducts,inittype);
	function initUserProducts(currentProducts,type){
			
			//列表添加信息
			$.each(currentProducts[type],function(i,item) {
				var $tr = $(`<tr><td>${i + 1}</td>
				<td>
					<div class="pro-img">
						<img class="d-block w-100" src="${item.img}" alt="">
					</div>
				</td>
				<td>
					<div class="pro-title">${item.name}</div>
				</td>
				<td>
					<div class="pro-price">${item.price}</div>
				</td>
				<td>
					<button type="button" class="btn btn-warning btn-sm eidt" data-id="${item.id}">编辑</button>
					<button type="button" class="btn btn-danger btn-sm rm" data-id="${item.id}">删除</button>
				</td></tr>`);
				
				$('tbody').append($tr); 
				
				//编辑商品
				$(".eidt").click(function(){
					$('#edit-pro-type').data('type',$('.pro-active').data('type')).val($('.pro-active').text());
					//获取商品的数据
					var $tr = $(this).parents('tr');
					
					var title = $tr.find(".pro-title").text();
					
					var price = $tr.find(".pro-price").text();
					
					var img = $tr.find('img').attr('src');
					
					$('[data-title="title"]').val(title);
					$('[data-title="price"]').val(price);
					$('[data-title="img"]').val(img);
					
					$('#mtitle').data('id',$(this).data('id'));
					$('#editm1').modal();
				})
				
				//保存编辑
				$('#saveedit').click(function(){
					//获取商品类型
					var type = $('#edit-pro-type').data('type');
					
					//获取商品id
					var id = $('#mtitle').data('id');
					var product = "product";
					//查找修改商品id
					for(var i = 0;i<user.length;i++){
						if(currentuser == user[i].number){
							var  target = i;
						}
						for(var j = 0;j<user[target][product][type].length;j++){
							if(id==user[target][product][type][j].id){
								$('.edit-pro').each(function(){
									var key = $(this).data('title');
									user[target][product][type][j][key] = $(this).val();
								})
								//写入本地存储
								localStorage.setItem('user',JSON.stringify(user));
								break;
							}
						}
					}
					$('#editm1').modal('hide');
					
					//更新列表
					location.reload();
				})
				
				//删除商品
				$('.rm').click(function(){
					var type = $('.pro-active').data('type');
					
					//获取商品id
					var id = $(this).data('id');
					var product = "product";
					for(var i = 0;i<user.length;i++){
						if(currentuser == user[i].number){
							var  target = i;
						}
						for(var j = 0;j<user[target][product][type].length;j++){
							if(id==user[target][product][type][j].id){
								//删除当前匹配的id的商品
								user[target][product][type].splice(j,1);
								//写入本地内存
								localStorage.setItem('user',JSON.stringify(user));
								
								//删除本页的tr
								$(this).parents('tr').remove();
								
								//修改序号
								$('tbody>tr').each(function(k){
									$(this).find('td').eq(0).text(k + 1);
								})
								break;
							}
						}
					}
				})
			})
			


	}
	
	//添加商品类型页面
	$('.insertkind').click(function(){
		$('.rightbody').hide().next().show().next().hide();

	})
	
	//查看商品类型页面
	$('.showpage').click(function(){
		$('.rightbody').show().next().hide().next().hide();
	})
	
	//添加商品页面
	$('.addpage').click(function(){
		$('.rightbody').hide().next().hide().next().show();
	})
	
	
	//添加新的输入框
	var addinputid = 2;
	$('#addinput').click(function(){
		if(addinputid >= 5){
			alert("最多一次添加四条");
			return;
		}
		var $div = $(`<div class="input-box mt-4">
							<p>添加第${addinputid}个商品类型</p>
							<div class="input-group mb-3 col-8 px-0">
								<div class="input-group-prepend">
									<span class="input-group-text" id="basic-addon3">商品类型</span>
								</div>
								<input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
							</div>
						</div>`);
		$div.insertBefore($('.insert-box').find(".btn-info"));
		addinputid++;
	})
	//保存商品类型
	$('#savekinds').click(function(){
		var kinds = $('.insert-box').find('input');
		for(var i = 0; i<kinds.length;i++){
			var kind = kinds[i].value;
			currentProducts[kind] = [];
		}
		for(var i = 0;i<user.length;i++){
			if(user[i].number == currentuser){
				var target  = i;
			}
		}
		user[target].product = currentProducts;
		localStorage.setItem('user',JSON.stringify(user));
		alert("添加成功");
		location.reload();
	})
	//清空输入框
	$('.clearinputs').click(function(){
		var inputs = $(this).parent().find('input');
		for(var i = 0;i<inputs.length;i++){
			inputs[i].value = "";
		}
	})
	//添加商品
	$(".addpage").click(function(){
		$('.add').find("li").click(function(){
			$(this).addClass('pro-active').siblings().removeClass('pro-active');
			$('.add-box').data('type',$(this).data('type')).find('.inputkind').val($(this).data('type'));
			console.log('type ==>',$('.add-box').data('type'))
		}).eq(0).addClass("pro-active")
		
	})
	
	//保存商品
	$('#save').click(function(){
		for(var i = 0;i<user.length;i++){
			if(currentuser == user[i].number){
				var target = i;
				break;
			}
		}
		var inputs = $('.add-box').find('input');
		console.log('inputs ==>',inputs);
		var json = {
			"name":inputs[1].value,
			"price":inputs[2].value,
			"img":inputs[3].value,
			"id":Math.random().toString().slice(2)
		}
		var type = $('.add-box').data('type');
		var product = 'product';
		user[i][product][type][user[i][product][type].length] = json;
		console.log('user[i][product] ==>',user[i][product]);
		localStorage.setItem('user',JSON.stringify(user));
		console.log(JSON.parse(localStorage.getItem('user')));
		alert("添加成功！");
		location.reload();
	})

	//查看商品
	$('.showdata').find('li').click(function(){
		var type = $('.pro-active').data('type');
		console.log(type);

		$('.rightbody').find('tbody').empty();
		for(var i = 0;i<user.length;i++){
			if(user[i].number = currentuser){
				var target = i;
				break;
			}
		}
		var product = "product";
		var data = user[i][product];
		console.log(data);
		initUserProducts(data,type);
	})
	
})