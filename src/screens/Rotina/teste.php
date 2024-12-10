<?php
$horarios = [[1,2,3,4,5],[6,7,8,9,10]];

foreach($horarios as $key => $dia){
    foreach($dia as $key => $hora){
        $i = 0;
        $rotinaFormatada[$i] = $hora;
        $i++;
    }
}

var_dump($rotinaFormatada);