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

export default function Cadastro({ navigation }) {
    //variáveis para verificar no banco de dados
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [success, setSuccess] = useState(false);

    //função que envia dados para api em login.php
    async function Cadastrar() {
        if (email == '' || senha == '' || nome == '' || telefone == '' || endereco == '') {
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
                nome: nome,
                telefone: telefone,
                endereco: endereco,
            }
            const res = await api.post("api_reclick/salvar.php", obj);
            console.log(res);
            if (res.data.sucesso == false) {    
                showMessage({
                    message: 'Erro ao cadastrar',
                    description: res.data.mensagem,
                    type: 'warning',
                    duration: 3000,
                })
                return;
            } else if(res.data.sucesso == true){
                setSuccess(true);
                showMessage({
                    message: 'Logado',
                    description:' Você se cadastrou com sucesso!',
                    type: 'success',
                    duration: 800,
                });
                //redirecionando para Home
                navigation.navigate("Home");
            } /*
            setSuccess(true);
            //token de login
            const id_log = res.data.id_log;
            showMessage({
                message: 'Logado',
                description: id_log + ' Você se cadastrou com sucesso!',
                type: 'success',
                duration: 800,
            });
            //redirecionando para Home
            navigation.navigate("Home"); */
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

                <Text style={estilosLogin.texto}>Quer construir um futuro melhor a partir dos próprios passos, mas não sabe por onde começar? Junte-se a nós!</Text>

                {/* FORMULÁRIO DE LOGIN */}
                <View style={estilosLogin.areaForm}>

                    {/* EMAIL */}
                    <View style={estilosLogin.txtInputArea}>
                        <Image style={estilosLogin.inputImage} source={require('../../../assets/email_icon.png')}></Image>
                        <TextInput
                            style={estilosLogin.txtInput}
                            placeholder='Email'
                            onChangeText={(email) => setEmail(email)}
                        ></TextInput>
                    </View>
                    {/* NOME */}
                    <View style={estilosLogin.txtInputArea}>
                        <Image style={estilosLogin.inputImage} source={require('../../../assets/user_icon.png')}></Image>
                        <TextInput
                            style={estilosLogin.txtInput}
                            placeholder='Nome de usuário'
                            onChangeText={(nome) => setNome(nome)}
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
                    {/* TELEFONE */}
                    <View style={estilosLogin.txtInputArea}>
                        <Image style={estilosLogin.inputImage} source={require('../../../assets/phone_icon.png')}></Image>
                        <TextInput
                            style={estilosLogin.txtInput}
                            placeholder='Telefone'
                            onChangeText={(telefone) => setTelefone(telefone)}
                        ></TextInput>
                    </View>
                    {/* ENDERECO */}
                    <View style={estilosLogin.txtInputArea}>
                        <Image style={estilosLogin.inputImage} source={require('../../../assets/gps_icon.png')}></Image>
                        <TextInput
                            style={estilosLogin.txtInput}
                            placeholder='Endereço'
                            onChangeText={(endereco) => setEndereco(endereco)}
                        ></TextInput>
                    </View>


                    {/* BOTÃO CADASTRAR */}
                    <TouchableOpacity
                        onPress={() => {

                            Cadastrar();

                        }
                        }
                        style={estilosLogin.btnPrimary}>
                        <Text style={estilosLogin.btnText}>Cadastrar</Text>
                    </TouchableOpacity>
                    {/* BOTÃO ENTRAR */}
                    <TouchableOpacity
                        onPress={() => {

                            navigation.navigate("Login");

                        }
                        }
                        style={estilosLogin.btnSecundary}>
                        <Text style={estilosLogin.btnText}>Entrar</Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>

            {/*MENU <View style={estilosLogin.menu}></View> */}
        </View>
    )
}