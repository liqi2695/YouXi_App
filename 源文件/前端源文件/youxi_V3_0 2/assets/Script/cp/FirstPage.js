window.videos = {
    //在进入唱戏界面时候刷新
    title:"天仙配",//标题
    videos_url:"https://youxi-data.oss-cn-shanghai.aliyuncs.com/test/%E8%8D%9E%E9%BA%A6%E8%AE%B0.mp4",//视频地址
    pic_url:"https://youxi-data.oss-cn-shanghai.aliyuncs.com/test/%E6%B5%8B%E8%AF%95%E7%94%BB%E9%9D%A21.jpg",//封面地址
    shortpic_url:"https://youxi-data.oss-cn-shanghai.aliyuncs.com/test/%E6%B5%8B%E8%AF%95%E7%94%BB%E9%9D%A21.jpg",//短的封面地址，在发布界面显示
    lrc_url:"https://youxi-data.oss-cn-shanghai.aliyuncs.com/test/areyoukok.txt",//歌词地址
    //在唱戏完成按钮中刷新
    audio_url:"https://youxi-data.oss-cn-shanghai.aliyuncs.com/%20%E4%B8%89%E5%9B%BD%E6%9D%80.aac",//用户唱的音频url
    //在发布页面初始化刷新
    location:"杭州市",//用户IP定位，默认值杭州
}


window.user = {
    name:"",//昵称
    phone:"",//用户手机号 
    count:"",//用户账号
    PictureNumber:""//用户头像
}

