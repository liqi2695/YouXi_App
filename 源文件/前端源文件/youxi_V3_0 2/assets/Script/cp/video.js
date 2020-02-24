cc.Class({
    extends: cc.Component,

    properties: {
        videourl:String,
        videopicurl:String,
        videoshortpicurl:String,
        videotitle:"网络错误，请稍后重试",
        videolrcurl:String,

        video:{
            default:null,
            type:cc.Node
        },
        videotitlenode:{
            default:null,
            type:cc.Node
        },

    },
    onLoad(){
        this.videotitlenode.getComponent(cc.Label).string = this.videotitle
    },

    //video预置体的点击事件
    cilck_button:function(){
        cc.log("点击视频")
        videos["title"] = this.videotitle
        videos["videos_url"]=this.videourl,//视频地址
        videos["pic_url"]=this.videopicurl,//封面地址
        videos["lrc_url"]=this.videolrcurl,//歌词地址
        videos["shortpic_url"]=this.videoshortpicurl,//短封面地址地址
        cc.log(videos)
        cc.director.loadScene("cp_SingScene");
    },
});
