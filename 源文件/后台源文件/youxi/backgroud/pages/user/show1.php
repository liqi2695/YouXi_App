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

// $sql = "SELECT * FROM username where judge ='1' and Personalld = '$id'";
// $result = mysqli_query($conn,$sql);
// $arr=array();
     
// while($row=mysqli_fetch_array($result)) {

// array_push($arr,$row);

// }
    
// echo json_encode($arr);
setcookie("id","$id",time()+60);

mysqli_close($conn);
?>