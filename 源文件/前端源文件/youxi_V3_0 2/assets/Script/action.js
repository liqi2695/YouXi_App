// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    onaction0:function(){
        var action=cc.moveTo(0.25,-1050,121);
        var action1=cc.moveTo(0.25,138,607)
        let o=cc.find("Canvas/help/one");
        var jindu=cc.find("Canvas/help/jindu")
        jindu.runAction(action1)
        o.runAction(action);
        
    },
    onaction1:function(){
        var action=cc.moveTo(0.25,0,-200);
        let p=cc.find("Canvas/help/problem");
        p.runAction(action);
        

    },
    onaction3:function(){
        var action=cc.moveTo(0.25,1092,-200);
        var action1=cc.moveTo(0.25,-248,607)
        let p1=cc.find("Canvas/help/problem");
        var jindu=cc.find("Canvas/help/jindu")
        jindu.runAction(action1)
        p1.runAction(action);
    },
    onaction4:function(){
        var action=cc.moveTo(0.25,0,121);
        let o1=cc.find("Canvas/help/one");
        o1.runAction(action);
    },
    onaction5:function(){
        var action=cc.moveTo(0.4,0,0);
        let b=cc.find("Canvas/b1");
        b.runAction(action);

    },
    onaction6:function(){
        var action=cc.moveTo(0.4,1171,0);
        let   b1=cc.find("Canvas/b1");
        b1.runAction(action);
    },
    onaction7:function(){
        var action=cc.moveTo(0.4,0,0);
        let bc=cc.find("Canvas/bcc");
        bc.runAction(action);

    },
    onaction8:function(){
        var action=cc.moveTo(0.4,1145,0);
        let b=cc.find("Canvas/bcc");
        b.runAction(action);

    },


    start () {

    },

    // update (dt) {},
});
