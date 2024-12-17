let objeto = {
    codigo : 1,
    nombre : "Felipe",
    edad : 18,
    sexo : "Masculino",
    habilidades : ["Deportista", "Manejo TIC", "Escucha Empatica"],
    enamorado : false,
    elementosFav : {
        tecnologia : ["Consola XBOX", "LEGO", "SETUP"],
        accesorios : ["Collares", "Camisetas Futbol", "Audifonos"],
        general: ["Motos", "Balon Futbol", "Comida"],
    },
    jugadoresFav : [

        {
            nombre : "James Rodriguez", 
            edad : 33, 
            piernaHabil: "Zurda" , 
            trofeos : ["Champions", "Ligas", "Bota Oro"]
        },

        {
            nombre : "Cristiano Ronaldo", 
            edad : 39, 
            piernaHabil: "Derecha" , 
            trofeos : ["Champions", "Ligas", "Euro", "Gold ball"]
        },

        {
            nombre : "Luis Diaz", 
            edad : 27, 
            piernaHabil: "Derecha" , 
            trofeos : ["Champions", "Premier"]
        },

    ],

    recorrerObjetosConArreglos : function(){

        console.log("Clave habilidades:")
        for(iteracion in this.habilidades){
            console.log(this.habilidades[iteracion])
        }

        console.log("\n")
        
        console.log("Clave elementoFav (forma1):")
        console.log("\n")
        for (let categoria in this.elementosFav) {
            console.log("Categoría:", categoria);
            for (let elemento of this.elementosFav[categoria]) {
                console.log("Elemento:", elemento);
            }
        }

        console.log("\n")
        
        console.log("Clave elementoFav (forma2):")
        console.log("\n")
        let categorias = Object.keys(this.elementosFav);

        for (let i = 0; i < categorias.length; i++) {
            let categoria = categorias[i];
            console.log("Categoría:", categoria);
            for (let elemento of this.elementosFav[categoria]) {
                console.log("Elemento:", elemento);
            }
        }

        console.log("\n")
        
        console.log("Clave jugadoresFav (forma1):")

        for(iteracion in this.jugadoresFav){
            console.log("\n")
            console.log(this.jugadoresFav[iteracion].nombre)
            for(iteracionDos in this.jugadoresFav[iteracion].trofeos){
                console.log (this.jugadoresFav[iteracion].trofeos[iteracionDos])
            }
        }

        console.log("\n")
        
        console.log("Clave jugadoresFav forma2:")

        for(iteracion in this.jugadoresFav){
            console.log("\n")
            console.log(this.jugadoresFav[iteracion].nombre)
            for(iteracionDos of this.jugadoresFav[iteracion].trofeos){
                console.log (iteracionDos)
            }
        }

    }
}

console.log(objeto.elementosFav.tecnologia[1]);
console.log("\n")

console.log(objeto.jugadoresFav[2].trofeos[0])
console.log("\n")

objeto.recorrerObjetosConArreglos();


