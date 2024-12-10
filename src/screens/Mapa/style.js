//ESTILOS ROTINA

import { StyleSheet } from "react-native";
import  estilosCores from '../../styles/colors.js';
import  estilosFontes from '../../styles/fonts.js';


export const estilosMapa = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    scroll:{
        width: '100%',
        //maxHeight define a altura do scroll, height não
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: estilosCores.branco,
    },
    scroll_content:{
        //ajuste do conteúdo do scroll
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header:{
        width: '100%',
        height: 120,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        backgroundColor: estilosCores.verde_claro,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu:{
        position: 'absolute',
        marginTop: 701,
        width: '100%',
        height: 80,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        backgroundColor: estilosCores.verde_escuro,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }, 
    btnMenu:{
        position: 'relative',
        width:'15%',
        height: '80%',
        //backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgMenu:{
        position: 'relative',
        width: '50%',
        height: '50%',
    },
    logo:{
        marginTop: 30,
        width: 250,
        height: 100,
    },
    texto:{
        margin: 30,
        textAlign: 'center',
        fontFamily: estilosFontes.text,
        fontSize: 20,
    },
    areaForm:{
        width: '90%',
        height: 500,
        paddingTop: 100,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    txtInputArea:{
        width: 280, 
        height: 30,
        borderRadius: 20,
        margin: 15,
        backgroundColor: estilosCores.pastel,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtInput:{
        width: 240,
        height: 30,
    },
    inputImage:{
        width: 30,
        height: 30,
        borderRadius: 100,
    },
    btnSenha:{
        width: 30,
        height: 30,
    },
    btnPrimary:{
        width: 110,
        height: 40,
        borderRadius: 50,
        marginTop: 20,
        backgroundColor: estilosCores.verde_claro,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSecundary:{
        width: 120,
        height: 30,
        borderRadius: 20,
        backgroundColor: estilosCores.verde_escuro,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDanger:{
        width: 110,
        height: 40,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: estilosCores.Sorange,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    //=============

    container_mapa:{
        width: '100%',
        height: 600,
        backgroundColor: 'green',
    },

    map:{
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    search:{
        width: 200,
        height: 50,
        backgroundColor: 'silver',
    },
    distancia:{
        margin: 30,
        textAlign: 'center',
    },
    picker:{
        position: 'relative',
        width: '100%',
        height: '100%',
        fontSize: 1,
        color: 'white',
    },
    input_periodo:{
        position: 'relative',
        width: '30%',
        height: '20%',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 10,
        backgroundColor: estilosCores.verde_escuro,
    },

    //================marcadores
    marcador:{
        width: 25,
        height: 25,
        borderRadius: 100,
        backgroundColor: estilosCores.verde_medio,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: estilosCores.verde_escuro,
    },
  
   

})