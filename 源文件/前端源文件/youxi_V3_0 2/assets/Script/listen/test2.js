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
      //var remoteUrl="https://youxi-data.oss-cn-shanghai.aliyuncs.com/test/getvoice.mp3";
        //cc.loader.load(remoteUrl,function(err,adp){
        //cc.log(adp);
       // let mo=cc.find("Canvas/nodem");
       // mo.getComponent(cc.AudioSource).clip=adp;
        
   // })  
    cc.loader.loadRes("mp",cc.Prefab,function(err,pre)   //加载resources文件夹里面的mp预制体
    {
        var mp=cc.find("Canvas/scrollview/view/content");   
        var newNode=cc.instantiate(pre)   //克隆名字为pre的预制体并将其实例化成新节点
        newNode.anchorX=0.5
        newNode.anchorY=0.5              //对锚点进行设置

        mp.addChild(newNode);            //将该实例化出的新节点添加在mp节点上   
        var newNode1=cc.instantiate(pre)
        newNode1.anchorX=0.5
        newNode1.anchorY=0.5
        mp.addChild(newNode1);
    })

          //let mo=cc.find("Canvas/nodem");
          //mo.getComponent(cc.AudioSource).clip=adp;
           /*

       this.addComponent(cc.Label);
       let mp= this.getComponent(cc.Label).string;
       this.getComponent(cc.Label).string=90;
       cc.log(mp);*/
     /* cc.loader.loadRes("mp", cc.SpriteFrame, function (err, sf) {  //加载resources文件夹下面的mp文件的spriteframe
        var m=cc.find("Canvas/scrollview/view/content")
        var node = new cc.Node();            //new出一个新的节点
        node.name = "sprite";               //对其节点进行命名
        var sp = node.addComponent(cc.Sprite);     //为该节点添加组件         
        sp.spriteFrame =sf;                          
        m.addChild(node);              
    });*/
    /*var self = cc.find("Canvas/11");
        cc.loader.loadRes("mp", cc.SpriteFrame, function (err, sf) {
        self.getComponent(cc.Sprite).spriteFrame = sf;
    });*/
    
    },

    // update (dt) {},
});
