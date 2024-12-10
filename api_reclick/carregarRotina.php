<?php

require_once("conexao.php");

session_start();

$postjson = json_decode(file_get_contents('php://input'), true);

$tabela = 'tarefas';


if (isset($_SESSION['id_logado'])) {
    //realizando consulta das tarefas com base no id do usuário logado
    $id_usuario_tarefa = $_SESSION['id_logado'];
    $query = $pdo->query("SELECT * FROM $tabela WHERE id_usuario_tarefa = '$id_usuario_tarefa' ");
    $consulta = $query->fetchAll(PDO::FETCH_ASSOC);


    //desfazendo consulta em array de tarefas(imagem+descricao) e array de alarmes
    $p = 0;
    $z = 0;
    foreach ($consulta as $key => $tarefa) {

        //definindo o caminho da imagem de acordo com a descrição das tarefas
        if ($tarefa['descricao'] == 'Andar de bicicleta') {
            $caminho = 'https://i.ibb.co/fd4RWNd/select-bike.png';
        } else if ($tarefa['descricao'] == 'Refeição vegana') {
            $caminho = 'https://i.ibb.co/vVckFgx/select-vegan.png';
        } else if ($tarefa['descricao'] == 'Plantar uma árvore') {
            $caminho = 'https://i.ibb.co/TgGTp83/select-tree.png';
        } else if ($tarefa['descricao'] == 'Usar ecobag') {
            $caminho = 'https://i.ibb.co/2nPmTg8/select-ecobag.png';
        } else if ($tarefa['descricao'] == 'Reciclar') {
            $caminho = 'https://i.ibb.co/V91Sn3r/reciclar.png';
        } else if ($tarefa['descricao'] == 'Fazer compostagem') {
            $caminho = 'https://i.ibb.co/1LMhfLq/select-compostagem.png';
        } else if ($tarefa['descricao'] == 'Fazer exercício') {
            $caminho = 'https://i.ibb.co/6443cGh/select-exercicio.png';
        } else if ($tarefa['descricao'] == 'Comprar orgânico') {
            $caminho = 'https://i.ibb.co/sFWkXrk/select-organico.png';
        }else {
            $caminho = 'a';
        }

        //criando array com caminho de imagem, nome da tarefa e id o usuario
        $rotina[$z][0] = $caminho;
        $rotina[$z][1] = $tarefa['descricao'];

        //criando array de horarios (cada array interior é um dia com 5 horarios)
        if ($z < 5) {
            $alarmes[0][$p] = $tarefa['hora_alarme'];
        } else if ($z >= 5 && $z < 10) {
            $alarmes[1][$p] = $tarefa['hora_alarme'];
        } else if ($z >= 10 && $z < 15) {
            $alarmes[2][$p] = $tarefa['hora_alarme'];
        } else if ($z >= 15 && $z < 20) {
            $alarmes[3][$p] = $tarefa['hora_alarme'];
        } else if ($z >= 20 && $z < 25) {
            $alarmes[4][$p] = $tarefa['hora_alarme'];
        } else if ($z >= 25 && $z < 30) {
            $alarmes[5][$p] = $tarefa['hora_alarme'];
        } else if ($z >= 30 && $z < 35) {
            $alarmes[6][$p] = $tarefa['hora_alarme'];
        }

        $z++;
        $p++;
    }


    $result =  json_encode(array('mensagem' => 'rotina carregada', 'sucesso' => true, 'rotina' => $rotina, 'alarmes' => $alarmes));
    echo $result;
} else {
    $result = json_encode(array('mensagem' => 'falha ao carregar rotina', 'sucesso' => false, 'rotina' => [], 'alarmes' => []));
    echo $result;
}
