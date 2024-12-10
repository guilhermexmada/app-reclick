import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, RefreshControl, Alert, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { estilosMapa, styles } from './style';
import estilosFontes from '../../styles/fonts.js';
import estilosCores from '../../styles/colors.js';
import { Ionicons } from '@expo/vector-icons';
import Menu from '../../styles/menu.js';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
//import { css } from './assets/css/Css';
import config from '../../../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import 'react-native-get-random-values';

import api from '../../../services/api';
import Load from '../../components/Load';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

export default function Mapa() {

    //coordendadas personalizadas
    // MTS SUCATAS = -24.49727385790881, -47.84066385918844
    // Garrafaria du vale = -24.480572676298607, -47.85051888226208
    // JR Metais = -24.504413303836543, -47.84362856419231
    // Projeto Lixo ao Sorriso = -24.472314909355845, -47.818371168453325
    // Secretaria Municipal de Desenvolvimento Agrário e de Meio Ambiente = -24.503402745117203, -47.83588062830901
    // Ambiental Ecovale = -24.493624127332918, -47.84229834090621

    //guarda a posição inicial do usuário
    const [origin, setOrigin] = useState(null);
    //guarda o destino escolhido pelo usuário
    const [destination, setDestination] = useState(null);
    //necessário
    const mapEl = useRef(null);
    //guarda a distância entre posição inicial e destino escolhido
    const [distance, setDistance] = useState(null);

    //função que captura coordenadas do usuário 
    useEffect(() => {
        (async function () {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421
                })
            } else {
                throw new Error('Permissão negada');
            }
        })();
    }, []);

    //função que redireciona mapa para posição original
    async function getMyLocation() {
        setDestination(null);

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01844,
            longitudeDelta: 0.00843,
        });

        // Redireciona o mapa para a posição atual do usuário
        mapEl.current.fitToCoordinates([origin], {
            edgePadding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            }
        });

        setDestination(null);

        showMessage({
            message: 'Sua localização',
            description: '',
            type: 'info',
            duration: 5000,
        })
    }

    //coordenadas dos pontos de coleta
    const coordenadas = {
        'MTS SUCATAS': [-24.49727385790881, -47.84066385918844],
        "Garrafaria du vale": [-24.480572676298607, -47.85051888226208],
        "JR Metais": [-24.504413303836543, -47.84362856419231],
        "Projeto Lixo ao Sorriso" : [-24.472314909355845, -47.818371168453325],
        "Secretaria Municipal de Desenvolvimento Agrário e de Meio Ambiente" : [-24.503402745117203, -47.83588062830901],
        "Ambiental Ecovale" : [-24.493624127332918, -47.84229834090621]
    }

    const [ponto, setPonto] = useState("MTS SUCATAS");
    const pontoSelecionado = coordenadas[ponto];

    //função que busca ponto de coleta selecionado
    async function buscaPonto() {
        setDestination(null);
        setDestination({
            latitude: pontoSelecionado[0],
            longitude: pontoSelecionado[1],
            latitudeDelta: 0.01844,
            longitudeDelta: 0.00843
        });
    }

    return (

        <View style={estilosMapa.container}>

            <ScrollView
                scrollEnabled
                contentContainerStyle={estilosMapa.scroll_content}
                style={estilosMapa.scroll}>

                {/*CABEÇALHO*/}
                <View style={estilosMapa.header} >
                    <Text style={[{ fontFamily: estilosFontes.heading, fontSize: 25, color: 'white', textAlign: 'center' }]}>MAPA DE PONTOS DE COLETA</Text>
                </View >

                {/* <Text style={estilosMapa.texto}>Localize os principais locais de coleta de resíduos na cidade de Registro-SP </Text> */}


                {/*MAPA VIRTUAL*/}
                <View style={estilosMapa.container_mapa}>
                    <MapView
                        style={estilosMapa.map}
                        initialRegion={origin}
                        showsUserLocation={true}
                        zoomEnabled={true}
                        loadingEnabled={true}
                        ref={mapEl}
                    >


                        {console.log(Object.getOwnPropertyDescriptors(coordenadas))}


                        {/* MARCADOR GARRAFARIA DU VALE */}
                        <Marker
                            coordinate={{ latitude: -24.480572676298607, longitude: -47.85051888226208 }}
                            title='Garrafaria du Vale'
                            description='Ponto de coleta de vidro'
                        >
                            <View style={estilosMapa.marcador}>
                            </View>
                        </Marker>

                        {/* MARCADOR MTS SUCATAS */}
                        <Marker
                            coordinate={{ latitude: -24.49727385790881, longitude: -47.84066385918844 }}
                            title='MTS Sucatas'
                            description='Ponto de coleta de sucata'
                        >
                            <View style={estilosMapa.marcador}>
                            </View>
                        </Marker>

                        {/* MARCADOR JR METAIS */}
                        <Marker
                            coordinate={{ latitude: -24.504413303836543, longitude: -47.84362856419231 }}
                            title='JR Metais'
                            description='Ponto de coleta de metais'
                        >
                            <View style={estilosMapa.marcador}>
                            </View>
                        </Marker>

                        {/* MARCADOR PROJETO LIXO AO SORRISO */}
                        <Marker
                            coordinate={{ latitude: -24.472314909355845, longitude: -47.818371168453325 }}
                            title='Projeto Lixo ao Sorriso'
                            description='Ponto de coleta de roupas'
                        >
                            <View style={estilosMapa.marcador}>
                            </View>
                        </Marker>

                        {/* MARCADOR Ambiental Ecovale */}
                        <Marker
                            coordinate={{ latitude: -24.493624127332918, longitude: -47.84229834090621 }}
                            title='Ambiental Ecovale'
                            description='Serviço de coleta de resíduos não perigosos'
                        >
                            <View style={estilosMapa.marcador}>
                            </View>
                        </Marker>

                        {/* MARCADOR Secretaria Municipal de Desenvolvimento Agrário e de Meio Ambiente */}
                        <Marker
                            coordinate={{ latitude: -24.503402745117203, longitude: -47.83588062830901 }}
                            title='Secretaria Municipal de Desenvolvimento Agrário e de Meio Ambiente'
                            description='Ponto de consulta de informações'
                        >
                            <View style={estilosMapa.marcador}>
                            </View>
                        </Marker>

                        {/* APARECE PARA REDIRECIONAR MAPA AO DESTINO SELECIONADO */}
                        {destination &&
                            <MapViewDirections
                                origin={origin}
                                destination={destination}
                                apikey={config.googleApi}
                                strokeWidth={10}
                                strokeColor='#a1d'
                                onReady={result => {
                                    setDistance(result.distance);
                                    mapEl.current.fitToCoordinates(
                                        result.coordinates, {
                                        edgePadding: {
                                            top: 10,
                                            bottom: 10,
                                            left: 10,
                                            right: 10
                                        }
                                    }
                                    );

                                }

                                }

                            >
                            </MapViewDirections>
                        }



                    </MapView>
                </View>
                {/*FIM DO MAPA*/}

                <View style={{
                    width: '100%',
                    height: 200,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    //opacity: 0.5,
                    position: 'absolute',
                    marginTop: 620,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>

                    {/*BOTÃO DE RECENTRALIZAR NA POSIÇÃO ATUAL */}
                    <TouchableOpacity
                        onPress={getMyLocation}
                        style={[estilosMapa.btnDanger, { marginLeft: 0 }]}>
                        <Text style={[{ color: 'white', fontFamily: estilosFontes.heading }]}>Recentralizar</Text>
                    </TouchableOpacity>
                    {/*BOTÃO DE PROCURAR ROTA */}
                    <TouchableOpacity
                        onPress={buscaPonto}
                        style={[estilosMapa.btnPrimary, { marginLeft: 10 }]}>
                        <Text style={[{ color: 'white', fontFamily: estilosFontes.heading }]}>Buscar ponto</Text>
                    </TouchableOpacity>
                    {/* PICKER PARA SELEÇÃO DO PONTO DE COLETA */}
                    <View style={estilosMapa.input_periodo}>
                        <Picker
                            style={estilosMapa.picker}
                            selectedValue={ponto}
                            onValueChange={(ponto) =>
                                setPonto(ponto)
                            }>
                            <Picker.Item label="MTS SUCATAS" value={"MTS SUCATAS"}></Picker.Item>
                            <Picker.Item label="Garrafaria du vale" value={"Garrafaria du vale"}></Picker.Item>
                            <Picker.Item label="JR Metais" value={"JR Metais"}></Picker.Item>
                            <Picker.Item label="Projeto Lixo ao Sorriso" value={"Projeto Lixo ao Sorriso"}></Picker.Item>
                            <Picker.Item label="Secretaria Municipal de Desenvolvimento Agrário e de Meio Ambiente" value={"Secretaria Municipal de Desenvolvimento Agrário e de Meio Ambiente"}></Picker.Item>
                            <Picker.Item label="Ambiental Ecovale" value={"Ambiental Ecovale"}></Picker.Item>
                        </Picker>
                    </View>
                </View>

                {distance &&
                    showMessage({
                        message: 'Distância até ' + ponto,
                        description: distance + ' m',
                        type: 'info',
                        duration: 5000,
                    })
                    /*<Text style={{
                        fontFamily: estilosFontes.text,
                        fontSize: 25,
                        color: estilosCores.Sblue,
                        position: 'absolute',
                    }}> Distância: {distance} </Text>*/
                }


            </ScrollView>

            <Menu />
        </View>

    )
}

