import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View } from "react-native";
import { Routes } from './src/routes';
import { UserContextProvider } from './src/context/UserContext';
import { NativeBaseProvider } from 'native-base';


export default function App() {
  return (
    <View className='flex-1'>
      <UserContextProvider>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </UserContextProvider>
      
      <StatusBar style='light' translucent/>
    </View>
  )
}
