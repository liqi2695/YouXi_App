<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
@$id=$_COOKIE['id'];
@$admin=$_COOKIE['admin'];
$videourl=_post('videourl');
$videotitle=_post('videotitle');
$videolrcurl=_post('videolrcurl');
$videopicurl=_post('videopicurl');
// $diff=_post('cateid');
// $diff=_post('diff')
$timeoffset = 8;
$Time=date('Y-m-d H:i:s',time()+ $timeoffset * 3600); 


// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");

$sql ="UPDATE video SET videourl = '$videourl',videotitle = '$videotitle',videolrcurl = '$videolrcurl',videopicurl ='$videopicurl' WHERE videoid = '$id'  ";
$sqli ="INSERT INTO sever (operation,admin,object,place,time) VALUES ('编辑','$admin','$id','看戏/视频列表','$Time')";
$result = mysqli_query( $conn, $sqli ); 
$res = mysqli_query( $conn, $sql );
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
setcookie("id", "", time()-3600);


mysqli_close($conn);
?>