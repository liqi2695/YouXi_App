//window.x="1";

cc.Class({
    extends: cc.Component,

    properties: {
    },
    huantou:function(){
        var action=cc.moveTo(0.2,0,0);
        let tx=cc.find("Canvas/touxiang");
        tx.runAction(action);
        cc.find("Canvas/modify_data/code_num").active=false
        let btn=cc.find("Canvas/button");
        btn.active=false;
    },
    back:function(){
        var action=cc.moveTo(0.25,0,-1930);
        let bc=cc.find("Canvas/touxiang");
        bc.runAction(action);
        let btn=cc.find("Canvas/button");
        btn.active=true;
        cc.find("Canvas/modify_data/code_num").active=true

    },
    qiehaun1:function(){
        x="1";  
        this.back();
        this.replace();
        edit_data(p2_1,p4_1,x)
        },
        
    qiehaun2:function(){
    x="2";  
    this.back();
    this.replace()
    var ke="niahoa"
    edit_data(p2_1,p4_1,x)
    cc.log(m);
    },
    qiehuan3:function(){
        x="3"
        this.back();
        this.replace()
        edit_data(p2_1,p4_1,x)
    },
    qiehuan4:function(){
        x="4"
        this.back();
        this.replace()
        edit_data(p2_1,p4_1,x)
    },
    qiehuan5:function(){
        x="5"
        this.back();
        this.replace()
        edit_data(p2_1,p4_1,x)
    },
    qiehuan6:function(){
        x="6"
        this.back();
        this.replace()
        edit_data(p2_1,p4_1,x)
    },
    replace:function(){
        var head=cc.find("Canvas/tuxiang")
        cc.loader.loadRes(x,cc.SpriteFrame,function(err,sf){
            head.getComponent(cc.Sprite).spriteFrame=sf
      
        var self = cc.find("Canvas/tuxiang");
        cc.loader.loadRes(x, cc.SpriteFrame, function (err, sf) {
        self.getComponent(cc.Sprite).spriteFrame = sf;   //头像
 });
        var self1 = cc.find("Canvas/quitlanding/touxiang_1");
        cc.loader.loadRes(x, cc.SpriteFrame, function (err, sf) {
        self1.getComponent(cc.Sprite).spriteFrame = sf;   //头像
        });
      

        //我的资料
        var code=cc.find("Canvas/modify_data/code_num/code_1")
        var self2= code.getChildByName("tou")
        cc.loader.loadRes(x, cc.SpriteFrame, function (err, sf) {
        self2.getComponent(cc.Sprite).spriteFrame = sf;   //头像
        code.getChildByName("nick").getComponent(cc.Label).string=p2_1
        code.getChildByName("phone").getComponent(cc.Label).string=p4_1

 });
        })
    },
    onLoad () {
        
        
    },
    quitlanding(){
        var action=cc.moveTo(0.25,0,0)
        var quit=cc.find("Canvas/quitlanding")
        quit.runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=false;
    },
    back_mine:function(){
        var action=cc.moveTo(0.25,1092,0)
        var back=cc.find("Canvas/quitlanding")
        back.runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=true;
    },
    to_identify(){
        var action=cc.moveTo(0.25,0,0)
        var ide=cc.find("Canvas/identify")
        ide.runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=false;
    },
    back_mine1:function(){
        var action=cc.moveTo(0.25,1092,0)
        var back=cc.find("Canvas/identify")
        back.runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=true;

    },
    submit_to:function(){
        var code2=cc.find("Canvas/identify/code2")
        var action=cc.moveTo(0.25,0,-165)
        var action1=cc.moveTo(0.25,0,-1326)
        code2.runAction(action)
        var code=cc.find("Canvas/identify/code")
        code.active=false
        setTimeout(function() { 
            code2.runAction(action1)
            setTimeout(function() { 
                 code.active=true
             }, 500);
         }, 1000);
    },
    modify_data_to:function(){
        var action=cc.moveTo(0.25,0,0)
        cc.find("Canvas/modify_data").runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=false
    },
    back_mine2:function(){
        var action1=cc.moveTo(0.25,1092,0)
        cc.find("Canvas/modify_data").runAction(action1)
        var btn=cc.find("Canvas/button")
        btn.active=true

    },
    to_about:function(){
        var action=cc.moveTo(0.25,0,0)
        cc.find("Canvas/bcc").runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=false
    },
    to_mine3(){
        var action=cc.moveTo(0.25,1920,0)
        cc.find("Canvas/bcc").runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=true

    },
    to_dongtai:function(){
        var action=cc.moveTo(0.25,0,0)
        cc.find("Canvas/dongtai").runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=false
    },
    to_mine4:function(){
        var action=cc.moveTo(0.25,1920,0)
        cc.find("Canvas/dongtai").runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=true

    },
    to_modify_nick:function(){
        var action=cc.moveTo(0.25,0,0)
        cc.find("Canvas/nicheng").runAction(action)
        cc.find("Canvas/modify_data/code_num/code_1").active=false

    },
    back_1:function(){
        var action=cc.moveTo(0.25,0,1925)
        cc.find("Canvas/nicheng").runAction(action)
        cc.find("Canvas/modify_data/code_num/code_1").active=true
    },
    to_help:function(){
        var action=cc.moveTo(0.25,0,0)
        cc.find("Canvas/help").runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=false
    },
    back_2:function(){
        var action=cc.moveTo(0.25,1092,0)
        cc.find("Canvas/help").runAction(action)
        var btn=cc.find("Canvas/button")
        btn.active=true
    },
    modify_nickname:function(){
        p2_1=cc.find("Canvas/nicheng/b1/editbox").getComponent(cc.EditBox).string
        edit_data(p2_1,p4_1,x)
        let nn=cc.find("Canvas/nickname");
        nn.getComponent(cc.Label).string=p2_1;
        cc.find("Canvas/quitlanding/nicheng").getComponent(cc.Label).string=p2_1
        var code=cc.find("Canvas/modify_data/code_num/code_1")
        code.getChildByName("nick").getComponent(cc.Label).string=p2_1


        //确定弹窗动画
        var action=cc.moveTo(0.25,-70,600)
        cc.find("Canvas/nicheng/success").runAction(action)
        setTimeout(function(){
            var action1=cc.moveTo(0.25,-70,1020)
            var action2=cc.fadeOut(1);
            cc.find("Canvas/nicheng/success").runAction(action1,action2)

        },1000)
    },


    start () {


    },

     update (dt) {

     },
});
