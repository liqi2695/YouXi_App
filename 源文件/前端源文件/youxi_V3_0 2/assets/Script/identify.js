
cc.Class({
    extends: cc.Component,

    properties: {
        
        
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onbtn:function(){
        
        var i=parseInt(Math.random()*100000);
        
        //var self=this.node.getChildByName("phone");
        var my=this.node.getComponent(cc.EditBox).string;
        cc.log(i);
        sendmessage(my,i);
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

    start () {
        

    },

    // update (dt) {},
});
