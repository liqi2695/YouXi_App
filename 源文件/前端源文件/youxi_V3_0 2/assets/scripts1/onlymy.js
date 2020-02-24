
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        var url = "http://47.103.115.138/youxi/behind/audio3.php"
         var param_str=
         {
             "PersonalPhone":p4_1,
         }
         data = older(param_str)   
         var xhr = new XMLHttpRequest();
         xhr.open('POST', url, true);//新建一个http连接,false为同步，true为一步
         xhr.onreadystatechange = function () {//声明回调函数
             if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                 var response = xhr.responseText;//接受返回json
                 var dongtai = JSON.parse(response);
                 let result=dongtai.result;
                 var m=dongtai.result_number;
                 for(let i=0;i<result.length;i++)
                    {
                        four(i);
                    }
             }
         };
         xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
         xhr.send(data)

        /*
        var m=personalInformation(p4_1)
        cc.log(p4_1)
        var dongtai = JSON.parse(m);
        cc.log(dongtai);
        let result=dongtai.result;
        var m=dongtai.result_number;
        for(let i=0;i<result.length;i++)
        {
            four(i);
        }
        */

    },
    start () {

    },

    // update (dt) {},
});
