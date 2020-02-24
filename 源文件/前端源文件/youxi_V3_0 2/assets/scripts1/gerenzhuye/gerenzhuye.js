
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    

    start () {

    },
    onLoad(){
        //同步头像
    var pic=cc.find("Canvas/tuxiang")
    cc.loader.loadRes(changxi["PictureNumber"], cc.SpriteFrame, function (err, sf) {
    pic.getComponent(cc.Sprite).spriteFrame = sf;
    })   
    //同步昵称
    var NickName=cc.find("Canvas/nickname");
    NickName.getComponent(cc.Label).string=changxi["PersonalNickName"]

    //同步手机号
    var PhoneNumber=cc.find("Canvas/phone");
    PhoneNumber.getComponent(cc.Label).string=changxi["PersonalPhone"]

    var url = "http://47.103.115.138/youxi/behind/audio3.php"
    var param_str=
    {
        "PersonalPhone":changxi["PersonalPhone"],
    }
    data = older(param_str)   
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);//新建一个http连接,false为同步，true为一步
    xhr.onreadystatechange = function () {//声明回调函数
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;//接受返回json
            var dongtai = JSON.parse(response);
            let result=dongtai.result;
            for(let i=0;i<result.length;i++)
            {
                three(i);
            }
        }
    };
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
    xhr.send(data)
    },

    // update (dt) {},
});
