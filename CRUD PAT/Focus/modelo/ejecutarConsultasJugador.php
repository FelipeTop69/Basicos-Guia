<?php 

require_once '../modelo/conexion.php';
require_once '../controlador/controlConsultasJugador.php';

$tipo_consulta = $_POST['tipo_operacion'];

switch ($tipo_consulta) {
    case 'registrarJugador':
        $numerodocumento = $_POST['numerodocumento'];
        $nombre = $_POST['nombre'];
        $puntos = $_POST['puntos'];
        $consultas = new Consultas_Jugador();
        $resultados = $consultas->registrarJugador($nombre, $numerodocumento, $puntos);

        if (isset($resultados['error'])) {
            echo json_encode(['error' => $resultados['error']]);
        } else {
            echo json_encode($resultados);
        }

        break;

    case 'listarJugador':
        $consultas = new Consultas_Jugador();
        $data = $consultas->listarJugador();
        echo json_encode($data);
        break;

    case 'obtenerDatosJugador':
        $idJugadorListar = $_POST['idJugadorL'];
        $consultas = new Consultas_Jugador();
        $data = $consultas->obtenerDatosJugadorId($idJugadorListar);
        echo json_encode($data);
        break;

    case 'actualizarJugador':
        $idJugador = $_POST['idJugador'];
        $nombreNew = $_POST['nombreNew'];
        $numerodocumentoNew = $_POST['numerodocumentoNew'];
        $puntosNew = $_POST['puntosNew'];
        $consultas = new Consultas_Jugador();
        $data = $consultas->actualizarJugador($idJugador, $nombreNew, $numerodocumentoNew, $puntosNew);
        echo json_encode($data);
        break;
    
    case 'eliminarJugador':
        $numeroDocumentoJugador = $_POST['numeroDocumentoJugador'];
        $consultas = new Consultas_Jugador();
        $data = $consultas->eliminarJugador($numeroDocumentoJugador);
        echo json_encode($data);

        break;

    case 'eliminarTodo':
        $consultas = new Consultas_Jugador();
        $data = $consultas->eliminarTodo();
        echo json_encode($data);

        break;

}
?>