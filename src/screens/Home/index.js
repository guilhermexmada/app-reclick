import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, TextInput, Image, RefreshControl, Alert, StatusBar, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';


import Rotina from '../Rotina/index.js';
import Menu from '../../styles/menu.js';
import { estilosHome } from './style.js';
import estilosCores from '../../styles/colors.js';
import estilosFontes from '../../styles/fonts.js';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

import axios from 'axios';
import api from '../../../services/api';
import Load from '../../components/Load';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/core';
import { BounceIn } from 'react-native-reanimated';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowAlert: true,
        //priority: 'high',
    }),
});

export default function Home({ navigation }) {

    //variáveis da próxima tarefa
    const [img, setImg] = useState('a');
    const [descricao, setDescricao] = useState('carregando');
    const [horario, setHorario] = useState('00:00:00');
    const [dia, setDia] = useState('carregando');
    const [ultimaHora, setUltimaHora] = useState('00:00:00');

    //buscando próxima tarefa a todo momento
    useEffect(() => {
        const intervalId = setInterval(buscarProxTarefa, 60000); // execute a função a cada 1 minuto
        return () => clearInterval(intervalId);
    }, []);

    //função que busca a próxima tarefa
    async function buscarProxTarefa() {
        const res = await api.post("api_reclick/buscarProxima.php", {});
        console.log(res);
        if (res.data.sucesso == true) {
            setImg(res.data.imagem);
            setDescricao(res.data.descricao);
            setHorario(res.data.hora);
            setDia(res.data.dia);
            //verificando se o horário mudou (nova próxima tarefa)
            //caso tenha mudado, agendar notificação
            if (res.data.hora != ultimaHora) {
                setUltimaHora(horario);
                handleCallNotification(res.data.descricao, res.data.hora, res.data.dia);
            }
            //Alert.alert(res.data.hora + " - " + ultimaHora);
        }
    }


    //função que agenda notificação quando a próxima tarefa muda
    async function handleCallNotification(descricao, horario, dia) {

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


    return (
        <View style={estilosHome.container}>
            <ScrollView
                scrollEnabled
                contentContainerStyle={estilosHome.scroll_content}
                style={estilosHome.scroll}>

                {/*CABEÇALHO*/}
                <View style={estilosHome.header} >
                    <Text style={{
                        fontFamily: estilosFontes.heading,
                        fontSize: estilosFontes.heading_size,
                        color: 'white'
                    }}>HOME</Text>
                </View >



                {/* PROXIMA TAREFA*/}
                <SafeAreaView style={estilosHome.subContainer}>

                    <Animatable.View animation="bounceIn" style={estilosHome.square}>
                        <Image style={estilosHome.img_square} source={{ uri: img }}></Image>
                    </Animatable.View>

                    <View style={estilosHome.info_prox_tarefa}>
                        <Text style={{ fontFamily: estilosFontes.heading, }}>Sua próxima tarefa</Text>
                        <Text style={estilosHome.titulo}>{descricao}</Text>
                        <Text style={estilosHome.texto}>{dia} - {horario}</Text>
                        {/*
                         <TouchableOpacity style={[estilosHome.btnPrimary, { width: 130, height: 40 }]}>
                            <Text style={{ fontFamily: estilosFontes.heading, color: 'white' }}>Marcar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilosHome.btnCancel}>
                            <Text style={{ fontFamily: estilosFontes.heading, color: 'white' }}>Cancelar</Text>
                        </TouchableOpacity>
                        */}

                    </View>
                </SafeAreaView>

                {/*CONQUISTAS */}
                <SafeAreaView
                    style={[estilosHome.subContainer2, { height: 'auto' }]}>
                    <Text style={{ fontFamily: estilosFontes.heading, fontSize: 20, margin: 10 }}>Legenda das lixeiras</Text>
                    <View style={estilosHome.quest}>
                        <Image
                            source={require('../../../assets/plastico.png')}
                            style={estilosHome.quest_icon}></Image>
                        <Text style={estilosHome.quest_name}>Plástico</Text>
                    </View>
                    <View style={estilosHome.quest}>
                        <Image
                            source={require('../../../assets/papelao.png')}
                            style={estilosHome.quest_icon}></Image>
                        <Text style={estilosHome.quest_name}>Papel e Papelão</Text>
                    </View>
                    <View style={estilosHome.quest}>
                        <Image
                            source={require('../../../assets/metal.png')}
                            style={estilosHome.quest_icon}></Image>
                        <Text style={estilosHome.quest_name}>Metal</Text>
                    </View>
                    <View style={estilosHome.quest}>
                        <Image
                            source={require('../../../assets/vidro.png')}
                            style={estilosHome.quest_icon}></Image>
                        <Text style={estilosHome.quest_name}>Vidro</Text>
                    </View>
                    <View style={estilosHome.quest}>
                        <Image
                            source={require('../../../assets/organico.png')}
                            style={estilosHome.quest_icon}></Image>
                        <Text style={estilosHome.quest_name}>Orgânico</Text>
                    </View>
                    <View style={estilosHome.quest}>
                        <Image
                            source={require('../../../assets/madeira.png')}
                            style={estilosHome.quest_icon}></Image>
                        <Text style={estilosHome.quest_name}>Madeira</Text>
                    </View>
                    <View style={estilosHome.quest}>
                        <Image
                            source={require('../../../assets/perigosos.png')}
                            style={estilosHome.quest_icon}></Image>
                        <Text style={estilosHome.quest_name}>Resíduos Perigosos</Text>
                    </View>
                    <View style={estilosHome.quest}>
                        <Image
                            source={require('../../../assets/saude.png')}
                            style={estilosHome.quest_icon}></Image>
                        <Text style={estilosHome.quest_name}>Resíduos Ambulatoriais e de serviços de saúde</Text>
                    </View>
                    <View style={estilosHome.quest}>
                        <Image
                            source={require('../../../assets/radioativo.png')}
                            style={estilosHome.quest_icon}></Image>
                        <Text style={estilosHome.quest_name}>Radioativos</Text>
                    </View>
                    <View style={estilosHome.quest}>
                        <Image
                            source={require('../../../assets/misturado.png')}
                            style={estilosHome.quest_icon}></Image>
                        <Text style={estilosHome.quest_name}>Não Reciclável ou Misturado</Text>
                    </View>
                </SafeAreaView>



                {/* ANÚNCIOS */}
                <TouchableOpacity style={[estilosHome.subContainer, { height: 200, marginBottom: 200, borderRadius: 25 }]}>
                    <Image style={{
                        width: '100%',
                        height: '100%',
                        //backgroundColor: 'red'
                    }} source={require("../../../assets/RECLICK_FINAL.png")}>

                    </Image>
                </TouchableOpacity>

            </ScrollView>

            {/* MENU INFERIOR */}
            <Menu />


        </View>
    )
}
