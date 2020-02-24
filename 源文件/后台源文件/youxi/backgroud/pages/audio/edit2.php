<?php
header('Access-Control-Allow-Origin: *');
header("Content-type: text/html;charset=utf-8");

// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn, 'set names utf8');
function _get($str){
    $val = !empty($_GET[$str]) ? $_GET[$str] : null;
    return $val;
}
$id=_get('id');
setcookie("id","$id",time()+3600);

mysqli_close($conn);
?>