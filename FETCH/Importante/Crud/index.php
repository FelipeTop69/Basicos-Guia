<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>


    <div class="container">
        <form class="mt-2" action="" id="form">
            <div class="row">
                <input type="text" name="tipo_operacion" value="guardar" hidden="true">
                <div class="col-md-4">
                    <input type="text" name="nombre" id="nombre" class="form-control" placeholder="Ingresa tu nombre" autocomplete="off" >
                </div>
                <div class="col-md-4">
                    <input type="text" name="apellidos" id="apellidos" class="form-control" placeholder="Ingresa tus apellidos" autocomplete="off" >
                </div>
                <div class="col-md-2">
                    <select name="sexo" id="sexo" class="form-control" > 
                        <option value="">Elige el sexo</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <button type="submit" class="btn btn-info btn-block">Aceptar</button>
                </div>
            </div>

        </form>
    </div>

    <br>
    <div class="container" id="mensajes"></div>
    <br>

    <div class="container">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apeliidos</th>
                    <th>Sexo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tabla_persona">
            <?php 

                require_once "php/conexion.php";
                require_once "controlador/consultasControl.php";
                $sentencia = new consultas();
                $mostrarDatos = $sentencia -> select_persona();
                foreach($mostrarDatos as $res){

                    $id = $res["idpersona"];
                    echo "<tr>";
                    echo "<td>".$res["idpersona"]."</td>";
                    echo "<td>".$res["nombre"]."</td>";
                    echo "<td>".$res["apellidos"]."</td>";
                    echo "<td>".$res["sexo"]."</td>";
                    echo "<td class='text-center'>
                            <button class='btn btn-primary btn-sm' onclick='editar($id);'>Editar</button>
                            <button class='btn btn-danger btn-sm'onclick='eliminar($id);'>Eliminar</button>
                        </td>";
                    echo "</tr>";
                }

            ?>
            
            </tbody>
        </table>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="js/funciones.js"></script>
</body>

</html>