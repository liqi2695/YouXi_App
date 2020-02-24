window.d=0;

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:
    onquit:function(){
        submit.show("提交成功！",function(){cc.log("1111")},false,0.1);

    },
    ontuichu:function(){
        Alert.show("确定要退出登录吗",function(){cc.log("1111")},true,0.1);

    },


   
   

    

    start () {
   

    },

    // update (dt) {},
});
