<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
// $AudioUrl=_post('AudioUrl');
// $PersonalNickName=_post('PersonalNickName');
// $PictureNumber=_post('PictureNumber');
// $Position=_post('Position');
// $Time=date('Y-m-d H:i:s', _post('Time')); 
// $RandomPictureUrl=_post('RandomPictureUrl');
// $VideosTitle=_post('VideosTitle');
$PersonalPhone=_post('PersonalPhone');

// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");

// $sql = "select PersonalNickName,PictureNumber,Time,Position,RandomPictureUrl,VideosTitle,AudioUrl from audio where PersonalPhone ='$PersonalPhone'";
$sql = " select PersonalNickName,PictureNumber,Time,Position,RandomPictureUrl,VideosTitle,AudioUrl,PersonalPhone,PriseNumber  from audio where judge ='1' order by audioid desc LIMIT 12";

$resultSet = mysqli_query($conn,$sql);
$sqli =  mysqli_num_rows($resultSet);//有多少个结果
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
     

while($row = mysqli_fetch_assoc($resultSet)) {
 
    $dataarr[]=$row; 
}

echo json($sqli,$dataarr);//已JSON形式显示结果数量和结果


}else{ 
    echo json(0,$dataarr);
} 
mysqli_close($conn);
?>
