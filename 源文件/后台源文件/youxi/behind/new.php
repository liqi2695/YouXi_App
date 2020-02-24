<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}

$PersonalPhone=_post('personalphone');

$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");


$sql = "SELECT videourl,videotitle,videolrcurl,videopicurl ,videoshortpicurl FROM video where judge ='1'and diff = 'd'";

$resultSet = mysqli_query($conn,$sql);
$sqli =  mysqli_num_rows($resultSet);//有多少个结果
function json($result_number,$res,$result=array()){  
    $result=array(  
      'result_number'=>$result_number,
      'res' =>$res, 
      'result'=>$result   
    );  
   
    echo json_encode($result);  
    exit;  
}
$dataarr = array(); 
if(mysqli_num_rows($resultSet)>0){ 
     

while($row = mysqli_fetch_assoc($resultSet)) {
 
    $dataarr[]=$row; 
}

echo json($sqli,2001,$dataarr);//已JSON形式显示结果数量和结果


}else{ 
    echo json(2000);
} 
// $change ="UPDATE audio SET judge = '0' WHERE judge = '1' order by audioid desc LIMIT 5 ";
// $res = mysqli_query($conn,$change);
mysqli_close($conn);
?>