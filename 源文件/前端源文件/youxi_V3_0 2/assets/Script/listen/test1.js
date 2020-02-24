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

    // onLoad () {},

    start () {
        cc.loader.loadRes("mp",cc.Prefab,function(err,pre)   //加载resources文件夹里面的mp预制体
    {
        var mp=cc.find("Canvas/label");   
        var newNode=cc.instantiate(pre)   //克隆名字为pre的预制体并将其实例化成新节点
        newNode.anchorX=0.5
        newNode.anchorY=0.5              //对锚点进行设置
        var la=newNode.getChildByName("lab");
        var la1=la.getComponent(cc.Label).string;
        cc.log(la1);
        newNode.addComponent(cc.Button)
        var x=newNode.addComponent(cc.Label);
        var y=x.string=9090;
        cc.log(y)


       //添加跳转到主页的事件
        var self=cc.find("Canvas")
        mp.addChild(newNode);                    //将该实例化出的新节点添加在mp节点上   
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = self.node;    // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "change";  // 这个是代码文件名
        clickEventHandler.handler = "tozhuye";

      //  var node=cc.find("Canvas/label")         //想要添加按钮的节点
        var button=mp.getComponent(cc.Button);        
        button.clickEvents.push(clickEventHandler);

    })

    },

    // update (dt) {},
});
