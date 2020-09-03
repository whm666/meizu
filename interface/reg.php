<?php
    include('./conn.php');
    $registObj = file_get_contents('php://input');
    $data =  json_decode($registObj);
    
    $phone = $data->phone;
    $password = $data->password;


    $sql = "insert into users(phone,password) values ('$phone','$password')";
    $res = $mysqli->query($sql);
    $mysqli->close();
    if($res) {
        echo '{"isRegist":true,"msg":"注册成功"}';
    } else {
        alert('注册失败');
    }
?>