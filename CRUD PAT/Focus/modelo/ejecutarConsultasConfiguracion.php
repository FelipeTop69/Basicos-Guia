<?php 

require_once '../modelo/conexion.php';
require_once '../controlador/controlConsultasConfiguracion.php';

$tipo_consulta = $_POST['tipo_operacion'];

switch ($tipo_consulta) {
    

    case 'registrarConfiguracion':
        // Extraer datos del formulario para configuración de partida
        $categoria = $_POST['categoria'];
        $estado_partida = $_POST['estado_partida'];
        $estado_configuracion = $_POST['estado_configuracion'];
        $tiempo_mem_f = $_POST['tiempo_memo_facil'];
        $tiempo_orden_f = $_POST['tiempo_orden_facil'];
        $tiempo_mem_m = $_POST['tiempo_memo_medio'];
        $tiempo_orden_m = $_POST['tiempo_orden_medio'];
        $tiempo_mem_d = $_POST['tiempo_memo_dificil'];
        $tiempo_orden_d = $_POST['tiempo_orden_dificil'];

        // Instanciar clase para operaciones de configuraciones de partida
        $consultas = new Consultas_Configuracion();
        $resultado = $consultas->insertarConfiguracion($categoria, $estado_partida, $estado_configuracion, $tiempo_mem_f, $tiempo_orden_f, $tiempo_mem_m, $tiempo_orden_m, $tiempo_mem_d, $tiempo_orden_d);

        echo json_encode($resultado);
        break;

    case 'listarConfiguracion':
        $consultas = new Consultas_Configuracion();
        $data = $consultas->listarConfiguraciones();
        echo json_encode($data);
        break;

    case 'obtenerDatosConfiguracion':
    $id_configuracion = $_POST['idConfiguracion'];

    $consultas = new Consultas_Configuracion();
    $resultado = $consultas->obtenerDatosConfiguracion($id_configuracion);

    echo json_encode($resultado);
    break;

    case 'actualizarConfiguracion':
        $id_configuracion = $_POST['id_configuracion'];
        $categoria = $_POST['categoria'];
        $estado_partida = $_POST['estado_partida'];
        $estado_configuracion = $_POST['estado_configuracion'];
        $tiempo_mem_f = $_POST['tiempo_mem_f'];
        $tiempo_orden_f = $_POST['tiempo_orden_f'];
        $tiempo_mem_m = $_POST['tiempo_mem_m'];
        $tiempo_orden_m = $_POST['tiempo_orden_m'];
        $tiempo_mem_d = $_POST['tiempo_mem_d'];
        $tiempo_orden_d = $_POST['tiempo_orden_d'];

        $consultas = new Consultas_Configuracion();
        $resultado = $consultas->actualizarConfiguracion(
            $id_configuracion, 
            $categoria, 
            $estado_partida, 
            $estado_configuracion, 
            $tiempo_mem_f, 
            $tiempo_orden_f, 
            $tiempo_mem_m, 
            $tiempo_orden_m, 
            $tiempo_mem_d, 
            $tiempo_orden_d
        );

        echo json_encode($resultado);
        break;

    case 'eliminarConfiguracion':
        $id_configuracion = $_POST['id_configuracion'];
    
        $consultas = new Consultas_Configuracion();
        $resultado = $consultas->eliminarConfiguracion($id_configuracion);
    
        echo json_encode($resultado);
        break;

    case 'eliminarTodo':

        $consultas = new Consultas_Configuracion();
        $resultado = $consultas->eliminarTodo();
    
        echo json_encode($resultado);
        break;


}
?>