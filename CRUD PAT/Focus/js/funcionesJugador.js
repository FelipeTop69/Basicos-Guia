const url = './Focus/modelo/ejecutarConsultasJugador.php'
const formulario = document.querySelector('#formularioJugador');
const modalRegistro = new bootstrap.Modal(document.getElementById('modalRegistroJugador'));
const modalActualizar = new bootstrap.Modal(document.getElementById('modalActualizarJugador'));

const btnKill = document.getElementById('botonKill')

// Registrar
formulario.addEventListener('submit', (focus) => {
    focus.preventDefault();
    const datosFormulario = new FormData(formulario);

    let numerodocumento = datosFormulario.get('numerodocumento');
    let nombre = datosFormulario.get('nombre');
    let puntos = datosFormulario.get('puntos');
    let operacion = datosFormulario.get('tipo_operacion');

    console.log(numerodocumento)
    console.log(nombre)
    console.log(puntos)
    console.log(operacion)

    fetch(url, {
        method: 'POST',
        body: datosFormulario
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.error
                });
            } else {
                console.log('Datos guardados correctamente', data);
                pintarTablaResultadosJugador(data);
                formulario.reset();
                modalRegistro.hide();
            }
        })
        .catch(function (error) {
            console.log('Error: ', error);
        });
});

function soloNumeros(event) {
    const campoNoDocumento = event.target;
    const valor = campoNoDocumento.value;
    const regex = /^[0-9]*$/;
    if (!regex.test(valor)) {
        campoNoDocumento.value = valor.replace(/[^0-9]/g, '');
    }
}

//Actualizar
const abrirModalActualizarJugador = (idJugadorActualizar) => {
    obtenerDatosJugador(idJugadorActualizar);
};

const obtenerDatosJugador = (idJugador) => {
    const formData = new FormData();
    formData.append('tipo_operacion', 'obtenerDatosJugador');
    formData.append('idJugadorL', idJugador);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos del jugador cargados correctamente', data);
        pintarModalResultadoJugador(data);
        actualizarJugador(idJugador);
    })
    .catch(error => console.error('Error al listar los datos del jugador:', error));
};

const pintarModalResultadoJugador = (data) => {
    const modalActualizar = document.querySelector('#cuerpoModalJugador');
    modalActualizar.innerHTML = `
        <form id="formularioActualizarJugador" class="row formulario-registro needs-validation">
            <input type="text" name="tipo_operacion" value="actualizarJugador" hidden>
            <div class="col-md-12">
                <label for="nombre" class="form-label">Gamer Tag</label>
                <input type="text" name="nombreNew" id="nombreNew" class="form-control" value="${data.nombre}" required>
            </div>
            <div class="col-md-12">
                <label for="numerodocumento" class="form-label">N° Documento</label>
                <input type="text" name="numerodocumentoNew" id="numerodocumentoNew" class="form-control" value="${data.numerodocumento}" oninput="soloNumeros(event)" maxlength="12" required>
            </div>
            <div class="col-md-12">
                <label for="puntos" class="form-label">Puntos</label>
                <input type="text" name="puntosNew" id="puntosNew" class="form-control" value="${data.puntos}" oninput="soloNumeros(event)" required>
            </div>
            <br>
            <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-success">Actualizar</button>
            </div>
        </form>
    `;
};

const actualizarJugador = (idJugadorActualizar) => {
    const formularioActualizar = document.querySelector('#formularioActualizarJugador');

    formularioActualizar.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const datosFormularioActualizar = new FormData(formularioActualizar);
        datosFormularioActualizar.append('idJugador', idJugadorActualizar)
        let id = datosFormularioActualizar.get('idJugador');
        let nombre = datosFormularioActualizar.get('nombreNew');
        let numerodocumento = datosFormularioActualizar.get('numerodocumentoNew');
        let puntos = datosFormularioActualizar.get('puntosNew');
        let operacion = datosFormularioActualizar.get('tipo_operacion');

        console.log(id);
        console.log(nombre);
        console.log(numerodocumento);
        console.log(puntos);
        console.log(operacion);

        fetch(url,{
            method: 'POST',
            body: datosFormularioActualizar
        })
        .then(data => data.json())
        .then(data =>{
            if(data.error){
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.error
                });
            }else{
                console.log('Jugador Actualizado', data);
                pintarTablaResultadosJugador(data);
                modalActualizar.hide();
            }
            
        })
        .catch(function(error){
            console.log('Error Papi', error)
        })

        
    });
};



