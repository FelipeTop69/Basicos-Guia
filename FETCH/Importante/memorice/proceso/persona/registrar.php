<?php 
    include('../conexion/conexion.php');
    include('persona.php');

    class Registrar extends Persona{
        
        private $sqlInsert;
        public function registro(){
            $conexion=new Conexion();
            $this->sqlInsert="INSERT INTO public.persona(nombre, email) VALUES (:nombre, :email);";
            $valores=[
                ':nombre' => $this->getNombrePersona(),
                ':email' => $this->getEmailPersona(),
            ];

            $conexion->ejecutar($this->sqlInsert, $valores);              
        }
    }
?>