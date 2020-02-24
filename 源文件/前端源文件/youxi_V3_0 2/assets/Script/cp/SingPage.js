
cc.Class({
    extends: cc.Component,

    properties: {
        //是否发布的标志
        send_flag:Boolean,
        //声网频道
        channel:"1054266122",
        //appid
        appid:"b0c277b83c1e4ff59abdd4b0f4545b13",
        //是否采集音频标志位，防止多次点击的bug,
        audio_flag:Boolean,
        back_flag:Boolean,
        //视频标题节点
        bug_msg:{
            default:null,
            type:cc.Node
        },
        //视频标题节点
        videotitle:{
            default:null,
            type:cc.Node
        },
        //视频组件的节点
        videoplayer:{
            default:null,
            type:cc.Node
        },
        //歌词节点
        lrc:{
            default:null,
            type:cc.Node
        },
        //歌词滚动视图节点
        lrc_scrollview:{
            default:null,
            type:cc.Node
        },

        //歌词行数
        lrc_line:Number,  

        //录音按钮
        play_button:{
            default:null,
            type:cc.Node
        },

        //重唱按钮
        replay_button:{
            default:null,
            type:cc.Node
        },

        //完成按钮
        stop_button:{
            default:null,
            type:cc.Node
        },

        //返回按钮
        back:{
            default:null,
            type:cc.Node
        },
        Point:{
            default:[],
            type:cc.SpriteFrame
        },
        circle:{
            default:null,
            type:cc.SpriteFrame
        },

    },

    //加载视频url和歌词,初始化声网
    onLoad(){
        this.send_flag = false 
        this.bug_msg.getComponent(cc.Label).string =  videos["audio_url"]
        //先预为为关闭,并初始化声网
        this.audio_flag = false
        this.back_flag = false
        agora && agora.init(this.appid);                                                                                                                                                                                 

        //加载视频标题
        this.videotitle.getComponent(cc.Label).string = videos["title"]
        //加载视频url
        this.videoplayer.getComponent(cc.VideoPlayer).remoteURL = videos["videos_url"]
        this.videoplayer.getComponent(cc.VideoPlayer).play()
    
        //加载歌词
        let self = this
        this.lrc_scrollview.getComponent(cc.ScrollView).scrollToTop(0.1)

        cc.log(videos["lrc_url"])
        //占位行
        var hold_line = "\n\n\n"
        var file=videos["lrc_url"]
        this.lrc_line = 0
        file = hold_line+file
        for(var i = 0;i<=file.length;i = i + 1)
        {
            if(file[i]=='\n')
            {
                self.lrc_line = self.lrc_line + 1 ;
            }
        }
        this.lrc_line = this.lrc_line -2 ;
        cc.find("Canvas/歌词卡片/scrollview/view/lrc").getComponent(cc.Label).string = file


        //停止录音的回调函数，用于确保重唱
        agora.on('leave-channel', (stat) => {
            if(this.back_flag)
            {
                return 0;
            }
            //重唱
            if(this.audio_flag)
            {
                let self =this
                cc.log("开始采集音频")
                self.send_flag = false 
                //发出录音请求
                var xhr = new XMLHttpRequest();
                var dir;
                xhr.open('POST', "http://47.103.115.138/recorder.php", true);//新建一个http连接
                xhr.onreadystatechange = function () {//声明回调函数
                    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                        var response = xhr.responseText;//接受返回json
                        var left_str = "http://47.103.115.138/local/samples/cpp"
                        var right_str = "user.aac"
                        response = response.split("=>")
                        dir = response[1];
                        dir = dir.substring(dir.indexOf("/"),dir.lastIndexOf("/")+1)
                        dir = left_str + dir + right_str
                        cc.log("录音结束，目标文件：",dir);
                        videos["audio_url"] = dir;//记录用户音频地址
                        self.send_flag = true
                    }
                };
                xhr.send()
                agora && agora.joinChannel("", this.channel, "", 0);//加入频道
                //播放视频
                this.enable_lrc()

                cc.log("重唱！")
                //重唱
                this.videoplayer.getComponent(cc.VideoPlayer).resume()
                this.videoplayer.getComponent(cc.VideoPlayer).currentTime =0
                this.videoplayer.getComponent(cc.VideoPlayer).play()
            }
            //停止
            else
            {
                this.videoplayer.getComponent(cc.VideoPlayer).stop()
                cc.log("录音完成")
                cc.find("Canvas/recomfim").active = true
                //cc.find("Canvas/recomfim").opacity = 0
                //创建出场上滑动画
                cc.find("Canvas/recomfim").y=0
                cc.log(cc.find("Canvas/recomfim").x,cc.find("Canvas/recomfim").y)
                var move_down = cc.moveBy(0,0,-500)
                var fade_out = cc.fadeOut(0)
                var move_action1 = cc.spawn(move_down,fade_out)
                var move_up = cc.moveBy(0.3,0,500)
                var fade_in = cc.fadeIn(0.23)
                var move_action2 = cc.spawn(move_up,fade_in)
                var sum_action = cc.sequence(move_action1,move_action2)
                cc.find("Canvas/recomfim").runAction(sum_action)
                //禁用其余按钮
                cc.find("Canvas").getComponent("SingPage").play_button.getComponent(cc.Button).interactable = false
                cc.find("Canvas").getComponent("SingPage").replay_button.getComponent(cc.Button).interactable = false
                cc.find("Canvas").getComponent("SingPage").stop_button.getComponent(cc.Button).interactable = false
                //cc.find("Canvas").getComponent("SingPage").back.getComponent(cc.Button).interactable = false
            }
        }, this);

    },

    //开启歌词滚动
    enable_lrc:function(){
        //计算歌词滚动参数
            //计算滚动间隔，总时长除行数
            var time_inter = this.videoplayer.getComponent(cc.VideoPlayer).getDuration()/this.lrc_line
            //计算滚动量百分比，100%除行数
            var lrc_percent = 100/this.lrc_line
            lrc_percent = lrc_percent / 100
            cc.log("滚动间隔：",time_inter,"单次滚动量：",lrc_percent)
            //开启歌词滚动
            let i = 0
            this.schedule(function() {
                i++
                cc.log("滚动间隔：",time_inter,"单次滚动量：",lrc_percent)
                this.lrc_scrollview.getComponent(cc.ScrollView).scrollToPercentVertical(1-i*lrc_percent, time_inter/2)
            }, time_inter);

    },

    //停止歌词滚动
    disanle_lrc:function(){
    },

    //唱歌按钮的点击事件
    cilck_sing:function(){
        let self = this
        cc.log("cilck_sing")
        //获取当前状态
        if(!this.audio_flag)
        {
            cc.log("开始采集音频")
            self.send_flag = false 
            //发出录音请求
            var xhr = new XMLHttpRequest();
            var dir;
            xhr.open('POST', "http://47.103.115.138/recorder.php", true);//新建一个http连接
            xhr.onreadystatechange = function () {//声明回调函数
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;//接受返回json
                    var left_str = "http://47.103.115.138/local/samples/cpp"
                    var right_str = "user.aac"
                    response = response.split("=>")
                    dir = response[1];
                    dir = dir.substring(dir.indexOf("/"),dir.lastIndexOf("/")+1)
                    dir = left_str + dir + right_str
                    cc.log("录音结束，目标文件：",dir);
                    videos["audio_url"] = dir;//记录用户音频地址
                    self.bug_msg.getComponent(cc.Label).string =  dir
                    self.send_flag = true
                }
            };
            xhr.send()
            this.audio_flag = true
            agora && agora.joinChannel("", this.channel, "", 0);//加入频道
            //播放视频
            this.videoplayer.getComponent(cc.VideoPlayer).play()
            this.start_NMD()
        }
        else
        {
            cc.log("当前处在录音状态！")
        }
    },

    //重唱按钮的点击事件
    cilck_restart:function(){
        cc.log("cilck_restart")
        this.audio_flag = true
        agora.leaveChannel();
    },

    //完成按钮的点击事件
    cilck_stop:function(){
        cc.log("cilck_stop")
        if(this.audio_flag)
        {
            //停止采集音频
            cc.log("停止采集音频")
            this.audio_flag = false
            agora && agora.leaveChannel();
            this.unschedule(function() {
                this.CNM();//圈
            }, 0.2);
        }
        else
        {
            cc.log("录音已经停止！")
        }
    },

    //返回按钮的点击事件
    cilck_back:function(){
        cc.log("返回")
        if(this.audio_flag)
        {
            this.back_flag = true
            agora.leaveChannel();
        }
        cc.director.loadScene("cp_FirstPageScene");  
    },

    //停止播放动画
    stop_NMD:function(){

    },

    //启动播放动画，麦克风，闪烁，歌词滚动
    start_NMD:function(){
        /*
        this.schedule(function() {
            this.NMD();//点
        }, 0.25);
        */
        this.schedule(function() {
            this.CNM();//圈
        }, 0.2);
        this.schedule(function() {
            this.NND();//闪烁，更新录制时间
        }, 1);
        this.enable_lrc()
    },
    
    //点扩散动画
    NMD:function(){
        var live_time = 4 //动作时间
        var xy=new Array();
        xy[1]=1
        xy[2]=-1
        var rand_1 = parseInt(Math.random()*7)//随机数,0~6
        var rand_2 = parseInt(Math.random()*600)+1//随机数,1~1600
        var rand_3 = parseInt(Math.random()*2)+1//随机数,1~2
        var rand_4 = parseInt(Math.random()*2)+1//随机数,1~2
        
        //计算xy坐标
        var move_x = rand_2*xy[rand_3]
        var move_y = parseInt(Math.sqrt(600*600-move_x*move_x))*xy[rand_4]

        //产生节点
        var Point = new cc.Node();
        var Point_sp = Point.addComponent(cc.Sprite);
        Point_sp.spriteFrame = this.Point[rand_1]
        Point.parent = cc.find("Canvas/歌词卡片")
        //设置层级
        Point.setSiblingIndex(0)

        //移动、缩小、淡出
        Point.setScale(2)
        var moveby_action = cc.moveBy(live_time,move_x,move_y)
        var fadeout_action = cc.fadeOut(live_time)
        var scaletp_action = cc.scaleTo(live_time,0.2)
        var move_fade_scale = cc.spawn(moveby_action,fadeout_action,scaletp_action)

        //回调函数
        var finished = cc.callFunc(function(temp_point) {
            temp_point.destroy()
        }, this, Point);

        var sum_action = cc.sequence(move_fade_scale,finished)
        Point.runAction(sum_action)
    },
    
    //圆圈扩散动画
    CNM:function(){
        var live_time = 2 //动作时间

        //产生节点
        var Point = new cc.Node();
        var Point_sp = Point.addComponent(cc.Sprite);
        Point_sp.spriteFrame = this.circle

        //移动、放大、淡出
        Point.setScale(0.1)
        var fadeout_action = cc.fadeOut(live_time)
        var scaletp_action = cc.scaleTo(live_time,0.4)
        var fade_scale = cc.spawn(fadeout_action,scaletp_action)

        //回调函数
        var finished = cc.callFunc(function(temp_point) {
            temp_point.destroy()
        }, this, Point);

        var sum_action = cc.sequence(fade_scale,finished)

        if(parseInt(this.videoplayer.getComponent(cc.VideoPlayer).currentTime)!="0")
        {
            cc.find("Canvas/sing_menu").addChild(Point)
            Point.setSiblingIndex(1)
            Point.runAction(sum_action)
        }
    },

    //录制标志闪烁，同时更新录制时间
    NND:function(){
        var wholetime = parseInt(this.videoplayer.getComponent(cc.VideoPlayer).getDuration())
        var minutes = parseInt(wholetime/60)
        var sencond = wholetime-60*minutes
        wholetime = minutes+":"+sencond

        var nowtime = parseInt(this.videoplayer.getComponent(cc.VideoPlayer).currentTime)
        var minutes_t = parseInt(nowtime/60)
        var sencond_t = nowtime-60*minutes_t

        if(nowtime!="0")
        {
            var fadeout = cc.fadeOut(0.5)
            var fadein = cc.fadeIn(0.5)
            var shine = cc.sequence(fadeout,fadein)
            cc.find("Canvas/椭圆7").runAction(shine)
        }

        if(minutes_t<10)
        {
            minutes_t = "0"+minutes_t
        }
        if(sencond_t<10)
        {
            sencond_t = "0"+sencond_t
        }
        nowtime = minutes_t+":"+sencond_t
        cc.find("Canvas/time").getComponent(cc.Label).string = "正在录制："+nowtime+" / "+wholetime
    },
    
    //唱戏完成确认框，返回重唱事件
    cilck_continue:function(){
        var move_down = cc.moveBy(0.2,0,-500)
        var fade_out = cc.fadeOut(0.18)
        var sum_action = cc.spawn(move_down,fade_out)
        var finished = cc.callFunc(function(target) {
            //恢复其他按钮
            cc.find("Canvas").getComponent("SingPage").play_button.getComponent(cc.Button).interactable = true
            cc.find("Canvas").getComponent("SingPage").replay_button.getComponent(cc.Button).interactable = true
            cc.find("Canvas").getComponent("SingPage").stop_button.getComponent(cc.Button).interactable = true
            cc.find("Canvas").getComponent("SingPage").back.getComponent(cc.Button).interactable = true
            cc.find("Canvas/recomfim").active = false
        }, this);
        var sum = cc.sequence(sum_action,finished)
        cc.find("Canvas/recomfim").runAction(sum)
    },

    //唱戏完成确认框，确认完成事件
    cilck_finish:function(){
        cc.log("cilck_finish")
        if(this.send_flag==true ||true)//如果
        {
            cc.director.loadScene("cp_SendScene");
        }
        else{
            cc.log("请稍后")
            var Label_t = cc.find("Canvas/recomfim/确认框/确认完成")
            var moveby0 = cc.moveBy(0.05,30,0)
            var moveby1 = cc.moveBy(0.1,-60,0)
            var moveby2 = cc.moveBy(0.1,60,0)
            var moveby3 = cc.moveBy(0.1,-60,0)
            var moveby4 = cc.moveBy(0.1,60,0)
            var moveby5 = cc.moveBy(0.05,-30,0)
            var all_action = cc.sequence(moveby0,moveby1,moveby2,moveby3,moveby4,moveby5)
            Label_t.runAction(all_action)
        }
    },
});
