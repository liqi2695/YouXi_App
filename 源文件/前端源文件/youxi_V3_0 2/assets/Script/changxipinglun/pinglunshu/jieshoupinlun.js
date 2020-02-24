function jieshou(y1){
    var url = "http://47.103.115.138/youxi/behind/comment2.php"
   var temp_response;
    var param_str=
    {
        "AudioUrl":y1,
       
    }
    data = older(param_str)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);//新建一个http连接
    xhr.onreadystatechange = function () {//声明回调函数
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;//接受返回json
            temp_response= response
        }
    };
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
    xhr.send(data)
    return temp_response
}
