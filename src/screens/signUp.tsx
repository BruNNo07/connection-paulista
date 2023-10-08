import { Check } from "phosphor-react-native";
import React, { useState } from "react";
import { View ,Text,TouchableOpacity,Image,TextInput, ScrollView } from "react-native";
import { FormCandidate } from "../components/formCandidate";

export function SignUp() {
  const [candidate, setCandidate] = useState(true)
  const [company, setCompany] = useState(false)

  function handleToogle(){
    if(candidate) {
      setCandidate(false)
      setCompany(true)
    } else {
      setCandidate(true)
      setCompany(false)
    }
  }

  return(
    <View className="items-center bg-white bg-cover p-4 relative">
      <View className="bg-gray-300 rounded-full w-36 h-36 absolute top-12 left-4"></View>
      <View className="bg-gray-400/80 rounded-full w-36 h-36 absolute top-[-5] left-[-12]"></View>
      <View className="bg-gray-300 rounded-full w-36 h-36 absolute top-5 right-[-16]"></View>

      <View className="mt-48 items-center w-full">
        <Text className="font-bold text-lg">Crie seu cadastro</Text>

        <View className="flex-row justify-between w-full p-4">
          <View className="flex-row space-x-2 flex-1 items-center justify-center">
            <TouchableOpacity className="shadow-lg border rounded-full items-center justify-center w-5 h-5" onPress={handleToogle}>
              {candidate && <Check size={18} />}
            </TouchableOpacity>
            <Text>Candidato</Text>
          </View>
          <View className="flex-row space-x-2 flex-1 items-center justify-center">
            <TouchableOpacity className="shadow-lg border rounded-full items-center justify-center w-5 h-5" onPress={handleToogle}>
              {company && <Check size={18} />}
            </TouchableOpacity>
            <Text>Empresa</Text>
          </View>
        </View>
      </View>

      <View className="w-full space-y-2">
        {candidate ? (
          <FormCandidate />
        ):(
          // EMPRESA
          <ScrollView className="space-y-2">
            <View className="flex-row w-full justify-between space-x-2">
              <View className="flex-1 space-y-1">
                <Text>Nome da Empresa</Text>
                <TextInput placeholder="" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
              </View>
            </View>
            <View className="flex-row w-full justify-between space-x-2">
              <View className="flex-1 space-y-1">
                <Text>Endereço</Text>
                <TextInput placeholder="" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
              </View>
              <View className="space-y-1">
                <Text>Nª</Text>
                <TextInput placeholder="" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9' keyboardType="number-pad"/>
              </View>
            </View>
            <View className="flex-row w-full justify-between space-x-2">
              <View className="flex-1 space-y-1">
                <Text>Bairro</Text>
                <TextInput placeholder="" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
              </View>
              <View className="flex-1 space-y-1">
                <Text>Complemento</Text>
                <TextInput placeholder="" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9' keyboardType="number-pad"/>
              </View>
            </View>
            <View className="flex-row w-full justify-between space-x-2">
              <View className="flex-1 space-y-1">
                <Text>CNPJ</Text>
                <TextInput placeholder="" className="text-white bg-gray-700 px-2 py-1 rounded-lg" placeholderTextColor='#d9d9d9'/>
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
          </ScrollView>
          
        )}
        <TouchableOpacity className="w-full bg-green-500 items-center justify-center py-3 rounded-lg">
          <Text className="text-white font-bold">Cadastrar</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

