import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { View, Text, Button, TouchableOpacity, ScrollView, TextInput, Image, RefreshControl, Alert, StatusBar, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Menu from '../../styles/menu.js';
import { estilosRotina } from './style.js';
import estilosFontes from '../../styles/fonts.js';
import { showMessage } from 'react-native-flash-message';
import api from '../../../services/api';
import PushNotification from 'react-native-push-notification';
import * as Notifications from 'expo-notifications';
import * as Animatable from 'react-native-animatable';

import { DateTimePickerAndroid, TimePickerAndroid } from '@react-native-community/datetimepicker';
import estilosCores from '../../styles/colors.js';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Load from '../../components/Load';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';

//definindo manipulador para as notificações quando app está em primeiro plano
//exige som, badge(símbolo do app) e pop-up quando notificação é recebida
//prioridade define se notificação é fixa ou não
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowAlert: true,
        //priority: 'high',
    }),
});


export default function Rotina({ navigation }) {

    // useEffect(()=>{
    //     CarregarRotina();
    // },[]);

    //https://ibb.co/jkgKYwk
    //https://ibb.co/j6GBSgV
    //https://ibb.co/3CbsGNZ
    //https://ibb.co/k5GX7kg

    //variavel que seta valor inicial do datetimepicker
    const [data, setData] = useState(new Date());
    //variavel que guarda nome da tarefa selecionada
    const [tarefa, setTarefa] = useState("");
    //variavel que define display da tela de seleção
    const [selecao, setSelecao] = useState(false);

    const [img, setImg] = useState('https://ibb.co/jkgKYwk');

    //variaveis que guardam imagem e descricao das tarefas 
    const [s1, setS1] = useState([img, 'zero']);
    const [s2, setS2] = useState([img, 'zero']);
    const [s3, setS3] = useState([img, 'zero']);
    const [s4, setS4] = useState([img, 'zero']);
    const [s5, setS5] = useState([img, 'zero']);
    const [t1, setT1] = useState([img, 'zero']);
    const [t2, setT2] = useState([img, 'zero']);
    const [t3, setT3] = useState([img, 'zero']);
    const [t4, setT4] = useState([img, 'zero']);
    const [t5, setT5] = useState([img, 'zero']);
    const [q1, setQ1] = useState([img, 'zero']);
    const [q2, setQ2] = useState([img, 'zero']);
    const [q3, setQ3] = useState([img, 'zero']);
    const [q4, setQ4] = useState([img, 'zero']);
    const [q5, setQ5] = useState([img, 'zero']);
    const [qi1, setQi1] = useState([img, 'zero']);
    const [qi2, setQi2] = useState([img, 'zero']);
    const [qi3, setQi3] = useState([img, 'zero']);
    const [qi4, setQi4] = useState([img, 'zero']);
    const [qi5, setQi5] = useState([img, 'zero']);
    const [sx1, setSx1] = useState([img, 'zero']);
    const [sx2, setSx2] = useState([img, 'zero']);
    const [sx3, setSx3] = useState([img, 'zero']);
    const [sx4, setSx4] = useState([img, 'zero']);
    const [sx5, setSx5] = useState([img, 'zero']);
    const [sa1, setSa1] = useState([img, 'zero']);
    const [sa2, setSa2] = useState([img, 'zero']);
    const [sa3, setSa3] = useState([img, 'zero']);
    const [sa4, setSa4] = useState([img, 'zero']);
    const [sa5, setSa5] = useState([img, 'zero']);
    const [d1, setD1] = useState([img, 'zero']);
    const [d2, setD2] = useState([img, 'zero']);
    const [d3, setD3] = useState([img, 'zero']);
    const [d4, setD4] = useState([img, 'zero']);
    const [d5, setD5] = useState([img, 'zero']);

    //data selecionada no datetimepicker (para testes)
    const [data_selec, setData_selec] = useState(new Date(Date.now()));

    //variavel que abre e fecha o input de alarme
    const [show, setShow] = useState(false);

    const [hora, setHora] = useState('00:00');
    const [horarios, setHorarios] = useState([
        ['00:00', '00:00', '00:00', '00:00', '00:00'],
        ['00:00', '00:00', '00:00', '00:00', '00:00'],
        ['00:00', '00:00', '00:00', '00:00', '00:00'],
        ['00:00', '00:00', '00:00', '00:00', '00:00'],
        ['00:00', '00:00', '00:00', '00:00', '00:00'],
        ['00:00', '00:00', '00:00', '00:00', '00:00'],
        ['00:00', '00:00', '00:00', '00:00', '00:00'],
    ]);

    //FUNÇÕES===================================================================================================================================

    //função que atribui horário para uma tarefa
    const onChange = (event, selectedDate) => {
        //convertendo horário do datetimepicker para string
        const h = selectedDate.toLocaleTimeString('pt-BR', {
            //timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            minute: '2-digit',
        })

        //definindo local exato do array de horarios a partir da tarefa selecionada
        const novoH = horarios;
        switch (tarefa) {
            //segunda
            case "s1":
                novoH[0][0] = h;
                break;
            case "s2":
                novoH[0][1] = h;
                break;
            case "s3":
                novoH[0][2] = h;
                break;
            case "s4":
                novoH[0][3] = h;
                break;
            case "s5":
                novoH[0][4] = h;
                break;
            //terca
            case "t1":
                novoH[1][0] = h;
                break;
            case "t2":
                novoH[1][1] = h;
                break;
            case "t3":
                novoH[1][2] = h;
                break;
            case "t4":
                novoH[1][3] = h;
                break;
            case "t5":
                novoH[1][4] = h;
                break;
            //quarta
            case "q1":
                novoH[2][0] = h;
                break;
            case "q2":
                novoH[2][1] = h;
                break;
            case "q3":
                novoH[2][2] = h;
                break;
            case "q4":
                novoH[2][3] = h;
                break;
            case "q5":
                novoH[2][4] = h;
                break;
            //quinta
            case "qi1":
                novoH[3][0] = h;
                break;
            case "qi2":
                novoH[3][1] = h;
                break;
            case "qi3":
                novoH[3][2] = h;
                break;
            case "qi4":
                novoH[3][3] = h;
                break;
            case "qi5":
                novoH[3][4] = h;
                break;
            //sexta
            case "sx1":
                novoH[4][0] = h;
                break;
            case "sx2":
                novoH[4][1] = h;
                break;
            case "sx3":
                novoH[4][2] = h;
                break;
            case "sx4":
                novoH[4][3] = h;
                break;
            case "sx5":
                novoH[4][4] = h;
                break;
            //sabado
            case "sa1":
                novoH[5][0] = h;
                break;
            case "sa2":
                novoH[5][1] = h;
                break;
            case "sa3":
                novoH[5][2] = h;
                break;
            case "sa4":
                novoH[5][3] = h;
                break;
            case "sa5":
                novoH[5][4] = h;
                break;
            //domingo
            case "d1":
                novoH[6][0] = h;
                break;
            case "d2":
                novoH[6][1] = h;
                break;
            case "d3":
                novoH[6][2] = h;
                break;
            case "d4":
                novoH[6][3] = h;
                break;
            case "d5":
                novoH[6][4] = h;
                break;
        }
        setHorarios(novoH);

        //guardando horario em variavel e mudando hora inicial usada pelo datetimepicker
        setData(selectedDate);
        setHora(h);
        setShow(false);
        showMessage({
            message: `Horário registrado ${h}`,
            type: 'success',
            duration: 2000,
        });

    }

    //função que abre e fecha tela de seleção
    function abrirSelecao() {
        if (selecao == false) {
            setSelecao(true);
        }
        else if (selecao == true) {
            setSelecao(false);
        }
    }

    //função que atribui tarefa 
    function mudaTarefa(novaTarefa, desc) {
        nt = [novaTarefa, desc];

        switch (tarefa) {
            case "s1": setS1(nt);
                break;
            case "s2": setS2(nt);
                break;
            case "s3": setS3(nt);
                break;
            case "s4": setS4(nt);
                break;
            case "s5": setS5(nt);
                break;
            case "t1": setT1(nt);
                break;
            case "t2": setT2(nt);
                break;
            case "t3": setT3(nt);
                break;
            case "t4": setT4(nt);
                break;
            case "t5": setT5(nt);
                break;
            case "q1": setQ1(nt);
                break;
            case "q2": setQ2(nt);
                break;
            case "q3": setQ3(nt);
                break;
            case "q4": setQ4(nt);
                break;
            case "q5": setQ5(nt);
                break;
            case "qi1": setQi1(nt);
                break;
            case "qi2": setQi2(nt);
                break;
            case "qi3": setQi3(nt);
                break;
            case "qi4": setQi4(nt);
                break;
            case "qi5": setQi5(nt);
                break;
            case "sx1": setSx1(nt);
                break;
            case "sx2": setSx2(nt);
                break;
            case "sx3": setSx3(nt);
                break;
            case "sx4": setSx4(nt);
                break;
            case "sx5": setSx5(nt);
                break;
            case "sa1": setSa1(nt);
                break;
            case "sa2": setSa2(nt);
                break;
            case "sa3": setSa3(nt);
                break;
            case "sa4": setSa4(nt);
                break;
            case "sa5": setSa5(nt);
                break;
            case "d1": setD1(nt);
                break;
            case "d2": setD2(nt);
                break;
            case "d3": setD3(nt);
                break;
            case "d4": setD4(nt);
                break;
            case "d5": setD5(nt);
                break;
        }
        abrirSelecao();
    }

    //salva rotina no banco e ativa função de agendamento de notificações
    async function SalvarRotina() {
        //verifica se não existe input vazio
        const rotina = [s1, s2, s3, s4, s5, t1, t2, t3, t4, t5, q1, q2, q3, q4, q5, qi1, qi2, qi3, qi4, qi5, sx1, sx2, sx3, sx4, sx5, sa1, sa2, sa3, sa4, sa5, d1, d2, d3, d4, d5, horarios];
        const hasZero = rotina.some(subArray => subArray.some(item => item === 'zero'));
        if (hasZero) {
            showMessage({
                message: 'Erro ao salvar rotina',
                description: 'Preencha todas as tarefas ou horários',
                type: 'warning',
            });
            return;
        }



        //tentando enviar dados para api
        //objeto para tarefas e objeto para horarios
        try {
            const obj = {
                rotina: [s1, s2, s3, s4, s5, t1, t2, t3, t4, t5, q1, q2, q3, q4, q5, qi1, qi2, qi3, qi4, qi5, sx1, sx2, sx3, sx4, sx5, sa1, sa2, sa3, sa4, sa5, d1, d2, d3, d4, d5],
                horarios: horarios,
            }
            const res = await api.post("api_reclick/salvarRotina.php", obj);
            console.log(res);
            if (res.data.sucesso == true) {
                //passando horário de todas as tarefas para notificar
                rotinaFormatada = res.data.rotina;
                rotinaFormatada.forEach(tarefaFormatada => {
                    //passando dia, hora, minuto e descricao da tarefa
                    descFormatado = tarefaFormatada[0];
                    diaFormatado = tarefaFormatada[2];
                    horarioNaoFormatado = tarefaFormatada[1];
                    partes = horarioNaoFormatado.split(':');
                    horaFormatada = parseInt(partes[0]);
                    minutoFormatado = parseInt(partes[1]);
                    //chamando função que agenda notificação
                    //handleCallNotification(diaFormatado, horaFormatada, minutoFormatado, descFormatado);
                    //console.log(diaFormatado);
                });
                Alert.alert(res.data.mensagem);
                return;
            }
            else {
                Alert.alert(res.data.mensagem);
            }
        } catch (error) {
            Alert.alert('error');
        }
    }

    //consulta rotina no banco e guarda nos horarios
    async function CarregarRotina() {
        try {
            const res = await api.post("api_reclick/carregarRotina.php", {});
            console.log(res);

            if (res.data.sucesso == true) {
                //passando array de horarios consultados para as variáveis
                //horarioCarregado = res.data.alarmes;
                //setHorarios(horarioCarregado);
                //setHorarios(res.data.alarmes);
                //console.log(res.data.alarmes[1]);

                //transformando a porcaria do array de alarmes em um array apenas de arrays (apenas o primeiro item era mantido como um array, não sei por que cardas d'água)
                const alarmes = res.data.alarmes;
                const resultado = alarmes.map(item => Array.isArray(item) ? item : Object.values(item));
                setHorarios(resultado);

                //passando array de tarefas consultadas para as variáveis
                //isso guarda as imagens e as descrições consultadas no banco 
                setS1(res.data.rotina[0]);
                setS2(res.data.rotina[1]);
                setS3(res.data.rotina[2]);
                setS4(res.data.rotina[3]);
                setS5(res.data.rotina[4]);
                setT1(res.data.rotina[5]);
                setT2(res.data.rotina[6]);
                setT3(res.data.rotina[7]);
                setT4(res.data.rotina[8]);
                setT5(res.data.rotina[9]);
                setQ1(res.data.rotina[10]);
                setQ2(res.data.rotina[11]);
                setQ3(res.data.rotina[12]);
                setQ4(res.data.rotina[13]);
                setQ5(res.data.rotina[14]);
                setQi1(res.data.rotina[15]);
                setQi2(res.data.rotina[16]);
                setQi3(res.data.rotina[17]);
                setQi4(res.data.rotina[18]);
                setQi5(res.data.rotina[19]);
                setSx1(res.data.rotina[20]);
                setSx2(res.data.rotina[21]);
                setSx3(res.data.rotina[22]);
                setSx4(res.data.rotina[23]);
                setSx5(res.data.rotina[24]);
                setSa1(res.data.rotina[25]);
                setSa2(res.data.rotina[26]);
                setSa3(res.data.rotina[27]);
                setSa4(res.data.rotina[28]);
                setSa5(res.data.rotina[29]);
                setD1(res.data.rotina[30]);
                setD2(res.data.rotina[31]);
                setD3(res.data.rotina[32]);
                setD4(res.data.rotina[33]);
                setD5(res.data.rotina[34]);


                Alert.alert(res.data.mensagem);
                return;
            }
            else {
                Alert.alert(res.data.mensagem);
            }
        } catch (error) {
            Alert.alert('error');
        }
    }

    //função que busca tarefas para agendar notificações
    async function CarregarNotificacoes() {

        //buscando tarefas no banco 
        try {
            const res = await api.post("api_reclick/carregarNotificacoes.php", {});
            console.log(res);
            if (res.data.sucesso == true) {
                const notificacoes = res.data.notify;
                notificacoes.forEach(tarefa => {
                    console.log(tarefa)

                    handleCallNotification(tarefa.descricao, tarefa.hora, tarefa.data);
                });

            } else if (res.data.sucesso == false) {
                Alert.alert(res.data.mensagem);
            }
        }
        catch (error) {
            Alert.alert('error');
        }
    }

    //função que agenda notificação para cada tarefa
    async function handleCallNotification(descricao, horario, dia) {
        const diaSemana = {
            'Domingo': 0,
            'Segunda': 1,
            'Terça': 2,
            'Quarta': 3,
            'Quinta': 4,
            'Sexta': 5,
            'Sábado': 6,
        };
        const diaNotificacao = diaSemana[dia];
        const diaAtual = new Date().getDay();


        //se a tarefa for hoje agenda a notificação
        if (diaNotificacao == diaAtual) {
            //Alert.alert(diaNotificacao);

            //pedindo permissão para o usuário =====================================
            const { status } = await Notifications.getPermissionsAsync();

            //caso não permitido
            if (status != 'granted') {
                alert('Você não possui permissão para receber notificações');
                return;
            }
            //capturando token de permissão
            let token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);

            //enviando notificação
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: descricao,
                    body: horario,
                    data: {}
                },
                trigger: {
                    seconds: 1,
                    //repeats: true,
                },

            });
        }

        /*
         //const horaAtual = new Date().getHours();
        //const minutoAtual = new Date().getMinutes();
        //const diferencaDias = diaNotificacao - diaAtual;
        //const diferencaHoras = notificacao.hora - horaAtual;
        //const diferencaMinutos = notificacao.minuto - minutoAtual;
        // se o dia já passou
        if (diferencaDias < 0) {
            //torna diferença positiva (volta pro mesmo dia semana que vem)
            d = diferencaDias + 7;
        } else if (diferencaDias == 0) {
            d = 0;
        } else if (diferencaDias > 0) {
            d = diferencaDias;
        }

        //se hora já passou
        if (diferencaHoras < 0) {
            //volta para o horário correto
            h = horaAtual - Math.abs(diferencaHoras);
        }
        //se a hora é agora
        else if (diferencaHoras == 0) {
            h = 0;
        }
        //se a hora ainda não chegou
        else if (diferencaHoras > 0) {
            h = diferencaHoras;
        }

        //se os minutos já passaram
        if (diferencaMinutos < 0) {
            //volta para o minuto correto
            m = minutoAtual - Math.abs(diferencaMinutos);
        }
        //se os minutos são agora
        else if (diferencaMinutos == 0) {
            m = 0;
        }
        //se os minutos ainda não chegaram
        else if (diferencaMinutos > 0) {
            m = diferencaMinutos;
        }
        const segundos = d * 86400;
        const horaNotificacao = h * 3600 + m * 60;
        const segundosTotais = segundos + horaNotificacao;
        console.log([notificacao.dia, segundosTotais]);
        */
    }

    //função que cancela todas as notificações agendadas
    const cancelAllScheduledNotifications = async () => {
        const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
        scheduledNotifications.forEach((notification) => {
            Notifications.cancelScheduledNotificationAsync(notification.identifier);
        });
        showMessage({
            message: 'Notificações canceladas com sucesso',
            description: 'Salve a rotina novamente para ser notificado',
            type: 'success',
        });
    };

    //APP VISÍVEL===================================================================================================================================
    return (



        <View style={estilosRotina.container}>

            <ScrollView
                scrollEnabled
                contentContainerStyle={estilosRotina.scroll_content}
                style={estilosRotina.scroll}>

                {/*CABEÇALHO*/}
                <View style={estilosRotina.header} >
                    <Text style={[{ fontFamily: estilosFontes.heading, fontSize: 25, color: 'white' }]}>ROTINA SUSTENTÁVEL</Text>
                </View >

                <Text style={[estilosRotina.texto]}>Monte sua programação com tarefas saudáveis
                    para o meio ambiente e para você! </Text>

                {/*SCROLL DOS DIAS DA SEMANA */}
                <ScrollView horizontal
                    scrollEnabled
                    style={estilosRotina.scroll_dia}
                    contentContainerStyle={estilosRotina.scroll_dia_content}
                >
                    {/*SEGUNDA ======================================================================================================*/}
                    <SafeAreaView style={estilosRotina.container_dia}>
                        <Text style={estilosRotina.titulo_dia}>SEGUNDA-FEIRA</Text>

                        <SafeAreaView style={estilosRotina.lista_tarefas}>
                            <View /*SEG 01*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('s1'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: s1[0] }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('s1')}>
                                    <Text>{horarios[0][0]} </Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SEG 02*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('s2'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: s2[0] }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('s2')}>
                                    <Text>{horarios[0][1]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SEG 03*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('s3'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: s3[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('s3')}>
                                    <Text>{horarios[0][2]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SEG 04*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('s4'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: s4[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('s4')}>
                                    <Text>{horarios[0][3]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SEG 05*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('s5'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: s5[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('s5')}>
                                    <Text>{horarios[0][4]}</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </SafeAreaView>

                    {/*TERÇA ======================================================================================================*/}
                    <SafeAreaView style={estilosRotina.container_dia}>
                        <Text style={estilosRotina.titulo_dia}>TERÇA-FEIRA</Text>

                        <SafeAreaView style={estilosRotina.lista_tarefas}>
                            <View /*TER 01*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('t1'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: t1[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('t1')}>
                                    <Text>{horarios[1][0]} </Text>
                                </TouchableOpacity>
                            </View>

                            <View /*TER 02*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('t2'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: t2[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('t2')}>
                                    <Text>{horarios[1][1]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*TER 03*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('t3'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: t3[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('t3')}>
                                    <Text>{horarios[1][2]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*TER 04*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('t4'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: t4[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('t4')}>
                                    <Text>{horarios[1][3]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*TER 05*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('t5'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: t5[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('t5')}>
                                    <Text>{horarios[1][4]}</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </SafeAreaView>

                    {/*QUARTA ======================================================================================================*/}
                    <SafeAreaView style={estilosRotina.container_dia}>
                        <Text style={estilosRotina.titulo_dia}>QUARTA-FEIRA</Text>

                        <SafeAreaView style={estilosRotina.lista_tarefas}>
                            <View /*QUA 01*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('q1'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: q1[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('q1')}>
                                    <Text>{horarios[2][0]} </Text>
                                </TouchableOpacity>
                            </View>

                            <View /*QUA 02*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('q2'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: q2[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('q2')}>
                                    <Text>{horarios[2][1]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*QUA 03*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('q3'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: q3[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('q3')}>
                                    <Text>{horarios[2][2]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*QUA 04*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('q4'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: q4[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('q4')}>
                                    <Text>{horarios[2][3]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*QUA 05*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('q5'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: q5[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('q5')}>
                                    <Text>{horarios[2][4]}</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </SafeAreaView>

                    {/*QUINTA ======================================================================================================*/}
                    <SafeAreaView style={estilosRotina.container_dia}>
                        <Text style={estilosRotina.titulo_dia}>QUINTA-FEIRA</Text>

                        <SafeAreaView style={estilosRotina.lista_tarefas}>
                            <View /*QUI 01*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('qi1'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: qi1[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('qi1')}>
                                    <Text>{horarios[3][0]} </Text>
                                </TouchableOpacity>
                            </View>

                            <View /*QUI 02*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('qi2'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: qi2[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('qi2')}>
                                    <Text>{horarios[3][1]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*QUI 03*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('qi3'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: qi3[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('qi3')}>
                                    <Text>{horarios[3][2]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*QUI 04*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('qi4'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: qi4[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('qi4')}>
                                    <Text>{horarios[3][3]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*QUI 05*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('qi5'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: qi5[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('qi5')}>
                                    <Text>{horarios[3][4]}</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </SafeAreaView>

                    {/*SEXTA ======================================================================================================*/}
                    <SafeAreaView style={estilosRotina.container_dia}>
                        <Text style={estilosRotina.titulo_dia}>SEXTA-FEIRA</Text>

                        <SafeAreaView style={estilosRotina.lista_tarefas}>
                            <View /*SEX 01*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('sx1'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: sx1[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('sx1')}>
                                    <Text>{horarios[4][0]} </Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SEX 02*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('sx2'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: sx2[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('sx2')}>
                                    <Text>{horarios[4][1]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SEX 03*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('sx3'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: sx3[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('sx3')}>
                                    <Text>{horarios[4][2]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SEX 04*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('sx4'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: sx4[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('sx4')}>
                                    <Text>{horarios[4][3]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SEX 05*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('sx5'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: sx5[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('sx5')}>
                                    <Text>{horarios[4][4]}</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </SafeAreaView>

                    {/*SABADO ======================================================================================================*/}
                    <SafeAreaView style={estilosRotina.container_dia}>
                        <Text style={estilosRotina.titulo_dia}>SÁBADO</Text>

                        <SafeAreaView style={estilosRotina.lista_tarefas}>
                            <View /*SAB 01*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('sa1'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: sa1[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('sa1')}>
                                    <Text>{horarios[5][0]} </Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SAB 02*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('sa2'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: sa2[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('sa2')}>
                                    <Text>{horarios[5][1]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SAB 03*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('sa3'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: sa3[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('sa3')}>
                                    <Text>{horarios[5][2]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SAB 04*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('sa4'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: sa4[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('sa4')}>
                                    <Text>{horarios[5][3]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*SAB 05*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('sa5'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: sa5[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('sa5')}>
                                    <Text>{horarios[5][4]}</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </SafeAreaView>

                    {/*DOMINGO ======================================================================================================*/}
                    <SafeAreaView style={estilosRotina.container_dia}>
                        <Text style={estilosRotina.titulo_dia}>DOMINGO</Text>

                        <SafeAreaView style={estilosRotina.lista_tarefas}>
                            <View /*DOM 01*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('d1'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: d1[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('d1')}>
                                    <Text>{horarios[6][0]} </Text>
                                </TouchableOpacity>
                            </View>

                            <View /*DOM 02*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('d2'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: d2[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('d2')}>
                                    <Text>{horarios[6][1]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*DOM 03*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('d3'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: d3[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('d3')}>
                                    <Text>{horarios[6][2]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*DOM 04*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('d4'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: d4[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('d4')}>
                                    <Text>{horarios[6][3]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View /*DOM 05*/ style={estilosRotina.container_tarefa}>
                                <TouchableOpacity onPress={() => { abrirSelecao(); setTarefa('d5'); }} style={estilosRotina.icon_tarefa}>
                                    <Image style={estilosRotina.img_tarefa} source={{ uri: d5[0] }}></Image>
                                </TouchableOpacity>
                                <TouchableOpacity style={estilosRotina.btnData} onPress={() => setShow(true) + setTarefa('d5')}>
                                    <Text>{horarios[6][4]}</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </SafeAreaView>

                </ScrollView>

                {/* datepicktimer aparece se show == true, recebe valor inicial na const data e quando o horário é alterado executa função onChange */}
                {
                    show && (
                        <DateTimePicker
                            value={data}
                            mode='time'
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )
                }

                {/*BOTÃO DE SALVAR ROTINA*/}
                <TouchableOpacity style={estilosRotina.btnPrimary} onPress={() => { SalvarRotina() /* ; handleCallNotification() */ }}>
                    <Text style={{ fontFamily: estilosFontes.heading, color: 'white' }}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilosRotina.btnSecundary]} onPress={() => CarregarRotina()}>
                    <Text style={{ fontFamily: estilosFontes.heading, color: 'white' }}>Carregar</Text>
                </TouchableOpacity>

                {/* 
                <TouchableOpacity style={[estilosRotina.btnPrimary]} onPress={() => CarregarNotificacoes()}>
                    <Text style={{ fontFamily: estilosFontes.heading, color: 'white' }}>Notificar</Text>
                </TouchableOpacity>
                */}


                {/*
               <TouchableOpacity style={[estilosRotina.btnDanger]} onPress={cancelAllScheduledNotifications}>
                    <Text style={{ textAlign: 'center' }}>Cancelar notificações</Text>
                </TouchableOpacity>
               */}

                <SafeAreaView style={estilosRotina.tabelaTarefas}>
                    <Text style={{
                        fontFamily: estilosFontes.heading,
                        fontSize: 20,
                        color: 'white',
                        marginTop: 20,
                    }}>
                        Tarefas Disponíveis
                    </Text>

                    <View style={estilosRotina.linha_tabela}>
                        <Image style={estilosRotina.img_tabela} source={require('../../../assets/select_bike.png')}></Image>
                        <Text style={estilosRotina.texto_linha}>Andar de bicicleta ajuda a manter o físico em dia</Text>
                    </View>
                    <View style={estilosRotina.linha_tabela}>
                        <Image style={estilosRotina.img_tabela} source={require('../../../assets/select_vegan.png')}></Image>
                        <Text style={estilosRotina.texto_linha}>Refeições veganas diminuem as emissões de carbono</Text>
                    </View>
                    <View style={estilosRotina.linha_tabela}>
                        <Image style={estilosRotina.img_tabela} source={require('../../../assets/select_tree.png')}></Image>
                        <Text style={estilosRotina.texto_linha}>Plante uma árvore e ajude o meio ambiente</Text>
                    </View>
                    <View style={estilosRotina.linha_tabela}>
                        <Image style={estilosRotina.img_tabela} source={require('../../../assets/select_ecobag.png')}></Image>
                        <Text style={estilosRotina.texto_linha}>Reutilize bolsas de pano e evite o descarte de plástico</Text>
                    </View>
                    <View style={estilosRotina.linha_tabela}>
                        <Image style={estilosRotina.img_tabela} source={require('../../../assets/select_reciclar.png')}></Image>
                        <Text style={estilosRotina.texto_linha}>Separe o lixo da sua residência para coleta seletiva</Text>
                    </View>
                    <View style={estilosRotina.linha_tabela}>
                        <Image style={estilosRotina.img_tabela} source={require('../../../assets/select_compostagem.png')}></Image>
                        <Text style={estilosRotina.texto_linha}>Alimente sua composteira com material orgânico para suas plantas</Text>
                    </View>
                    <View style={estilosRotina.linha_tabela}>
                        <Image style={estilosRotina.img_tabela} source={require('../../../assets/select_exercicio.png')}></Image>
                        <Text style={estilosRotina.texto_linha}>Alongue-se e pratique qualquer exercício físico para estimular seu corpo</Text>
                    </View>
                    <View style={estilosRotina.linha_tabela}>
                        <Image style={estilosRotina.img_tabela} source={require('../../../assets/select_organico.png')}></Image>
                        <Text style={estilosRotina.texto_linha}>Compre um produto com selo de origem orgânica e ajude a causa</Text>
                    </View>

                </SafeAreaView>

                <Text style={{ marginTop: 100, }}>Limite página</Text>

            </ScrollView>

            {/*CAIXA DE SELEÇÃO ================================================================================================================================================== */}
            <Animatable.View
                animation={(selecao == true) ? 'fadeInUp' : ''}
                //iterationCount={1}
                style={[estilosRotina.container_select, { display: selecao == true ? 'flex' : 'none' }]}>
                {/*SETA QUE FECHA CAIXA DE SELEÇÃO */}
                <TouchableOpacity onPress={() => abrirSelecao()}>
                    <Image source={require('../../../assets/btn_close_select.png')} style={{ width: 60, height: 35, marginLeft: 150, marginRight: 150, marginBottom: 25 }}></Image>
                </TouchableOpacity >

                {/*ANDAR DE BICICLETA*/}
                <TouchableOpacity onPress={() => mudaTarefa(/*require('../../../assets/select_bike.png')*/'https://i.ibb.co/fd4RWNd/select-bike.png', 'Andar de bicicleta')}>
                    <Image source={require('../../../assets/select_bike.png')} style={estilosRotina.img_select}></Image>
                </TouchableOpacity>
                {/*REFEIÇÃO VEGANA*/}
                <TouchableOpacity onPress={() => mudaTarefa(/*require('../../../assets/select_vegan.png')*/'https://i.ibb.co/vVckFgx/select-vegan.png', 'Refeição vegana')}>
                    <Image source={require('../../../assets/select_vegan.png')} style={estilosRotina.img_select}></Image>
                </TouchableOpacity>
                {/*PLANTAR ÁRVORE*/}
                <TouchableOpacity onPress={() => mudaTarefa(/*require('../../../assets/select_tree.png')*/'https://i.ibb.co/TgGTp83/select-tree.png', 'Plantar uma árvore')}>
                    <Image source={require('../../../assets/select_tree.png')} style={estilosRotina.img_select}></Image>
                </TouchableOpacity>
                {/*ECOBAG*/}
                <TouchableOpacity onPress={() => mudaTarefa(/*require('../../../assets/select_ecobag.png')*/'https://i.ibb.co/2nPmTg8/select-ecobag.png', 'Usar ecobag')}>
                    <Image source={require('../../../assets/select_ecobag.png')} style={estilosRotina.img_select}></Image>
                </TouchableOpacity>
                {/*RECICLAGEM*/}
                <TouchableOpacity onPress={() => mudaTarefa('https://i.ibb.co/V91Sn3r/reciclar.png', 'Reciclar')}>
                    <Image source={require('../../../assets/select_reciclar.png')} style={estilosRotina.img_select}></Image>
                </TouchableOpacity>
                {/*COMPOSTAGEM*/}
                <TouchableOpacity onPress={() => mudaTarefa('https://i.ibb.co/1LMhfLq/select-compostagem.png', 'Fazer compostagem')}>
                    <Image source={require('../../../assets/select_compostagem.png')} style={estilosRotina.img_select}></Image>
                </TouchableOpacity>
                {/*EXERCÍCIO*/}
                <TouchableOpacity onPress={() => mudaTarefa('https://i.ibb.co/6443cGh/select-exercicio.png', 'Fazer exercício')}>
                    <Image source={require('../../../assets/select_exercicio.png')} style={estilosRotina.img_select}></Image>
                </TouchableOpacity>
                {/*ECONOMIZA ÁGUA*/}
                <TouchableOpacity onPress={() => mudaTarefa('https://i.ibb.co/sFWkXrk/select-organico.png', 'Comprar orgânico')}>
                    <Image source={require('../../../assets/select_organico.png')} style={estilosRotina.img_select}></Image>
                </TouchableOpacity>
            </Animatable.View>

            {/* MENU INFERIOR */}
            <Menu />

        </View>
    )
}
