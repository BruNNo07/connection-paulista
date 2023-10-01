import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View,Text,TextInput, Image  } from "react-native";
import { Login } from './src/screens/login';


export default function App() {

  return (
    <View className='flex-1'>
      <Login />
      
      <StatusBar style='dark' translucent/>
    </View>
  )
}
