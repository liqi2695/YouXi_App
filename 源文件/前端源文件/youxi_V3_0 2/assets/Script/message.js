    //sendmessage:function(phone_number,code)函数
    //作用：向指定用户发送验证码
    //phone_number：指定的用户手机号，String类型
    //code：待发送的验证码，String类型
    //返回值：True表示发送成功或者测试成功，false表示发送失败
    //注意：如果code传入0，则表示测试
function sendmessage(phone_number,code)
{
    cc.log(code)
    if(code==0)
    {
        console.log("短信测试成功！")
        return true
    }
    var met;
    var appid = "1400225652"
    var appkey = "cc34e64a275eaf8e82b0faf03ddaf23c"
    var tqlid = 364578
    var sign = "杭州有戏科技个人公众号"
    var random_t = parseInt(Math.random()*10000000000)//随机数
    var url = 
    "https://yun.tim.qq.com/v5/tlssmssvr/sendsms?"+
    "sdkappid="+appid+"&random="+random_t
    var timestamp = (new Date()).valueOf(); //时间戳
    timestamp=Math.round(timestamp/1000)
    var sig = sha256('appkey='+appkey+'&random='+random_t+'&time='+timestamp+'&mobile='+phone_number)
    var param_str=
    {
        "ext": "",
        "extend": "",
        "params": [code],
        "sig": sig,
        "sign": sign,
        "tel": 
        {
            "mobile": phone_number,
            "nationcode": "86"
        },
        "time": timestamp,
        "tpl_id":this.tqlid,
    }
    
    //字符串
    var param_str = JSON.stringify(param_str)
    //json串
    param_str = JSON.parse(param_str)
    param_str["time"]=timestamp;
    param_str["tpl_id"]=tqlid;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;
            response=JSON.parse(response)
            console.log(response)    
            met = response['result'] 
        }
    };
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(param_str));

    if(met == 0)
    {
        return true
    }
    else
    {
        return false
    }
}