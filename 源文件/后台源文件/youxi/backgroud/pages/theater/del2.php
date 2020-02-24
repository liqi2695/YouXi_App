<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');

// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");
function _get($str){
    $val = !empty($_GET[$str]) ? $_GET[$str] : null;
    return $val;
}

    $id= _get('id');
    $timeoffset = 8;

    $time=date('Y-m-d H:i:s', time()+ $timeoffset * 3600);
    @$admin=$_COOKIE['admin'];
$sql ="UPDATE theater SET judge = '0' WHERE id = '$id'  ";
$sqli ="INSERT INTO sever (operation,admin,object,place,time) VALUES ('删除','$admin','$id','戏团管理/戏团列表','$time')";
$result = mysqli_query( $conn, $sqli );
$res = mysqli_query( $conn, $sql );
   mysqli_close($conn);
?>