const formularioRegistro = document.getElementById('formularioRegistro');
const resultado = document.getElementById('resultado');

formularioRegistro.addEventListener('submit', function(focus){
    focus.preventDefault();

    const datosFormulario = new FormData(formularioRegistro);

    console.log(datosFormulario);
    console.log(datosFormulario.get('numeroDocumento'));
    console.log(datosFormulario.get('usuario'));

    fetch('php/post.php', {
        method:'POST',
        body: datosFormulario
    })
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos)
            if(datos === 'error'){
                resultado.innerHTML = 
                `
                    <div class="alert alert-danger col-6" role="alert">
                        Campos Vacios
                    </div>
                `
            }else{
                resultado.innerHTML = 
                `
                    <div class="alert alert-success col-6" role="alert">
                        ${datos}
                    </div>
                `
            }
        })

})