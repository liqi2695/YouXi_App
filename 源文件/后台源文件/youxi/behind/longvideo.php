<?php
 header('Access-Control-Allow-Origin: *');  //解决跨域问题
 header('Content-type: text/json');            //定义编码JSON
  
 function _post($str){
     $val = !empty($_POST[$str]) ? $_POST[$str] : null;
     return $val;
}
$videotitle=_post('videotitle');


$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");
$sql = "SELECT videourl,videotitle,videolrcurl,videopicurl FROM video WHERE videotitle LIKE '%$videotitle%' and judge ='1' and diff ='c'";
// $sql = "SELECT videourl,videotitle,videolrcurl,videopicurl FROM longvideo WHERE videotitle ='$videotitle'";
$resultSet = mysqli_query($conn,$sql);
$sqli =  mysqli_num_rows($resultSet);
function json($result_number,$res,$result=array()){  
    $result=array(  
      'result_number'=>$result_number,
      'res'=>$res,
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

echo json($sqli,2001,$dataarr);


}else{ 
    // echo json_encode ('0');
    echo json($sqli,2000);
} 

?>