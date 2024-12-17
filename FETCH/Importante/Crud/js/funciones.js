const formulario = document.querySelector('#form');

formulario.addEventListener('submit', (focus) => {

    focus.preventDefault();
    const formularioId = document.getElementById('form');

    const datosFormulario = new FormData(formularioId);

    let nombre = datosFormulario.get('nombre');
    let apellidos = datosFormulario.get('apellidos');
    let tipo = datosFormulario.get('sexo');
    let mensajes = document.querySelector("#mensajes");

    mensajes.innerHTML = "";

    if (nombre == "") {

        let tipo_mensaje = "Debes de ingresar un nombre";
        error(tipo_mensaje);
        return false;

    } else if (apellidos == "") {

        let tipo_mensaje = "Debes de ingresar tus apellidos";
        error(tipo_mensaje);
        return false;

    } else if (tipo == "") {
        let tipo_mensaje = "Debes de seleccionar el tipo de sexo";
        error(tipo_mensaje);
        return false;
    }

    
    // var nombre = datosFormulario.get('sexo')
    // alert(nombre)

    let url = "./modelo/ejecutarConsultas.php"
    fetch(url, {
        method: 'POST',
        body: datosFormulario
    })
        .then(data => data.json())
        .then(data => {
            console.log('Correcto', data);
            pintar_tabla_resultados(data);
            formulario.reset();
        })
        .catch(function (error) {
            console.log('Error: ', error)
        });

})


const error = (tipo_mensaje) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${tipo_mensaje}`,
    });
}

const pintar_tabla_resultados = (data) => {
    let tab_datos = document.querySelector('#tabla_persona');

    tab_datos.innerHTML = "";
    for (let item of data) {
        tab_datos.innerHTML +=
            `
            <tr>
                <td>${item.idpersona}</td>
                <td>${item.nombre}</td>
                <td>${item.apellidos}</td>
                <td>${item.sexo}</td>
                <td class="text-center">
                    <button class = "btn btn-primary btn-sm" onclick="editar(${item.idpersona})">Editar</button>
                    <button class = "btn btn-danger btn-sm" onclick="eliminar(${item.idpersona})">Eliminar</button>
                </td>
            </tr>
        `
    }
}

const editar = (id) => {

    alert(id);
    var url = "./modelo/ejecutarConsultas.php";
    var formData = new FormData();
    formData.append('tipo_operacion', 'editar');
    formData.append('id', id);
    fetch(url, {
        method: 'post',
        body: formData
    })
        .then(data => data.json())
        .then(data => {
            console.log('success', data);
            for (let item of data) {
                var id = item.idpersona;
                var nom = item.nombre;
                var ape = item.apellidos;
                var sexo = item.sexo;
                if (sexo == 'Masculino') {
                    var sex = `
                <select name="sexou" id="sexou" class="form-control">
                    <option value="Masculino" selected>Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
                `;
                } else if (sexo == 'Femenino') {
                    var sex = `
                <select name="sexou" id="sexou" class="form-control">
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino" selected>Femenino</option>
                </select>
                `;
                }

            }


            Swal.fire({
                title: 'Actualizar información',
                html: `
                <form id="update_form">
                    <input type="text" value="update" name="tipo_operacion" hidden="true">
                    <input type="number" value="${id}"   hidden="true" name="idu" class="form-control" placeholder="id de la persona">
                    <hr>
                    <input type="text" value="${nom}"   name="nombreu" class="form-control" placeholder="nombre">
                    <hr>
                    <input type="text" value="${ape}" name="apellidosu"  class="form-control" placeholder="apellidos">
                    <hr>
                    ${sex}
                </form>  
            
            `,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.value) {

                    const datos = document.querySelector('#update_form');
                    const datos_actualizar = new FormData(datos)
                    var url = "./modelo/ejecutarConsultas.php";

                    fetch(url, {
                        method: 'POST',
                        body: datos_actualizar
                    })
                        .then(data => data.json())
                        .then(data => {
                            console.log("Correcto", data);
                            pintar_tabla_resultados(data)
                        })
                        .catch(function (error) {
                            console.log('Error', error);
                        })

                    Swal.fire(
                        'Exito',
                        'Se actualizo con exito',
                        'success'
                    )

                }
            })

        })
        .catch(function (error) {
            console.error('error', error);
        });
}

const eliminar = (id) => {

    alert(id);
    Swal.fire({
        title: "¿Quieres Eliminar?",
        text: "No se podra revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            var url = "./modelo/ejecutarConsultas.php";
            const formData = new FormData()
            formData.append('tipo_operacion', 'eliminar');
            formData.append('id', id)

            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(data => data.json())
                .then(data => {
                    console.log("Correcto", data);
                    pintar_tabla_resultados(data)
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Eliminado",
                        icon: "success"
                    });
                })
                .catch(function (error) {
                    console.log('Error', error);
                })

        }
    });
}