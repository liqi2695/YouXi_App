<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
// $Status=_post('Status');
$PersonalNickName=_post('PersonalNickName');
$PictureNumber=_post('PictureNumber');
$PersonalPhone=_post('PersonalPhone');

$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");


// $sql = "UPDATE  username SET PersonalNickName = '$PersonalNickName',PictureNumber = '$PictureNumber',Status = '$Status' WHERE PersonalPhone = '$PersonalPhone' and judge = '1'";
$sql = "UPDATE  username SET PersonalNickName = '$PersonalNickName',PictureNumber = '$PictureNumber' WHERE PersonalPhone = '$PersonalPhone' and judge = '1'";
$res = mysqli_query($conn,$sql);
    if(!$res){
        class Em {
            public $Result = "";
            // public $hobbies  = "";
            // public $birthdate = "";
        }
        $e = new Em();
        $e->Result = "1000";
        
        
        echo json_encode($e);
    }else{
        class Emp {
            public $Result = "";
            // public $hobbies  = "";
            // public $birthdate = "";
        }
        $e = new Emp();
        $e->Result = "1001";
        
        
        echo json_encode($e);
    }
    mysqli_close($conn);


    // {
    //     "Result":"2000",
    // }
    
?>
