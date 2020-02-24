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

    // LIFE-CYCLE CALLBACKS:
  //这个很bug
    rise1:function(){
        var  mp=this.getComponent(cc.Label).string
        var c=Number(mp)+1    
        var op=new String(c)
        if(op.length==1) var kp=op[0]
        else if(op.length==2) kp=op[0]+op[1];
        else kp=op[0]+op[1]+op[2]
        
        
        this.getComponent(cc.Label).string=kp

    },
    reduce1:function(){
        var  mp=this.getComponent(cc.Label).string
        var c=Number(mp)-1    
        var op=new String(c)
        if(op.length==1) var kp=op[0]
        else if(op.length==2) kp=op[0]+op[1];
        else kp=op[0]+op[1]+op[2]
        this.getComponent(cc.Label).string=kp
    },

    start () {

    },

    // update (dt) {},
});
