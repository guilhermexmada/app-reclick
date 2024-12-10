import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, TextInput, Image, RefreshControl, Alert, StatusBar, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Menu from '../../styles/menu.js';
import { estilosCalc } from './style.js';
import estilosFontes from '../../styles/fonts.js';
import estilosCores from '../../styles/colors.js';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import api from '../../../services/api';
import Load from '../../components/Load';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';


export default function Calculadora() {

    //variaveis dos materiais recicláveis
    const [plastico, setPlastico] = useState('');
    const [metal, setMetal] = useState('');
    const [papel, setPapel] = useState('');
    const [vidro, setVidro] = useState('');

    //variaveis dos períodos de consumo
    const [per_plastico, setPer_plastico] = useState('')
    const [per_metal, setPer_metal] = useState('')
    const [per_papel, setPer_papel] = useState('')
    const [per_vidro, setPer_vidro] = useState('')

    //variáveis geradas após o cálculo
    //quantidade de resíduos
    const [carbono, setCarbono] = useState(0);
    const [agua, setAgua] = useState(0);
    const [petroleo, setPetroleo] = useState('0');
    const [arvore, setArvore] = useState('0');
    const [minerio, setMinerio] = useState('0');
    const [areia, setAreia] = useState('0');
    //anos para degradação de cada resíduo (em porcentagem do total)
    const [deg_plastico, setDeg_plastico] = useState(0);
    const [deg_metal, setDeg_metal] = useState(0);
    const [deg_papel, setDeg_papel] = useState(0);
    const [deg_vidro, setDeg_vidro] = useState(0);
    //anos para degradação de cada resíduo em quantidade
    const [y_papel, setY_papel] = useState(0);
    const [y_plastico, setY_plastico] = useState(0);
    const [y_metal, setY_metal] = useState(0);
    const [y_vidro, setY_vidro] = useState(0);

    //função que calcula todos os resultados
    function Calcular() {
        //verificando tempo de consumo de cada material
        var tempo_plastico;
        var tempo_metal;
        var tempo_papel;
        var tempo_vidro;
        per_plastico == 'diario' ? tempo_plastico = 360 : per_plastico == 'semanal' ? tempo_plastico = 52 : per_plastico == 'mensal' ? tempo_plastico = 12 : tempo_plastico = 360;

        per_metal == 'diario' ? tempo_metal = 360 : per_metal == 'semanal' ? tempo_metal = 52 : per_metal == 'mensal' ? tempo_metal = 12 : tempo_metal = 360;

        per_papel == 'diario' ? tempo_papel = 360 : per_papel == 'semanal' ? tempo_papel = 52 : per_papel == 'mensal' ? tempo_papel = 12 : tempo_papel = 360;

        per_vidro == 'diario' ? tempo_vidro = 360 : per_vidro == 'semanal' ? tempo_vidro = 52 : per_vidro == 'mensal' ? tempo_vidro = 12 : tempo_vidro = 360;

        //Alert.alert(` plastico: ${tempo_plastico} -  metal: ${tempo_metal} -  papel: ${tempo_papel} - tempo : ${tempo_vidro}`);

        //calculando barris de petróleo 
        var plastico_ton = (plastico * 91) / 1000000;
        var petroleo_litros = (plastico_ton * 130) / 0.85;
        var petroleo_barril = (petroleo_litros / 159) * tempo_plastico;
        setPetroleo(petroleo_barril.toFixed(3));

        //calculando quilos de bauxita
        var aluminio_kg = (metal * 15) / 1000;
        var bauxita_kg = ((aluminio_kg / 1000) * 5000) * tempo_metal;
        setMinerio(bauxita_kg.toFixed(3));

        //calculando quantidade de eucaliptos
        var eucalipto = (papel / 10000) * tempo_papel;
        setArvore(eucalipto.toFixed(3));

        //calculando quilos de areia
        var areia = ((vidro * 345) / 1000) * 1.3 * tempo_vidro;
        setAreia(areia.toFixed(3));

        //pegada de carbono 
        plastico_carbono = ((plastico * 91) / 1000) * 3;
        metal_carbono = (aluminio_kg) * 11;
        papel_carbono = (papel / 1000) * 7.5;
        vidro_carbono = (vidro * 345) / 1000;
        var carbono = (plastico_carbono * tempo_plastico) + (metal_carbono * tempo_metal) + (papel_carbono * tempo_papel) + (vidro_carbono * tempo_vidro);
        setCarbono(carbono.toFixed(3));

        //pegada hídrica
        plastico_agua = ((plastico / 500) * 3) * tempo_plastico;
        metal_agua = ((aluminio_kg / 0.45) * 0.66) * 3.7 * tempo_metal;
        papel_agua = (papel * 10) * tempo_papel;
        vidro_agua = ((vidro * 345) / 1000) * 0.6 * tempo_vidro;
        setAgua((plastico_agua + metal_agua + papel_agua + vidro_agua).toFixed(3));

        //tempo médio de degradação dos resíduos
        var anos_papel = (papel * 0.375 * tempo_papel);
        var anos_metal = (metal * 3.5 * tempo_metal);
        var anos_plastico = (plastico * 400 * tempo_plastico);
        var anos_vidro = (vidro * 1000 * tempo_vidro);
        setY_papel(anos_papel);
        setY_metal(anos_metal);
        setY_plastico(anos_plastico);
        setY_vidro(anos_vidro);
        //tempo médio de degradação dos resíduos em porcentagem do total de tempo calculado
        var anos_total = anos_metal + anos_papel + anos_plastico + anos_vidro;
        var porcentagem_papel = ((anos_papel * 100) / anos_total).toFixed(0);
        var porcentagem_metal = ((anos_metal * 100) / anos_total).toFixed(0);
        var porcentagem_plastico = ((anos_plastico * 100) / anos_total).toFixed(0);
        var porcentagem_vidro = ((anos_vidro * 100) / anos_total).toFixed(0);
        setDeg_papel(`${porcentagem_papel}%`);
        setDeg_metal(`${porcentagem_metal}%`);
        setDeg_plastico(`${porcentagem_plastico}%`);
        setDeg_vidro(`${porcentagem_vidro}%`);
    }

    function LimparCampos() {
        setPlastico('');
        setMetal('');
        setPapel('');
        setVidro('');
        Calcular();
    }


    return (
        <View style={estilosCalc.container}>
            <ScrollView
                scrollEnabled
                contentContainerStyle={estilosCalc.scroll_content}
                style={estilosCalc.scroll}
            >
                <View style={estilosCalc.header} >
                    <Text style={[{ fontFamily: estilosFontes.heading, fontSize: 25, color: 'white', textAlign: 'center' }]}>CALCULADORA DE DESPERDÍCIO</Text>
                </View >

                <Text style={estilosCalc.texto}>Descubra o impacto da sua reciclagem sobre o meio ambiente </Text>

                <SafeAreaView style={estilosCalc.container_calculadora}>
                    <Text style={[estilosCalc.titulo_calculadora, { marginRight: 0, marginLeft: 4 }]}>Material</Text>
                    <Text style={estilosCalc.titulo_calculadora}>Unidades</Text>
                    <Text style={estilosCalc.titulo_calculadora}>Período</Text>

                    {/* PLÁSTICO ====================================================================================================*/}
                    <Image source={require('../../../assets/garrafa-plastica.png')} style={estilosCalc.icon_calculadora}></Image>
                    <TextInput
                        value={plastico}

                        style={[estilosCalc.input_unidade, { backgroundColor: estilosCores.Rred_light }]}
                        onChangeText={(plastico) => setPlastico(plastico)}
                    ></TextInput>
                    <View style={[estilosCalc.input_periodo, { backgroundColor: estilosCores.Rred_light }]}>
                        <Picker
                            style={estilosCalc.picker}
                            selectedValue={per_plastico}
                            onValueChange={(per_plastico) => setPer_plastico(per_plastico)}
                        >
                            <Picker.Item label="Diário" value="diario" style={{ fontSize: 12 }} />
                            <Picker.Item label="Semanal" value="semanal" style={{ fontSize: 12 }} />
                            <Picker.Item label="Mensal" value="mensal" style={{ fontSize: 12 }} />
                        </Picker>
                    </View>

                    {/* METAL ====================================================================================================*/}
                    <Image source={require('../../../assets/lata-refrigerante.png')} style={estilosCalc.icon_calculadora}></Image>
                    <TextInput
                        value={metal}
                        style={[estilosCalc.input_unidade, { backgroundColor: estilosCores.Ryellow_light }]}
                        onChangeText={(metal) => setMetal(metal)}
                    ></TextInput>
                    <View style={[estilosCalc.input_periodo, { backgroundColor: estilosCores.Ryellow_light }]}>
                        <Picker

                            style={estilosCalc.picker}
                            selectedValue={per_metal}
                            onValueChange={(per_metal) => setPer_metal(per_metal)}
                        >
                            <Picker.Item label="Diário" value="diario" style={{ fontSize: 12 }} />
                            <Picker.Item label="Semanal" value="semanal" style={{ fontSize: 12 }} />
                            <Picker.Item label="Mensal" value="mensal" style={{ fontSize: 12 }} />

                        </Picker>
                    </View>

                    {/* PAPEL ====================================================================================================*/}
                    <Image source={require('../../../assets/papel.png')} style={estilosCalc.icon_calculadora}></Image>
                    <TextInput
                        value={papel}

                        style={[estilosCalc.input_unidade, { backgroundColor: estilosCores.Rblue_light }]}
                        onChangeText={(papel) => setPapel(papel)}
                    ></TextInput>
                    <View style={[estilosCalc.input_periodo, { backgroundColor: estilosCores.Rblue_light }]}>
                        <Picker
                            style={estilosCalc.picker}
                            selectedValue={per_papel}
                            onValueChange={(per_papel) => setPer_papel(per_papel)}
                        >
                            <Picker.Item label="Diário" value="diario" style={{ fontSize: 12 }} />
                            <Picker.Item label="Semanal" value="semanal" style={{ fontSize: 12 }} />
                            <Picker.Item label="Mensal" value="mensal" style={{ fontSize: 12 }} />

                        </Picker>
                    </View>

                    {/* VIDRO ====================================================================================================*/}
                    <Image source={require('../../../assets/garrafa-vidro.png')} style={estilosCalc.icon_calculadora}></Image>
                    <TextInput
                        value={vidro}
                        style={[estilosCalc.input_unidade, { backgroundColor: estilosCores.Rgreen_light }]}
                        onChangeText={(vidro) => setVidro(vidro)}
                    ></TextInput>
                    <View style={[estilosCalc.input_periodo, { backgroundColor: estilosCores.Rgreen_light }]}>
                        <Picker
                            style={estilosCalc.picker}
                            selectedValue={per_vidro}
                            onValueChange={(per_vidro) => setPer_vidro(per_vidro)}
                        >
                            <Picker.Item label="Diário" value="diario" style={{ fontSize: 12 }} />
                            <Picker.Item label="Semanal" value="semanal" style={{ fontSize: 12 }} />
                            <Picker.Item label="Mensal" value="mensal" style={{ fontSize: 12 }} />

                        </Picker>
                    </View>
                </SafeAreaView>

                {/*BOTÃO CALCULAR*/}
                <TouchableOpacity onPress={Calcular} style={estilosCalc.btnPrimary}>
                    <Text style={{ fontFamily: estilosFontes.heading, color: 'white', textAlign: 'center' }}>Calcular desperdício</Text>
                </TouchableOpacity>

                {/*BOTÃO LIMPAR INPUTS*/}
                <TouchableOpacity onPress={LimparCampos} style={[estilosCalc.btnSecundary, { backgroundColor: estilosCores.Sblue }]}>
                    <Text style={{ fontFamily: estilosFontes.heading, color: 'white' }}>Limpar</Text>
                </TouchableOpacity>

                <Text style={{
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    margin: 20,
                    fontFamily: estilosFontes.texto,
                }}>Seu impacto em 1 ano de consumo:</Text>

                {/* QUADROS DE RESULTADO  ================================================================== */}
                <SafeAreaView style={estilosCalc.container_result}>
                    <View style={[estilosCalc.result, { backgroundColor: estilosCores.Rred }]}>
                        <Text style={estilosCalc.titulo_result}>Barris de petróleo</Text>
                        <Text>{petroleo}</Text>
                    </View>
                    <View style={[estilosCalc.result, { backgroundColor: estilosCores.Ryellow }]}>
                        <Text style={estilosCalc.titulo_result}>Quilos de minério</Text>
                        <Text>{minerio}</Text>
                    </View>
                    <View style={[estilosCalc.result, { backgroundColor: estilosCores.Rblue }]}>
                        <Text style={estilosCalc.titulo_result}>Eucaliptos</Text>
                        <Text>{arvore}</Text>
                    </View>
                    <View style={[estilosCalc.result, { backgroundColor: estilosCores.Rgreen }]}>
                        <Text style={estilosCalc.titulo_result}>Quilos de areia</Text>
                        <Text>{areia}</Text>
                    </View>
                </SafeAreaView>

                {/*GRÁFICO DE RESULTADO (ANOS PARA DEGRADAR) ================================================================== */}
                <SafeAreaView style={estilosCalc.container_grafico}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5, fontFamily: estilosFontes.texto}}>Tempo médio de degradação no meio</Text>
                    <View style={[estilosCalc.barra_grafico, { width: `${deg_plastico}`, backgroundColor: estilosCores.Rred }]}>
                        <Text style={estilosCalc.titulo_result}> {y_plastico} anos</Text>
                    </View>
                    <View style={[estilosCalc.barra_grafico, { width: `${deg_metal}`, backgroundColor: estilosCores.Ryellow }]}>
                        <Text style={estilosCalc.titulo_result}> {y_metal} anos</Text>
                    </View>
                    <View style={[estilosCalc.barra_grafico, { width: `${deg_papel}`, backgroundColor: estilosCores.Rblue }]}>
                        <Text style={estilosCalc.titulo_result}> {y_papel} anos</Text>
                    </View>
                    <View style={[estilosCalc.barra_grafico, { width: `${deg_vidro}`, backgroundColor: estilosCores.Rgreen }]}>
                        <Text style={estilosCalc.titulo_result}> {y_vidro} anos</Text>
                    </View>



                </SafeAreaView>

                {/* PEGADA DE CARBONO E PEGADA HÍDRICA */}
                <View style={[estilosCalc.container_pegada, { backgroundColor: estilosCores.Sgray_dark }]}>
                    <Text style={{ color: 'white', fontSize: 20, }}>Carbono emitido:</Text>
                    <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}> {carbono} Kg</Text>
                </View>
                <View style={[estilosCalc.container_pegada, { backgroundColor: estilosCores.Sblue }]}>
                    <Text style={{ color: 'white', fontSize: 20, }}>Água gasta: </Text>
                    <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}> {agua} L</Text>
                </View>

                <View style={{ margin: 70 }}><Text></Text></View>


            </ScrollView>

            {/* MENU INFERIOR */}
            <Menu />

        </View>
    )
}