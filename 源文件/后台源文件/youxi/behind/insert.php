<?php
header('Access-Control-Allow-Origin: *');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
$PersonalNickName=_post('PersonalNickName');
$PersonalPhone=_post('PersonalPhone');
$PersonalPassword=_post('PersonalPasswd');
$PictureNumber=_post('PictureNumber');
// $PersonalRegisterTime=date('Y-m-d H:i:s', _post('PersonalRegisterTime'));
$timeoffset = 8;
// $PersonalAccount=_post('PersonalAccount');
$PersonalRegisterTime=date('Y-m-d H:i:s', _post('PersonalRegisterTime')+ $timeoffset * 3600);

$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");
$same = "select * from username where PersonalPhone='$PersonalPhone'";
$resultSet = mysqli_query($conn,$same); 
 if(mysqli_num_rows($resultSet)>0){ 
     echo '1001';
}else{ 
    $sql = "INSERT INTO username (PersonalNickName,PersonalPhone,PersonalPassword,PersonalRegisterTime,PictureNumber,judge) VALUES ('$PersonalNickName','$PersonalPhone','$PersonalPassword','$PersonalRegisterTime','$PictureNumber','1')"; 
    $res = mysqli_query($conn,$sql);
    if(!$res){
        echo '1002';
    }else{
        echo '1000';
    }
} 
// $sql = "INSERT INTO username (PersonalNickName,PersonalPhone,PersonalPassword,PersonalRegisterTime,PersonalAccount) VALUES ('$PersonalNickName','$PersonalPhone','$PersonalPassword','$PersonalRegisterTime','$PersonalAccount')"; 
// $res = mysqli_query($conn,$sql);
// if(!$res){
//     echo '1002';
// }else{
//     echo '1000';
// }
mysqli_close($conn);
?>