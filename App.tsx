import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View } from "react-native";
import { Routes } from './src/routes';
import { Jobs } from './src/screens/jobs';


export default function App() {
  return (
    <View className='flex-1'>
      <Jobs />
      
      <StatusBar style='dark' translucent/>
    </View>
  )
}
