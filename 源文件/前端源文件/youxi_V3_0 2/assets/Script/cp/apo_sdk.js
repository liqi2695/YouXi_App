    /*
    test(par)函数
    作用：json序列化转换
    par：待转换的json串
    返回值：序列化后的结果
    */
    function older(par)
    {
        data = ""
        for(var item in par)
        {
            data+=item+"="+par[item]+"&"
        }
        return data
    }

    /*
    randomNum(minNum,maxNum)函数
    作用：产生随机数
    返回值,一个随机数
    */
    function randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    } 

    function httpstest(){
        var xhr = new XMLHttpRequest();
        data = {
            "PersonalPhone":"17816121043",
            "OperaName":"武穴市黄梅戏剧团"
        }
        xhr.open('POST', "http://192.168.0.112/behind/con-theater.php", true);//新建一个http连接
        xhr.onreadystatechange = function () {//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;//接受返回json
                response = JSON.parse(response)
                cc.log(response)
            }
        };
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr.send()
    }