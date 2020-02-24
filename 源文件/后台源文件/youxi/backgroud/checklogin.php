<?php
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
$AdminNickName=_post('username');
$AdminPassword=_post('password');
   if($AdminNickName == ''||$AdminPassword ==''){
      echo "<script>alert('账号和密码不能为空');
       window.location.href='login.php';</script>";
       exit;
}
// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
 mysqli_query($conn,"set names utf8");
//  $sqli = "select * from administrator where AdminNickName='$AdminNickName' and AdminPassword='$AdminPassword'";
 $sql = "select type from administrator where AdminNickName='$AdminNickName' and AdminPassword='$AdminPassword'";
$resultSet = mysqli_query($conn,$sql);
// $arr=array();
if(mysqli_num_rows($resultSet)>0){
    setcookie("admin","$AdminNickName",time()+86400);
    while($row = mysqli_fetch_array($resultSet))
	{
       $power=$row['type'];
    }
//    @$sqli="select power from adminpower where role='$role'";
//     $res = mysqli_query($conn,$sqli);
  
     
//     while($row1=mysqli_fetch_array($res)) {

//     $power=$row1['power'];

//     }
setcookie("power","$power",time()+86400);
    echo "<script>alert('登录成功');
        window.location.href='index.html';</script>";
}else{ 
    echo "<script>alert('账号和密码不正确');
    window.location.href='login.html';</script>";
} 
mysqli_close($conn);
?>