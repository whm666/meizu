<?php
    include('./conn.php');
   
     $phone = $_REQUEST['phone'];
     $password = $_REQUEST['password'];
    
    $sql = "select * from users where phone = '$phone' and password = '$password'";

    $exist = $mysqli->query($sql);
    // var_dump($exist->fetch_assoc()->'id') ;

    if($exist->num_rows>0) {
        echo '{"isLogin":true,"msg":"登录成功","phone":"'.$phone.'"}';
    } else {
        echo '{"isLogin":false,"msg":"登录失败","phone":"'.$phone.'"}';
    }
?>