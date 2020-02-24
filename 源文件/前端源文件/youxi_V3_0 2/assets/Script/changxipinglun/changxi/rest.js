
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
     //   cc.log(changxi["VideosTitle"])
    //    var mp=cc.find("Canvas/title");
    //    mp.getComponent(cc.Label).string=changxi["VideosTitle"];   //在该场景中加载从yuzhiti脚本中赋值的全部变量
        cc.loader.loadRes("mp",cc.Prefab,function(err,pre){

        var trends=cc.instantiate(pre);
        trends.anchorX=0.5
        trends.anchorY=0.5          //对锚点进行设置
        trends.setPosition(0,500)
        var pau=trends.getChildByName("puase")
        pau.active=false;  //暂停按钮不显示
         trends.getChildByName("yidianzan").active=false;        //点赞按钮不显示
            
            //同步头像
        var toux=trends.getChildByName("touxiang");
        cc.loader.loadRes(changxi["PictureNumber"], cc.SpriteFrame, function (err, sf) {
        toux.getComponent(cc.Sprite).spriteFrame = sf;
        })                                                    //头像动态变化


        //给头像添加点击事件    
        var self=cc.find("Canvas")
        trends.getChildByName("touxiang").getChildByName("btn").active=false

        //同步点赞数
        trends.getChildByName("dianzanshu").getComponent(cc.Label).string=changxi["PriseNumber"]

        //同步评论数
        trends.getChildByName("pinglunshu").getComponent(cc.Label).string=changxi["CommentNumber"]

        //同步昵称
        var NickName=trends.getChildByName("nicheng");
        NickName.getComponent(cc.Label).string=changxi["PersonalNickName"];

        /*//添加跳转到评论的事件
        var pin=trends.getChildByName("pinlun");
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = self;    // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "test";  // 这个是代码文件名
        clickEventHandler.handler = "totest";
        clickEventHandler.customEventData = "foobar";

        var btnpin=pin.getComponent(cc.Button);
        btnpin.clickEvents.push(clickEventHandler);*/
        //禁用评论点击事件
        trends.getChildByName("pinlun").getComponent(cc.Button).interactable=false
        trends.getChildByName("pinlun").getChildByName("btn1").active=false

        //同步时间
        
        var time=trends.getChildByName("time");
        time.getComponent(cc.Label).string=changxi["Time"]

        //同步位置
        var posi=trends.getChildByName("position")
        posi.getComponent(cc.Label).string=changxi["Position"]

        //同步剧名
        var title=trends.getChildByName("title");
        title.getComponent(cc.Label).string=changxi["VideosTitle"];

        

        //加载aac文件
        var v=trends.getChildByName("videoplayer")
        v.getComponent(cc.VideoPlayer).remoteURL=changxi["AudioUrl"];





        //加载图片音频随机分配的图片
        cc.loader.load(changxi["RandomPictureUrl"],function(err,tt){
            
            code = new cc.SpriteFrame(tt);          
            let qw=trends.getChildByName("picture")
            qw.getComponent(cc.Sprite).spriteFrame=code
            self.addChild(trends);  
        })
    })
    },

    start () {

    },

    // update (dt) {},
});
