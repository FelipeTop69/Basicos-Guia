<?php 
class Persona{
    private $nombrePersona;
    private $emailPersona;

    public function setNombrePersona($nombrePersona){
        $this->nombrePersona=$nombrePersona;
    }
    public function getNombrePersona(){
        return $this->nombrePersona;
    }
    public function setEmailPersona($emailPersona){
        $this->emailPersona=$emailPersona;
    }
    public function getEmailPersona(){
        return $this->emailPersona;
    }
}

?>