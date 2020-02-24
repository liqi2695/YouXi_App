layui.extend({
	admin: '{/}../../static/js/admin'
});
var msg;
$.ajax({
	type: 'get',
	url: 'video.php',
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
			"videoid": msg[i][0],
			"videourl": msg[i][1],
			"videotitle": msg[i][2],
			"videolrcurl": msg[i][3],
            "videopicurl": msg[i][4]
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
		elem: '#videoList',
		cellMinWidth: 80,
		cols: [
			[{
				type: 'checkbox'
			}, {
				field: 'videoid', title: 'ID', sort: true
			},{
				field: 'videourl', title: '视频地址', templet: '#usernameTpl'
			},{
				field: 'videotitle', title: '视频标题', templet: '#usernameTpl'
			},{
                field: 'videolrcurl', title: '戏词', templet: '#usernameTpl'
            },{
                field: 'videopicurl', title: '视频图片地址', templet: '#usernameTpl'
            },{
				field: 'review', title: '状态', templet: '#recommendTpl', unresize: true
			},{
				field: 'operate', title: '操作', toolbar: '#operateTpl', unresize: true
			}]
			// {
            //    field: 'recommend',title: '推荐',templet: '#recommendTpl',unresize: true
			// }, 
				
			// {
			// 	field: 'review',title: '审核',templet: '#reviewTpl',unresize: true
			// }, {
			// 	field: 'operate',title: '操作',toolbar: '#operateTpl',unresize: true
			// }]
		],
		data: creatData(),
		event: true,
		id:'testReload',
		page: true
	});
	$('#search').click(function () {
		// var inputVal = $('.layui-input').val()
		// var Nick = $('#user').val();
        var videotitle = $('#videotitle').val();
        // var diff = $('#selectID').val();
	//      var date = $('#time').val();
	if($('#videotitle').val()==""){
		layer.msg('查询内容不能为空');
		return false;
	}
		table.reload('testReload', {
			url: 'search-shortvideo.php'
			// ,methods:"post"
			,request: {
				pageName: 'page'  //页码的参数名称，默认：page
				,limitName: 'pageSize'  //每页数据量的参数名，默认：limit
			}
			,where: {
				// 向search.php传送数据
				// start:  date,
				// keyword:  Nick,
                videotitle:videotitle,
                // cateid:diff
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

					
					//找到所有被选中的，发异步进行删除
					$(".layui-table-body .layui-form-checked").parents('tr').remove();
					//对其选中的，通过循环和ajax将每个id都发送到del.php进行删除
					   for (var i = 0; i < data.length; i++) {
						            var id = data[i]['videoid'];
						            $.ajax({
						                type: 'get',
						                url: "del-shortvideo.php?id=" + id
						            })
						        }
						layer.msg('删除成功', {
							icon: 1
						});
						setTimeout(function(){
                            location.replace(location.href);//成功后刷新父界面
                        }, 1000);	
				});
			} else {
				layer.msg("请先选择需要删除的视频！");
			}

		},
		// Recommend: function () {
		// 	var checkStatus = table.checkStatus('testReload'),
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

		// 	$(".layui-table-body .layui-form-checked").parents('tr').children().children('input[name="zzz"]').attr("checked","checked");
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
	//编辑
	window.member_edit = function (obj,id) {
		
		var str =$(obj).parents("tr") .text();
		var reg = /[0-9]+/;
		var id = str.match(reg)[0];
		$.ajax({
			type: 'get',
			url: "edit2.php?id=" + id
		});
		WeAdminShow('编辑视频资料', './editShortVideo.html', 500, 400);
	}
	//查看
	window.member_show = function (obj,id) {
		
		var str =$(obj).parents("tr") .text();
		var reg = /[0-9]+/;
		var id = str.match(reg)[0];
		$.ajax({
			type: 'get',
			url: "show1.php?id=" + id
		});
		WeAdminShow('查看视频资料', './show.html', 500, 400);
	}

	/*删除*/
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
		url: "del-shortvideo.php?id=" + id,
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