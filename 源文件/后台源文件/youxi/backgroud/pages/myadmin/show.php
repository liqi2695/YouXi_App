<?php
header('Access-Control-Allow-Origin: *');  //解决跨域问题
header("Content-Type:text/html;charset=utf-8");//设置页面字符编码

//显示数据
function _get($str){
    $val = !empty($_GET[$str]) ? $_GET[$str] : null;
    return $val;
}
@$id=$_COOKIE['id'];
// $Adminid=_get('id');
// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);

mysqli_query($conn,"set names utf8");
$sql = "SELECT * FROM administrator where judge ='1' and Adminid = '$id'";
$result = mysqli_query($conn,$sql);
$arr=array();
     
while($row=mysqli_fetch_array($result)) {

array_push($arr,$row);

}
    
echo json_encode($arr);
setcookie("id", "", time()-60);
mysqli_close($conn);

?>
