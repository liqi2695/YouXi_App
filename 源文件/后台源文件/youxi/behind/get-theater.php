<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
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
function json($res,$theater=array()){  
    $result=array(  
    //   'result_number'=>$result_number,
      'res' =>$res, 
      'theater'=>$theater   
    );  
   
    echo json_encode($result);  
    exit;  
}
$sql = "SELECT * from username where PersonalPhone='$PersonalPhone' and judge ='1'";
$resultSet = mysqli_query($conn,$sql); 
// $sqli = "SELECT * FROM administrator where AdminNickName ='$resultSet'";
//     echo $sqli;
 if(mysqli_num_rows($resultSet)>0){ 
    $sqli = "SELECT OperaName,OperaIntroduction,OperaPhoneNumber,OperaMember,MemberIntroduction,OperaFans FROM theater where judge ='1'";
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
