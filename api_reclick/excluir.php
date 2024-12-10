<?php
//DESLOGA O USUÁRIO E APAGA O REGISTRO NO BANCO DE DADOS

session_start();
include_once('conexao.php');
$postjson = json_decode(file_get_contents('php://input'), true);


$id_logado = $_SESSION['id_logado'];

//exclusão das tarefas veiculadas ao usuário
$qry = $pdo->prepare("DELETE from tarefas where id_usuario_tarefa = :id");
$qry->bindParam(':id', $id_logado);
$res1 = $qry->execute();

//exclusão da conta deve ser após a exclusão das tarefas
$stmt = $pdo->prepare("DELETE from usuarios where id = :id");
$stmt->bindParam(':id', $id_logado);
$res2 = $stmt->execute();

if ($res2 && $res1) {
    session_destroy();
    $result = json_encode(array('mensagem' => 'Sua conta foi excluída com sucesso', 'sucesso' => true));
} else {
    $result = json_encode(array('mensagem' => 'Erro ao excluir conta', 'sucesso' => false));
}

echo $result;
