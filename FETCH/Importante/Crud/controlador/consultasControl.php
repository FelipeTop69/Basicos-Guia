<?php 

    class consultas extends conexion{

        public function select_persona(){

            $sqlp = conexion::conectar() -> prepare("SELECT * FROM persona");
            $sqlp -> execute();
            return $array = $sqlp -> fetchAll(PDO::FETCH_ASSOC);

        }

        public function insert_persona($nombre, $apellidos, $sexo){

            $sql = conexion::conectar() -> prepare("INSERT INTO persona (nombre, apellidos, sexo) VALUES ('$nombre' , '$apellidos' ,'$sexo')");
            if($sql -> execute()){
                $resultado = self::select_persona();
                return $resultado;
            }
            // return $array = $sqlp -> fetchAll(PDO::FETCH_ASSOC);

        }

        public function obtener_persona($id){

            $sql = conexion::conectar() -> prepare("SELECT * FROM persona WHERE idpersona = '".$id."'");
            if($sql -> execute()){
                return $array = $sql -> fetchAll(PDO::FETCH_ASSOC);
            }else{
                return "error";
            }

        }

        public function update_persona($id,$nombre, $apellidos, $sexo){

            $sql = conexion::conectar()->prepare("UPDATE persona SET nombre='".$nombre."', apellidos='".$apellidos."', sexo='".$sexo."'  WHERE idpersona='".$id."'");
            $sql -> execute();
            if($sql -> rowCount() > 0){
                $resultado = self::select_persona();
                return $resultado;
            }else{
                return "error";
            }

        }

        public function eliminar_persona($id){

            $sql = conexion::conectar()->prepare("DELETE FROM persona WHERE idpersona = '".$id."'");
            $sql -> execute();
            if($sql -> rowCount() > 0){
                $resultado = self::select_persona();
                return $resultado;
            }else{
                return "error";
            }

        }

    }

?>