const url = './Focus/modelo/ejecutarConsultasConfiguracion.php' 
const formulario = document.querySelector('#formularioConfiguracion');
const modalRegistro = new bootstrap.Modal(document.getElementById('modalRegistroConfiguracion'));
const modalActualizar = new bootstrap.Modal(document.getElementById('modalActualizarConfiguracion'));

const btnKill = document.getElementById('botonKill')

// Registrar Configuración de Partida
formulario.addEventListener('submit', (focus) => {
    focus.preventDefault();
    const datosFormulario = new FormData(formulario);
    console.log(datosFormulario)

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
            pintarTablaResultadosConfiguracion(data);
            formulario.reset();
            modalRegistro.hide()
        }
    })
    .catch(error => console.log('Error: ', error));
});

function limitarDigitos(input) {
    if (input.value.length > 2) {
        input.value = input.value.slice(0, 2);
    }
}

// Actualizar

// Función para abrir el modal y cargar todos los datos de la configuración seleccionada
const abrirModalActualizarConfiguracion = (idConfiguracion) => {
    alert(idConfiguracion)
    obtenerDatosConfiguracion(idConfiguracion);
};

// Función para obtener todos los datos de una configuración específica
const obtenerDatosConfiguracion = (idConfiguracion) => {
    const formData = new FormData();
    formData.append('tipo_operacion', 'obtenerDatosConfiguracion');
    formData.append('idConfiguracion', idConfiguracion);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        pintarModalResultadoConfiguracion(data); 
        actualizarConfiguracion(idConfiguracion)

        
    })
    .catch(error => console.error('Error al cargar la configuración:', error));
};

// Función para mostrar todos los datos en el formulario del modal
const pintarModalResultadoConfiguracion = (data) => {
    const cuerpoModal = document.querySelector('#cuerpoModalConfiguracion');
    cuerpoModal.innerHTML = `
        <form id="formularioActualizarConfiguracion" class="row formulario-registro needs-validation">
            <input type="hidden" name="tipo_operacion" value="actualizarConfiguracion">
            <div class="col-md-12">
                <label for="categoria" class="form-label">Categoría</label>
                <select class="form-select" id="categoria" name="categoria" required>
                    <option ${data.categoria === '1' ? 'selected' : ''} value="1">Números</option>
                    <option ${data.categoria === '2' ? 'selected' : ''} value="2">Frutas</option>
                <option ${data.categoria === '3' ? 'selected' : ''} value="3">Cómputo</option>
                </select>
            </div>

            <div class="col-md-12">
                <label for="estado_partida" class="form-label">Estado de Partida</label>
                <select class="form-select" id="estado_partida" name="estado_partida" required>
                    <option ${data.estado_partida} value="1">En Espera</option>
                    <option ${data.estado_partida} value="2">En Proceso</option>
                <option ${data.estado_partida} value="3">Terminada</option>
            </select>
        </div>

            <div class="col-md-12">
                <h5 class="mt-2 mb-2 text-center">Tiempos Nivel Fácil</h5>
                <label for="tiempo_mem_f" class="form-label">Tiempo Memorización (Nivel Fácil)</label>
                <input type="number" name="tiempo_mem_f" class="form-control" value="${data.tiempo_memorizacion_facil}" required>
                <label for="tiempo_orden_f" class="form-label">Tiempo Orden (Nivel Fácil)</label>
                <input type="number" name="tiempo_orden_f" class="form-control" value="${data.tiempo_orden_facil}" required>
            </div>

            <div class="col-md-12">
                <h5 class="mt-2 mb-2 text-center">Tiempos Nivel Medio</h5>
                <label for="tiempo_mem_m" class="form-label">Tiempo Memorización (Nivel Medio)</label>
                <input type="number" name="tiempo_mem_m" class="form-control" value="${data.tiempo_memorizacion_medio}" required>
                <label for="tiempo_orden_m" class="form-label">Tiempo Orden (Nivel Medio)</label>
                <input type="number" name="tiempo_orden_m" class="form-control" value="${data.tiempo_orden_medio}" required>
            </div>

            <div class="col-md-12">
                <h5 class="mt-2 mb-2 text-center">Tiempos Nivel Dificil</h5>
                <label for="tiempo_mem_d" class="form-label">Tiempo Memorización (Nivel Difícil)</label>
                <input type="number" name="tiempo_mem_d" class="form-control" value="${data.tiempo_memorizacion_dificil}" required>
                <label for="tiempo_orden_d" class="form-label">Tiempo Orden (Nivel Difícil)</label>
                <input type="number" name="tiempo_orden_d" class="form-control" value="${data.tiempo_orden_dificil}" required>
            </div>

            <div class="col-md-12">
                <label for="estado_configuracion" class="form-label">Estado de Configuración</label>
                <select class="form-select" id="estado_configuracion" name="estado_configuracion" required>
                    <option ${data.estado_configuracion ? 'selected' : ''} value="1">Activa</option>
                    <option ${!data.estado_configuracion ? 'selected' : ''} value="0">Desactivada</option>
                </select>
            </div>

            <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-success mt-3">Actualizar Configuración</button>
            </div>

        </form>
    `;
};

