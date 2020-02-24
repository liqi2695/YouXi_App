cc.Class({
    extends: cc.Component,

    properties: {
        //黄梅戏历史 和 戏团 的bar
        top_bar:{
            default:null,
            type:cc.Node
        },
        step:
        {
            default:[],
            type:cc.Node
        },
        cancel:
        {
            default:null,
            type:cc.Node
        },
        history:
        {
            default:null,
            type:cc.Node
        },
        group:
        {
            default:null,
            type:cc.Node
        },
        redbar:
        {
            default:null,
            type:cc.Node
        },
        search_blackboard:
        {
            default:null,
            type:cc.Node
        },
        search:
        {
            default:null,
            type:cc.Node
        },
        //触摸监听
        content:
        {
            default:null,
            type:cc.Node
        },
        intronode:
        {
            default:null,
            type:cc.Node
        },
        introlabel:
        {
            default:null,
            type:cc.Node
        },
        messagenode:
        {
            default:null,
            type:cc.Node
        },
        bar:
        {
            default:null,
            type:cc.Node
        },

        longvideo_info:
        {
            default:null,
            type:cc.Node
        },

        //搜索结果
        searchresult:
        {
            default:null,
            type:cc.Node
        },

        //推荐搜索
        label1:
        {
            default:null,
            type:cc.Node
        },
        label2:
        {
            default:null,
            type:cc.Node
        },
        label3:
        {
            default:null,
            type:cc.Node
        },
        //评论框
        inputmsg:
        {
            default:null,
            type:cc.Node
        },
        //我关注的戏团 view
        mine_group:
        {
            default:null,
            type:cc.Node
        },
        //所有的戏团 view
        all_group:
        {
            default:null,
            type:cc.Node
        },
        //发送成功的提示
        send_success_msg:
        {
            default:null,
            type:cc.Node
        }
    },

    onLoad(){
        //隐藏取消搜索按钮
        var fadeout = cc.fadeOut(0)
        this.cancel.getComponent(cc.Button).interactable=false 
        this.cancel.runAction(fadeout)
        this.reflesh(0);
        this.reflesh(1);
        this.reflesh(2);

        //刷新戏团
        this.reflesh_all_group()
        this.reflesh_mine_group()
        //启用监听
        this.start_content_listener();
    },

    //刷新对应阶段的视频，并添加到节点中去，每次刷新会清除之前获取的节点
    reflesh:function(step)
    {
        let self = this
        var url = "http://47.103.115.138/youxi/behind/get-longvideo.php"
        var data = {
            "personalphone":"17816121043",//user["phone"],
            "step":step+1
        }
        data = older(data)

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);//新建一个http连接
        xhr.onreadystatechange = function(){//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) 
            {
                var response = xhr.responseText;//接受返回jsond
                response = JSON.parse(response)

                if(response["res"]=="2001")
                {
                    for(let i=0;i<response["video"].push();i++)
                    {
                        cc.loader.loadRes("/pre/longvideo_item", function (err, prefab) 
                        {
                            
                            var videoNode = cc.instantiate(prefab);
                            
                            //更换标题
                            videoNode.getChildByName("title").getComponent(cc.Label).string = response["video"][i]["videotitle"]
                 
                            //把标题和视频url添加到预置体属性
                            videoNode.getComponent("longvideo_item").title = response["video"][i]["videotitle"]
                            videoNode.getComponent("longvideo_item").videos_url = response["video"][i]["videourl"]

                            //远程加载封面图
                            cc.loader.load(response["video"][i]["videopicurl"],function(err,pic)
                            {
                                var temp_sp = new cc.SpriteFrame(pic)
                                videoNode.getChildByName("pic").getComponent(cc.Sprite).spriteFrame = temp_sp
                            })

                            //更改简介
                            var temp_msp = response["video"][i]["videolrcurl"]
                            //把原版简介添加到预置体属性
                            videoNode.getComponent("longvideo_item").lrc = temp_msp
                  
                            if(temp_msp.length>95)
                            {
                                temp_msp = temp_msp.substring(0,95)
                                temp_msp = temp_msp+"......"
                            }
                            //删除所有的换行，使得在预览中看起来好看一点，但详情界面不变
                            var reg = new RegExp("\n","g")
                            temp_msp = temp_msp.replace(reg,"")
                            videoNode.getChildByName("intro").getComponent(cc.Label).string = temp_msp
                            //添加进父节点
                            self.step[step].addChild(videoNode)
                        })
                    }
                }
            }    
            };
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr.send(data)
    },

    //刷新我关注的戏团，并添加到节点
    //在刷新全部戏团完毕后刷新
    reflesh_mine_group:function(){
        let self = this
        
        data = 
        {
            "PersonalPhone":user["phone"]
        }
        data = older(data)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "http://47.103.115.138/youxi/behind/get-con-theater.php", true);//新建一个http连接
        xhr.onreadystatechange = function(){//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) 
            {
                var response = xhr.responseText;//接受返回json
                response = JSON.parse(response)  
                //添加进我关注的戏团节点
                for(let i = 0;i<response["result_number"];i++)
                {
                    cc.loader.loadRes("/pre/group_item", function (err, prefab) 
                        {
                            //将每个戏团的参数填进group_item预置体属性中
                            let groupNode = cc.instantiate(prefab);
                            groupNode.getComponent("group_item").OperaName = response["result"][i]["OperaName"]
                            groupNode.getComponent("group_item").OperaPhoneNumber = response["result"][i]["OperaPhoneNumber"]
                            groupNode.getComponent("group_item").OperaMember = response["result"][i]["OperaMember"]
                            groupNode.getComponent("group_item").OperaIntroduction = response["result"][i]["OperaIntroduction"]
                            groupNode.getComponent("group_item").OperaFans = response["result"][i]["OperaFans"]

                            //更改预置体中的节点内容
                            groupNode.getComponent("group_item").title_label.getComponent(cc.Label).string = groupNode.getComponent("group_item").OperaName
                            //在我关注的戏团，因此禁用关注按钮，直接显示已经关注
                            groupNode.getComponent("group_item").like_button.active = false
                            //判定并更改颜色
                            var color = (self.mine_group.children.length+1)%3
                            switch(color)
                            {
                                case 0:
                                    {
                                        cc.loader.loadRes("Texture2D/3", function (err, pic) {
                                            var temp_sp = new cc.SpriteFrame(pic)
                                            groupNode.getComponent(cc.Sprite).spriteFrame = temp_sp;
                                        });break;
                                    }//变为绿色
                                case 2:
                                    {
                                        cc.loader.loadRes("Texture2D/2", function (err, pic) {
                                            var temp_sp = new cc.SpriteFrame(pic)
                                            groupNode.getComponent(cc.Sprite).spriteFrame = temp_sp;
                                        });break;
                                    }//变为蓝色
                                case 1:break;//不变色
                            }
                            //添加进节点
                            self.mine_group.addChild(groupNode)
                    })
                }
            }    
            };
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr.send(data)
    },
    //刷新所有戏团，并添加到节点
    reflesh_all_group:function(){
        let self = this

        //获取已经关注的戏团
        var xhr_t = new XMLHttpRequest();
        var data_t = 
        {
            "PersonalPhone":user["phone"]
        }
        data_t = older(data_t)
        xhr_t.open('POST', "http://47.103.115.138/youxi/behind/get-con-theater.php", true);
        xhr_t.onreadystatechange = function(){//声明回调函数
            if (xhr_t.readyState == 4 && (xhr_t.status >= 200 && xhr_t.status < 400)) 
            {
                var response_t = xhr_t.responseText;//接受返回json
                response_t = JSON.parse(response_t)  

                //储存已经关注的戏团
                let group_t = response_t["result"]

                //获取所有的戏团
                var data = 
                {
                    "PersonalPhone":user["phone"]
                }
                data = older(data)
                var xhr = new XMLHttpRequest();
                xhr.open('POST', "http://47.103.115.138/youxi/behind/get-theater.php", true);//新建一个http连接
                xhr.onreadystatechange = function(){//声明回调函数
                    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) 
                    {
                        var response = xhr.responseText;//接受返回json
                        response = JSON.parse(response)
                        if(response["res"]==2001)
                        {
                            for(let i = 0;i<response["theater"].length;i++)
                            {
                                cc.loader.loadRes("/pre/group_item", function (err, prefab) 
                                {
                                    //将每个戏团的参数填进group_item预置体属性中
                                    let groupNode = cc.instantiate(prefab);
                                    groupNode.getComponent("group_item").OperaName = response["theater"][i]["OperaName"]
                                    groupNode.getComponent("group_item").OperaPhoneNumber = response["theater"][i]["OperaPhoneNumber"]
                                    groupNode.getComponent("group_item").OperaMember = response["theater"][i]["OperaMember"]
                                    groupNode.getComponent("group_item").OperaIntroduction = response["theater"][i]["OperaIntroduction"]
                                    groupNode.getComponent("group_item").OperaFans = response["theater"][i]["OperaFans"]
        
                                    //更改预置体中的节点内容
                                    groupNode.getComponent("group_item").title_label.getComponent(cc.Label).string = groupNode.getComponent("group_item").OperaName
        
                                    //判定并更改颜色
                                    var color = (self.all_group.children.length+1)%3
                                    switch(color)
                                    {
                                        case 0:
                                            {
                                                cc.loader.loadRes("Texture2D/3", function (err, pic) {
                                                    var temp_sp = new cc.SpriteFrame(pic)
                                                    groupNode.getComponent(cc.Sprite).spriteFrame = temp_sp;
                                                });break;
                                            }//变为绿色
                                        case 2:
                                            {
                                                cc.loader.loadRes("Texture2D/2", function (err, pic) {
                                                    var temp_sp = new cc.SpriteFrame(pic)
                                                    groupNode.getComponent(cc.Sprite).spriteFrame = temp_sp;
                                                });break;
                                            }//变为蓝色
                                        case 1:break;//不变色
                                    }
                                    //添加进节点
                                    self.all_group.addChild(groupNode)
                                    //判断是否已经关注
                                    //算法：遍历之前获取的已关注戏团数组
                                    for(i=0;i<group_t.length;i++)
                                    {
                                        if(groupNode.getComponent("group_item").OperaName == group_t[i]["OperaName"])
                                        {
                                            cc.log(group_t[i]["OperaName"],"戏团已经关注！")
                                            //如果戏团已经被关注，则显示取消关注按钮，隐藏关注
                                            groupNode.getComponent("group_item").like_button.active = false
                                            groupNode.getComponent("group_item").like_button.opacity = 0
                                            var fadein = cc.fadeIn(0)
                                            var scale_x = cc.scaleTo(0,2.25,1)
                                            var movetocenter = cc.moveBy(0,-30,0)
                                            var action1 = cc.spawn(fadein,scale_x,movetocenter)
                                            groupNode.getComponent("group_item").like_background.runAction(action1)
                                            groupNode.getComponent("group_item").like_label.runAction(cc.fadeIn(0))
                                            groupNode.getComponent("group_item").like_background.getComponent(cc.Button).interactable = true
                                        }
                                    }
                                })
                            }
                        }
                    }    
                    };
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
                xhr.send(data)
            }
        }
        xhr_t.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr_t.send(data_t)
    },

    //搜索框事件
    editingDidBegan:function()
    {
        cc.log("editingDidBegan")
        if(this.cancel.getComponent(cc.Button).interactable==false)
        {
            //隐藏历史、戏团、小红条标签，取消其按钮
            var fadeout = cc.fadeOut(0.25)
            this.history.runAction(fadeout)
            var fadeout = cc.fadeOut(0.25)
            this.group.runAction(fadeout)
            var fadeout = cc.fadeOut(0.25)
            this.redbar.runAction(fadeout)
            
            //显示取消按钮
            var fadein = cc.fadeIn(0.25)
            this.cancel.runAction(fadein)

            //显示推荐搜索
            cc.find("Canvas/推荐搜索").active = true

            //搜索背景水平向左移动，变长
            var move_left = cc.moveBy(0.25,-335,0)
            var scale_X = cc.scaleTo(0.25,2.28,1)
            var move_scale = cc.spawn(move_left,scale_X)
            this.search_blackboard.runAction(move_scale)

            //搜索节点跟随移动
            var move_left = cc.moveBy(0.25,-565,0)
            this.search.runAction(move_left)


            //开始搜索框输入，隐藏其他组件
            cc.find("Canvas/scrollview").active = false
            cc.find("Canvas/MainMenu").active = false
            cc.find("Canvas/group_view").active = false

            this.cancel.getComponent(cc.Button).interactable=true
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
        var url = "http://47.103.115.138/youxi/behind/longvideo.php"
        let self = this
        if(cc.find("Canvas/top_menu/search/editbox").getComponent(cc.EditBox).string!="")
        {
            var data = 
            {
                "videotitle":cc.find("Canvas/top_menu/search/editbox").getComponent(cc.EditBox).string
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
                            cc.log("添加数据")

                            //加载预置体
                            cc.loader.loadRes("/pre/longvideo_item", function (err, prefab) 
                            {
                                let videoNode = cc.instantiate(prefab);
                                //更换标题
                                videoNode.getChildByName("title").getComponent(cc.Label).string = videotitle

                                //把标题和视频url添加到预置体属性
                                videoNode.getComponent("longvideo_item").title = videotitle
                                videoNode.getComponent("longvideo_item").videos_url = videourl

                                //远程加载封面图
                                cc.loader.load(videopicurl,function(err,pic)
                                {
                                    var temp_sp = new cc.SpriteFrame(pic)
                                    videoNode.getChildByName("pic").getComponent(cc.Sprite).spriteFrame = temp_sp
                                    //添加进节点
                                    self.searchresult.addChild(videoNode)
                                })

                                //更改简介
                                //把原版简介添加到预置体属性
                                videoNode.getComponent("longvideo_item").lrc = videolrcurl
                                if(videolrcurl.length>95)
                                {
                                    videolrcurl = videolrcurl.substring(0,95)
                                    videolrcurl = videolrcurl+"......"
                                }
                                //删除所有的换行，使得在预览中看起来好看一点，但详情界面不变
                                var reg = new RegExp("\n","g")
                                videolrcurl = videolrcurl.replace(reg,"")
                                videoNode.getChildByName("intro").getComponent(cc.Label).string = videolrcurl
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

    },
    editingReturn:function()
    {
        cc.log("editingReturn")     
    },

    //推荐搜索1的点击事件
    click_tuijian1:function(){
        this.search.getChildByName("editbox").getComponent(cc.EditBox).string = this.label1.getComponent(cc.Label).string
        this.textChanged()
        cc.find("Canvas/推荐搜索").active = false
    },
    //推荐搜索2的点击事件
    click_tuijian2:function(){
        this.search.getChildByName("editbox").getComponent(cc.EditBox).string = this.label2.getComponent(cc.Label).string
        this.textChanged()
        cc.find("Canvas/推荐搜索").active = false
    },
    //推荐搜索3的点击事件
    click_tuijian3:function(){
        this.search.getChildByName("editbox").getComponent(cc.EditBox).string = this.label3.getComponent(cc.Label).string
        this.textChanged()
        cc.find("Canvas/推荐搜索").active = false
    },

    //输入框 取消按钮的点击事件
    click_cancel:function(){
        cc.log("click_cancel")
        if(this.cancel.getComponent(cc.Button).interactable == true)
        {
            //恢复不可点击状态
            this.cancel.getComponent(cc.Button).interactable=false 

            //搜索背景移动，缩短
            var move_left = cc.moveBy(0.25,335,0)
            var scale_X = cc.scaleTo(0.25,1,1)
            var move_scale = cc.spawn(move_left,scale_X)
            this.search_blackboard.runAction(move_scale)


            //搜索节点跟随右移
            var move_left = cc.moveBy(0.25,565,0)
            this.search.runAction(move_left)

            //隐藏取消按钮
            var fadeout = cc.fadeOut(0.25)
            this.cancel.runAction(fadeout)
            //隐藏推荐搜索
            cc.find("Canvas/推荐搜索").active = false
            //隐藏搜索结果
            cc.find("Canvas/result_scrollview").active = false
            //清除原有搜索结果
            this.searchresult.destroyAllChildren()

            cc.find("Canvas/top_menu/search/editbox").getComponent(cc.EditBox).string = ""

            //搜索结束，显示其余组件
            //显示历史、戏团、小红条标签，取消其按钮
            var fadein = cc.fadeIn(0.25)
            this.history.runAction(fadein)
            var fadein = cc.fadeIn(0.25)
            this.group.runAction(fadein)
            var fadein = cc.fadeIn(0.25)
            this.redbar.runAction(fadein)

            //显示其他组件
            cc.find("Canvas/scrollview").active = true
            cc.find("Canvas/MainMenu").active = true
            cc.find("Canvas/group_view").active = true
        }
    },

    //详情界面返回按钮的 点击事件
    click_back:function(){
        this.click_cancel()
        //防止bug，把内容切换到详情，把bar移动到详情
        this.turn_introduce();
        //清空评论区
        this.messagenode.destroyAllChildren()

        //移动详情节点到右边，同时取消激活
        var move_to = cc.moveTo(0.3,1080,this.longvideo_info.y)
        //回调函数
        var finished = cc.callFunc(function() {
            this.longvideo_info.active = true
        }, this);
        var action = cc.sequence(move_to,finished)
        this.longvideo_info.runAction(action)

        //显示历史界面
        cc.find("Canvas/background").active = true
        cc.find("Canvas/MainMenu").active = true
        cc.find("Canvas/top_menu").active = true
        cc.find("Canvas/scrollview").active = true

        //停止播放
        cc.find("Canvas/longvideo_info/videoplayer").getComponent(cc.VideoPlayer).pause()
        //取消滚动
        cc.director.getScheduler().unscheduleAllForTarget(this)
    },

    //启用滑动触摸监听 控制介绍和留言的切换
    start_content_listener:function()
    {
        //用来控制介绍和留言的切换
        let bar_posi = "left"

        //注册内容框的触摸事件，控制滑动
        this.content.on('touchmove', function(event){
            var move_x = event.getLocationX()-event.getPreviousLocation().x
            this.content.runAction(cc.moveBy(0,move_x,0))
        }, this);

        //注册内容框的释放事件，控制介绍和留言   touchcancel
        this.content.on('touchend', function(event){
            cc.log("touchend")
            //停止滑动的动作，防止bug
            this.content.stopAllActions();
            var move_x = event.getLocationX()-event.getStartLocation().x
            //首先判断是否复位
            if((move_x<250 && move_x>-250)||(bar_posi == "left" && move_x>0)||(bar_posi == "right" && move_x<0))
            {
                cc.log("复位",move_x)
                if(bar_posi == "right")
                {
                    this.turn_message()
                }
                else
                {
                    this.turn_introduce()
                }
            }
            else
            {
                if(bar_posi == "left")
                {
                    this.turn_message()
                    bar_posi = "right"
                    cc.log("滑动到",bar_posi)
                }
                else
                {
                    this.turn_introduce()
                    bar_posi = "left"
                    cc.log("滑动到",bar_posi)
                }
            }
        }, this);
    },

    //ScrollView的滑动回调函数，启用左右切换
    messageview_callback:function(){
        var move_x = this.messageview.getComponent(cc.ScrollView).getContentPosition().x
        cc.log(this.messageview.getComponent(cc.ScrollView).getContentPosition().x)
        if(move_x>250)
        {
            this.turn_introduce()
        }
    },

    //详情界面 滑动到介绍板块
    turn_introduce:function(){
        this.content.runAction(cc.moveTo(0.2,540,cc.find("Canvas/longvideo_info/content").y))
        this.bar.runAction(cc.moveTo(0.2,cc.find("Canvas/longvideo_info/mid_menu/intor").x,this.bar.y))
    },
    //详情界面 滑动到留言板块
    turn_message:function(){
        this.content.runAction(cc.moveTo(0.2,-540,cc.find("Canvas/longvideo_info/content").y))
        this.bar.runAction(cc.moveTo(0.2,cc.find("Canvas/longvideo_info/mid_menu/message").x,this.bar.y))
    },

    //评论框的editbox事件
    //发送评论
    sendmsg:function(){
        cc.log("sendmsg")
        var content = this.inputmsg.getComponent(cc.EditBox).string
        var LongVideoUrl = cc.find("Canvas/longvideo_info/videoplayer").getComponent(cc.VideoPlayer).remoteURL
        var url = "http://47.103.115.138/youxi/behind/longvideo-getcomment.php"
        var data = {
            "PersonalNickName":user["name"],
            "PictureNumber":user["PictureNumber"],
            "Comment":content,
            "CommentTime":Math.round(new Date() / 1000),//发布时间戳
            "LongVideoUrl":LongVideoUrl
        }
        data = older(data)
        var xhr = new XMLHttpRequest();
        let self = this
        xhr.open('POST', url, true);//新建一个http连接
        xhr.onreadystatechange = function(){//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) 
            {
                var response = xhr.responseText;//接受返回jsond
                response = JSON.parse(response)
                cc.log(response)
                //弹窗提示发布成功
                var movedown = cc.moveBy(0.2,0,-80)
                var hold = cc.moveBy(2,0,0)
                var moveup = cc.moveBy(0.2,0,80)
                var all_action = cc.sequence(movedown,hold,moveup)
                self.send_success_msg.runAction(all_action)

                //清除输入框
                self.inputmsg.getComponent(cc.EditBox).string = ""
                //取消滚动
                cc.director.getScheduler().unscheduleAllForTarget(self)
                //重新开始滚动
                self.getmsg()
            }
        }
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        if(content!="")
            xhr.send(data)
    },

    //获取对应长视频的评论，并开始滚动显示评论
    getmsg:function(){
        let self = this;
        cc.log("getmsg")
        var LongVideoUrl = cc.find("Canvas/longvideo_info/videoplayer").getComponent(cc.VideoPlayer).remoteURL
        var url = "http://47.103.115.138/youxi/behind/longvideo-sendcomment.php"
        var data = {
            "LongVideoUrl":LongVideoUrl
        }
        data = older(data)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);//新建一个http连接
        xhr.onreadystatechange = function(){//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) 
            {
                var response = xhr.responseText;//接受返回jsond
                response = JSON.parse(response)
                cc.log(response)

                if(response["result_number"]!=0)
                {
                    let i = 0 ;
                    //开启评论滚动显示
                    self.schedule(function() {
                        self.additem(response["result"][i]["PersonalNickName"],response["result"][i]["Comment"],response["result"][i]["PictureNumber"])
                        i++;
                        if(i == response["result_number"])
                        {
                            i=0
                        }
                    }, 2);
                }
            }
        }
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr.send(data)
    },

    //向messagenode添加一条评论，如果添加完后显示的评论数等于5，则删去第一条
    additem:function(name,content,picturenumber){
        let self = this
        cc.loader.loadRes("/pre/message_item", function (err, prefab) 
        {
            var count = self.messagenode.children
            let videoNode = cc.instantiate(prefab);
            //更换评论的内容，头像，名字
            videoNode.getChildByName("name").getComponent(cc.Label).string = name
            videoNode.getChildByName("content").getComponent(cc.Label).string = content

            cc.loader.loadRes("Texture2D/logo/"+picturenumber, function (err, pic) {
                var temp_sp = new cc.SpriteFrame(pic)
                videoNode.getChildByName("logo").getComponent(cc.Sprite).spriteFrame = temp_sp;
            });

            //我就是个天才
            videoNode.opacity = 0
            videoNode.runAction(cc.fadeIn(0.4))

            //如果当前显示的评论数小于4，则直接加
            if(count.length<4)
            {
                //添加新节点
                self.messagenode.addChild(videoNode)
            }
            else//如果等于4，则删除第一条评论后再加
            {
                function reflesh()
                {
                    count[0].destroy()
                    self.messagenode.addChild(videoNode)
                }

                var fadeout = cc.fadeOut(0.3)
                var finished = cc.callFunc(function (target) {
                    cc.log("删除旧节点 添加新节点")
                    reflesh()
                }, this);
                count[0].runAction(cc.sequence(fadeout,finished))
            }
        })

    },

    //video的点击事件
    click_video:function(){
        cc.log("click_videos")
    },

    //戏团的点击事件
    click_group:function(){
        cc.log("click_group")
        //判定什么时候切换
        if(cc.find("Canvas/top_menu/group").getComponent(cc.Label).fontSize == 48)
        {
            this.change_to_group()
        }
        else
        {
            cc.log("不切换")
        }
    },

    //黄梅戏历史的点击事件
    click_histoty:function(){
        cc.log("click_histoty")
        if(cc.find("Canvas/top_menu/history").getComponent(cc.Label).fontSize == 48)
        {
            this.change_to_history()
        }
        else
        {
            cc.log("不切换")
        }
    },

    //黄梅戏历史 和 戏团 相互切换
    change_to_history:function(){
        cc.log("切换到黄梅戏历史")
        //移动bar
        this.top_bar.runAction(cc.moveBy(0.2,-268,0))
        //移动原有的view
        cc.find("Canvas/scrollview").runAction(cc.moveBy(0.2,1080,0))
        cc.find("Canvas/group_view").runAction(cc.moveBy(0.2,1080,0))
        //label变化大小
        cc.find("Canvas/top_menu/group").getComponent(cc.Label).fontSize = 48
        cc.find("Canvas/top_menu/history").getComponent(cc.Label).fontSize = 64
        //label变化颜色
        cc.find("Canvas/top_menu/group").color = new cc.Color(104,104,104)
        cc.find("Canvas/top_menu/history").color = new cc.Color(29,29,29)
    },
    change_to_group:function(){
        cc.log("切换到戏团")
        //移动bar
        this.top_bar.runAction(cc.moveBy(0.2,268,0))
        //移动view
        cc.find("Canvas/scrollview").runAction(cc.moveBy(0.2,-1080,0))
        cc.find("Canvas/group_view").runAction(cc.moveBy(0.2,-1080,0))
        //label变化大小
        cc.find("Canvas/top_menu/group").getComponent(cc.Label).fontSize = 64
        cc.find("Canvas/top_menu/history").getComponent(cc.Label).fontSize = 48
        //label变化颜色
        cc.find("Canvas/top_menu/group").color = new cc.Color(29,29,29)
        cc.find("Canvas/top_menu/history").color = new cc.Color(104,104,104)
    },

    //group_item中的back按钮的点击事件，把戏团详情界面移动到右边
    click_group_back:function(){
        cc.find("Canvas/top_menu").active = true
        cc.find("Canvas/group_view").active = true
        cc.find("Canvas/MainMenu").active = true
        var group_info = cc.find("Canvas/group_info")
        var movetocenter = cc.moveBy(0.2,1080,0)
        group_info.runAction(movetocenter)
    },

    //戏团详情界面的enter按钮点击事件，跳转到聊天室
    click_enter_chat:function(){
        cc.log("click_enter_chat")
        let self = this
        //修复快速点击的bug,在每次一次点击后瞬间禁用item的按钮，在动作完成中恢复
        cc.find("Canvas/group_info/content/enter/content").getComponent(cc.Button).interactable = false
        var chat_info = cc.find("Canvas/chat_info")
        //修改聊天室标题
        chat_info.getChildByName("top").getChildByName("group_title").getComponent(cc.Label).string = cc.find("Canvas/group_info/top/content").getComponent(cc.Label).string
        //先把聊天室节点移动到右边
        chat_info.x = 1080;chat_info.y = 0;
        //聊天室节点从右边移动进来的动画
        var movetocenter = cc.moveBy(0.2,-1080,0)
        var finished = cc.callFunc(function() {
            cc.find("Canvas/top_menu").active = false
            cc.find("Canvas/group_view").active = false
            cc.find("Canvas/MainMenu").active = false
            cc.find("Canvas/group_info").active = false
            cc.find("Canvas/group_info/content/enter/content").getComponent(cc.Button).interactable = true
        }, this);
        var action = cc.sequence(movetocenter,finished)
        chat_info.runAction(action)
    },
    //聊天室的返回按钮，返回到戏团详情界面
    click_chat_back:function(){
        cc.find("Canvas/top_menu").active = true
        cc.find("Canvas/group_view").active = true
        cc.find("Canvas/MainMenu").active = true
        cc.find("Canvas/group_info").active = true

        var chat_info = cc.find("Canvas/chat_info")
        var movetocenter = cc.moveBy(0.2,1080,0)
        chat_info.runAction(movetocenter)
    },

    //跳转到首页
    turn_firstpage:function(){
        cc.log("切换到唱戏")
        cc.director.loadScene("cp_FirstPageScene");
        var landing=cc.find("Canvas/MainMenu/SingPage").getComponent(cc.Button)
        landing.interactable=false
        setTimeout(function()
        {
            cc.log("禁用两秒")
            landing.interactable=true
        },3000) 
    }
});
