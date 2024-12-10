<?php
require_once("conexao.php");
$tabela = 'usuarios';

$postjson = json_decode(file_get_contents('php://input'), true);

$nome = @$postjson['nome'];
$email = @$postjson['email'];
$senha = @$postjson['senha'];
$telefone = @$postjson['telefone'];
$endereco = @$postjson['endereco'];

//consulta que verifica se o email inserido já existe
$query = $pdo->query("SELECT id FROM $tabela WHERE email = '$email'");
$ver = $query->fetchAll(PDO::FETCH_ASSOC);

//se existir exibe mensagem de erro, se não cadastra usuário novo e em seguida realiza login
if (count($ver) == 1) {
    $result = json_encode(array('mensagem' => 'Email já existe!', 'sucesso' => false));
    echo $result;
} else {
    $res = $pdo->prepare("INSERT INTO $tabela SET nome = :nome, email = :email, senha = :senha, telefone = :telefone, endereco = :endereco");


    $res->bindValue(":nome", "$nome");
    $res->bindValue(":email", "$email");
    $res->bindValue(":senha", "$senha");
    $res->bindValue(":telefone", "$telefone");
    $res->bindValue(":endereco", "$endereco");

    $res->execute();

    $forID = $pdo->query("SELECT id FROM $tabela WHERE email = '$email' AND senha = '$senha'");
    $sea = $forID->fetchAll(PDO::FETCH_ASSOC);

    $result = json_encode(array('mensagem' => 'Seu cadastro foi bem sucedido!', 'id_log' => $sea[0]['id'], 'sucesso' => true));

    
    echo $result;
}

//echo $_SESSION['id_logado'];



/*
try{
    $res->execute();
}
catch(Error){

}
*/
