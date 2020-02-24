function register(m1,m2,m3,m4,m5){
    var url = "http://47.103.115.138/youxi/behind/insert.php"
   var temp_response;
    var param_str=
    {
        "PersonalPhone":m1,
        "PersonalNickName":m2,
        "PersonalRegisterTime":m3,
        "PersonalPasswd":md5(m4),
        "PictureNumber":m5,
    }
    data = older(param_str)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, false);//新建一个http连接
    xhr.onreadystatechange = function () {//声明回调函数
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;//接受返回json
            cc.log(response)
            temp_response= response
        }
    };
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
    cc.log(data)
    xhr.send(data)
    return temp_response
}