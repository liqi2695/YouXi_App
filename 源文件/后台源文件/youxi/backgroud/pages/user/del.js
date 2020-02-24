/*
 * @Author: https://github.com/WangEn
 * @Author: https://gitee.com/lovetime/
 * @Date:   2018-03-27
 * @lastModify 2018-3-28
 * +----------------------------------------------------------------------
 * | WeAdmin 表格table中多个删除等操作公用js
 * | 有改用时直接复制到对应页面也不影响使用
 * +----------------------------------------------------------------------
 */
// layui.extend({
// 	admin: '{/}../../static/js/admin'
// });
// layui.use(['laydate', 'jquery', 'admin'], function() {
// 	var laydate = layui.laydate,
// 		$ = layui.jquery,
// 		admin = layui.admin;
// 	//执行一个laydate实例
// 	laydate.render({
// 		elem: '#start' //指定元素
// 	});
// 	//执行一个laydate实例
// 	laydate.render({
// 		elem: '#end' //指定元素
// 	});
// 	/*用户-停用*/
// 	window.member_stop = function (obj, id) {
// 		layer.confirm('确认要停用吗？', function(index) {
// 			if($(obj).attr('title') == '启用') {

// 				//发异步把用户状态进行更改
// 				$(obj).attr('title', '停用')
// 				$(obj).find('i').html('&#xe62f;');

// 				$(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('已停用');
// 				layer.msg('已停用!', {
// 					icon: 5,
// 					time: 1000
// 				});

// 			} else {
// 				$(obj).attr('title', '启用')
// 				$(obj).find('i').html('&#xe601;');

// 				$(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('已启用');
// 				layer.msg('已启用!', {
// 					icon: 5,
// 					time: 1000
// 				});
// 			}
// 		});
// 	}

// 	/*用户-删除*/
// 	window.member_del = function (obj, id) {
// 		layer.confirm('确认要删除吗？', function(index) {
// 			//发异步删除数据
// 			$(obj).parents("tr").remove();
// 			layer.msg('已删除!', {
// 				icon: 1,
// 				time: 1000
// 			});
// 		});
// 	}

// 	window.delAll = function (argument) {
// 		var data = tableCheck.getData();
// 		layer.confirm('确认要删除吗？' + data, function(index) {
// 			//捉到所有被选中的，发异步进行删除
// 			layer.msg('删除成功', {
// 				icon: 1
// 			});
// 			$(".layui-form-checked").not('.header').parents('tr').remove();
// 		});
// 	}
	
// });




layui.extend({
	admin: '{/}../../static/js/admin'
});


var msg;
$.ajax({
	type: 'get',
	url: 'deluser.php',
	async:false,
	success: function (data) {
		msg = JSON.parse(data);
		$('.fr').text("共有数据: " + msg.length + " 条");
	}
});
//将数据库内容输入到data里
function creatData() {
	var data = [];
	var length = msg.length;
	for (var i = 0; i < length; i++) {
		var obj = {
			"Personalld": msg[i][0],
			"PersonalNickName": msg[i][1],
			// "PersonalAccount": msg[i][2],
			"PersonalPhone": msg[i][2],
			// "PersonalPassword": msg[i][3],
			"PersonalRegisterTime": msg[i][4]

		}
		data.push(obj);
	}
	return data;
}






