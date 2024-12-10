<?php
//BUSCA DADOS DO USUÁRIO PARA EXIBIR NAS CONFIGURAÇÕES

session_start();
require_once("conexao.php");
$tabela = 'usuarios';
$postjson = json_decode(file_get_contents('php://input'), true);

if (isset($_SESSION['id_logado'])) {

    $id_logado = $_SESSION['id_logado'];

    //comando SQL que consulta tudo do usuário logado
    $query = $pdo->query("SELECT * FROM $tabela WHERE id = '$id_logado';");
    $res = $query->fetchAll(PDO::FETCH_ASSOC);

    $result = json_encode(array('mensagem'=> 'Dados consultados', 'nome' => $res[0]['nome'], 'senha' => $res[0]['senha'], 'email' => $res[0]['email'], 'endereco'=> $res[0]['endereco'], 'telefone' => $res[0]['telefone'], 'sucesso' => true));
} else {
    $result = json_encode(array('mensagem' => 'Erro! Dados não encontrados', 'sucesso' => false));
}
echo $result;