// Eliminar
const eliminarJugador = (numeroDocumentoJugadorEliminar, nombreJugadorEliminar) => {
    const numeroDocumento = numeroDocumentoJugadorEliminar;
    const nombreJugadador = nombreJugadorEliminar;
    alert(numeroDocumento);
    Swal.fire({
        title: "¿Quieres Eliminar al Jugador?",
        text: `Jugador ${nombreJugadador} con ID ${numeroDocumento}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
    }).then((result) => {
        if (result.isConfirmed) {

            const formData = new FormData();
            formData.append('tipo_operacion', 'eliminarJugador');
            formData.append('numeroDocumentoJugador', numeroDocumento)

            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(data => data.json())
            .then(data => {
                console.log('Jugador Eliminado', data);
                pintarTablaResultadosJugador(data);
                Swal.fire({
                    title: "Eliminado!",
                    text: "Eliminado",
                    icon: "success"
                });
            })
            .catch(function (error) {
                console.log('Error Papi', error)
            })
        }
    });
};


//Eliminar todos los registros
btnKill.addEventListener('click', () => {

    Swal.fire({
        title: "ELIMINAR TODO",
        text: "¿Estas seguro de eliminar todos los registros?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, seguro",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {

            const formData = new FormData();
            formData.append('tipo_operacion', 'eliminarTodo')

            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(data => data.json())
                .then(data => {
                    listarDatos();
                    Swal.fire({
                        title: "Game Over!",
                        text: data.mensaje,
                        icon: "success"
                    });
                })
                .catch(function (error) {
                    console.log("Error papi", error);
                })


        }
    });

})

const listarDatos = () => {
    const formData = new FormData();
    formData.append('tipo_operacion', 'listarJugador');

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(data => data.json())
    .then(data => {
        console.log('Datos listados correctamente', data);
        pintarTablaResultadosJugador(data);
    })
    .catch(function (error) {
        console.log('Error: ', error);
    });
}



const pintarTablaResultadosJugador = (data) => {
    let tab_datos = document.querySelector('#cuerpoTabla');
    tab_datos.innerHTML = "";

    for (let item of data) {
        tab_datos.innerHTML +=
            `
        <tr>
            <td class="campos">${item.id_jugador}</td>
            <td class="campos">${item.nombre}</td>
            <td class="campos">${item.numerodocumento}</td>
            <td class="campos">${item.puntos}</td>
            <td class="campos">
                <button type="button" data-id="${item.id_jugador}" class="btn btn-warning btn-sm btnActualizar " data-bs-toggle="modal" data-bs-target="#modalActualizarJugador">
                    <i class="fa-solid fa-pen-to-square icono-acciones"></i>
                </button>
                <button type="button" data-id="${item.numerodocumento}" data-nombre="${item.nombre}" class="btn btn-danger btn-sm btnEliminar ">
                    <i class="fa-solid fa-trash icono-acciones"></i>
                </button>
            </td>
        </tr>
        `;
    }

    document.querySelectorAll('.btnActualizar').forEach(button => {
        button.addEventListener('click', function () {
            const idJugadorActualizar = this.getAttribute('data-id');
            abrirModalActualizarJugador(idJugadorActualizar);
        });
    });

    document.querySelectorAll('.btnEliminar').forEach(button => {
        button.addEventListener('click', function () {
            const numeroDocumentoJugadorEliminar = this.getAttribute('data-id');
            const nombreJugadorEliminar = this.getAttribute('data-nombre');
            eliminarJugador(numeroDocumentoJugadorEliminar, nombreJugadorEliminar);
        });
    });

}


// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    listarDatos();
});