layui.use(['table', 'jquery', 'form', 'admin'], function () {
	var table = layui.table,
		$ = layui.jquery,
		form = layui.form,
		admin = layui.admin;

	table.render({
		elem: '#delList',
		cellMinWidth: 80,
		cols: [
			[{
				type: 'checkbox'
			}, {
				field: 'Personalld', title: 'ID', sort: true
			}, {
				field: 'PersonalNickName', title: '用户名', templet: '#usernameTpl'
			}, 
				// field: 'PersonalAccount', title: '账号', templet: '#usernameTpl'
			 {
				field: 'PersonalPhone', title: '手机', templet: '#usernameTpl'
			}, 
			// {
			// 	field: 'PersonalPassword', title: '密码', templet: '#usernameTpl'
			// }, 
			{
				field: 'PersonalRegisterTime', title: '加入时间', sort: true
			}, {
				field: 'review', title: '状态', templet: '#recommendTpl', unresize: true
			}, {
				field: 'operate', title: '操作', toolbar: '#operateTpl', unresize: true
			}]
		],
		data: creatData(),
		id:'testReload',
		event: true,
		page: true
	});
	$('#search').click(function () {
		// var inputVal = $('.layui-input').val()
		var Nick = $('#user').val();
	     var date = $('#time').val();
	if($('#user').val()==""&&$('#time').val()==""){
		layer.msg('查询内容不能为空');
		return false;
	}
		table.reload('testReload', {
			url: 'delsearch.php'
			// ,methods:"post"
			,request: {
				pageName: 'page'  //页码的参数名称，默认：page
				,limitName: 'pageSize'  //每页数据量的参数名，默认：limit
			}
			,where: {
				// 向search.php传送数据
				start:  date,
				keyword:  Nick
			}
			,page: {
				curr: 1
			}
		});
		return false;
	})
	/*
	 *数据表格中form表单元素是动态插入,所以需要更新渲染下
	 * http://www.layui.com/doc/modules/form.html#render
	 * */
	$(function () {
		form.render();
	});

	var active = {
		getCheckData: function () { //获取选中数据
			var checkStatus = table.checkStatus('testReload'),
				data = checkStatus.data;
			//console.log(data);
			//layer.alert(JSON.stringify(data));
			if (data.length > 0) {
				layer.confirm('确认要恢复吗？' , function (index) {

					
					//找到所有被选中的，发异步进行恢复
					$(".layui-table-body .layui-form-checked").parents('tr').remove();
					//对其选中的，通过循环和ajax将每个id都发送到recover.php进行恢复
					   for (var i = 0; i < data.length; i++) {
						            var id = data[i]['Personalld'];
						            $.ajax({
						                type: 'get',
						                // async:false,
						                url: "recover.php?id=" + id
						            })
						        }
						layer.msg('恢复成功', {
							icon: 1
						});
						// location.replace(location.href);//自动刷新当前页面
						setTimeout(function(){
							location.replace(location.href);//修改成功后刷新父界面
                        }, 1000);
				});
			} else {
				layer.msg("请先选择需要恢复的用户！");
			}

		},
		// Recommend: function () {
		// 	var checkStatus = table.checkStatus('userList'),
		// 		data = checkStatus.data;
		// 	if (data.length > 0) {
		// 		layer.msg("您点击了推荐操作");
		// 		for (var i = 0; i < data.length; i++) {
		// 			console.log("a:" + data[i].recommend);
		// 			data[i].recommend = "checked";
		// 			console.log("aa:" + data[i].recommend);
		// 			form.render();
		// 		}

		// 	} else {
		// 		console.log("b");
		// 		layer.msg("请先选择");
		// 	}

			//$(".layui-table-body .layui-form-checked").parents('tr').children().children('input[name="zzz"]').attr("checked","checked");
		// },
		// Top: function () {
		// 	layer.msg("您点击了置顶操作");
		// },
		// Review: function () {
		// 	layer.msg("您点击了审核操作");
		// }

	};

	$('.demoTable .layui-btn').on('click', function () {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	//恢复用户
	// window.member_recover = function (obj) {
		
	// 	var str =$(obj).parents("tr") .text();
	// 	var reg = /[0-9]+/;
	// 	var id = str.match(reg)[0];
	// 	$.ajax({
	// 		type: 'get',
	// 		url: "recover.php?id=" + id
	// 	});
		
	// }
	window.member_recover = function (obj) {
		layer.confirm('确认要恢复吗？', function (index) {
			//发异步删除数据
			$(obj).parents("tr").remove();
			layer.msg('已恢复!', {
				icon: 1,
				time: 1000
			});
			//截取选中项的id，进行删除
		var str =$(obj).parents("tr") .text();
		var reg = /[0-9]+/;
		var id = str.match(reg)[0];
		$.ajax({
			type: 'get',
			url: "recover.php?id=" + id
		});
		setTimeout(function(){
			location.replace(location.href);//修改成功后刷新父界面
		}, 1000);
		});
		
		
}	

	/*用户-删除*/
	window.member_del = function (obj, id) {
		layer.confirm('确认要删除吗？', function (index) {
			//发异步删除数据
			$(obj).parents("tr").remove();
			layer.msg('已删除!', {
				icon: 1,
				time: 1000
			});
			//截取选中项的id，进行删除
		var str =$(obj).parents("tr") .text();
		var reg = /[0-9]+/;
		var id = str.match(reg)[0];
	$.ajax({
		type: 'get',
		url: "del.php?id=" + id,
	})
	setTimeout(function(){
		location.replace(location.href);//修改成功后刷新父界面
	}, 1000);
		});
		
	}

});

function delAll(argument) {
	var data = tableCheck.getData();
	layer.confirm('确认要删除吗？' + data, function (index) {
		//捉到所有被选中的，发异步进行删除
		layer.msg('删除成功', {
			icon: 1
		});
		$(".layui-form-checked").not('.header').parents('tr').remove();
	});
}