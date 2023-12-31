import React, { useState } from "react";
import { View ,Text,TouchableOpacity,Image,TextInput, Alert, ActivityIndicator } from "react-native";
import { useForm, Controller } from 'react-hook-form'
import { CreateUser } from "../firebase/functions/auth";
import { useNavigation } from "@react-navigation/native";
import { CreateCandidateOnDb } from "../firebase/functions/database";
import { formatCPF } from "../utils/functions";

export type FormCandidateData ={
  name: string
  lastName: string
  cpf: string
  phone: string
  email: string
  password: string
  passwordConfirm: string
}

export function FormCandidate(){
  const [cpf, setCpf] = useState('')
  const {control, handleSubmit, formState: {errors, isSubmitting },getValues} = useForm<FormCandidateData>()

  const {navigate} = useNavigation()
  async function submitForm (data: FormCandidateData){
    const password = getValues('password')
    const passwordConfirm = getValues('passwordConfirm')

    if(password !== passwordConfirm){
      return Alert.alert('Cadastro', 'A senha e confirmação não correspondem')
    }

    try {
      const userId = await CreateUser(data.email,data.password)
      await CreateCandidateOnDb(userId, data)
      Alert.alert('Cadastro', 'Cadastro Efetuado com sucesso, favor faça seu Login.')
    } catch (error) {
      Alert.alert('Cadastro', 'Não foi possível realizar o cadastro, você ja possui uma conta com esse e-mail. Por favor realize seu login.')
    } finally {
      navigate('login')
    }
  }

  return(
    <View className="space-y-2">
      <View className="flex-row w-full justify-between space-x-2">
        <View className="flex-1 space-y-1">
          <Text className="text-gray-100 font-semibold">Nome</Text>
          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Campo obrigatório'
            }}
            render={({field: {onChange}}) => (
              <TextInput placeholder="João" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" placeholderTextColor='gray' onChangeText={onChange}/>
            )}
          />
          {errors.name?.message && <Text className="text-xs text-red-500">* {errors.name?.message}</Text>}
        </View>
        <View className="flex-1 space-y-1">
          <Text className="text-gray-100 font-semibold">Sobrenome</Text>
          <Controller
            control={control}
            name="lastName"
            rules={{
              required: 'Campo obrigatório'
            }}
            render={({field: {onChange}}) => (
              <TextInput placeholder="Silva" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" placeholderTextColor='gray' onChangeText={onChange}/>
            )}
          />
          {errors.lastName?.message && <Text className="text-xs text-red-500">* {errors.lastName?.message}</Text>}
        </View>
      </View>
      <View className="flex-row w-full justify-between space-x-2">
        <View className="flex-1 space-y-1">
          <Text className="text-gray-100 font-semibold">CPF</Text>
          <Controller
            control={control}
            name="cpf"
            rules={{
              required: 'Campo obrigatório',
              minLength: {
                value: 11,
                message: 'Digite um CPF válido'
              }
            }}
            render={({field: {onChange,value}}) => (
              <TextInput placeholder="000.000.000-00" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" placeholderTextColor='gray' onEndEditing={() => setCpf(formatCPF(value))} onChangeText={onChange}/>
            )}
          />
          {errors.cpf?.message && <Text className="text-xs text-red-500">* {errors.cpf?.message}</Text>}
        </View>
      </View>
      <View className="flex-row w-full justify-between space-x-2">
        <View className="flex-1 space-y-1">
          <Text className="text-gray-100 font-semibold">Telefone</Text>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: 'Campo obrigatório',
              pattern:{
                value: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
                message: 'Digite um telefone Válido'
              }
            }}
            render={({field: {onChange}}) => (
              <TextInput placeholder="(11) 98888-7777" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" placeholderTextColor='gray' onChangeText={onChange}/>
            )}
          />
          {errors.phone?.message && <Text className="text-xs text-red-500">* {errors.phone?.message}</Text>}
        </View>
      </View>
      <View className="flex-row w-full justify-between space-x-2">
        <View className="flex-1 space-y-1">
          <Text className="text-gray-100 font-semibold">E-mail</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Campo obrigatório',
              pattern:{
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Digite um email Válido'
              }
            }}
            render={({field: {onChange}}) => (
              <TextInput placeholder="joao.silva@gmail.com" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" placeholderTextColor='gray' onChangeText={onChange}/>
            )}
          />
          {errors.email?.message && <Text className="text-xs text-red-500">* {errors.email?.message}</Text>}
        </View>
      </View>
      <View className="flex-row w-full justify-between space-x-2">
        <View className="flex-1 space-y-1">
          <Text className="text-gray-100 font-semibold">Senha</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Campo obrigatório',
              minLength: {
                value: 8,
                message: 'Digite uma senha com no mínimo 8 caractéres'
              }
            }}
            render={({field: {onChange}}) => (
              <TextInput placeholder="******" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" placeholderTextColor='gray' secureTextEntry onChangeText={onChange}/>
            )}
          />
          {errors.password?.message && <Text className="text-xs text-red-500">* {errors.password?.message}</Text>}
        </View>
      </View>
      <View className="flex-row w-full justify-between space-x-2 mb-2">
        <View className="flex-1 space-y-1">
          <Text className="text-gray-100 font-semibold">Confirmar Senha</Text>
          <Controller
            control={control}
            name="passwordConfirm"
            rules={{
              required: 'Campo obrigatório',
              minLength: {
                value: 8,
                message: 'Digite uma senha com no mínimo 8 caractéres'
              }
            }}
            render={({field: {onChange}}) => (
              <TextInput placeholder="******" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" placeholderTextColor='gray' secureTextEntry onChangeText={onChange}/>
            )}
          />
          {errors.passwordConfirm?.message && <Text className="text-xs text-red-500">* {errors.passwordConfirm?.message}</Text>}
        </View>
      </View>
      {
      isSubmitting ? (
        <TouchableOpacity 
          className="w-full flex-row space-x-2 bg-green-500 items-center justify-center py-3 rounded-lg"
          onPress={handleSubmit(submitForm)}
        > 
          <ActivityIndicator color={'black'}/>
          <Text className="text-zinc-900 font-bold">Cadastrar</Text>
        </TouchableOpacity>
      ):(
        <TouchableOpacity 
          className="w-full flex-row space-x-2 bg-green-500 items-center justify-center py-3 rounded-lg"
          onPress={handleSubmit(submitForm)}
        > 
          <Text className="text-zinc-900 font-bold">Cadastrar</Text>
        </TouchableOpacity>
      )
    }
    </View>
  )
}

