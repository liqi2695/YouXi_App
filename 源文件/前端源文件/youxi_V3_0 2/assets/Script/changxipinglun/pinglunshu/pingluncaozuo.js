//已经改好
function one(i){
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

              var obj = JSON.parse(response); 
              cc.log(obj)
              
            
                 let result=obj.result   
          
                 var Comment=result[i].Comment;
                 var PictureNumber=result[i].PictureNumber;
                 var PersonalNickName=result[i].PersonalNickName;
                 var CommentTime=result[i].CommentTime
                 
              
                 cc.loader.loadRes("EDbox",cc.Prefab,function(err,pre){
                  //加载预制体，添加进content
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
                  BetweenShuru.getChildByName("editbox").getComponent(cc.Label).string=Comment;
               
                  //将头像填进去
                  var self=BetweenShuru.getChildByName("touxiang")
                  cc.loader.loadRes(PictureNumber, cc.SpriteFrame, function (err, sf) {
                  self.getComponent(cc.Sprite).spriteFrame = sf;
                  })
          
                  //将昵称填进去
                  var ni=BetweenShuru.getChildByName("nicheng");
                  ni.getComponent(cc.Label).string=PersonalNickName;   
                  
                  //将时间填进去
                  var time=BetweenShuru.getChildByName("time");
                  time.getComponent(cc.Label).string=CommentTime;
          
                  })
          
        }
    };
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");  
    xhr.send(data)
  }
