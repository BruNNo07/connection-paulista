import { useNavigation } from "@react-navigation/native";
import { EnvelopeSimple, GoogleChromeLogo, Lock } from "phosphor-react-native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View ,Text,TouchableOpacity,Image,TextInput,ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { LoginUser } from "../firebase/functions/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_ID } from "../firebase/AsyncStorage-Keys";

export type FormLoginData = {
  user: string
  password: string
}

export function Login() {


  const {navigate} = useNavigation()

  async function fetchUserAsyncStorage() {
    const userId = await AsyncStorage.getItem(USER_ID)

    if (userId !== null ) {
      navigate('jobs')
    }
  }

  useEffect(() => {
    fetchUserAsyncStorage()
  },[])

  const {control, handleSubmit, formState: {errors}} = useForm<FormLoginData>()

  async function submitForm (data: FormLoginData){
    try {
      await LoginUser(data)
      navigate('jobs')
    } catch (error) {
      console.log(error)
    }
  }
  
  return(
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={20} className="flex-1 bg-white bg-cover relative">
      <View className="bg-gray-300 rounded-full w-36 h-36 absolute top-12 left-4"></View>
      <View className="bg-gray-400/80 rounded-full w-36 h-36 absolute top-[-5] left-[-12]"></View>
      <View className="bg-gray-300 rounded-full w-36 h-36 absolute top-5 right-[-16]"></View>

      <View className="flex-1 justify-center w-full p-4">
        <View className="flex-1 items-center justify-center my-36">
          <Text className="text-4xl font-bold text-emerald-500">Connection</Text>
          <Text className="text-4xl font-bold text-gray-700">Paulista</Text>
        </View>
        <Text className="mb-2 text-md font-bold">Login</Text>
        <View className="w-full px-3 py-2 bg-gray-700 flex-row rounded-lg">
          <EnvelopeSimple size={24} color="white"/>
          <Controller
            control={control}
            name="user"
            rules={{
              required: 'Campo obrigatório'
            }}
            render={({field: {onChange}}) => (
              <TextInput placeholder="joao@email.com" className="text-white ml-2" placeholderTextColor='#d9d9d9' onChangeText={onChange} keyboardType="email-address" />
            )}
          />
        </View>

        <Text className="mb-2 text-md font-bold mt-4">Senha</Text>
        <View className="w-full px-3 py-2 bg-gray-700 flex-row rounded-lg">
          <Lock size={24} color="white"/>
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Campo obrigatório'
            }}
            render={({field: {onChange}}) => (
              <TextInput placeholder="*******" className="text-white ml-2" placeholderTextColor='#d9d9d9' onChangeText={onChange} secureTextEntry/>
            )}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit(submitForm)}
          className="px-4 py-2 bg-emerald-500 w-full items-center justify-center mt-6 rounded-lg"
        >
          <Text className="font-bold text-lg text-white">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="px-4 py-2 bg-blue-500 w-full items-center justify-center my-4 rounded-lg"
          onPress={() => navigate('signUp')}
        >
          <Text className="font-bold text-lg text-white">Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

