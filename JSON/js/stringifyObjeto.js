let objeto = {
    codigo : 1,
    nombre : "Felipe",
    edad : 18,
    sexo : "Masculino",
    habilidades : ["Deportista", "Manejo TIC", "Escucha Empatica"],
    enamorado : false,
}

// stringify convierte el objeto de una cadena para poder ver su valores
let objetoCadena = JSON.stringify(objeto)

console.log(objetoCadena)