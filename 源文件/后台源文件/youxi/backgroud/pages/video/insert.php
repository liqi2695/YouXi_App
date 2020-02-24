<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
$videourl=_post('videourl');
$videotitle=_post('videotitle');
$videolrcurl=_post('videolrcurl');
$videopicurl=_post('videopicurl');
// $diff=_post('cateid');
// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");




$sql = "INSERT INTO video (videourl,videotitle,videolrcurl,videopicurl,judge,diff) VALUES ('$videourl','$videotitle','$videolrcurl','$videopicurl','1','c')"; 

$res = mysqli_query($conn,$sql);

if(!$res){
    class Em {
        public $Result = "";
        // public $hobbies  = "";
        // public $birthdate = "";
    }
    $e = new Em();
    $e->Result = "100";
    
    
    echo json_encode($e);
}else{
    class Emp {
        public $Result = "";
        // public $hobbies  = "";
        // public $birthdate = "";
    }
    $e = new Emp();
    $e->Result = "200";
    
    
    echo json_encode($e);
}

mysqli_close($conn);
?>