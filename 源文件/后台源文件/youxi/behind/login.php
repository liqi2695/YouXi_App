<?php
 header('Access-Control-Allow-Origin: *');  //解决跨域问题
  function _post($str){
      $val = !empty($_POST[$str]) ? $_POST[$str] : null;
      return $val;
}

$PersonalPhone=_post('PersonalPhone');
$PersonalPasswd=_post('PersonalPasswd');
$judge ='1';
// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");
function json($result,$data=array()){  
    $result=array(  
    //   'result_number'=>$result_number,
      'res' =>$result, 
      'data'=>$data  
    );  
   
    echo json_encode($result);  
    exit;  
}
$sql = "select * from username where PersonalPhone='$PersonalPhone' and PersonalPassword='$PersonalPasswd' and judge ='$judge'";
$resultSet = mysqli_query($conn,$sql); 
if(mysqli_num_rows($resultSet)>0){ 
    $sqli = "SELECT PersonalNickName,PictureNumber FROM username where PersonalPhone='$PersonalPhone' and PersonalPassword='$PersonalPasswd' and judge ='$judge'";
    $result = mysqli_query($conn,$sqli);
    $dataarr = array(); 
    if(mysqli_num_rows($result)>0){ 
     

        while($row = mysqli_fetch_assoc($result)) {
         
            $dataarr[]=$row; 
        }
        
        echo json(1,$dataarr);//已JSON形式显示结果数量和结果
        
        
        }else{ 
            echo json(0);
        } 
}else{ 
    echo json(0);
} 
mysqli_close($conn);
?>
