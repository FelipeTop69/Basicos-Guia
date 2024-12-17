<?php
class Consultas_Configuracion extends Conexion
{


    public function listarConfiguraciones()
    {
        $sql = "
            SELECT 
                cpart.id_configuracion_partida AS id_configuracion,
                cat.nombre AS categoria,
                est.descripcion AS estado_partida,
                CASE WHEN cpart.estado_configuracion THEN 'Activa' ELSE 'Desactivada' END AS estado_configuracion,
                (SELECT tiempo FROM tiempo_memorizacion WHERE id_tiempo_nivel = cpart.id_nivel_facil AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_memorizacion_facil,
                (SELECT tiempo FROM tiempo_orden WHERE id_tiempo_nivel = cpart.id_nivel_facil AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_orden_facil,
                (SELECT tiempo FROM tiempo_memorizacion WHERE id_tiempo_nivel = cpart.id_nivel_medio AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_memorizacion_medio,
                (SELECT tiempo FROM tiempo_orden WHERE id_tiempo_nivel = cpart.id_nivel_medio AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_orden_medio,
                (SELECT tiempo FROM tiempo_memorizacion WHERE id_tiempo_nivel = cpart.id_nivel_dificil AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_memorizacion_dificil,
                (SELECT tiempo FROM tiempo_orden WHERE id_tiempo_nivel = cpart.id_nivel_dificil AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_orden_dificil
            FROM 
                configuracion_partida cpart
            INNER JOIN categorias cat ON cpart.id_categoria = cat.id_categoria
            INNER JOIN estado_partida est ON cpart.id_estado_partida = est.id_estado_partida
            ORDER BY cpart.id_configuracion_partida ASC
        ";

        $stmt = conexion::conectar()->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Verificar si una configuración con la misma categoría ya existe
    public function verificarCategoriaUnica($categoria)
    {
        $sql = Conexion::conectar()->prepare("SELECT COUNT(*) FROM configuracion_partida WHERE id_categoria = :categoria");
        $sql->execute([':categoria' => $categoria]);
        return $sql->fetchColumn();
    }

    // Verificar si ya existe una configuración activa
    public function verificarConfiguracionActiva()
    {
        $sql = Conexion::conectar()->prepare("SELECT COUNT(*) FROM configuracion_partida WHERE estado_configuracion = TRUE");
        $sql->execute();
        return $sql->fetchColumn();
    }

    // Insertar configuración de partida
    public function insertarConfiguracion($categoria, $estado_partida, $estado_configuracion, $tiempo_mem_f, $tiempo_orden_f, $tiempo_mem_m, $tiempo_orden_m, $tiempo_mem_d, $tiempo_orden_d)
    {
        // Verificar que no haya más de un registro con la misma categoría
        if ($this->verificarCategoriaUnica($categoria) > 0) {
            return ['error' => 'No pueden haber configuraciones con categorias iguales'];
        }
        // Verificar que solo haya una configuración activa
        if ($estado_configuracion && $this->verificarConfiguracionActiva() > 0) {
            return ['error' => 'Solo puede haber una configuración activa a la vez'];
        }
        try {
            $conexion = Conexion::conectar();
            $conexion->beginTransaction();

            // Insertar configuración de partida
            $sql = "INSERT INTO configuracion_partida (id_categoria, id_estado_partida, estado_configuracion, id_nivel_facil, id_nivel_medio, id_nivel_dificil)
                VALUES (?, ?, ?, 1, 2, 3)";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([$categoria, $estado_partida, $estado_configuracion]);

            // Obtener el id_configuracion_partida recién insertado
            $id_configuracion = $conexion->lastInsertId();

            // Insertar tiempos de memorización
            $sql = "INSERT INTO tiempo_memorizacion (id_tiempo_nivel, tiempo, id_configuracion_partida) VALUES (?, ?, ?)";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([1, $tiempo_mem_f, $id_configuracion]);
            $stmt->execute([2, $tiempo_mem_m, $id_configuracion]);
            $stmt->execute([3, $tiempo_mem_d, $id_configuracion]);

            // Insertar tiempos de orden
            $sql = "INSERT INTO tiempo_orden (id_tiempo_nivel, tiempo, id_configuracion_partida) VALUES (?, ?, ?)";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([1, $tiempo_orden_f, $id_configuracion]);
            $stmt->execute([2, $tiempo_orden_m, $id_configuracion]);
            $stmt->execute([3, $tiempo_orden_d, $id_configuracion]);

            $conexion->commit();
            return self::listarConfiguraciones();
        } catch (Exception $e) {
            $conexion->rollBack();
            return ['error' => 'Error al registrar la configuración: ' . $e->getMessage()];
        }
    }

    public function obtenerDatosConfiguracion($id_configuracion)
    {
        $sql = "
            SELECT 
                cpart.id_configuracion_partida AS id_configuracion,
                cat.nombre AS categoria,
                est.descripcion AS estado_partida,
                CASE WHEN cpart.estado_configuracion THEN 'Activa' ELSE 'Desactivada' END AS estado_configuracion,
                (SELECT tiempo FROM tiempo_memorizacion WHERE id_tiempo_nivel = cpart.id_nivel_facil AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_memorizacion_facil,
                (SELECT tiempo FROM tiempo_orden WHERE id_tiempo_nivel = cpart.id_nivel_facil AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_orden_facil,
                (SELECT tiempo FROM tiempo_memorizacion WHERE id_tiempo_nivel = cpart.id_nivel_medio AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_memorizacion_medio,
                (SELECT tiempo FROM tiempo_orden WHERE id_tiempo_nivel = cpart.id_nivel_medio AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_orden_medio,
                (SELECT tiempo FROM tiempo_memorizacion WHERE id_tiempo_nivel = cpart.id_nivel_dificil AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_memorizacion_dificil,
                (SELECT tiempo FROM tiempo_orden WHERE id_tiempo_nivel = cpart.id_nivel_dificil AND id_configuracion_partida = cpart.id_configuracion_partida LIMIT 1) AS tiempo_orden_dificil
            FROM 
                configuracion_partida cpart
            INNER JOIN categorias cat ON cpart.id_categoria = cat.id_categoria
            INNER JOIN estado_partida est ON cpart.id_estado_partida = est.id_estado_partida WHERE id_configuracion_partida = :id_configuracion LIMIT 1
        ";
        $stmt = Conexion::conectar()->prepare($sql);
        $stmt->execute([':id_configuracion' => $id_configuracion]);
        return $stmt->fetch();
    }

    public function actualizarConfiguracion($id_configuracion, $categoria, $estado_partida, $estado_configuracion, $tiempo_mem_f, $tiempo_orden_f, $tiempo_mem_m, $tiempo_orden_m, $tiempo_mem_d, $tiempo_orden_d) {
        $sqlDatosActuales = conexion::conectar()->prepare("SELECT id_categoria, estado_configuracion FROM configuracion_partida WHERE id_configuracion_partida = :id_configuracion");
        $sqlDatosActuales->execute([':id_configuracion' => $id_configuracion]);
        $resultado = $sqlDatosActuales->fetch(PDO::FETCH_ASSOC);

        $categoriaActual = $resultado['id_categoria'];
        $estadoConfiguracionActual = $resultado['estado_configuracion'] ? 1 : 0;

        if ($categoria != $categoriaActual && $this->verificarCategoriaUnica($categoria) > 0) {
            return ['error' => 'No pueden haber configuraciones con categorías iguales', 'categoria_actual' => $categoriaActual];
        }

        if ($estado_configuracion != $estadoConfiguracionActual && $estado_configuracion == 1 && $this->verificarConfiguracionActiva() > 0) {
            return ['error' => 'Solo puede haber una configuración activa', 'categoria_actual' => $categoriaActual];
        }
    
        try {
            $conexion = Conexion::conectar();
            $conexion->beginTransaction();
    
            // Actualizar configuración de partida
            $sql = "UPDATE configuracion_partida SET 
                    id_categoria = :categoria,
                    id_estado_partida = :estado_partida,
                    estado_configuracion = :estado_configuracion
                    WHERE id_configuracion_partida = :id_configuracion";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([
                ':categoria' => $categoria,
                ':estado_partida' => $estado_partida,
                ':estado_configuracion' => $estado_configuracion,
                ':id_configuracion' => $id_configuracion
            ]);
    
            // Actualizar tiempos de memorización
            $sql = "UPDATE tiempo_memorizacion SET tiempo = :tiempo WHERE id_tiempo_nivel = :id_tiempo_nivel AND id_configuracion_partida = :id_configuracion";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([
                ':tiempo' => $tiempo_mem_f,
                ':id_tiempo_nivel' => 1,
                ':id_configuracion' => $id_configuracion
            ]);
            $stmt->execute([
                ':tiempo' => $tiempo_mem_m,
                ':id_tiempo_nivel' => 2,
                ':id_configuracion' => $id_configuracion
            ]);
            $stmt->execute([
                ':tiempo' => $tiempo_mem_d,
                ':id_tiempo_nivel' => 3,
                ':id_configuracion' => $id_configuracion
            ]);
    
            // Actualizar tiempos de orden
            $sql = "UPDATE tiempo_orden SET tiempo = :tiempo WHERE id_tiempo_nivel = :id_tiempo_nivel AND id_configuracion_partida = :id_configuracion";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([
                ':tiempo' => $tiempo_orden_f,
                ':id_tiempo_nivel' => 1,
                ':id_configuracion' => $id_configuracion
            ]);
            $stmt->execute([
                ':tiempo' => $tiempo_orden_m,
                ':id_tiempo_nivel' => 2,
                ':id_configuracion' => $id_configuracion
            ]);
            $stmt->execute([
                ':tiempo' => $tiempo_orden_d,
                ':id_tiempo_nivel' => 3,
                ':id_configuracion' => $id_configuracion
            ]);
    
            $conexion->commit();
            return self::listarConfiguraciones();
        } catch (Exception $e) {
            $conexion->rollBack();
            return ['error' => 'Error al actualizar la configuración: ' . $e->getMessage()];
        }
    }

    public function eliminarConfiguracion($id_configuracion){
        
        $sqlEliminarConfiguracion = conexion::conectar()->prepare("DELETE FROM configuracion_partida CASCADE WHERE id_configuracion_partida = :id_configuracion ;");
        $sqlEliminarConfiguracion->execute([':id_configuracion' => $id_configuracion]);

        $data = self::listarConfiguraciones();
        return $data;

    }

    public function eliminarTodo(){
        
        $sqlEliminarTodo = conexion::conectar()->prepare("TRUNCATE TABLE  configuracion_partida, tiempo_memorizacion, tiempo_orden RESTART IDENTITY CASCADE;");
        $sqlEliminarTodo->execute();

        $data = self::listarConfiguraciones();
        return $data;

    }
}
