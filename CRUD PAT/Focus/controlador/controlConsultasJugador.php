<?php 

class Consultas_Jugador extends Conexion {

    public function listarJugador() {
        $sql = Conexion::conectar()->prepare("SELECT id_jugador, nombre, numerodocumento, puntos FROM jugador ORDER BY id_jugador ASC");
        $sql->execute();
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }

    
    public function verificarJugador($numerodocumento) {
        $sql = Conexion::conectar()->prepare("SELECT COUNT(*) FROM jugador WHERE numerodocumento = :numerodocumento");
        $sql->execute([':numerodocumento' => $numerodocumento]);
        return $sql->fetchColumn();
    }

    public function verificarJugadorId($id_Jugador) {
        $sql = Conexion::conectar()->prepare("SELECT COUNT(*) FROM jugador WHERE id_jugador = :id_Jugador");
        $sql->execute([':id_Jugador' => $id_Jugador]);
        return $sql->fetchColumn();
    }

    public function registrarJugador($nombre, $numerodocumento, $puntos) {

        if ($this->verificarJugador($numerodocumento) > 0) {
            return ['error' => 'El número de documento ya está registrado'];
        }else{
            $sqlJugador = Conexion::conectar()->prepare("INSERT INTO jugador (nombre, numerodocumento, puntos) VALUES (:nombre, :numerodocumento, :puntos)");
            $sqlJugador->execute([':nombre' => $nombre, ':numerodocumento' => $numerodocumento, ':puntos' => $puntos]);
            return self::listarJugador();
        }

        
    }

    public function obtenerDatosJugadorId($idJugadorListar) {

        // Verificar si el jugador existe
        if ($this->verificarJugadorId($idJugadorListar)) { // Aquí no se necesita > 0, ya que verificamos si el valor existe.
    
            $sqlDatosJugadorEspecifico = Conexion::conectar()->prepare("SELECT nombre, numerodocumento, puntos FROM jugador WHERE id_jugador = :idJugadorListar");
            $sqlDatosJugadorEspecifico->execute([':idJugadorListar' => $idJugadorListar]);
    
            // Obtener los datos del jugador
            $data = $sqlDatosJugadorEspecifico->fetch(); // Para retornar un solo resultado
            return $data ?: "No se encontraron datos para el jugador especificado.";
    
        } else {
            return "errorrrr";
        }
    }


    public function actualizarJugador($idJugador, $nombreNew, $numerodocumentoNew, $puntosNew){

        $sqlNumeroDocumentoActual = Conexion::conectar()->prepare("SELECT numerodocumento FROM jugador WHERE id_jugador = :idJugador");
        $sqlNumeroDocumentoActual->execute([':idJugador' => $idJugador]);
        $numeroDocumentoActual = $sqlNumeroDocumentoActual->fetchColumn();
    
        // Solo verificamos el documento si ha cambiado
        if ($numerodocumentoNew !== $numeroDocumentoActual && $this->verificarJugador($numerodocumentoNew) > 0) {
            return ['error' => 'El número de documento ya está registrado'];
        } else {
            $sqlActualizarJugador = Conexion::conectar()->prepare("UPDATE jugador 
            SET nombre = :nombreNew, numerodocumento = :numerodocumentoNew, puntos = :puntosNew WHERE id_jugador = :idJugador");
            $sqlActualizarJugador->execute(['idJugador' => $idJugador, 'nombreNew' => $nombreNew, 'numerodocumentoNew' => $numerodocumentoNew, 'puntosNew' => $puntosNew]);
    
            $data = self::listarJugador();
            return $data;
        }
    }
    

    public function eliminarJugador($numeroDocumentoJugador){

        if($this->verificarJugador($numeroDocumentoJugador) > 0){

            $sqlEliminarJugador =  Conexion::conectar()->prepare("DELETE FROM jugador WHERE numerodocumento = :numeroDocumentoJugador");
            $sqlEliminarJugador->execute([':numeroDocumentoJugador' => $numeroDocumentoJugador]);

            if($sqlEliminarJugador->rowCount() > 0){
                $data = self::listarJugador();
                return $data;
            }else{
                return "error";
            }
        }else{
            return "error";
        }

    }

    public function eliminarTodo(){

        $sqlEliminarRegistros = Conexion::conectar()->prepare("TRUNCATE TABLE jugador RESTART IDENTITY");
        $sqlEliminarRegistros->execute();

        return ['mensaje' => 'Registros Eliminados'];

    }

    
}

?>