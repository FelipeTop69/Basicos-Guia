let objeto = {
    codigo : 1,
    nombre : "Felipe",
    edad : 18,
    sexo : "Masculino",
    habilidades : ["Deportista", "Manejo TIC", "Escucha Empatica"],
    enamorado : false,
}

function autoMovil(pMotor, pCarroceria, pCombustible){

    this.motor = pMotor;
    this.carroceria = pCarroceria;
    this.combustible = pCombustible;

    this.transportar = function(){
        console.log("Transportar objetos o personas");
    }

    this.ligar = function(){
        console.log("Ayuda a enamorar la que te trae loco");
    }

}

let auto = new autoMovil("V8" , "Camaro" , "Diesel");
console.log(auto.motor);
console.log(auto.carroceria);
console.log(auto.combustible);

console.log("\n");

auto.transportar();
auto.ligar();

console.log("\n");

console.log(auto);

// Se pueden crear atributos y metodos fuera de una clase. N° Video 22
// Se pueden crear objetos dentro de un objeto y acceder a los valores. N° Video 23