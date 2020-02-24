<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
$OperaName=_post('OperaName');
$OperaMember=_post('OperaMember');
$OperaIntroduction=_post('OperaIntroduction');
$MemberIntroduction=_post('MemberIntroduction');
$OperaPhoneNumber=_post('OperaPhoneNumber');
// $time = date("Y-m-d h:i:s");
// $timeoffset = 8;
$OperaFans=_post('OperaFans');

// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");




$sql = "INSERT INTO theater (OperaName,OperaMember,OperaIntroduction,MemberIntroduction,OperaPhoneNumber,OperaFans,judge) VALUES ('$OperaName','$OperaMember','$OperaIntroduction','$MemberIntroduction','$OperaPhoneNumber','$OperaFans','1')"; 
// echo $sql;
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