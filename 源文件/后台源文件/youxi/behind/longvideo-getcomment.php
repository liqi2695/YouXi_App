<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
$PictureNumber=_post('PictureNumber');
$PersonalNickName=_post('PersonalNickName');
$Comment=_post('Comment');
$LongVideoUrl=_post('LongVideoUrl');
$timeoffset = 8;
$CommentTime=date('Y-m-d H:i:s', _post('CommentTime')+ $timeoffset * 3600); 

// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");

$sql = "INSERT INTO  message (Comment,LongVideoUrl,PictureNumber,PersonalNickName,CommentTime,judge,diff) VALUES ('$Comment','$LongVideoUrl','$PictureNumber','$PersonalNickName','$CommentTime','1','v')"; 
$res = mysqli_query($conn,$sql);
    if(!$res){
        class Em {
            public $Result = "";
            // public $hobbies  = "";
            // public $birthdate = "";
        }
        $e = new Em();
        $e->Result = "2000";
        
        
        echo json_encode($e);
    }else{
        class Emp {
            public $Result = "";
            // public $hobbies  = "";
            // public $birthdate = "";
        }
        $e = new Emp();
        $e->Result = "2001";
        
        
        echo json_encode($e);
    }

mysqli_close($conn);
?>