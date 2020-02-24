
window.p2_1="凯奇",                   //昵称

window.p4_1="17816121043",              //手机号
window.x="1";                  //头像的数字

cc.Class({
    extends: cc.Component,

    properties: {
        mis:{
            default:null,
            type:cc.Node,
        },
        code:Number,
        speed:0.1,
        vertical: {
            default: null,
            type: cc.Sprite
        },

        
    },

    //LIFE-CYCLE CALLBACKS:
    /*update:function(dt){
        this._updataFillStart(this.vertical,dt);
     },
    _updataFillStart: function (sprite, dt) {
        var fillStart = sprite.fillStart;
        fillStart = fillStart > 0 ? fillStart -= (dt * this.speed) : 1;
        sprite.fillStart = fillStart;
    },*/

    btnregister:function(){
        var p2=cc.find("Canvas/phone2");
         p2_1=p2.getComponent(cc.EditBox).string;    //昵称

        var p3=cc.find("Canvas/phone3");
        var p3_1=p3.getComponent(cc.EditBox).string;    //密码
        if(p3_1.length<6||p3_1.length==0)  {
            var m1=cc.find("Canvas/mima");
            m1.active=true
            setTimeout(function() { 
                m1.active=false
             }, 3000);
        }                                                           //判断密码是否大于六位
        var p4=cc.find("Canvas/phone4");
        p4_1=p4.getComponent(cc.EditBox).string;   //手机号 
        var p=cc.find("Canvas/phone");
        var p_1=p.getComponent(cc.EditBox).string;       //验证码
        
       var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
       var phoneNum = p4_1;//手机号码
       var flag = reg.test(phoneNum); //true
       //正则判断是否为手机号

       
       if(flag==true&&this.code==p_1)
       {
       var timestamp=Math.round(new Date() / 1000)
       cc.log(timestamp);


       var url = "http://47.103.115.138/youxi/behind/insert.php"
     
        var param_str=
        {
            "PersonalPhone":p4_1,
            "PersonalNickName":p2_1,
            "PersonalRegisterTime":timestamp,
            "PersonalPasswd":md5(p3_1),
            "PictureNumber":x,
        }
        data = older(param_str)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);//新建一个http连接
        xhr.onreadystatechange = function () {//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var m = xhr.responseText;//接受返回json
                if(m==1000) 
                 {
                    user["name"]=p2_1
                    user["phone"]=p4_1
                    user["PictureNumber"]=x
                    cc.director.loadScene("cp_FirstPageScene");
                }
                else if(m==1001)
                {
                    var mp=cc.find("Canvas/zhanghao");
                    mp.active=true
                    setTimeout(function()
                     { 
                        mp.active=false
                     }, 3000);
                }
                
            }
        };
             xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");   
            xhr.send(data)
        }
    
    
                else if(flag==false)
                {
                    var mi=cc.find("Canvas/mist");
                    mi.active=true
                    setTimeout(function() { 
                        mi.active=false
                     }, 3000);
                }
                else if(this.code!=p_1)
                {
                    var yam=cc.find("Canvas/duanxin");
                    yam.active=true
                    setTimeout(function()
                     { 
                        yam.active=false
                     }, 3000);
                }


                flaag=2


                //防多点
                var landing=cc.find("Canvas/registerbtn").getComponent(cc.Button)
                landing.interactable=false
                setTimeout(function()
                {
                    cc.log("禁用两秒")
                    landing.interactable=true
                },2000)                
                
      //      }
      //  };
      //  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");   
      //  xhr.send(data)
       },
       















       onbtn:function(){
        
         this.code=parseInt(Math.random()*100000);
        cc.log(this.code);
        
        let self=cc.find("Canvas/phone4");
        var my=self.getComponent(cc.EditBox).string;
        sendmessage(my,this.code);
        let yanzhen=cc.find("Canvas/yanzhengma");
        //cc.loader(yanzhen);
        //console.log(yanzhen);
        let mp=yanzhen.getComponent(cc.Button);
        mp.interactable=false;

        let time=cc.find("Canvas/yanzhengma/yanz");
        let time_to=time.getComponent(cc.Label);
        time_to.string=60;

       //var hui=cc.find("Canvas/yanzhengma/yz");
       //  cc.log(hui);
       


        time_to.schedule(function(){
                if(time_to.string>=1) time_to.string=time_to.string-1;
                else {mp.interactable=true;
                    time_to.string="重新发送验证码";
                }

              
                }.bind(this),1.5,cc.macro.REPEAT_FOREVER,1);//cc.macro.REPEAT_FOREVER一直执行下去
                
        

    },
       

    // update (dt) {},
});
