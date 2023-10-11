import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View } from "react-native";
import { Routes } from './src/routes';
import { Jobs } from './src/screens/jobs';
import { Login } from './src/screens/login';


export default function App() {
  return (
    <View className='flex-1'>
      <Routes />
      
      <StatusBar style='dark' translucent/>
    </View>
  )
}
