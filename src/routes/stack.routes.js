import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

//

import Home from '../screens/Home';
import Cadastro from '../screens/Cadastro';
import Login from '../screens/Login';
import Rotina from '../screens/Rotina';
import Calculadora from '../screens/Calculadora';
import Mapa from '../screens/Mapa';
import Configuracoes from '../screens/Configuracoes';

const Stack = createNativeStackNavigator();

function StackNavigator(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/*Defina aqui todas as telas do aplicativo
               o primeiro que aparece é o primeiro a ser aberto*/}
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Cadastro" component={Cadastro}></Stack.Screen>
            <Stack.Screen name="Rotina" component={Rotina}></Stack.Screen>
            <Stack.Screen name="Calculadora" component={Calculadora}></Stack.Screen>
            <Stack.Screen name="Mapa" component={Mapa}></Stack.Screen>
            <Stack.Screen name="Configuracoes" component={Configuracoes}></Stack.Screen>
        </Stack.Navigator>
    )
}

function AppRoutes(){
    return(
        <NavigationContainer>
           <StackNavigator></StackNavigator>
        </NavigationContainer>
    )
}

export default AppRoutes;