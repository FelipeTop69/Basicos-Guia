let objeto = {
    codigo: 1,
    nombre: "Felipe",
    edad: 18,
    sexo: "Masculino",
    habilidades: ["Deportista", "Manejo TIC", "Escucha Empatica"],
    enamorado: false,
    obtenerDatos: function() {
        console.log(this.nombre);
        console.log(this.edad);
        console.log("\n")
        this.iterarHabilidades();
    },

    iterarHabilidades: function(){
        let conteo = 1;
        this.habilidades.forEach(element => {
            
            console.log("Habilidad" , `${conteo}` , ":" , element);
            conteo++;

        });
    }
}

console.table(objeto);
console.log("\n");

objeto.obtenerDatos();
console.log("\n");

// De igual manera como en una funcion se pueden 
// enviar parametros y retornar valores, tambien es 
// posible en un objeto JSON 
