<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
@$admin=$_COOKIE['admin'];
// $PersonalNickName=_post('username');
$PersonalPassword=_post('oldpass');
$Pass=_post('newpass');
// $VideosTitle=_post('video');
$timeoffset = 8;
$time=date('Y-m-d H:i:s',time()+ $timeoffset * 3600); 
// $RandomPictureUrl=_post('picture');
// $AudioUrl=_post('audio');


// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");
$sql1="SELECT Adminid FROM administrator WHERE AdminPassword ='$PersonalPassword' ";
$ult=mysqli_query( $conn, $sql1 );
$arr=array();
if(mysqli_num_rows($ult)>0){
    while($row = mysqli_fetch_array($ult))
	{
        $id=$row['Adminid'];
    }
}
$sql ="UPDATE administrator SET AdminPassword = '$Pass' WHERE AdminPassword ='$PersonalPassword'  ";
$sqli ="INSERT INTO sever (operation,admin,object,place,time) VALUES ('修改密码','$admin','$id','管理员权限/管理员列表','$time')";
$result = mysqli_query( $conn, $sqli ); 
$res = mysqli_query( $conn, $sql );
// setcookie("id", "", time()-3600);


mysqli_close($conn);
?>