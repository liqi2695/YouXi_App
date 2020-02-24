
cc.Class({
    extends: cc.Component,

    properties: {
        title:String,
        videos_url:String,
        lrc:String,
    },



    start () {

    },

    //长视频封面的点击事件，跳转到对应的详情界面
    click_longvideo:function(){
        let self = this
        //防止bug
        this.node.getChildByName("pic").getComponent(cc.Button).interactable = false
        //移动详情界面
        let longvideo_info = cc.find("Canvas/longvideo_info")
        var move1 = cc.moveTo(0,1080,0)
        var move2 = cc.moveBy(0.3,-1080,0)
        //动作回调
        var finished = cc.callFunc(function() {
            cc.find("Canvas/MainMenu").active = false
            cc.find("Canvas/top_menu").active = false
            cc.find("Canvas/scrollview").active = false
            self.node.getChildByName("pic").getComponent(cc.Button).interactable = true
        }, this);
        var action = cc.sequence(move1,move2,finished)
        longvideo_info.runAction(action)

        //设置内容
        longvideo_info.getChildByName("top").getChildByName("title").getComponent(cc.Label).string = this.title
        longvideo_info.getChildByName("videoplayer").getComponent(cc.VideoPlayer).remoteURL = this.videos_url
        cc.find("Canvas").getComponent("HistroyPage").introlabel.getComponent(cc.Label).string = this.lrc

        //启动评论滚动
        cc.find("Canvas").getComponent("HistroyPage").getmsg()
        //开始播放
        longvideo_info.getChildByName("videoplayer").getComponent(cc.VideoPlayer).play()
    },

});
