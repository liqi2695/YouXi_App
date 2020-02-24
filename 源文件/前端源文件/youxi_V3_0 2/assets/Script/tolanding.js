//window.p1;
//window.p2;
window.flaag=1
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onlanding :function (){

        let p11=cc.find("Canvas/number");
        let p1=p11.getComponent(cc.EditBox).string;
        cc.log(p1);
        let p22=cc.find("Canvas/phone");
        let p2=p22.getComponent(cc.EditBox).string;
      
    
        var url = "http://47.103.115.138/youxi/behind/login.php"
        var param_str=
        {
            "PersonalPhone":p1,
            "PersonalPasswd":md5(p2),
        }
        data = older(param_str)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);//新建一个http连接
        xhr.onreadystatechange = function () {//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;//接受返回json

                var land=JSON.parse(response);
                cc.log(land)
                var c=land.res
                cc.log(c)
                if(c==1){
                    p4_1=p1
                    p2_1=land.data[0].PersonalNickName
                    x=land.data[0].PictureNumber
                    user["name"]=p2_1
                    user["phone"]=p4_1
                    user["PictureNumber"]=x
                    cc.director.loadScene("cp_FirstPageScene");
                }
                else  
                {
                    
                    let m1=cc.find("Canvas/label/mistake");
                    m1.active=true
                    setTimeout(function()
                    {
                        m1.active=false
                    },2000)
                }

            }
        };
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr.send(data)

        flaag=2


        //防误触
        var landing=cc.find("Canvas/landing").getComponent(cc.Button)
        landing.interactable=false
        setTimeout(function(){
            cc.log("禁用两秒")
            landing.interactable=true
        },2000)





    },
    start () {

    },

    // update (dt) {},
});
