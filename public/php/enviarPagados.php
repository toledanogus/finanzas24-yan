<?php
require 'coneccion.php';

$json_data = file_get_contents("php://input");
$unidos = json_decode($json_data);

$xp= $unidos->objetoPagados;
$x= $unidos->objetoQuincena;

require 'switch.php';
// Verifica si la decodificación JSON fue exitosa y si existe la propiedad "pagados"
if ($xp && isset($xp->pagados) && is_array($xp->pagados)) {
    foreach ($xp->pagados as $concepto) {
        // Realiza la consulta SQL para actualizar el campo pagado a 1 para el concepto específico
        $query = "UPDATE conceptosyan SET pagado = 1 WHERE Concepto = ? AND QuincenaID = $quin";

        // Prepara la sentencia
        $stmt = mysqli_prepare($conn, $query);

        // Verifica si la preparación de la consulta fue exitosa
        if ($stmt) {
            // Liga parámetros a la consulta
            mysqli_stmt_bind_param($stmt, "s", $concepto);

            // Ejecuta la consulta para cada concepto
            mysqli_stmt_execute($stmt);

            // Verifica si la consulta se ejecutó correctamente
            if (mysqli_stmt_errno($stmt) !== 0) {
                echo "Error al actualizar el concepto: " . $concepto . "\n";
                echo "Error: " . mysqli_stmt_error($stmt) . "\n";
            }

            // Cierra la sentencia
            mysqli_stmt_close($stmt);
        } else {
            echo "Error al preparar la consulta\n";
        }
    }

    echo "Actualización exitosa";
} else {
    echo "Error en la decodificación JSON o datos no válidos\n";
}
?>
