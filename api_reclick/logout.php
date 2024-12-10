<?php
//DESLOGA O USUÁRIO DESTRUINDO TOKEN DE LOGIN

session_start();
require_once("conexao.php");
$postjson = json_decode(file_get_contents('php://input'), true);

unset($_SESSION['id_logado']);
$result = json_encode(array('mensagem' => 'Você foi deslogado', 'sucesso' => true));

echo $result;

/*
if (isset($_SESSION['id_logado'])) {

    unset($_SESSION['id_logado']);


    $result = json_encode(array('mensagem' => 'Você foi deslogado', 'sucesso' => true));
} else {
    $result = json_encode(array('mensagem' => 'Erro! Não foi possível deslogar', 'sucesso' => false));
}
    */
