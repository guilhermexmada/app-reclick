import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Routes from './src/routes';
import FlashMessage from 'react-native-flash-message';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Mapa from './src/screens/Mapa';
import Rotina from './src/screens/Rotina';
import Calculadora from './src/screens/Calculadora';
import Configuracoes from './src/screens/Configuracoes';
import Cadastro from './src/screens/Cadastro';




//=================================================

import {
  useFonts,
  Comfortaa_400Regular,
  Comfortaa_700Bold,
} from '@expo-google-fonts/comfortaa';

import{
  Questrial_400Regular
}from '@expo-google-fonts/questrial';

export default function App() {

  const [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold,
    Questrial_400Regular,
  });

  const Stack = createStackNavigator();

  return (
    <>
      <Routes />
      <FlashMessage icon="auto" duration={5500} style={{ marginTop: 0 }}></FlashMessage>
    </>

    
  )
}