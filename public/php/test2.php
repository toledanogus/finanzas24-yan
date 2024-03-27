<?php
require 'coneccion.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);

/* require 'switch.php'; */
//$respuesta = mysqli_query($conn, "SELECT comida, garrafones, despensa, ahorro, gas, luz, psic, agua, Yansen, Gustavo FROM 01generales WHERE tipoquincena= '".$x->tipo."'");
$respuesta = mysqli_query($conn, "SELECT Concepto, pagado FROM conceptosyan WHERE QuincenaID = 8");

$row = mysqli_fetch_all($respuesta);
//echo $row;
echo json_encode ($row, JSON_NUMERIC_CHECK);
?>