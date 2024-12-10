import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, TextInput, Image, RefreshControl, Alert, StatusBar } from 'react-native';

import { estilosConfig } from './style';
import estilosFontes from '../../styles/fonts.js';
import estilosCores from '../../styles/colors.js';
import { Ionicons } from '@expo/vector-icons';
import Menu from '../../styles/menu.js';


import api from '../../../services/api';
import Load from '../../components/Load';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import colors from '../../styles/colors.js';


export default function Configuracoes({ navigation }) {

    //atualiza dados e barra edição toda vez que entra na tela
    useFocusEffect(
        React.useCallback(() => {
            buscarDados();
            setEdit(false);
        }, [])
    );

    //variáveis para verificar no banco de dados
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [success, setSuccess] = useState(false);
    //variável que torna dados editáveis ou não
    const [edit, setEdit] = useState(false);

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

    //função que permite editar os dados
    function editar() {
        if (edit == false) {
            setEdit(true);
        } else if (edit == true) {
            setEdit(false);
        }
    }

    //função que busca os dados no banco
    async function buscarDados() {
        try {
            const res = await api.post("api_reclick/buscarDados.php", {});
            console.log(res);
            if (res.data.sucesso == true) {
                setNome(res.data.nome);
                setEmail(res.data.email);
                setSenha(res.data.senha);
                setTelefone(res.data.telefone);
                setEndereco(res.data.endereco);
                showMessage({
                    message: 'Dados carregados',
                    description: '',
                    type: 'success',
                    duration: 1000,
                });
            }

        } catch (error) {
            Alert.alert("Erro ao carregar seus dados");
        }
    }

    //função que atualiza os dados no banco com novos dados
    async function atualizar() {
        if (senha == '' || nome == '' || telefone == '' || endereco == '') {
            showMessage({
                message: 'Erro ao logar',
                description: 'Preencha todos os dados',
                type: 'warning',
            });
            return;
        }
        try {
            const obj = {
                senha: senha,
                nome: nome,
                telefone: telefone,
                endereco: endereco,
            }
            const res = await api.post("api_reclick/editar.php", obj);
            console.log(res);
            //console.log(obj);
            if (res.data.sucesso == false) {
                showMessage({
                    message: 'Erro ao atualizar',
                    description: res.data.mensagem,
                    type: 'warning',
                    duration: 3000,
                })
                return;
            }
            setSuccess(true);
            showMessage({
                message: 'Atualização bem sucedida',
                description: res.data.mensagem,
                type: 'success',
                duration: 1200,
            });
            buscarDados();
        }
        catch (error) {
            Alert.alert("Oops", "Alguma coisa deu errado");
            setSuccess(false);
        }
    }

    //função que alerta para sair da conta
    async function alertaSair() {
        Alert.alert(
            'Deslogar conta',
            'Você deseja continuar?',
            [
                {
                    text: 'SIM',
                    onPress: async () => await sair(),
                },
                {
                    text: 'NÃO',
                    onPress: () => { return; },
                },
            ],
            { cancelable: false }
        );
    };

    //função que sai da conta
    async function sair() {
        try {
            //página que destrói o token de login
            const res = await api.post("api_reclick/logout.php", {});
            console.log(res);
            if (res.data.sucesso == true) {
                Alert.alert(res.data.mensagem);
                //retorna para página de login
                navigation.navigate('Login');
            } else if (res.data.sucesso == false) {
                Alert.alert(res.data.mensagem);
            }
        } catch {
            Alert.alert("Oops", "Alguma coisa deu errado");
        }
    }

    //função que alerta para a exclusão da conta
    async function alertaExcluir() {
        Alert.alert(
            'Exclusão de conta',
            'Você tem certeza disso?',
            [
                {
                    text: 'SIM',
                    onPress: async () => await excluir(),
                },
                {
                    text: 'NÃO',
                    onPress: () => { return; },
                },
            ],
            { cancelable: false }
        );
    }

    //função que exclui a conta do usuário
    async function excluir() {
        try {
            //página que destrói sessão e apaga registro
            const res = await api.post("api_reclick/excluir.php", {});
            console.log(res);
            if (res.data.sucesso == true) {
                Alert.alert(res.data.mensagem);
                //retorna para página de login
                navigation.navigate('Cadastro');
            } else if (res.data.sucesso == false) {
                Alert.alert(res.data.mensagem);
            }
        } catch {
            Alert.alert("Oops", "Alguma coisa deu errado");
        }
    }


    return (
        <View style={estilosConfig.container}>
            <ScrollView
                scrollEnabled
                contentContainerStyle={estilosConfig.scroll_content}
                style={estilosConfig.scroll}>

                {/*CABEÇALHO*/}
                <View style={estilosConfig.header} >
                    <Text style={{
                        fontFamily: estilosFontes.heading,
                        fontSize: estilosFontes.heading_size,
                        color: 'white'
                    }}>CONFIGURAÇÕES</Text>
                </View >

                {/*DADOS PESSOAIS*/}
                <View style={[estilosConfig.subContainer, { height: 430 }]}>
                    <Text style={estilosConfig.titulo}>Seus dados pessoais</Text>
                    {/* EMAIL */}
                    <View style={estilosConfig.txtInputArea}>
                        <Image style={estilosConfig.inputImage} source={require('../../../assets/email_icon.png')}></Image>
                        <TextInput
                            style={estilosConfig.txtInput}
                            placeholder='Email'
                            onChangeText={(email) => setEmail(email)}
                            value={email}
                            editable={false}
                        ></TextInput>
                    </View>
                    {/* NOME */}
                    <View style={estilosConfig.txtInputArea}>
                        <Image style={estilosConfig.inputImage} source={require('../../../assets/user_icon.png')}></Image>
                        <TextInput
                            style={estilosConfig.txtInput}
                            placeholder='Nome de usuário'
                            onChangeText={(nome) => setNome(nome)}
                            value={nome}
                            editable={edit}
                        ></TextInput>
                    </View>
                    {/* SENHA */}
                    <View style={estilosConfig.txtInputArea}>
                        <TouchableOpacity style={estilosConfig.btnSenha} onPress={esconder}>
                            <Image style={estilosConfig.inputImage} source={olho}></Image>
                        </TouchableOpacity>
                        <TextInput
                            style={estilosConfig.txtInput}
                            placeholder='Senha'
                            secureTextEntry={hide}
                            onChangeText={(senha) => setSenha(senha)}
                            value={senha}
                            editable={edit}
                        ></TextInput>
                    </View>
                    {/* TELEFONE */}
                    <View style={estilosConfig.txtInputArea}>
                        <Image style={estilosConfig.inputImage} source={require('../../../assets/phone_icon.png')}></Image>
                        <TextInput
                            style={estilosConfig.txtInput}
                            placeholder='Telefone'
                            onChangeText={(telefone) => setTelefone(telefone)}
                            value={telefone}
                            editable={edit}
                        ></TextInput>
                    </View>
                    {/* ENDERECO */}
                    <View style={estilosConfig.txtInputArea}>
                        <Image style={estilosConfig.inputImage} source={require('../../../assets/gps_icon.png')}></Image>
                        <TextInput
                            style={estilosConfig.txtInput}
                            placeholder='Endereço'
                            onChangeText={(endereco) => setEndereco(endereco)}
                            value={endereco}
                            editable={edit}
                        ></TextInput>
                    </View>
                    {/*BOTÃO DE EDITAR*/}
                    <TouchableOpacity
                        onPress={editar}
                        style={[estilosConfig.btnSecundary, { backgroundColor: estilosCores.verde_escuro}]}>
                        <Text style={{ fontFamily: estilosFontes.heading, color: 'white' }}>Editar</Text>
                    </TouchableOpacity>
                    {/*BOTÃO DE ATUALIZAR DADOS*/}
                    <TouchableOpacity
                        onPress={atualizar}
                        style={[estilosConfig.btnPrimary, { margin: 10, marginBottom: 20 }]}>
                        <Text style={{ fontFamily: estilosFontes.heading, color: 'white' }}>Atualizar</Text>
                    </TouchableOpacity>
                </View>

                {/*SAIR DA CONTA*/}
                <TouchableOpacity
                    onPress={alertaSair}
                    style={[estilosConfig.btnPrimary, { backgroundColor: estilosCores.Sorange }]}
                >
                    <Text style={{ fontFamily: estilosFontes.heading, color: 'white' }}>Sair</Text>
                </TouchableOpacity>

                {/*EXCLUIR CONTA*/}
                <TouchableOpacity
                    onPress={alertaExcluir}
                    style={[estilosConfig.btnSecundary, { backgroundColor: estilosCores.Sred, marginBottom: 100, marginTop: 20 }]}
                >
                    <Text style={{ fontFamily: estilosFontes.heading, color: 'white' }}>Excluir conta</Text>
                </TouchableOpacity>

            </ScrollView>

            <Menu />
        </View>
    )
}