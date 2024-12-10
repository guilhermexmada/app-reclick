<?php
//ATUALIZA OS DADOS DO USUÁRIO LOGADO COM NOVOS DADOS
session_start();
include_once('conexao.php');
$postjson = json_decode(file_get_contents("php://input"), true);
$tabela = 'usuarios';

$nome = @$postjson['nome'];
$senha = @$postjson['senha'];
$telefone = @$postjson['telefone'];
$endereco = @$postjson['endereco'];



if (isset($_SESSION['id_logado'])) {

  $id_logado = $_SESSION['id_logado'];

  //print_r([$nome, $senha, $telefone, $endereco]);

  $res = $pdo->prepare("UPDATE $tabela SET nome = :nome, senha = :senha, telefone = :telefone, endereco = :endereco WHERE id = :id_logado ");

  $res->bindValue(":nome", "$nome");
  $res->bindValue(":senha", "$senha");
  $res->bindValue(":telefone", "$telefone");
  $res->bindValue(":endereco", "$endereco");
  $res->bindValue(":id_logado", "$id_logado");

  print_r($res);

  $res->execute();

  $result = json_encode(array('mensagem' => 'Atualização foi bem sucedida!', 'sucesso' => true));
} else {
  $result = json_encode(array('mensagem' => 'Erro! Não foi possível atualizar', 'sucesso' => false));
}

echo $result;
