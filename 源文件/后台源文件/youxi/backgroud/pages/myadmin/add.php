<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');
function _post($str){
    $val = !empty($_GET[$str]) ? $_GET[$str] : null;
    return $val;
}
$AdminNickName=_post('username');
$AdminPhone=_post('phone');
$AdminPassword=_post('pass');
$AdminEmail=_post('email');
// $type=_post('cateid');
// $type=_post('role');
// $time = date("Y-m-d h:i:s");
$timeoffset = 8;
// $PersonalAccount=_post('PersonalAccount');
$time=date('Y-m-d H:i:s', time()+ $timeoffset * 3600);
$type=_post('power');
// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");


// $sql = "INSERT INTO administrator (AdminNickName,AdminPhone,AdminPassword,AdminEmail,time,type,judge) VALUES ('$AdminNickName','$AdminPhone','$AdminPassword','$AdminEmail','$time','$type','1')"; 
$sql = "INSERT INTO administrator (AdminNickName,AdminPhone,AdminPassword,AdminEmail,time,type,judge) VALUES ('$AdminNickName','$AdminPhone','$AdminPassword','$AdminEmail','$time','$type','1')"; 
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