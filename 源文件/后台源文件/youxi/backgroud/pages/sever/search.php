<?php
 header('Access-Control-Allow-Origin: *');  //解决跨域问题
 header('Content-Type:application/json');         //定义编码JSON
  
 function _post($str){
     $val = !empty($_GET[$str]) ? $_GET[$str] : null;
     return $val;
}
$ad=_post('ad');
$place=_post('place');
$operation=_post('operation');


// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
 mysqli_query($conn,"set names utf8");
$sql = "SELECT * FROM sever where admin LIKE '%$ad%' and place LIKE '%$place%' and operation LIKE '%$operation%'";

$resultSet = mysqli_query($conn,$sql);
$sqli =  mysqli_num_rows($resultSet);
function json($result_number,$result=array()){ 
    $result=array(  
      'code'=>$result_number,
      'data'=>$result   
    );  
    //输出json  
    echo json_encode($result);  
    exit;  
}
$dataarr = array(); 
if(mysqli_num_rows($resultSet)>0){ 
     
while($row = mysqli_fetch_assoc($resultSet)) {
    
    $dataarr[]=$row; 
}

echo json(0,$dataarr);


}else{ 
    echo json(0,$dataarr);
} 

mysqli_close($conn);
?>