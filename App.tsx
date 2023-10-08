import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View,Text,TextInput, Image  } from "react-native";
import { Login } from './src/screens/login';
import { SignUp } from './src/screens/signUp';


export default function App() {

  return (
    <View className='flex-1'>
      <SignUp />
      
      <StatusBar style='dark' translucent/>
    </View>
  )
}
