const btn =  document.querySelector('button');
const documento = document.querySelector('#contenido')

const obtenerDatos = () =>{

    fetch('https://randomuser.me/api/') 
    .then(datos => datos.json()) 
    .then(datos =>{ 
        console.log(datos.results[0])
        documento.innerHTML = 
        `
            <img src="${datos.results[0].picture.large}" width="200px" class="img-fluid rounded-circle">
            <p>Nombre: ${datos.results[0].name.first}</p>
        `
    })

}

btn.addEventListener('click', obtenerDatos)