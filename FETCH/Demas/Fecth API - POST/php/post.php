<?php 

    $numeroDocumento = $_POST['numeroDocumento'];
    $nombreUsuario = $_POST['usuario'];

    if($numeroDocumento === '' || $nombreUsuario === ''){
        echo json_encode('error');
    }else{
        echo json_encode('Numero Documento: ' . $numeroDocumento . '<br>' . 'Gamer Tag: ' . $nombreUsuario);
    }

?>