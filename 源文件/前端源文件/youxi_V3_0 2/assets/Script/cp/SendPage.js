cc.Class({
    extends: cc.Component,
    properties: {
        //用户昵称
        user_name:{
            default:null,
            type:cc.Node
        },

        //用户头像
        user_logo:{
            default:null,
            type:cc.Node
        },

        //视频资源标题
        videos_title:{
            default:null,
            type:cc.Node
        },

        //视频资源封面
        videos_pic:{
            default:null,
            type:cc.Node
        },

        //系统日期
        finish_date:{
            default:null,
            type:cc.Node
        },

        //系统日期
        finish_time:{
            default:null,
            type:cc.Node
        },
        //用户定位
        location:{
            default:null,
            type:cc.Node
        }
    },

    //加载用户头像，名称,刷新系统时间
    onLoad(){
        this.reflesh()
        this.show()
    },

    //出场动画
    show:function(){
        var move_down = cc.moveBy(0.0001,0,-500)
        var fade_out = cc.fadeOut(0.0001)
        var move_action1 = cc.spawn(move_down,fade_out)
        var move_up = cc.moveBy(0.3,0,500)
        var fade_in = cc.fadeIn(0.23)
        var move_action2 = cc.spawn(move_up,fade_in)
        var sum_action = cc.sequence(move_action1,move_action2)
        //cc.find("Canvas/videos_pic_mask").runAction(sum_action)

        var move_down = cc.moveBy(0.0001,0,-500)
        var fade_out = cc.fadeOut(0.0001)
        var move_action1 = cc.spawn(move_down,fade_out)
        var move_up = cc.moveBy(0.3,0,500)
        var fade_in = cc.fadeIn(0.23)
        var move_action2 = cc.spawn(move_up,fade_in)
        var sum_action = cc.sequence(move_action1,move_action2)
        //cc.find("Canvas/headmask").runAction(sum_action)
    },

    //刷新定位，标题，封面
    reflesh:function(){
        //刷新定位
        this.location.getComponent(cc.Label).string = videos["location"]
        //刷新视频标题
        this.videos_title.getComponent(cc.Label).string = videos["title"]
        //远程加载视频封面
        let self = this
        cc.loader.load(videos["shortpic_url"],function(err,pic)
        {
            var temp_sp = new cc.SpriteFrame(pic)
            self.videos_pic.getComponent(cc.Sprite).spriteFrame = temp_sp
        })
    },

    //重唱按钮的点击事件
    cilck_delete:function(){
        cc.log("cilck_delete")
        //弹出重唱确认框
        cc.loader.loadRes("/pre/redelete", function (err, prefab) {
            var redeleteNode = cc.instantiate(prefab);
            cc.find("Canvas").addChild(redeleteNode)
        });
        //禁用按钮
        this.disenable_button()
    },

    //发布按钮的点击事件
    cilck_send:function(){
        cc.log("发布")
        //发送http请求
        var url = "http://47.103.115.138/youxi/behind/audio.php"
        var param_str=
        {
            "AudioUrl":videos["audio_url"],//用户唱的音频url
            "PersonalNickName":user["name"],//用户昵称
            "PictureNumber":user["PictureNumber"],//用户头像
            "Time":Math.round(new Date() / 1000),//发布时间戳
            "Position":videos["location"],//发布地点，IP定位
            "RandomPictureUrl":videos["shortpic_url"],//视频封面
            "VideosTitle":videos["title"],//视频标题
            "PersonalPhone":user["phone"],//用户手机号
        }
        cc.log(param_str)
        data = older(param_str)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);//新建一个http连接
        xhr.onreadystatechange = function () {//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;//接受返回json
                response = JSON.parse(response)
                cc.log(response)
                if(response["Result"] == 2001)
                {
                    cc.log("弹出成功界面")
                    //弹出成功界面
                    cc.loader.loadRes("/pre/successpage", function (err, prefab) {
                        var successpageNode = cc.instantiate(prefab);
                        cc.find("Canvas").addChild(successpageNode)
                    });
                }
                else
                {
                    cc.log("弹出失败界面")
                    //弹出失败界面
                }
            }
        };
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr.send(data)
    },

    //分享按钮的点击事件
    //发送http
    cilck_share:function(){
        cc.log("cilck_share")
    },

    //启用所有按钮
    enable_button:function(){
        cc.find("Canvas/sendbutton").getComponent(cc.Button).interactable = true
        cc.find("Canvas/重唱").getComponent(cc.Button).interactable = true
    },

    //禁用所有按钮
    disenable_button:function(){
        cc.find("Canvas/sendbutton").getComponent(cc.Button).interactable = false
        cc.find("Canvas/重唱").getComponent(cc.Button).interactable = false
    },
});
