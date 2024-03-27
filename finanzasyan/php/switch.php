<?php
$quin = 0;
switch ($x -> quincena) {
    case "1Enero":
        $quin = 1;
        break;
    case "2Enero":
        $quin = 2;
        break;
    case "1Febrero":
        $quin = 3;
        break;
    case "2Febrero":
        $quin = 4;
        break;
    case "1Marzo":
        $quin = 5;
        break;
    case "2Marzo":
        $quin = 6;
        break;
    case "1Abril":
        $quin = 7;
        break;
    case "2Abril":
        $quin = 8;
        break;
    case "1Mayo":
        $quin = 9;
        break;
    case "2Mayo":
        $quin = 10;
        break;
    case "1Junio":
        $quin = 11;
        break;
    case "2Junio":
        $quin = 12;
        break;
    case "1Julio":
        $quin = 13;
        break;
    case "2Julio":
        $quin = 14;
        break;
    case "1Agosto":
        $quin = 15;
        break;
    case "2Agosto":
        $quin = 16;
        break;
    case "1Septiembre":
        $quin = 17;
        break;
    case "2Septiembre":
        $quin = 18;
        break;
    case "1Octubre":
        $quin = 19;
        break;
    case "2Octubre":
        $quin = 20;
        break;
    case "1Noviembre":
        $quin = 21;
        break;
    case "2Noviembre":
        $quin = 22;
        break;
    case "1Diciembre":
        $quin = 23;
        break;
    case "2Diciembre":
        $quin = 24;
        break;
    default:
        // Valor predeterminado si no coincide con ninguna quincena conocida
        $quin = 0;
}
?>