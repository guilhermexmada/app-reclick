//página de login
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, TextInput, Image, RefreshControl, Alert, StatusBar } from 'react-native';

import { estilosLogin } from './style.js';
import estilosFontes from '../../styles/fonts.js';
import { Ionicons } from '@expo/vector-icons';


import axios from 'axios';
import api from '../../../services/api';
import Load from '../../components/Load';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/core';



//-------------------------------------------------

//-------------------------------------------------

export default function Login({ navigation }) {
    //variáveis para verificar no banco de dados
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [success, setSuccess] = useState(false);

    //função que envia dados para api em login.php
    async function Login() {
        if (email == '' || senha == '') {
            showMessage({
                message: 'Erro ao logar',
                description: 'Preencha todos os campos do formulário',
                type: 'warning',
            });
            return;
        }
        try {
            const obj = {
                email: email,
                senha: senha,
            }
            const res = await api.post("api_reclick/login.php", obj);
            console.log(res);
            if (res.data.sucesso == false) {
                showMessage({
                    message: 'Erro ao logar',
                    description: res.data.mensagem,
                    type: 'warning',
                    duration: 3000,
                })
                return;
            }
            setSuccess(true);
            //token de login
            const id_log = res.data.id_log;
            showMessage({
                message: 'Logado',
                description: /*id_log +*/ ' Você logou com sucesso!',
                type: 'success',
                duration: 800,
            });
            //redirecionando para Home
            navigation.navigate("Home");
        }
        catch (error) {
            Alert.alert("Oops", "Alguma coisa deu errado");
            setSuccess(false);
        }
    }

    //variáveis para troca de imagem ao esconder senha
    const [olho, setOlho] = useState(require('../../../assets/passwordHide_icon.png'));
    const [hide, setHide] = useState(true);
    //função que troca imagem ao esconder senha
    function esconder() {
        if (hide == true) {
            setOlho(require('../../../assets/password_icon.png'));
            setHide(false);
        }
        else if (hide == false) {
            setOlho(require('../../../assets/passwordHide_icon.png')) /
                setHide(true);
        }

    }

    return (
        <View style={estilosLogin.container}>
            <ScrollView
                scrollEnabled
                contentContainerStyle={estilosLogin.scroll_content}
                style={estilosLogin.scroll}>


                <Image style={estilosLogin.logo} source={require('../../../assets/logomarca.png')} />

                <Text style={estilosLogin.texto}>A poucos passos de um futuro melhor</Text>

                {/* FORMULÁRIO DE LOGIN */}
                <View style={estilosLogin.areaForm}>

                    {/* EMAIL */}
                    <View style={estilosLogin.txtInputArea}>
                        <Image style={estilosLogin.inputImage} source={require('../../../assets/user_icon.png')}></Image>
                        <TextInput
                            style={estilosLogin.txtInput}
                            placeholder='Email'
                            onChangeText={(email) => setEmail(email)}
                        ></TextInput>
                    </View>
                    {/* SENHA */}
                    <View style={estilosLogin.txtInputArea}>
                        <TouchableOpacity style={estilosLogin.btnSenha} onPress={esconder}>
                            <Image style={estilosLogin.inputImage} source={olho}></Image>
                        </TouchableOpacity>
                        <TextInput
                            style={estilosLogin.txtInput}
                            placeholder='Senha'
                            secureTextEntry={hide}
                            onChangeText={(senha) => setSenha(senha)}
                        ></TextInput>
                    </View>
                    {/* BOTÃO ENTRAR */}
                    <TouchableOpacity
                        onPress={() => {

                            Login();

                        }
                        }
                        style={estilosLogin.btnPrimary}>
                        <Text style={estilosLogin.btnText}>Entrar</Text>
                    </TouchableOpacity>
                    {/* BOTÃO ENTRAR */}
                    <TouchableOpacity 
                    onPress={()=> navigation.navigate("Cadastro")}
                    style={estilosLogin.btnSecundary}>
                        <Text style={estilosLogin.btnText}>Cadastrar</Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>

            {/*MENU <View style={estilosLogin.menu}></View> */}
        </View>
    )
}