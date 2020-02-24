<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');

$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
// $conn = mysqli_connect("localhost","root",""," myplays");
mysqli_query($conn,"set names utf8");
function _get($str){
    $val = !empty($_GET[$str]) ? $_GET[$str] : null;
    return $val;
}

    $id= _get('id');
    $timeoffset = 8;

    $time=date('Y-m-d H:i:s', time()+ $timeoffset * 3600);
    @$admin=$_COOKIE['admin'];
//    $exec="delete from username where Personalld=$id";
//    $sql=mysqli_query($conn,$exec);
$sql ="UPDATE video SET judge = '0' WHERE videoid = '$id' and diff = 'c' ";
$sqli ="INSERT INTO sever (operation,admin,object,place,time) VALUES ('删除','$admin','$id','看戏/视频列表','$time')";
$result = mysqli_query( $conn, $sqli );
$res = mysqli_query( $conn, $sql );
   mysqli_close($conn);
?>