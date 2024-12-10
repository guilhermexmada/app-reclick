import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { estilosHome } from '../screens/Home/style';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';  


const home = require('../../assets/home_default.png');
const clock = require('../../assets/clock_default.png');
const gps = require('../../assets/gps_default.png');
const calculator = require('../../assets/calculator_default.png');
const configuration = require('../../assets/configuration_default.png');
const home_select = require('../../assets/home_select.png');
const clock_select = require('../../assets/clock_select.png');
const gps_select = require('../../assets/gps_select.png');
const calculator_select = require('../../assets/calculator_select.png');
const configuration_select = require('../../assets/configuration_select.png');


const Menu = () => {
    //propriedade navigation usada para navegar quando importado
    const navigation = useNavigation();
    //captura o nome da route atual (tela do usuário)
    const routeName = navigation.getState().routes[navigation.getState().index].name;

    return (

        <View style={estilosHome.menu}>
           {/* MOSTRA NOME DA TELA ATUAL DENTRO DO MENU <Text>{routeName}</Text> */} 
        <TouchableOpacity
            style={estilosHome.btnMenu}
            onPress={() => navigation.navigate("Home")}
        >
            <Image style={estilosHome.imgMenu} source={routeName == "Home" ? home_select : home_select}></Image>
        </TouchableOpacity>
        <TouchableOpacity
            style={estilosHome.btnMenu}
            onPress={() => navigation.navigate("Rotina")}
        >
            <Image style={estilosHome.imgMenu} source={routeName == "Rotina" ? clock_select : clock_select}></Image>
        </TouchableOpacity>
        <TouchableOpacity
            style={estilosHome.btnMenu}
            onPress={() => navigation.navigate("Mapa")}
        >
            <Image style={estilosHome.imgMenu} source={routeName == "Gps" ? gps_select : gps_select}></Image>
        </TouchableOpacity>
        <TouchableOpacity
            style={estilosHome.btnMenu}
            onPress={() => navigation.navigate("Calculadora")}
        >
            <Image style={estilosHome.imgMenu} source={routeName == "Calculadora" ? calculator_select : calculator_select}></Image>
        </TouchableOpacity>
        <TouchableOpacity
            style={estilosHome.btnMenu}
            onPress={() => navigation.navigate("Configuracoes")}
        >
            <Image style={estilosHome.imgMenu} source={routeName == "Configuracoes" ? configuration_select : configuration_select}></Image>
        </TouchableOpacity>
       
    </View>
    );
};

export default Menu;












/*
home_def: '../../../assets/home_default.png',
    home_sel: '../../../assets/home_select.png',
    clock_def: '../../../assets/clock_default.png',
    clock_sel: '../../../assets/clock_select.png',
    gps_def: '../../../assets/gps_default.png',
    gps_sel: '../../../assets/gps_select.png',
    calc_def: '../../../assets/calculator_default.png',
    calc_sel: '../../../assets/calculator_select.png',
    config_def: '../../../assets/configuration_default.png',
    config_sel: '../../../assets/configuration_select.png',
    
     <View style={estilosHome.menu}>
                <TouchableOpacity

                    style={estilosHome.btnMenu}
                >
                    <Image></Image>
                </TouchableOpacity>
            </View>
    */