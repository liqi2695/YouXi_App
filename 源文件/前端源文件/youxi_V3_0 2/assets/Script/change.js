
cc.Class({
    extends: cc.Component,

    properties: {
       
    },
    toregister:function(){
        cc.director.loadScene("register")
    },
    tohelp:function(){
        cc.director.loadScene("help");

    },
    tomine:function(){
        cc.director.loadScene("mine");

        var landing=cc.find("Canvas/MainMenu/MinePage").getComponent(cc.Button)
        landing.interactable=false
        setTimeout(function()
        {
            cc.log("禁用两秒")
            landing.interactable=true
        },3000) 
        

    },
    tosetup:function(){
        cc.director.loadScene("setup")
    },
    tolisten:function(){
        cc.director.loadScene("listen");
    }, 
    tosetup:function(){
        cc.director.loadScene("setup")
    },
    tozhanghao:function(){
        cc.director.loadScene("zhanghao");

    },
    tolisten:function(){
        cc.director.loadScene("listen");
    },
    tozhuye:function(){
        cc.director.loadScene("zhuye");

        
    },
    topinglun:function(){
        cc.director.loadScene("pinglun")
    },
    
    tohello:function(){
        cc.director.loadScene("helloworld")
        var landing=cc.find("Canvas/MainMenu/ListenPage").getComponent(cc.Button)
        landing.interactable=false
        setTimeout(function()
        {
            cc.log("禁用两秒")
            landing.interactable=true
        },3000) 
    },
    tolanding:function(){
        cc.director.loadScene("landing")
    },
    tocp_WatchHistory:function(){
        cc.director.loadScene("cp_WatchHistory")
        var landing=cc.find("Canvas/MainMenu/WatchPage").getComponent(cc.Button)
                landing.interactable=false
                setTimeout(function()
                {
                    cc.log("禁用两秒")
                    landing.interactable=true
                },3000) 
    },
    tocp_FirstPageScene:function(){
        cc.director.loadScene("cp_FirstPageScene")
        var landing=cc.find("Canvas/MainMenu/SingPage").getComponent(cc.Button)
                landing.interactable=false
                setTimeout(function()
                {
                    cc.log("禁用两秒")
                    landing.interactable=true
                },3000) 
    },

    // LIFE-CYCLE CALLBACKS:
    tanchuang:function(){
        var btn=cc.find("Canvas/backgroud")
        var action=cc.moveTo(0.25,0,850)
        btn.runAction(action);
    },
    back_1:function(){
        var action=cc.moveTo(0.25,0,1100)
        cc.find("Canvas/backgroud").runAction(action)
    },


    // onLoad () {},
    bofang:function(){
        

    },
    pause:function(){

    },

    start () {
        

    },

    // update (dt) {},
});
