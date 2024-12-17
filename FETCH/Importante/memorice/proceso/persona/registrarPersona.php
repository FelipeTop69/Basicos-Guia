<?php

    include('registrar.php');
    
    $nombre=$_POST['txtNombre'];
    $email=$_POST['txtEmail'];
    $persona = new Registrar();
    $persona->setNombrePersona($nombre);
    $persona->setEmailPersona($email);
    $persona->registro();


?>