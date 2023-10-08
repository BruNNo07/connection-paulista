import React, { useState } from "react";
import { View ,Text,TouchableOpacity,Image,TextInput } from "react-native";

export function FormCandidate(){
  return(
    <View className="space-y-2">
      {/* CANDIDATO */}
      <View className="flex-row w-full justify-between space-x-2">
        <View className="flex-1 space-y-1">
          <Text>Nome</Text>
          <TextInput placeholder="João" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
        </View>
        <View className="flex-1 space-y-1">
          <Text>Sobrenome</Text>
          <TextInput placeholder="Silva" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
        </View>
      </View>
      <View className="flex-row w-full justify-between space-x-2">
        <View className="flex-1 space-y-1">
          <Text>CPF</Text>
          <TextInput placeholder="000.000.000-00" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
        </View>
      </View>
      <View className="flex-row w-full justify-between space-x-2">
        <View className="flex-1 space-y-1">
          <Text>Telefone</Text>
          <TextInput placeholder="(11) 98888-7777" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
        </View>
      </View>
      <View className="flex-row w-full justify-between space-x-2">
        <View className="flex-1 space-y-1">
          <Text>E-mail</Text>
          <TextInput placeholder="joao.silva@gmail.com" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
        </View>
      </View>
      <View className="flex-row w-full justify-between space-x-2">
        <View className="flex-1 space-y-1">
          <Text>Senha</Text>
          <TextInput placeholder="******" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
        </View>
      </View>
      <View className="flex-row w-full justify-between space-x-2 mb-2">
        <View className="flex-1 space-y-1">
          <Text>Confirmar Senha</Text>
          <TextInput placeholder="******" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
        </View>
      </View>
    </View>
  )
}