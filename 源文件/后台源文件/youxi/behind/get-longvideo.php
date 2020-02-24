<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}

$PersonalPhone=_post('personalphone');
$step=_post('step');
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");
function json($res,$video=array()){  
    $result=array(  
    //   'result_number'=>$result_number,
      'res' =>$res, 
      'video'=>$video   
    );  
   
    echo json_encode($result);  
    exit;  
}
$sql = "select * from username where PersonalPhone='$PersonalPhone' and judge ='1'";
$resultSet = mysqli_query($conn,$sql); 
 if(mysqli_num_rows($resultSet)>0){ 
    $sqli = "SELECT videourl,videotitle,videolrcurl,videopicurl  FROM video where judge ='1'and diff = 'c' and step = '$step'";
    $result = mysqli_query($conn,$sqli);
    $dataarr = array(); 
    if(mysqli_num_rows($result)>0){ 
     

        while($row = mysqli_fetch_assoc($result)) {
         
            $dataarr[]=$row; 
        }
        
        echo json(2001,$dataarr);//已JSON形式显示结果数量和结果
        
        
        }else{ 
            echo json(2000);
        } 
 }else{ 
    echo json(2000);
 } 
 mysqli_close($conn);

?>