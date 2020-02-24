<?php
header('Access-Control-Allow-Origin: *');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
$PictureNumber=_post('PictureNumber');
$PersonalNickName=_post('PersonalNickName');
$Comment=_post('Comment');
$AudioUrl=_post('AudioUrl');
$timeoffset = 8;
$CommentTime=date('Y-m-d H:i:s', _post('CommentTime')+ $timeoffset * 3600); 

// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");

$sql = "INSERT INTO  message (Comment,AudioUrl,PictureNumber,PersonalNickName,CommentTime,judge,diff) VALUES ('$Comment','$AudioUrl','$PictureNumber','$PersonalNickName','$CommentTime','1','a')"; 
    $res = mysqli_query($conn,$sql);
    if(!$res){
        echo '1000';
    }else{
        echo '1001';
    }

mysqli_close($conn);
?>