import React, { useState } from "react";
import { View ,Text,TouchableOpacity,Image,TextInput, Alert, ActivityIndicator } from "react-native";
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from "@react-navigation/native";
import { CreateUser } from "../firebase/functions/auth";
import { CreateCompanyOnDb } from "../firebase/functions/database";

export type FormCompanyData = {
  companyName: string
  companyAdress: string
  companyNumber: number
  companyNeighborhood: string
  companyComplement: string
  companyCNPJ: string
  companyCity: string
  companyAdressState: string
  email: string
  password: string
  passwordConfirm: string
}

export function FormCompany(){
  const {control, handleSubmit, formState:{ errors, isSubmitting }, getValues} = useForm<FormCompanyData>()

  const {navigate} = useNavigation()
  
  async function submitForm (data: FormCompanyData){
    const password = getValues('password')
    const passwordConfirm = getValues('passwordConfirm')

    if(password !== passwordConfirm){
      return Alert.alert('Cadastro', 'A senha e confirmação não correspondem')
    }

    try {
      const userId = await CreateUser(data.email,data.password)
      await CreateCompanyOnDb(userId, data)
      Alert.alert('Cadastro', 'Cadastro Efetuado com sucesso, favor faça seu Login.')
    } catch (error) {
      Alert.alert('Cadastro', 'Não foi possível realizar o cadastro, você ja possui uma conta com esse e-mail. Por favor realize seu login.')
    } finally {
      navigate('login')
    }
  }

  return (
  <View className="space-y-2">
    <View className="flex-row w-full justify-between space-x-2">
      <View className="flex-1 space-y-1">
        <Text className="text-gray-100 font-semibold">Nome da Empresa</Text>
        <Controller
          control={control}
          name="companyName"
          rules={{
            required: 'Campo obrigatório'
          }}
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder="Connection Paulista" 
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg"
              placeholderTextColor='gray' 
              onChangeText={onChange} 
            />
          )}
        />
        {errors.companyName?.message && <Text className="text-xs text-red-500">* {errors.companyName?.message}</Text>}
      </View>
    </View>
    <View className="flex-row w-full justify-between space-x-2">
      <View className="flex-1 space-y-1">
        <Text className="text-gray-100 font-semibold">Endereço</Text>
        <Controller
          control={control}
          name="companyAdress"
          rules={{
            required: 'Campo obrigatório'
          }}
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder="Av. Paulista"
               className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" 
              placeholderTextColor='gray' 
              onChangeText={onChange}
            />
          )}
        />
        {errors.companyAdress?.message && <Text className="text-xs text-red-500">* {errors.companyAdress?.message}</Text>}
      </View>
      <View className="space-y-1">
        <Text className="text-gray-100 font-semibold">Nª</Text>
        <Controller
          control={control}
          name="companyNumber"
          rules={{
            required: 'Campo obrigatório'
          }}
          render={({field: {onChange}}) => (
            <TextInput 
            placeholder="00" 
            className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" 
            placeholderTextColor='gray' 
            keyboardType="number-pad"
            onChangeText={onChange}
            />
          )}
        />
        {errors.companyNumber?.message && <Text className="text-xs text-red-500">* {errors.companyNumber?.message}</Text>}
      </View>
    </View>
    <View className="flex-row w-full justify-between space-x-2">
      <View className="flex-1 space-y-1">
        <Text className="text-gray-100 font-semibold">Bairro</Text>
        <Controller
          control={control}
          name="companyNeighborhood"
          rules={{
            required: 'Campo obrigatório'
          }}
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder="Bela Vista"
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" 
              placeholderTextColor='gray'
              onChangeText={onChange}
            />
          )}
        />
        {errors.companyNeighborhood?.message && <Text className="text-xs text-red-500">* {errors.companyNeighborhood?.message}</Text>}
      </View>
      <View className="flex-1 space-y-1">
        <Text className="text-gray-100 font-semibold">Complemento</Text>
        <Controller
          control={control}
          name="companyComplement"
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder="Apto N°:1"
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg"
              placeholderTextColor='gray' 
              keyboardType="number-pad"
              onChangeText={onChange}
            />
          )}
        />
        {errors.companyComplement?.message && <Text className="text-xs text-red-500">* {errors.companyComplement?.message}</Text>}
      </View>
    </View>
    <View className="flex-row w-full justify-between space-x-2">
      <View className="flex-1 space-y-1">
        <Text className="text-gray-100 font-semibold">Cidade</Text>
        <Controller
          control={control}
          name="companyCity"
          rules={{
            required: 'Campo obrigatório'
          }}
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder="São Paulo"
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" 
              placeholderTextColor='gray'
              onChangeText={onChange}
            />
          )}
        />
        {errors.companyCity?.message && <Text className="text-xs text-red-500">* {errors.companyCity?.message}</Text>}
      </View>
      <View className="flex-1 space-y-1">
        <Text className="text-gray-100 font-semibold">Estado</Text>
        <Controller
          control={control}
          name="companyAdressState"
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder="São Paulo"
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg"
              placeholderTextColor='gray' 
              keyboardType="number-pad"
              onChangeText={onChange}
            />
          )}
        />
        {errors.companyAdressState?.message && <Text className="text-xs text-red-500">* {errors.companyAdressState?.message}</Text>}
      </View>
    </View>
    <View className="flex-row w-full justify-between space-x-2">
      <View className="flex-1 space-y-1">
        <Text className="text-gray-100 font-semibold">CNPJ</Text>
        <Controller
          control={control}
          name="companyCNPJ"
          rules={{
            required: 'Campo obrigatório',
            minLength: {
              value: 14,
              message: 'Digite um CNPJ válido.'
            }
          }}
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder="00.000.000/0001-00" 
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" 
              placeholderTextColor='gray' 
              onChangeText={onChange}
            />
          )}
        />
        {errors.companyCNPJ?.message && <Text className="text-xs text-red-500">* {errors.companyCNPJ?.message}</Text>}
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
            <TextInput 
              placeholder="joao.silva@gmail.com"
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" 
              placeholderTextColor='gray'
              onChangeText={onChange}
            />
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
            <TextInput 
              placeholder="******"
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" 
              placeholderTextColor='gray'
              onChangeText={onChange}
              secureTextEntry
            />
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
            <TextInput
              placeholder="******"
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" 
              placeholderTextColor='gray'
              onChangeText={onChange}
              secureTextEntry
            />
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