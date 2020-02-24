layui.extend({
	admin: '{/}../../static/js/admin'
});


var msg;
$.ajax({
	type: 'get',
	url: 'role.php',
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
			"id": msg[i][0],
			"role": msg[i][1],
			"des": msg[i][2]
			// "AdminEmail": msg[i][4],
            // "time": msg[i][5],
            // "type": msg[i][6]

		}
		data.push(obj);
	}
	return data;
}






layui.use(['table', 'jquery', 'form', 'admin','layer'], function () {
	var table = layui.table,
		$ = layui.jquery,
		form = layui.form,
		admin = layui.admin;
		layer = layui.layer;     
	table.render({
		elem: '#adminList',
		cellMinWidth: 80,
		cols: [
			[{
				type: 'checkbox'
			}, {
				field: 'id', title: 'ID', sort: true
			},{
				field: 'role', title: '角色', templet: '#usernameTpl'
			},{
				field: 'des', title: '拥有权限', templet: '#usernameTpl'
			},{
				field: 'review', title: '状态', templet: '#recommendTpl', unresize: true
			}, {
				field: 'operate', title: '操作', toolbar: '#operateTpl', unresize: true
			}]
		],
		data: creatData(),
		event: true,
		id:'testReload',
		page: true
	});
	$('#search').click(function () {
		// var inputVal = $('.layui-input').val()
		// var Nick = $('#user').val();
        // var time = $('#time').val();
        var type = $('#selectID').val();
	//      var date = $('#time').val();
	if($('#user').val()==""&&$('#time').val()==""&&$('#selectID').val()==""){
		layer.msg('查询内容不能为空');
		return false;
	}
		table.reload('testReload', {
			url: 'search-role.php'
			// ,methods:"post"
			,request: {
				pageName: 'page'  //页码的参数名称，默认：page
				,limitName: 'pageSize'  //每页数据量的参数名，默认：limit
			}
			,where: {
				// 向search.php传送数据
				// username:  Nick,
                // time:time,
                cateid:type
			}
			,page: {
				// curr: 1,
				page: true,
				limit:10
			}
		});
		return false;
	})


	/*
	 *数据表格中form表单元素是动态插入,所以需要更新渲染下
	 * http://www.layui.com/doc/modules/form.html#render
	 * */
	$(function () {
		form.render(); //更新全部
    });

	var active = {
		getCheckData: function () { //获取选中数据
			var checkStatus = table.checkStatus('testReload'),
				data = checkStatus.data;
			//console.log(data);
			//layer.alert(JSON.stringify(data));
			if (data.length > 0) {
				layer.confirm('确认要删除吗？' , function (index) {

					layer.msg('删除成功', {
						icon: 1
					});
					//找到所有被选中的，发异步进行删除
					$(".layui-table-body .layui-form-checked").parents('tr').remove();
					//对其选中的，通过循环和ajax将每个id都发送到del.php进行删除
					   for (var i = 0; i < data.length; i++) {
						            var id = data[i]['id'];
						            $.ajax({
						                type: 'get',
						                url: "del-role.php?id=" + id
						            })
						        }
				});
			} else {
				layer.msg("请先选择需要删除的用户！");
			}

		},

	};

    

	$('.demoTable .layui-btn').on('click', function () {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	//编辑用户
	// window.member_edit = function (obj,id) {
		
	// 	var str =$(obj).parents("tr") .text();
	// 	var reg = /[0-9]+/;
	// 	var id = str.match(reg)[0];
	// 	$.ajax({
	// 		type: 'get',
	// 		url: "edit2.php?id=" + id
	// 	});
	// 	WeAdminShow('编辑管理员资料', './edit.html', 500, 400);
	// }
	// window.member_show = function (obj,id) {
		
	// 	var str =$(obj).parents("tr") .text();
	// 	var reg = /[0-9]+/;
	// 	var id = str.match(reg)[0];
	// 	$.ajax({
	// 		type: 'get',
	// 		url: "show1.php?id=" + id
	// 	});
	// 	WeAdminShow('查看管理员', './show.html', 500, 400);
	// }

	/*用户-删除*/
	window.member_del = function (obj, id) {
		layer.confirm('确认要删除吗？', function (index) {
			//发异步删除数据
			$(obj).parents("tr").remove();
			layer.msg('已删除!', {
				icon: 1,
				time: 1000
			});
		});
		//截取选中项的id，进行删除
		var str =$(obj).parents("tr") .text();
		var reg = /[0-9]+/;
		var id = str.match(reg)[0];
	$.ajax({
		type: 'get',
		url: "del-role.php?id=" + id,
	})
		
	}

});
// window.member_stop = function (obj, id) {
// 	layer.confirm('确认要停用吗？', function(index) {
// 		if($(obj).attr('title') == '启用') {

// 			//发异步把用户状态进行更改
// 			$(obj).attr('title', '停用')
// 			$(obj).find('i').html('&#xe62f;');

// 			$(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('已停用');
// 			layer.msg('已停用!', {
// 				icon: 5,
// 				time: 1000
// 			});

// 		} else {
// 			$(obj).attr('title', '启用')
// 			$(obj).find('i').html('&#xe601;');

// 			$(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('已启用');
// 			layer.msg('已启用!', {
// 				icon: 5,
// 				time: 1000
// 			});
// 		}
// 	});
// }
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