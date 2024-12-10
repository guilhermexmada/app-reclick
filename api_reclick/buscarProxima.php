<?php

require_once("conexao.php");

session_start();

$tabela = 'tarefas';

if (isset($_SESSION['id_logado'])) {

    //verificando dia da semana de hoje
    $dia_atual = intval(date('w'));
    //verificando hora e minuto atual
    $agora = date('H:i:00');
    $hora_atual = strtotime($agora);


    //realizando consulta da próxima tarefa 
    $id_usuario_tarefa = $_SESSION['id_logado'];
    $query = $pdo->query("SELECT data_alarme, descricao, hora_alarme FROM $tabela WHERE id_usuario_tarefa = '$id_usuario_tarefa' ");
    $consulta = $query->fetchAll(PDO::FETCH_ASSOC);

    //armazena menor diferença de horários em timestamp
    $contador_diferenca = null;

    //desfazendo consulta em array de tarefas(imagem+descricao) e array de alarmes
    foreach ($consulta as $key => $tarefa) {
        //mudando dia da semana da tarefa para formato numérico
        if ($tarefa['data_alarme'] == 'Domingo') {
            $ds = 0;
        } else if ($tarefa['data_alarme'] == 'Segunda') {
            $ds = 1;
        } else if ($tarefa['data_alarme'] == 'Terça') {
            $ds = 2;
        } else if ($tarefa['data_alarme'] == 'Quarta') {
            $ds = 3;
        } else if ($tarefa['data_alarme'] == 'Quinta') {
            $ds = 4;
        } else if ($tarefa['data_alarme'] == 'Sexta') {
            $ds = 5;
        } else if ($tarefa['data_alarme'] == 'Sábado') {
            $ds = 6;
        }
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
            $caminho = 'https://i.ibb.co/V91Sn3r/reciclar.png.';
        } else if ($tarefa['descricao'] == 'Fazer compostagem') {
            $caminho = 'https://i.ibb.co/1LMhfLq/select-compostagem.png';
        } else if ($tarefa['descricao'] == 'Fazer exercício') {
            $caminho = 'https://i.ibb.co/6443cGh/select-exercicio.png';
        } else if ($tarefa['descricao'] == 'Comprar orgânico') {
            $caminho = 'https://i.ibb.co/sFWkXrk/select-organico.png';
        } else {
            $caminho = 'a';
        }

        //convertendo horas em timestamps
        $hora_tarefa = strtotime($tarefa['hora_alarme']);
        //calculando diferença de horário
        $dif = $hora_tarefa - $hora_atual;

        //se a tarefa é hoje e ainda não chegou a hora (diferença positiva)
        if ($dia_atual == $ds && $dif > 0) {
            //contador não iniciado, é a primeira tarefa da rodada
            if ($contador_diferenca == null) {
                //salva tarefa
                $contador_diferenca = $dif;
                $proximaTarefa = [
                    'imagem' => $caminho,
                    'descricao' => $tarefa['descricao'],
                    'dia_semana' => $tarefa['data_alarme'],
                    'hora' => $tarefa['hora_alarme'],
                ];
            }
            //ou se a diferença for menor que a do contador
            else if ($dif < $contador_diferenca) {
                //salva tarefa
                $contador_diferenca = $dif;
                $proximaTarefa = [
                    'imagem' => $caminho,
                    'descricao' => $tarefa['descricao'],
                    'dia_semana' => $tarefa['data_alarme'],
                    'hora' => $tarefa['hora_alarme'],
                ];
            }
        }
        //caso todas as tarefas de hoje tenham passado (todas as diferenças sejam negativas)
        //se hoje é sábado (6) preciso pegar as tarefas de domingo (0)
        else if ($dia_atual == 6 && $ds == 0) {
            //contador não iniciado, é a primeira tarefa da rodada
            if ($contador_diferenca == null) {
                //salva tarefa e coloca horário em timestamp no contador
                $contador_diferenca = $hora_tarefa;
                $proximaTarefa = [
                    'imagem' => $caminho,
                    'descricao' => $tarefa['descricao'],
                    'dia_semana' => $tarefa['data_alarme'],
                    'hora' => $tarefa['hora_alarme'],
                ];
            }
            //ou se o horário for menor que a do contador
            else if ($hora_tarefa < $contador_diferenca) {
                //salva tarefa e coloca horário em timestamp no contador
                $contador_diferenca = $hora_tarefa;
                $proximaTarefa = [
                    'imagem' => $caminho,
                    'descricao' => $tarefa['descricao'],
                    'dia_semana' => $tarefa['data_alarme'],
                    'hora' => $tarefa['hora_alarme'],
                ];
            }
        } 
        //se não tem mais tarefas hoje e se não estiver virando a semana, pega a tarefa de amanhã msm
        else if ($ds == ($dia_atual + 1)) {
            //contador não iniciado, é a primeira tarefa da rodada
            if ($contador_diferenca == null) {
                //salva tarefa e coloca horário em timestamp no contador
                $contador_diferenca = $hora_tarefa;
                $proximaTarefa = [
                    'imagem' => $caminho,
                    'descricao' => $tarefa['descricao'],
                    'dia_semana' => $tarefa['data_alarme'],
                    'hora' => $tarefa['hora_alarme'],
                ];
            }
            //ou se o horário for menor que a do contador
            else if ($hora_tarefa < $contador_diferenca) {
                //salva tarefa e coloca horário em timestamp no contador
                $contador_diferenca = $hora_tarefa;
                $proximaTarefa = [
                    'imagem' => $caminho,
                    'descricao' => $tarefa['descricao'],
                    'dia_semana' => $tarefa['data_alarme'],
                    'hora' => $tarefa['hora_alarme'],
                ];
            }
        }
    }

    $result = json_encode(array('sucesso' => true, 'imagem' => $proximaTarefa['imagem'], 'descricao' => $proximaTarefa['descricao'], 'dia' => $proximaTarefa['dia_semana'], 'hora' => $proximaTarefa['hora']));
    echo $result;
} else {
    $result = json_encode(array('sucesso' => false));
    echo $result;
}
