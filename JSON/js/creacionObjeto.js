let objeto = {
    codigo : 1,
    nombre : "Felipe",
    edad : 18,
    sexo : "Masculino",
    habilidades : ["Deportista", "Manejo TIC", "Escucha Empatica"],
    enamorado : false,
}

console.table(objeto)
console.log("\n")

// Acceder a llaves normales
console.log("Sin comillas en llave: " , objeto.nombre)
console.log("Con comillas en las llave: " , objeto["nombre"])
console.log("\n")

//Aceder a llaves de atributos
console.log(objeto.habilidades)
console.log("Por posicion: " , objeto.habilidades[1])
console.log("\n")

for(let iteracion = 0; iteracion < objeto.habilidades.length; iteracion++ ){
    console.log(objeto.habilidades[iteracion])
}
console.log("\n")

objeto.habilidades.forEach(element => {
    console.log(element)
});
console.log("\n")

