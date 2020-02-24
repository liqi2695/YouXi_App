<?php
 header('Access-Control-Allow-Origin: *');  //解决跨域问题
 header('Content-type: text/json');            //定义编码JSON
  
 function _post($str){
     $val = !empty($_POST[$str]) ? $_POST[$str] : null;
     return $val;
}
$PersonalPhone=_post('PersonalPhone');

$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");
$sql = "SELECT OperaName,OperaIntroduction,OperaPhoneNumber,OperaMember,MemberIntroduction,OperaFans FROM theater WHERE FIND_IN_SET('$PersonalPhone', PersonalPhone) and judge ='1'";
$resultSet = mysqli_query($conn,$sql);
$sqli =  mysqli_num_rows($resultSet);
function json($result_number,$result=array()){  
    $result=array(  
      'result_number'=>$result_number,  
      'result'=>$result   
    );  
    echo json_encode($result);  
    exit;  
}
$dataarr = array(); 
if(mysqli_num_rows($resultSet)>0){ 
     
// echo $sqli;
while($row = mysqli_fetch_assoc($resultSet)) {
    // echo $row["videourl"];
    // echo $row["videotitle"];
    $dataarr[]=$row; 
}

echo json($sqli,$dataarr);


}else{ 
    // echo json_encode ('0');
    echo json(0,$dataarr);//返回result_number为0
} 

?>
