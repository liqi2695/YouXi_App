<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: text/json');
function _post($str){
    $val = !empty($_POST[$str]) ? $_POST[$str] : null;
    return $val;
}
@$id=$_COOKIE['id'];
@$admin=$_COOKIE['admin'];
$PersonalNickName=_post('username');
$Comment=_post('Comment');
$AudioUrl=_post('address');
// $PersonalRegisterTime=_post('time');
$timeoffset = 8;

$CommentTime=date('Y-m-d H:i:s', time()+ $timeoffset * 3600);
// $PersonalAccount=_post('account');


// $conn = mysqli_connect("localhost","root",""," myplays");
$servername = "47.103.115.138";
$username = "root";
$password = "cp1054266122";
$dbname = " myplays";



$conn = mysqli_connect($servername,$username,$password,$dbname);
mysqli_query($conn,"set names utf8");

$sql ="UPDATE message SET PersonalNickName = '$PersonalNickName',Comment = '$Comment',AudioUrl = '$AudioUrl',CommentTime ='$CommentTime' WHERE Messageid = '$id'  ";
$sqli ="INSERT INTO sever (operation,admin,object,place,time) VALUES ('编辑','$admin','$id','留言管理/发现中音频留言','$CommentTime')";
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