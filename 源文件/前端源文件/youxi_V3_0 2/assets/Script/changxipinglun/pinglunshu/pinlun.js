window.x3="sdahofaa hfhs";
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onpinlun:function(){
 
        //加载输入框的预制体
         cc.loader.loadRes("EDbox",cc.Prefab,function(err,box){
            var pl=cc.find("Canvas/scroll/view/content");
            var shuru=cc.instantiate(box);   //实例化
            shuru.name="btn";
            shuru.anchorX=0.5
            shuru.anchorY=0.5           //设置锚点
            pl.addChild(shuru);        //p1节点为其父节点
           

            //同步头像
            var self=shuru.getChildByName("touxiang")
            cc.loader.loadRes(x, cc.SpriteFrame, function (err, sf) {
            self.getComponent(cc.Sprite).spriteFrame = sf;
            })
            //给头像添加点击事件
            var se=cc.find("Canvas")
            var tx=shuru.getChildByName("touxiang");
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = se;    // 这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "change";  // 这个是代码文件名
            clickEventHandler.handler = "tozhuye";
            clickEventHandler.customEventData = "foobar";

            var btnpin=tx.getComponent(cc.Button);
            btnpin.clickEvents.push(clickEventHandler);
            //同步昵称
            var ni=shuru.getChildByName("nicheng");
            ni.getComponent(cc.Label).string=p2_1;            

        })
    },
    pinlunfasong:function(){


        var com=cc.find("Canvas/shurukuang")
         var Comment=com.getComponent(cc.EditBox).string
         if(Comment=="")
         {
             cc.find("Canvas/kong").active=true
             setTimeout(function(){
                 cc.find("Canvas/kong").active=false
             },2000)
         }



         else{
        //评论向数据库发送数据
       var shu=cc.find("Canvas/shurukuang")
        x3=shu.getComponent(cc.EditBox).string
       var timestamp=Math.round(new Date() / 1000)

       var url = "http://47.103.115.138/youxi/behind/comment.php"
        var param_str=
        {
            "PictureNumber":x,
            "PersonalNickName":p2_1,
            "Comment":x3,
            "AudioUrl":changxi["AudioUrl"],
            "CommentTime":timestamp,
        }
        data = older(param_str)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, false);//新建一个http连接
        xhr.onreadystatechange = function () {//声明回调函数
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;//接受返回json
                cc.log(response)
                //跳出已发送
                var fasong=cc.find("Canvas/fasong");
                var action=cc.moveTo(0.3,-60,-70)
                var action1=cc.moveTo(0.3,-60,35)
                fasong.runAction(action)
                //三秒后自动消失
                setTimeout(function() { 
                    fasong.runAction(action1)
                }, 1000);
            }
        };
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
        xhr.send(data)

    /*    var url = "http://47.103.115.138/youxi/behind/comment2.php"
         var param_str=
         {
             "AudioUrl":changxi["AudioUrl"],
         }
         data = older(param_str)
         var xhr = new XMLHttpRequest();
         xhr.open('POST', url, false);//新建一个http连接
         xhr.onreadystatechange = function () {//声明回调函数
             if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                 var response = xhr.responseText;//接受返回json
                 var obj = JSON.parse(response); 
                 var m=obj.result_number
                if(m==0)
                {
                    cc.log("123")
                }
                else 
                {
                    var h=obj.result.length-1
                    one(h)
                }
             }
         };
         xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
         xhr.send(data)*/


         
         
         cc.loader.loadRes("EDbox",cc.Prefab,function(err,pre){

            var pp=cc.find("Canvas/scroll/view/content");
                  var BetweenShuru=cc.instantiate(pre);
                 // BetweenShuru.name="BTS";
                  BetweenShuru.anchorX=0.5
                  BetweenShuru.anchorY=0.5   
                  pp.addChild(BetweenShuru);
                  //显示评论数
                //  var se=cc.find("Canvas/label/pinglunshu")
                //  se.getComponent(cc.Label).string=dianzanshu
          
                  //将内容填进去
                  
                  cc.log(Comment)
                  BetweenShuru.getChildByName("editbox").getComponent(cc.Label).string=Comment;
               
                  //将头像填进去
                  var self=BetweenShuru.getChildByName("touxiang")
                  cc.loader.loadRes(x, cc.SpriteFrame, function (err, sf) {
                  self.getComponent(cc.Sprite).spriteFrame = sf;
                  })
          
                  //将昵称填进去
                  var ni=BetweenShuru.getChildByName("nicheng");
                  ni.getComponent(cc.Label).string=p2_1;   
                  
                  //将时间填进去
                  var time=BetweenShuru.getChildByName("time");
                  var timestamp=new Date().getTime()
                  var timestamp = new Date(timestamp)
                  console.log(timestamp);
                  timestamp=timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8)
                  time.getComponent(cc.Label).string="";

         })

        }


        //清楚输入框里面的内容
        var str=cc.find("Canvas/shurukuang")
        str.getComponent(cc.EditBox).string="";
        
        
    },
    onLoad:function(){
        //在场景加载时请求数据，加载评论的字段
        cc.log("加载评论")

        var url = "http://47.103.115.138/youxi/behind/comment2.php"
         var param_str=
         {
             "AudioUrl":changxi["AudioUrl"],
         }
         data = older(param_str)
         var xhr = new XMLHttpRequest();
         xhr.open('POST', url, false);//新建一个http连接
         xhr.onreadystatechange = function () {//声明回调函数
             if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                 var response = xhr.responseText;//接受返回json
                 cc.log(response)
                 var obj = JSON.parse(response); 
                 cc.log(obj)
                 let result=obj.result
                 var m=obj.result_number
                 if(m==0)
                 {
                    cc.log("123")
                 }
                 else 
                 {
                     for(let i=0;i<result.length;i++)
                    {
                        one(i);
                        cc.log("添加一天评论")
                    }
             }
         };
        }
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
    xhr.send(data)
    },
   


    start () {
        
        
    },

    // update (dt) {},
});
