cc.Class({
    extends: cc.Component,

    properties: {
        like_background:
        {
            default:null,
            type:cc.Node
        },
        like_label:
        {
            default:null,
            type:cc.Node
        },
        like_button:
        {
            default:null,
            type:cc.Node
        },
        title_label:
        {
            default:null,
            type:cc.Node
        },
        OperaName:String,//戏团名称
        OperaPhoneNumber:String,//戏团联系电话
        OperaMember:String,//戏团联系人
        OperaIntroduction:String,//戏团介绍
        OperaFans:String,//戏团粉丝数量
    },

    onLoad(){
        //加载时候，预先把已关注的background和label隐藏，并取消其按钮交互
        this.like_label.opacity = 0
        this.like_background.opacity = 0
        this.like_background.getComponent(cc.Button).interactable = false
    },


    start () {

    },

    //like按钮的点击事件， 关注戏团
    click_like:function(){

        //淡出，禁用关注按钮
        var fadeout = cc.fadeOut(0.2)
        //回调函数，关注按钮淡出完成后，禁用节点，优化动画
        let temp = this.like_button
        var finished = cc.callFunc(function(temp) {
            temp.active = false
        }, this, temp);
        var sum_action = cc.sequence(fadeout,finished)
        temp.getComponent(cc.Button).interactable=false 
        this.like_button.runAction(sum_action)
        //淡入，滑动 已关注标签
        var fadein = cc.fadeIn(0.2)
        var scale_x = cc.scaleTo(0.2,2.25,1)
        var movetocenter = cc.moveBy(0.2,-30,0)
        var action1 = cc.spawn(fadein,scale_x,movetocenter)
        this.like_background.runAction(action1)
        var fadein2 = cc.fadeIn(0.30)
        this.like_label.runAction(fadein2)
        //恢复取消关注按钮
        this.like_background.getComponent(cc.Button).interactable = true

        //实时刷新
        let mine = cc.find("Canvas/group_view/view/content/mine")
        var temp_item = cc.instantiate(this.node);
        temp_item.opacity = 0
        //隐藏关注和取关按钮
        temp_item.getComponent("group_item").like_button.active=false
        temp_item.getComponent("group_item").like_background.active=false
        temp_item.getComponent("group_item").like_label.active=false
        
        //更改颜色
        switch((mine.children.length+1)%3)//更改 temp_item的颜色
        {
            case 0:
                {
                    cc.loader.loadRes("Texture2D/3", function (err, pic) {
                        var temp_sp = new cc.SpriteFrame(pic)
                        temp_item.getComponent(cc.Sprite).spriteFrame = temp_sp;
                    });break;
                }//变为绿色
            case 2:
                {
                    cc.loader.loadRes("Texture2D/2", function (err, pic) {
                        var temp_sp = new cc.SpriteFrame(pic)
                        temp_item.getComponent(cc.Sprite).spriteFrame = temp_sp;
                    });break;
                }//变为蓝色
            case 1:
                {
                    cc.loader.loadRes("Texture2D/1", function (err, pic) {
                        var temp_sp = new cc.SpriteFrame(pic)
                        temp_item.getComponent(cc.Sprite).spriteFrame = temp_sp;
                    });break;
                }//变为粉色
        }
        

        //配置完毕，添加到节点
        mine.addChild(temp_item)
        temp_item.runAction(cc.fadeIn(0.3))

        //发送关注戏团的http请求
        var xhr = new XMLHttpRequest();
        var url = "http://47.103.115.138/youxi/behind/con-theater.php"
        data = 
        {
            "PersonalPhone":user["phone"],
            "OperaName":this.OperaName
        }
        data = older(data)
        xhr.open('POST', url, true);//新建一个http连接
        xhr.onreadystatechange = function () {//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;//接受返回jsond
                response = JSON.parse(response)
            }
        };
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr.send(data)
    },

    //like_background按钮的点击事件，取消关注戏团
    click_like_background:function()
    {
        //取消关注一个戏团

        //动画
        //恢复关注按钮
        this.like_button.active = true
        var fadein = cc.fadeIn(0.25)
        this.like_button.runAction(fadein)
        this.like_button.getComponent(cc.Button).interactable=true

        //淡入，滑动 已关注标签
        var fadeout = cc.fadeOut(0.2)
        var scale_x = cc.scaleTo(0.2,1,1)
        var movetocenter = cc.moveBy(0.2,30,0)
        var action1 = cc.spawn(fadeout,scale_x,movetocenter)
        this.like_background.runAction(action1)
        var fadeout2 = cc.fadeOut(0.25)
        this.like_label.runAction(fadeout2)

        //从已经关注的戏团节点中删去对应的节点
        let mine = cc.find("Canvas/group_view/view/content/mine")
        for(var i = 0;i<mine.childrenCount;i++)
        {
            let mine_child = mine.children[i]
            if(mine_child.getComponent("group_item").OperaName == this.OperaName)
            {
                var fadeout = cc.fadeOut(0.1)
                var finished = cc.callFunc(function() {
                    mine.removeChild(mine_child);
                    //每次删除节点后，遍历我关注的戏团，重新改变颜色
                    for(let j = 0;j<mine.childrenCount;j++)
                    {        
                        let temp_item = mine.children[j]
                        cc.log(temp_item.getComponent("group_item").OperaName)
                        //更改颜色
                        cc.log(j%3)
                        switch(j%3)//更改 temp_item的颜色
                        {
                            case 2:
                                {
                                    cc.loader.loadRes("Texture2D/3", function (err, pic) {
                                        var temp_sp = new cc.SpriteFrame(pic)
                                        temp_item.getComponent(cc.Sprite).spriteFrame = temp_sp;
                                        cc.log("这个节点改为绿色！")
                                    });break;
                                }//变为绿色
                            case 1:
                                {
                                    cc.loader.loadRes("Texture2D/2", function (err, pic) {
                                        var temp_sp = new cc.SpriteFrame(pic)
                                        temp_item.getComponent(cc.Sprite).spriteFrame = temp_sp;
                                        cc.log("这个节点改为蓝色！")
                                    });break;
                                }//变为蓝色
                            case 0:
                                {
                                    cc.loader.loadRes("Texture2D/1", function (err, pic) {
                                        var temp_sp = new cc.SpriteFrame(pic)
                                        temp_item.getComponent(cc.Sprite).spriteFrame = temp_sp;
                                        cc.log("这个节点改为粉色！")
                                    });break;
                                }//变为粉色
                        }
                    }
                }, this);
                var all_action = cc.sequence(fadeout,finished)
                mine_child.runAction(all_action)
            }
        }

        //发送取消关注戏团的http请求
        var xhr = new XMLHttpRequest();
        var url = "http://47.103.115.138/youxi/behind/del-theater.php"
        data = 
        {
            "PersonalPhone":user["phone"],
            "OperaName":this.OperaName
        }
        data = older(data)
        xhr.open('POST', url, true);//新建一个http连接
        xhr.onreadystatechange = function () {//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;//接受返回jsond
                response = JSON.parse(response)
            }
        };
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr.send(data)
    },

    //group_item的按钮点击事件，跳转到戏团详情界面，同时禁用其他节点
    click_group_item:function(){
        let self = this
        //修复快速点击的bug,在每次一次点击后瞬间禁用item的按钮，在动作完成中恢复
        self.node.getComponent(cc.Button).interactable = false
        var group_info = cc.find("Canvas/group_info")
        //设置详情界面的内容
        group_info.getChildByName("top").getChildByName("content").getComponent(cc.Label).string = this.OperaName
        group_info.getChildByName("content").getChildByName("intro").getChildByName("content").getComponent(cc.Label).string = this.OperaIntroduction
        group_info.getChildByName("content").getChildByName("phone").getChildByName("content").getComponent(cc.Label).string = this.OperaPhoneNumber
        group_info.getChildByName("content").getChildByName("fans").getChildByName("content").getComponent(cc.Label).string = this.OperaFans
        //先把详情节点移动到右边
        group_info.x = 1080;group_info.y = 0;
        //详情节点从右边移动进来的动画
        var movetocenter = cc.moveBy(0.2,-1080,0)
        var finished = cc.callFunc(function() {
            cc.find("Canvas/top_menu").active = false
            cc.find("Canvas/group_view").active = false
            cc.find("Canvas/MainMenu").active = false
            self.node.getComponent(cc.Button).interactable = true
        }, this);
        var action = cc.sequence(movetocenter,finished)
        group_info.runAction(action)
    }
});
