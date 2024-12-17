const btn = document.querySelector('button');
const documento = document.querySelector('#contenido')

function obtenerDatos() {

    fetch('tabla.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            // console.log(datos)
            mostrarTabla(datos);
        })

}

function mostrarTabla(pDatos) {

    let datos = pDatos;
    // console.log(datos)
    // documento.innerHTML = ``
    for (let iteracion of datos) {
        // console.log(iteracion.nombre)
        documento.innerHTML +=
        `
        <tr>
            <th scope="row">${iteracion.id}</th>
            <td>${iteracion.nombre}</td>
            <td>${iteracion.email}</td>
            <td>${iteracion.estado ? "Activo" : "Inactivo"}</td>
        </tr>
        `
    }

}



btn.addEventListener('click', obtenerDatos)