cc.Class({
    extends: cc.Component,
    properties: {
        search_blackboard:{
            default:null,
            type:cc.Node    
        },
        search_icon:{
            default:null,
            type:cc.Node    
        },
        placehold_label:{
            default:null,
            type:cc.Node    
        },

        Fuck_0:{
            default:null,
            type:cc.Node
        },
        Fuck_1_4:{
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
        allvideos:{
            default:null,
            type:cc.Node
        },
        recommendvideos:{
            default:null,
            type:cc.Node
        },
        //随机推荐
        random_videos:{
            default:[],
            type:Array
        },
        searchresult:{
            default:null,
            type:cc.Node
        },

        //取消搜索按钮
        cancel:{
            default:null,
            type:cc.Node
        },
        label1:{
            default:null,
            type:cc.Node
        },
        label2:{
            default:null,
            type:cc.Node
        },
        label3:{
            default:null,
            type:cc.Node
        },
        label4:{
            default:null,
            type:cc.Node
        },

        //唱戏标签
        sing:{
            default:null,
            type:cc.Node
        }, 
        //唱戏标签
        bell:{
            default:null,
            type:cc.Node
        }, 

        //搜索框节点
        search:{
            default:null,
            type:cc.Node
        }, 
        //轮播图
        banner:{
            default:null,
            type:cc.Node
        }, 
    },
    onLoad(){
        cc.log("首页加载……")
        //直接预加载看戏场景，提升效率
        cc.director.preloadScene("cp_WatchHistory", function () {
            cc.log("Next scene preloaded");
        });

        //轮播图开始滚动
        this.start_auto_banner()
        //默认推荐
        this.random_videos = [1,2,3,4]

        //隐藏取消搜索按钮
        var fadeout = cc.fadeOut(0)
        this.cancel.getComponent(cc.Button).interactable=false 
        this.cancel.runAction(fadeout)

        //隐藏推荐搜索
        cc.find("Canvas/推荐搜索").active = false

        //隐藏搜索结果
        //cc.find("Canvas/result_scrollview").active = false

        //刷新IP定位
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://restapi.amap.com/v3/ip?key=fd505a8d3649e3b3378447532b79b88b", true);//新建一个http连接
        xhr.onreadystatechange = function () {//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;//接受返回json
                response = JSON.parse(response)
                videos["location"] = response["city"]
                cc.log("IP定位：",videos["location"])
            }
        };
        xhr.send()
        this.reflesh()
    },

    //轮播图自动滚动
    start_auto_banner:function(){
        this.schedule(function() {
            var index = this.banner.getComponent(cc.PageView).getCurrentPageIndex()
            if(index == 2)
            {
                index = -1
            }
            this.banner.getComponent(cc.PageView).scrollToPage(index+1,2)
        }, 8);
    },

    //腔返回按钮的点击事件，返回到主界面
    click_back_qiang:function(event){
        cc.find("Canvas/scrollview").active = true
        cc.find("Canvas/MainMenu").active = true
        cc.find("Canvas/top_menu").active = true

        let qiang = event.currentTarget.getParent()
        var move_down = cc.moveBy(0.3,0,-2000)
        var finished = cc.callFunc(function(target) {
            qiang.active  =false
        }, this);
        var all_action1 = cc.sequence(move_down,finished)
        qiang.runAction(all_action1)
    },
    //主腔按钮点击事件，弹出主腔
    click_zhuqiang:function(){
        var qiang = cc.find("Canvas/zhuqiang")
        qiang.active = true
        qiang.x=0
        qiang.y=-2000
        var moveup = cc.moveTo(0.25,0,0)
        qiang.runAction(moveup)
        //禁用首页的按钮
        cc.find("Canvas/scrollview").active = false
        cc.find("Canvas/MainMenu").active = false
        cc.find("Canvas/top_menu").active = false
    },
    //花腔按钮点击事件，弹出花腔
    click_huaqiang:function(){
        var qiang = cc.find("Canvas/huaqiang")
        qiang.active = true
        qiang.x=0
        qiang.y=-2000
        var moveup = cc.moveTo(0.25,0,0)
        qiang.runAction(moveup)
        //禁用首页的按钮
        cc.find("Canvas/scrollview").active = false
        cc.find("Canvas/MainMenu").active = false
        cc.find("Canvas/top_menu").active = false
    },
    //阴司腔按钮点击事件，弹出阴司腔
    click_yinsiqiang:function(){
        var qiang = cc.find("Canvas/yinsiqiang")
        qiang.active = true
        qiang.x=0
        qiang.y=-2000
        var moveup = cc.moveTo(0.25,0,0)
        qiang.runAction(moveup)
        //禁用首页的按钮
        cc.find("Canvas/scrollview").active = false
        cc.find("Canvas/MainMenu").active = false
        cc.find("Canvas/top_menu").active = false
    },
    //仙腔按钮点击事件，弹出仙腔
    click_xianqiang:function(){
        var qiang = cc.find("Canvas/xianqiang")
        qiang.active = true
        qiang.x=0
        qiang.y=-2000
        var moveup = cc.moveTo(0.25,0,0)
        qiang.runAction(moveup)
        //禁用首页的按钮
        cc.find("Canvas/scrollview").active = false
        cc.find("Canvas/MainMenu").active = false
        cc.find("Canvas/top_menu").active = false
    },
    //彩腔按钮点击事件，弹出彩腔
    click_caiqiang:function(){
        var qiang = cc.find("Canvas/caiqiang")
        qiang.active = true
        qiang.x=0
        qiang.y=-2000
        var moveup = cc.moveTo(0.25,0,0)
        qiang.runAction(moveup)
        //禁用首页的按钮
        cc.find("Canvas/scrollview").active = false
        cc.find("Canvas/MainMenu").active = false
        cc.find("Canvas/top_menu").active = false
    },

    //搜索框事件
    editingDidBegan:function()
    {
        cc.log("editingDidBegan")
        if(this.cancel.getComponent(cc.Button).interactable==false)
        {
            //隐藏唱戏标签
            var fadeout = cc.fadeOut(0.13)
            this.sing.runAction(fadeout)

            //隐藏铃铛
            var fadeout = cc.fadeOut(0.13)
            this.bell.runAction(fadeout)

            //显示取消按钮
            var fadein = cc.fadeIn(0.13)
            this.cancel.runAction(fadein)

            //搜索背景移动，变长
            var move_left = cc.moveBy(0.13,-160,0)
            var scale_X = cc.scaleTo(0.13,1.7,1)
            var move_scale = cc.spawn(move_left,scale_X)
            this.search_blackboard.runAction(move_scale)

            //搜索节点跟随左移
            var move_left = cc.moveBy(0.13,-340,0)
            this.search.runAction(move_left)
            this.cancel.getComponent(cc.Button).interactable=true


            //显示推荐搜索
            cc.find("Canvas/推荐搜索").active = true
            //开始搜索框输入，隐藏其他组件
            cc.find("Canvas/MainMenu").active = false
            cc.find("Canvas/scrollview").active = false
        }
    },
    textChanged:function()
    {
        cc.log("textChanged")
        cc.log("清除原有节点")
        this.searchresult.destroyAllChildren()
        cc.find("Canvas/result_scrollview").active = true
        //隐藏推荐搜索
        cc.find("Canvas/推荐搜索").active = false

        //搜索
        cc.log("正在搜索")
        var url = "http://47.103.115.138/youxi/behind/search.php"
        let self = this
        if(cc.find("Canvas/top_menu/search/editbox").getComponent(cc.EditBox).string!="")
        {
            var data = 
            {
                "content":cc.find("Canvas/top_menu/search/editbox").getComponent(cc.EditBox).string
            }
            data = older(data)
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);//新建一个http连接
            xhr.onreadystatechange = function () {//声明回调函数
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;//接受返回jsond
                    response = JSON.parse(response)
                    cc.log(response)

                    if(response["result_number"]!=0)
                    {
                        cc.log("搜索成功")
                        for(let i = 1;i<=response["result_number"];i=i+1)
                        {
                            let videourl = response["result"][i-1]["videourl"]
                            let videopicurl = response["result"][i-1]["videopicurl"]
                            let videotitle = response["result"][i-1]["videotitle"]
                            let videolrcurl = response["result"][i-1]["videolrcurl"]
                            let videoshortpicurl = response["result"][i-1]["videoshortpicurl"]
                            cc.log("添加数据")

                            cc.loader.loadRes("/pre/video", function (err, prefab) {
                                var videoNode = cc.instantiate(prefab);

                                //更改视频标题
                                videoNode.getComponent("video").videotitle = videotitle
                                //更改视频url
                                videoNode.getComponent("video").videourl = videourl
                                //更改歌词url
                                videoNode.getComponent("video").videopicurl = videopicurl
                                //更改视频封面url
                                videoNode.getComponent("video").videolrcurl = videolrcurl
                                //更改视频短封面url
                                videoNode.getComponent("video").videosendpicurl = videoshortpicurl


                                //远程加载封面
                                cc.loader.load(videopicurl,function(err,pic)
                                {
                                    var temp_sp = new cc.SpriteFrame(pic)
                                    videoNode.getComponent("video").video.getComponent(cc.Sprite).spriteFrame = temp_sp
                                    //添加到搜索结果
                                    self.searchresult.addChild(videoNode)
                                })
                        })
                    }
                    }
            }    
            };
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
            xhr.send(data)
        }
        else
        {
            //当输入为空，显示推荐搜索，同时隐藏之前的搜索结果
            cc.find("Canvas/推荐搜索").active = true 
            cc.find("Canvas/result_scrollview").active = false
        }
    },
    editingDidEnded:function()
    {
        cc.log("editingDidEnded")
        /*
        if(cc.find("Canvas/top_menu/search_blackboard/editbox").getComponent(cc.EditBox).string == '' && false)
        {
            this.cancel.getComponent(cc.Button).interactable=false 
            //提前结束搜索框输入，显示其他组件
            cc.find("Canvas/MainMenu").active = true
            cc.find("Canvas/scrollview").active = true

            var move_top = cc.moveBy(0.13,0,-260)
            cc.find("Canvas/top_background").runAction(move_top)

            var move_right = cc.moveBy(0.13,100,0)
            this.search_blackboard.runAction(move_right)

            var width = this.search_blackboard.width
            var move_right1 = cc.moveBy(0.13,width*0.31,0)
            this.search_icon.runAction(move_right1)

            var move_right2 = cc.moveBy(0.13,width*0.3,0)
            var fadeout = cc.fadeOut(0.13)
            this.cancel.runAction(fadeout)
        }
        */
    },
    editingReturn:function()
    {
        cc.log("editingReturn")     
    },

    
    //四个球，暂时关闭
    //启动超级变换形态～～
    start_NMD:function(){
        this.schedule(function() {
            this.NMD();//点
        }, 0.25);

        this.schedule(function() {
            this.CNM();//圈
        }, 2);
        this.Revolve()
        
        //主球自转
        var rotateby_action = cc.rotateBy(25,360,360)
        var rotateby_forever = cc.repeatForever(rotateby_action)
        this.Fuck_0.runAction(rotateby_forever);
    },
    //一群傻子点乱飞，计时器函数
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
        Point.parent = cc.find("Canvas/scrollview/view/content/Fuck")
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
    //圆圈扩散动画～，计时器函数
    CNM:function(){
        var live_time = 4 //动作时间

        //产生节点
        var Point = new cc.Node();
        var Point_sp = Point.addComponent(cc.Sprite);
        Point_sp.spriteFrame = this.circle
        Point.parent = cc.find("Canvas/scrollview/view/content/Fuck")
        //cc.log(Point.x,Point.y)

        //设置层级
        Point.setSiblingIndex(1)

        //移动、放大、淡出
        Point.setScale(0.2)
        var fadeout_action = cc.fadeOut(live_time)
        var scaletp_action = cc.scaleTo(live_time,0.9)
        var fade_scale = cc.spawn(fadeout_action,scaletp_action)

        //回调函数
        var finished = cc.callFunc(function(temp_point) {
            temp_point.destroy()
        }, this, Point);

        var sum_action = cc.sequence(fade_scale,finished)
        Point.runAction(sum_action)

        // var cout = this.node.childrenCount
        // cc.log(cout)
    },
    //四个卫星公转和自转
    Revolve:function(){

        var Rotate_time = 50//自转周期
        var Revolve_time = 80//公转周期

        var Rotate_action = cc.repeatForever(cc.rotateBy(Rotate_time,360,360))//自转动作
        var Revolve_action = cc.repeatForever(cc.rotateBy(Revolve_time,360,360))//公转动作
        
        this.Fuck_1_4.runAction(Revolve_action)

    },

    //刷新推荐唱戏，拉取整张表
    reflesh:function()
    {
        cc.log("刷新")
        var url = "http://47.103.115.138/youxi/behind/new.php"
        let self = this
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);//新建一个http连接
        xhr.onreadystatechange = function () {//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;//接受返回jsond
                response = JSON.parse(response)
                cc.log(response)
                if(response["res"]==2001)
                {
                    cc.log("刷新请求成功")
                    cc.log("清除原有视频")
                    self.allvideos.destroyAllChildren()
                    self.recommendvideos.destroyAllChildren()

                    //产生新的4个推荐
                    for(var i = 0;i<=3;i=i+1)
                    {
                        var temp_rand= randomNum(1,response["result_number"]-1)
                        self.random_videos.indexOf(temp_rand)==-1?self.random_videos[i] = temp_rand:i=i-1;
                    }
                    cc.log(self.random_videos)

                    //循环导入json数据
                    for(let i = 1;i<=response["result_number"];i=i+1)
                    {
                        let videourl = response["result"][i-1]["videourl"]
                        let videopicurl = response["result"][i-1]["videopicurl"]
                        let videotitle = response["result"][i-1]["videotitle"]
                        let videolrcurl = response["result"][i-1]["videolrcurl"]
                        let videoshortpicurl = response["result"][i-1]["videoshortpicurl"]

                        //创建预置体节点
                        cc.loader.loadRes("/pre/video", function (err, prefab) {
                            var videoNode = cc.instantiate(prefab);

                            //更改视频标题
                            videoNode.getComponent("video").videotitle = videotitle
                            //更改视频url
                            videoNode.getComponent("video").videourl = videourl
                            //更改歌词url
                            videoNode.getComponent("video").videopicurl = videopicurl
                            //更改视频封面url
                            videoNode.getComponent("video").videolrcurl = videolrcurl
                            //更改视频短封面
                            videoNode.getComponent("video").videoshortpicurl = videoshortpicurl

                            //远程加载封面
                            cc.loader.load(videopicurl,function(err,pic)
                            {
                                var temp_sp = new cc.SpriteFrame(pic)
                                videoNode.getComponent("video").video.getComponent(cc.Sprite).spriteFrame = temp_sp
                                //添加到经典曲目
                                self.allvideos.addChild(videoNode)

                                if(self.random_videos.indexOf(i)!= -1)
                                {
                                    var videoNode2 = new cc.instantiate(videoNode)
                                    self.recommendvideos.addChild(videoNode2)
                                }

                                //cc.log(this.random_videos.indexOf(2))
                                //self.random_videos.addChild(videoNode)
                                //self.recommendvideos.addChild(videoNode)
                            })
                        });
                    }
                }
            }
        };
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr.send()
    },

    //输入框 取消按钮的点击事件
    click_cancel:function(){
        cc.log("click_cancel")
        this.cancel.getComponent(cc.Button).interactable=false 
        //提前结束搜索框输入，显示其他组件
        cc.find("Canvas/MainMenu").active = true
        cc.find("Canvas/scrollview").active = true
        //隐藏推荐搜索
        cc.find("Canvas/推荐搜索").active = false

        cc.find("Canvas/top_menu/search/editbox").getComponent(cc.EditBox).string = ""
    
        //隐藏搜索结果
        cc.find("Canvas/result_scrollview").active = false
        //清除原有搜索结果
        this.searchresult.destroyAllChildren()

        //显示唱戏标签
        var fadein = cc.fadeIn(0.13)
        this.sing.runAction(fadein)

        //显示铃铛
        var fadein = cc.fadeIn(0.13)
        this.bell.runAction(fadein)

        //隐藏消按钮
        var fadeout = cc.fadeOut(0.13)
        this.cancel.runAction(fadeout)

        //搜索背景移动，缩短
        var move_left = cc.moveBy(0.13,160,0)
        var scale_X = cc.scaleTo(0.13,1,1)
        var move_scale = cc.spawn(move_left,scale_X)
        this.search_blackboard.runAction(move_scale)

        //搜索节点跟随右移
        var move_left = cc.moveBy(0.13,340,0)
        this.search.runAction(move_left)
        this.cancel.getComponent(cc.Button).interactable=false
    },

    //推荐搜索1的点击事件
    click_tuijian1:function(){
        cc.find("Canvas/top_menu/search/editbox").getComponent(cc.EditBox).string = this.label1.getComponent(cc.Label).string
        this.textChanged()
        cc.find("Canvas/推荐搜索").active = false
    },

    //推荐搜索2的点击事件
    click_tuijian2:function(){
        cc.find("Canvas/top_menu/search/editbox").getComponent(cc.EditBox).string = this.label2.getComponent(cc.Label).string
        this.textChanged()
        cc.find("Canvas/推荐搜索").active = false
    },

    //推荐搜索3的点击事件
    click_tuijian3:function(){
        cc.find("Canvas/top_menu/search/editbox").getComponent(cc.EditBox).string = this.label3.getComponent(cc.Label).string
        this.textChanged()
        cc.find("Canvas/推荐搜索").active = false
    },

     //推荐搜索4的点击事件
    click_tuijian4:function(){
        cc.find("Canvas/top_menu/search/editbox").getComponent(cc.EditBox).string = this.label4.getComponent(cc.Label).string
        this.textChanged()
        cc.find("Canvas/推荐搜索").active = false
    },

    turn_watchscene:function(){
        cc.log("切换到看戏")
        cc.director.loadScene("cp_WatchHistory");

        var landing=cc.find("Canvas/MainMenu/WatchPage").getComponent(cc.Button)
                landing.interactable=false
                setTimeout(function()
                {
                    cc.log("禁用两秒")
                    landing.interactable=true
                },3000) 
    },
});
