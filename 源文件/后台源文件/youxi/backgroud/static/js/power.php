<?php
header('Access-Control-Allow-Origin: *');  //解决跨域问题
header("Content-Type:text/html;charset=utf-8");//设置页面字符编码


function _get($str){
    $val = !empty($_GET[$str]) ? $_GET[$str] : null;
    return $val;
}
// $AdminNickName=_post('username');
// $AdminPassword=_post('password');
@$power=$_COOKIE['power'];
// $conn = mysqli_connect("localhost","root",""," myplays");
// mysqli_query($conn,"set names utf8");
// $sql = "select type from administrator where AdminNickName='$AdminNickName' and AdminPassword='$AdminPassword'";
// $result = mysqli_query($conn,$sql);
// if(mysqli_num_rows($result)>0){ 
//     while($row = mysqli_fetch_array($result))
// 	{
//        $role=$row['type'];
// 	}
//    @$sqli="select power from adminpower where role='$role'";
//     $res = mysqli_query($conn,$sqli);
//    $arr=array();
     
//     while($row1=mysqli_fetch_array($res)) {

//     array_push($arr,$row1);

//     }
    
// echo json_encode($arr);
// }
echo $power;
// setcookie("power", "", time()-60);
// mysqli_close($conn);

?>