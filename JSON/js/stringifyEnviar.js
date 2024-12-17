let objeto = {
    codigo : 1,
    nombre : "Felipe",
    edad : 18,
    sexo : "Masculino",
    habilidades : ["Deportista", "Manejo TIC", "Escucha Empatica"],
    enamorado : false,
}

// Convirtiendo objeto a formato JSON puro
let objetoCadena = JSON.stringify(objeto)

// Alamcenando el objeto puro en memoria servidor
localStorage.setItem("objeto", objetoCadena);


// Obteniendo objeto JSON
let datosObtenidos = localStorage.getItem("objeto");

// Desglosando Objeto para accerder sus valores
let objetoCadenaConvertido = JSON.parse(datosObtenidos)

console.log(objetoCadenaConvertido.nombre)