// Función para enviar el formulario de actualización de configuración
const actualizarConfiguracion = (idConfiguracion) => {
    const formularioActualizar = document.querySelector('#formularioActualizarConfiguracion');

    formularioActualizar.addEventListener('submit', (e) => {
        e.preventDefault();

        const datosFormularioActualizar = new FormData(formularioActualizar);
        datosFormularioActualizar.append('id_configuracion', idConfiguracion);

        fetch(url, {
            method: 'POST',
            body: datosFormularioActualizar
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    icon: "error",
                    title: data.errorr,
                    text: data.error
                });
                console.log(data.errorr)
                console.log(data.error)
            } else {
                console.log('Configuración actualizada', data);
                pintarTablaResultadosConfiguracion(data)
                modalActualizar.hide();
            }
        })
        .catch(error => console.log('Error al actualizar la configuración:', error));
    });
};

// Eliminar
const eliminarConfiguracion = (idCongifuracionEliminar, categoriaEliminar) => {
    const idConfiguracion = idCongifuracionEliminar;
    const categoria = categoriaEliminar;
    alert(idConfiguracion);
    Swal.fire({
        title: "¿Quieres Eliminar la Configuración?",
        text: `Categoria ${categoria} con ID ${idConfiguracion}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
    }).then((result) => {
        if (result.isConfirmed) {

            const formData = new FormData();
            formData.append('tipo_operacion', 'eliminarConfiguracion');
            formData.append('id_configuracion', idConfiguracion)

            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(data => data.json())
            .then(data => {
                console.log('Configuración Eliminado', data);
                pintarTablaResultadosConfiguracion(data);
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

// Listar Configuraciones de Partida
const listarDatos = () => {
    const formData = new FormData();
    formData.append('tipo_operacion', 'listarConfiguracion');

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos listados correctamente', data);
        pintarTablaResultadosConfiguracion(data);
    })
    .catch(error => console.log('Error: ', error));
}

// Pintar Tabla de Configuraciones
const pintarTablaResultadosConfiguracion = (data) => {
    let cuerpoTabla = document.querySelector('#cuerpoTabla');
    cuerpoTabla.innerHTML = ""; // Limpiar la tabla

    data.forEach(config => {
        cuerpoTabla.innerHTML += `
            <tr>
                <td>${config.id_configuracion}</td>
                <td>${config.categoria}</td>
                <td>${config.estado_partida}</td>
                <td>${config.estado_configuracion}</td>
                <td>${config.tiempo_memorizacion_facil}</td>
                <td>${config.tiempo_orden_facil}</td>
                <td>${config.tiempo_memorizacion_medio}</td>
                <td>${config.tiempo_orden_medio}</td>
                <td>${config.tiempo_memorizacion_dificil}</td>
                <td>${config.tiempo_orden_dificil}</td>
                <td>
                    <button type="button" data-id="${config.id_configuracion}" class="btn btn-warning btn-sm btnActualizar " data-bs-toggle="modal" data-bs-target="#modalActualizarConfiguracion">
                        <i class="fa-solid fa-pen-to-square icono-acciones"></i>
                    </button>
                    <button type="button" data-id="${config.id_configuracion}" data-categoria="${config.categoria}" class="btn btn-danger btn-sm btnEliminar ">
                        <i class="fa-solid fa-trash icono-acciones"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    document.querySelectorAll('.btnActualizar').forEach(button => {
        button.addEventListener('click', function () {
            const idConfiguracionActualizar = this.getAttribute('data-id');
            abrirModalActualizarConfiguracion(idConfiguracionActualizar); 
        });
    });

    document.querySelectorAll('.btnEliminar').forEach(button => {
        button.addEventListener('click', function () {
            const idCongifuracionEliminar = this.getAttribute('data-id');
            const categoriaEliminar = this.getAttribute('data-categoria');
            eliminarConfiguracion(idCongifuracionEliminar, categoriaEliminar);
        });
    });
}

// Ejecutar listado al cargar la página
// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    listarDatos();
});

