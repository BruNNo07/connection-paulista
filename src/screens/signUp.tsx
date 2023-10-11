import { ArrowLeft, Check } from "phosphor-react-native";
import React, { useState } from "react";
import { View ,Text,TouchableOpacity,Image,TextInput, ScrollView } from "react-native";
import { FormCandidate } from "../components/formCandidate";
import { FormCompany } from "../components/formCompany";
import { useNavigation } from "@react-navigation/native";


export function SignUp() {
  const [candidate, setCandidate] = useState(true)
  const [company, setCompany] = useState(false)

  const {navigate} =useNavigation()

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
    <ScrollView className="bg-zinc-900 bg-cover relative">
      <View className="bg-zinc-800 rounded-full w-36 h-36 absolute top-12 left-4"></View>
      <View className="bg-zinc-800/70 rounded-full w-36 h-36 absolute top-[-5] left-[-12]"></View>
      <View className="bg-zinc-700 rounded-full w-36 h-36 absolute top-5 right-[-16]"></View>
      <TouchableOpacity className="absolute top-8 left-6 bg-gray-100 p-1 rounded-full" onPress={() => navigate('login')}>
        <ArrowLeft size={18} color="black"/>
      </TouchableOpacity>

      <View className="mt-48 items-center w-full">
        <Text className="font-bold text-lg text-gray-100">Crie seu cadastro</Text>

        <View className="flex-row justify-between w-full p-4">
          <View className="flex-row space-x-2 flex-1 items-center justify-center">
            <TouchableOpacity className="shadow-lg border border-white rounded-full items-center justify-center w-6 h-6" onPress={handleToogle}>
              {candidate && <Check size={20} color="green"/>}
            </TouchableOpacity>
            <Text className="text-gray-100 text-md font-bold">Candidato</Text>
          </View>
          <View className="flex-row space-x-2 flex-1 items-center justify-center">
            <TouchableOpacity className="shadow-lg border border-white rounded-full items-center justify-center w-6 h-6" onPress={handleToogle}>
              {company && <Check size={20} color="green"/>}
            </TouchableOpacity>
            <Text className="text-gray-100 text-md font-bold">Empresa</Text>
          </View>
        </View>
      </View>

      <View className="w-full space-y-2 p-4">
        {candidate ? (
          <FormCandidate />
        ):(
          <FormCompany  />
        )}
      </View>
      
    </ScrollView>
  )
}

