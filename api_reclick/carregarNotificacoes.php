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

     //passando array com DESCRIÇÃO, DATA e HORA
     $i = 0;
     foreach($consulta as $key => $tarefa){
        $notify[$i]['descricao'] = $tarefa['descricao'];
        $notify[$i]['data'] = $tarefa['data_alarme'];
        $notify[$i]['hora'] = $tarefa['hora_alarme'];
        $i++;
     }

     $result =  json_encode(array('mensagem' => 'Notificações carregadas', 'notify' => $notify, 'sucesso' => true));
}
else{
    $result =  json_encode(array('mensagem' => 'Erro ao carregar notificações', 'notify' => [], 'sucesso' => false));

}

echo $result;