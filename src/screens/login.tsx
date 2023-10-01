import { EnvelopeSimple, GoogleChromeLogo, Lock } from "phosphor-react-native";
import React from "react";
import { View ,Text,TouchableOpacity,Image,TextInput } from "react-native";

export function Login() {
  return(
    <View className="flex-1 items-center bg-white bg-cover p-4 relative">
      <View className="bg-gray-300 rounded-full w-36 h-36 absolute top-12 left-4"></View>
      <View className="bg-gray-400/80 rounded-full w-36 h-36 absolute top-[-5] left-[-12]"></View>
      <View className="bg-gray-300 rounded-full w-36 h-36 absolute top-5 right-[-16]"></View>

      <View className="flex-1 justify-center w-full">
        <Text className="text-emerald-500 font-bold text-4xl text-center">Connection</Text>
        <Text className="text-gray-400 font-bold text-4xl text-center">Paulista</Text>
        
        <Text className="mb-2 text-md font-bold mt-8">Login</Text>
        <View className="w-full px-3 py-2 bg-gray-700 flex-row rounded-lg">
          <EnvelopeSimple size={24} color="white"/>
          <TextInput placeholder="joao@email.com" className="text-white ml-2" placeholderTextColor='#d9d9d9'/>
        </View>

        <Text className="mb-2 text-md font-bold mt-4">Senha</Text>
        <View className="w-full px-3 py-2 bg-gray-700 flex-row rounded-lg">
          <Lock size={24} color="white"/>
          <TextInput placeholder="*******" className="text-white ml-2" placeholderTextColor='#d9d9d9'/>
        </View>

        <TouchableOpacity className="px-4 py-2 bg-emerald-500 w-full items-center justify-center mt-6 rounded-lg">
          <Text className="font-bold text-lg text-white">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity className="px-4 py-2 bg-blue-500 w-full items-center justify-center mt-4 rounded-lg flex-row">
          <Text className="font-bold text-lg text-white mr-2">Login com o Google</Text>
          <GoogleChromeLogo size={24} color="white"  />
        </TouchableOpacity>
        
      </View>



    </View>
  )
}

