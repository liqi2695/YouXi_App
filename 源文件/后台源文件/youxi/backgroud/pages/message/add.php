<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
$PersonalNickName=_post('username');
$Comment=_post('Comment');
$AudioUrl=_post('address');
// $LongVideoUrl=_post('Video-address');
// $diff=_post('Video-address');
// $CommentTime = date("Y-m-d h:i:s");
$timeoffset = 8;

$CommentTime=date('Y-m-d H:i:s', time()+ $timeoffset * 3600);
// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");




$sql = "INSERT INTO message (PersonalNickName,PictureNumber,Comment,CommentTime,AudioUrl,judge,diff) VALUES ('$PersonalNickName','1','$Comment','$CommentTime','$AudioUrl','1','a')"; 

$res = mysqli_query($conn,$sql);

if(!$res){
    class Em {
        public $Result = "";
        // public $hobbies  = "";
        // public $birthdate = "";
    }
    $e = new Em();
    $e->Result = "100";
    
    
    echo json_encode($e);
}else{
    class Emp {
        public $Result = "";
        // public $hobbies  = "";
        // public $birthdate = "";
    }
    $e = new Emp();
    $e->Result = "200";
    
    
    echo json_encode($e);
}

mysqli_close($conn);
?>