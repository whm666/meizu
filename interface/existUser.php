<?php
    include('./conn.php');
   
     $phone = $_REQUEST['phone'];
    
    $sql = "select * from users where phone = '$phone'";

    $exist = $mysqli->query($sql);

    if($exist->num_rows>0) {
        echo '{"has":false,"msg":"账号存在","phone":"'.$phone.'"}';
    } else {
        echo '{"has":true,"msg":"可以使用","phone":"'.$phone.'"}';
    }
?>