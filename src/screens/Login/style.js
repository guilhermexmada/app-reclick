//ESTILOS LOGIN

import { StyleSheet } from "react-native";
import  estilosCores from '../../styles/colors.js';
import  estilosFontes from '../../styles/fonts.js';


export const estilosLogin = StyleSheet.create({
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
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    logo:{
        marginTop: 30,
        width: 250,
        height: 100,
    },
    texto:{
        margin: 10,
    },
    btnText:{
        textAlign: 'center',
        fontFamily: estilosFontes.heading,
        color: 'white',
        fontSize: 15,
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
        width: 150,
        height: 45,
        borderRadius: 50,
        marginTop: 45,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: estilosCores.verde_claro,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSecundary:{
        width: 120,
        height: 30,
        borderRadius: 20,
        margin: 10,
        backgroundColor: estilosCores.verde_escuro,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

})