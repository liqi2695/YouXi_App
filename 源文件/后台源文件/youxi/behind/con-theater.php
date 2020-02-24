<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
$PersonalPhone=_post('PersonalPhone');
$OperaName=_post('OperaName');

// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");
$sqli="SELECT  PersonalPhone   From   theater Where OperaName='$OperaName' and PersonalPhone!=''";
$result = mysqli_query($conn,$sqli);
if(mysqli_num_rows($result)>0){ 
     
    $sql = "UPDATE  theater SET PersonalPhone = CONCAT(PersonalPhone,'$PersonalPhone,') WHERE OperaName = '$OperaName' and judge = '1'";
    // echo $sql;
    $res = mysqli_query($conn,$sql);
        if(!$res){
            class Em {
                public $Result = "";
            }
            $e = new Em();
            $e->Result = "2000";
            
            
            echo json_encode($e);
        }else{
            class Emp {
                public $Result = "";
                // public $hobbies  = "";
                // public $birthdate = "";
            }
            $e = new Emp();
            $e->Result = "2001";
            
            
            echo json_encode($e);
        }
    
    
    }else{ 
        $sqlii = "UPDATE theater SET PersonalPhone = '$PersonalPhone,' WHERE OperaName = '$OperaName' and judge = '1'";
        $resultset = mysqli_query($conn,$sqlii);
        if(!$resultset){
            class Em {
                public $Result = "";
                // public $hobbies  = "";
                // public $birthdate = "";
            }
            $e = new Em();
            $e->Result = "2000";
            
            
            echo json_encode($e);
        }else{
            class Emp {
                public $Result = "";
                // public $hobbies  = "";
                // public $birthdate = "";
            }
            $e = new Emp();
            $e->Result = "2001";
            
            
            echo json_encode($e);
        }
    } 
    


    mysqli_close($conn);



    
?>
