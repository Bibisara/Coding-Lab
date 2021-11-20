<?php

    $host = 'localhost';
    $user = 'root';
    $pass = 'root';
    $name = 'codinglab';

    $conn = mysqli_connect($host, $user, $pass, $name);
    
    if(mysqli_connect_error()) {
        echo " the error of connection is " . mysqli_connect_error();
    } 

?>