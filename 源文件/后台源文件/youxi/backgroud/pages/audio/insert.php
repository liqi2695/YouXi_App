<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
$PersonalNickName=_post('username');
$PersonalPhone=_post('phone');
$Position=_post('address');
$VideosTitle=_post('video');
$timeoffset = 8;
$Time=date('Y-m-d H:i:s',time()+ $timeoffset * 3600); 
// $Time = date("Y-m-d H:i:s");
$RandomPictureUrl=_post('picture');
$AudioUrl=_post('audio');

// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");




$sql = "INSERT INTO audio (PersonalNickName,PersonalPhone,PictureNumber,Position,Time,VideosTitle,RandomPictureUrl,AudioUrl,PriseNumber,judge) VALUES ('$PersonalNickName','$PersonalPhone','1','$Position','$Time','$VideosTitle','$RandomPictureUrl','$AudioUrl','0','1')"; 

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