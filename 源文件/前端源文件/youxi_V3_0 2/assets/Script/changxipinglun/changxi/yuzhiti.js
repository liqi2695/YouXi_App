
cc.Class({
    extends: cc.Component,

    properties: {
        AudioUrl:"",
        PersonalNickName:"凯奇",
        PictureNumber:"2",
        Time:"90",
        Position:"加拿大",
        RandomPictureUrl:"",
        VideosTitle:"打猪草",
        number:"",
        CommentNumber:" ",
        PersonalPhone:" ",
        PriseNumber:" ",
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
       
    },
    dianzan:function(){
        changxi["AudioUrl"]=this.AudioUrl
        cc.log(changxi["AudioUrl"])

        var url = "http://47.103.115.138/youxi/behind/like2.php"
         var param_str=
         {
             "AudioUrl":changxi["AudioUrl"],
         }
         data = older(param_str)   
         var xhr = new XMLHttpRequest();
         xhr.open('POST', url, true);//新建一个http连接,false为同步，true为一步
         xhr.onreadystatechange = function () {//声明回调函数
             if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                 var response = xhr.responseText;//接受返回json

                 var like = JSON.parse(response);
                cc.log(like)
                var result=like.Result       
                cc.log(result)
             }
         };
         xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");     
         xhr.send(data)
    },
   /* fasong:function(){
        changxi["AudioUrl"]=this.AudioUrl
        var m=fasongdianzan(changxi["AudioUrl"]);
        cc.log(m)
    },*/

    //跳转到评论界面
    totest:function(){
       changxi["AudioUrl"]=this.AudioUrl //获取预制体中 的数据，并赋值给全局变量
       changxi["PersonalNickName"]=this.PersonalNickName
       changxi["PictureNumber"]=this.PictureNumber
       changxi["Time"]=this.Time
       changxi["Position"]=this.Position
       changxi["RandomPictureUrl"]=this.RandomPictureUrl
       changxi["VideosTitle"]=this.VideosTitle
       cc.log(changxi["VideosTitle"])
       changxi["CommentNumber"]=this.CommentNumber
       cc.log(changxi["CommentNumber"])
       cc.director.loadScene("test")   
       changxi["PriseNumber"]=this.PriseNumber       
    },
    //跳转到个人主页
    topersonal:function(){
        
        changxi["PictureNumber"]=this.PictureNumber
        cc.log(changxi["PictureNumber"])
        changxi["PersonalNickName"]=this.PersonalNickName
        changxi["PersonalPhone"]=this.PersonalPhone
    },
    start () {

    },

    // update (dt) {},
});
