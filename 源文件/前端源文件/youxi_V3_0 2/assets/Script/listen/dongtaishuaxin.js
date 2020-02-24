cc.Class({
    extends: cc.Component,
    properties: {},

    onLoad: function () {
        cc.loader.loadRes("mp", cc.Prefab, function (err, sf) { 
        var m=cc.find("Canvas/label")
        var nd=cc.instantiate(sf)  ;         //new出一个新的节点
        nd.addComponent(cc.Button);     //为该节点添加组件 

        nd.anchorX=0.5
        nd.anchorY=0.5 
        m.addChild(nd);   //将新节点添加为label的子节点
     
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "change";// 这个是代码文件名
        clickEventHandler.handler = "tozhuye";

      //  var node=cc.find("Canvas/label")         //想要添加按钮的节点
        var button=nd.getComponent(cc.Button);  
     
        button.clickEvents.push(clickEventHandler);
        })
    },

    
});
