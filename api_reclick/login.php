<?php
//LOGIN
//VERIFICAR SE EMAIL E SENHA EXISTEM NO BANCO E CRIAR VAR GLOBAL COM O IDENTIFICADOR

session_start();
require_once("conexao.php");
$tabela = 'usuarios';
$postjson = json_decode(file_get_contents('php://input'), true);

$email = @$postjson['email'];
$senha = @$postjson['senha'];


//comando SQL que verifica se já existe id do usuário pelo email e senha
$query = $pdo->query("SELECT id FROM $tabela WHERE email = '$email' AND senha = '$senha'");
$res = $query->fetchAll(PDO::FETCH_ASSOC);

//se já existe, realiza login e salva id do usuário para ser usado como token 
if(count($res) == 1){
    $result = json_encode(array('mensagem'=>'Seu login foi bem sucedido!', 'id_log' => $res[0]['id'], 'sucesso'=>true));
    $_SESSION['id_logado'] = $res[0]['id'];
}
else{
    $result = json_encode(array('mensagem'=>'Email ou senha inválidos', 'sucesso'=>false));
}
echo $result; 




?>