<?php

require_once("conexao.php");
session_start();

$postjson = json_decode(file_get_contents('php://input'), true);

$tabela = 'tarefas';
$rotina = @$postjson['rotina'];
$horarios = @$postjson['horarios'];

//print_r($horarios);

if (isset($_SESSION['id_logado'])) {
    $id_usuario_tarefa = $_SESSION['id_logado'];
    //tratando do array interior horarios
    //guardando cada hora em seu respectivo array
    $i = 0;
    foreach ($horarios as $key => $dia) {
        foreach ($dia as $key => $hora) {
            $rotinaFormatada[$i][1] = $hora;
            $i++;
        }
    }


    //tratando arrays com nomes das tarefas
    //guardando cada descrição em seu respectivo array
    $z = 0;
    foreach ($rotina as $key => $tarefa) {
        $descricao = end($tarefa);
        $rotinaFormatada[$z][0] = $descricao;
        $z++;
    }




    //rotina formatada -> lista de arrays (tarefas) com dois valores (nome e hora)


    //verificando se existe alguma tarefa id do usuario salva no banco para substituir pela nova rotina
    $query = $pdo->query("SELECT * FROM $tabela WHERE id_usuario_tarefa = '$id_usuario_tarefa' ");
    $consulta = $query->fetchAll(PDO::FETCH_ASSOC);
    if (count($consulta) > 0) {
        $delete = $pdo->prepare("DELETE FROM $tabela WHERE id_usuario_tarefa = '$id_usuario_tarefa' ");
        $delete->execute();
    }

    //salvando rotina formatada no banco de dados na tabela tarefas
    $x = 0;
    foreach ($rotinaFormatada as $key => $tarefa) {
        //definindo valores de data, hora, descrição + id do usuario

        //para cada 5 tarefas, atribui um dia da semana
        if ($x < 5) {
            $data_alarme = 'Segunda';
        } else if ($x >= 5 && $x < 10) {
            $data_alarme = 'Terça';
        } else if ($x >= 10 && $x < 15) {
            $data_alarme = 'Quarta';
        } else if ($x >= 15 && $x < 20) {
            $data_alarme = 'Quinta';
        } else if($x >= 20 && $x < 25){
            $data_alarme = 'Sexta';
        } else if($x >= 25 && $x < 30){
            $data_alarme = 'Sábado';
        } else if($x >= 30 && $x <35){
            $data_alarme = 'Domingo';
        }

        //para cada tarefa captura uma descrição e um horário
        $descricao = $rotinaFormatada[$x][0];
        $hora_alarme = $rotinaFormatada[$x][1];

        //criando parte dos dias da semana na rotina formatada
        $rotinaFormatada[$x][2] = $data_alarme;

        //inserindo tarefas no banco de dados
        $res = $pdo->prepare("INSERT INTO $tabela SET id_usuario_tarefa = :id_usuario_tarefa ,descricao = :descricao, hora_alarme = :hora_alarme, data_alarme = :data_alarme");
        $res->bindValue(":descricao", "$descricao");
        $res->bindValue(":hora_alarme", "$hora_alarme");
        $res->bindValue(":data_alarme", "$data_alarme");
        $res->bindValue(":id_usuario_tarefa", "$id_usuario_tarefa");
        $res->execute();

        $x++;
    }

    //print_r($rotinaFormatada);

    $result = json_encode(array('mensagem' => 'Sua rotina foi salva ', 'sucesso' => true, 'rotina' => $rotinaFormatada));
    echo $result;
} else {
    $result = json_encode(array('mensagem' => 'Falha ao salvar sua rotina ', 'sucesso' => false, 'rotina' => 'nada'));
    echo $result;
}
