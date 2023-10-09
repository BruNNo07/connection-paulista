import React, { useState } from "react";
import { View ,Text,TouchableOpacity,Image,TextInput } from "react-native";
import { useForm, Controller } from 'react-hook-form'

type FormCompanyData = {
  companyName: string
  companyAdress: string
  companyNumber: number
  companyNeighborhood: string
  companyComplement: string
  companyCNPJ: string
  companyEmail: string
  password: string
  passwordConfirm: string
}

export function FormCompany(){
  const {control, handleSubmit, formState:{ errors }} = useForm<FormCompanyData>()

  function submitForm(data:FormCompanyData) {
    console.log(data)
  }

  return (
  <View className="space-y-2">
    <View className="flex-row w-full justify-between space-x-2">
      <View className="flex-1 space-y-1">
        <Text>Nome da Empresa</Text>
        <Controller
          control={control}
          name="companyName"
          rules={{
            required: 'Campo obrigatório'
          }}
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder="" 
              className="text-white bg-gray-700 px-2 py-1 rounded-lg"
              placeholderTextColor='#d9d9d9' 
              onChangeText={onChange} 
            />
          )}
        />
        {errors.companyName?.message && <Text className="text-xs text-red-500">* {errors.companyName?.message}</Text>}
      </View>
    </View>
    <View className="flex-row w-full justify-between space-x-2">
      <View className="flex-1 space-y-1">
        <Text>Endereço</Text>
        <Controller
          control={control}
          name="companyAdress"
          rules={{
            required: 'Campo obrigatório'
          }}
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder=""
               className="text-white bg-gray-700 px-2 py-1 rounded-lg" 
              placeholderTextColor='#d9d9d9' 
              onChangeText={onChange}
            />
          )}
        />
        {errors.companyAdress?.message && <Text className="text-xs text-red-500">* {errors.companyAdress?.message}</Text>}
      </View>
      <View className="space-y-1">
        <Text>Nª</Text>
        <Controller
          control={control}
          name="companyNumber"
          rules={{
            required: 'Campo obrigatório'
          }}
          render={({field: {onChange}}) => (
            <TextInput 
            placeholder="" 
            className="text-white bg-gray-700 px-2 py-1 rounded-lg" 
            placeholderTextColor='#d9d9d9' 
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
        <Text>Bairro</Text>
        <Controller
          control={control}
          name="companyNeighborhood"
          rules={{
            required: 'Campo obrigatório'
          }}
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder=""
              className="text-white bg-gray-700 px-2 py-1 rounded-lg" 
              placeholderTextColor='#d9d9d9'
              onChangeText={onChange}
            />
          )}
        />
        {errors.companyNeighborhood?.message && <Text className="text-xs text-red-500">* {errors.companyNeighborhood?.message}</Text>}
      </View>
      <View className="flex-1 space-y-1">
        <Text>Complemento</Text>
        <Controller
          control={control}
          name="companyComplement"
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder=""
              className="text-white bg-gray-700 px-2 py-1 rounded-lg"
              placeholderTextColor='#d9d9d9' 
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
        <Text>CNPJ</Text>
        <Controller
          control={control}
          name="companyCNPJ"
          rules={{
            required: 'Campo obrigatório',
            pattern: {
              value:/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
              message: 'Digite um CNPJ válido.'
            }
          }}
          render={({field: {onChange}}) => (
            <TextInput 
              placeholder="" 
              className="text-white bg-gray-700 px-2 py-1 rounded-lg" 
              placeholderTextColor='#d9d9d9' 
              onChangeText={onChange}
            />
          )}
        />
        {errors.companyCNPJ?.message && <Text className="text-xs text-red-500">* {errors.companyCNPJ?.message}</Text>}
      </View>
    </View>
    <View className="flex-row w-full justify-between space-x-2">
      <View className="flex-1 space-y-1">
        <Text>E-mail</Text>
        <Controller
          control={control}
          name="companyEmail"
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
              className="text-white bg-gray-700 px-2 py-1 rounded-lg" 
              placeholderTextColor='#d9d9d9'
              onChangeText={onChange}
            />
          )}
        />
        {errors.companyEmail?.message && <Text className="text-xs text-red-500">* {errors.companyEmail?.message}</Text>}
      </View>
    </View>
    <View className="flex-row w-full justify-between space-x-2">
      <View className="flex-1 space-y-1">
        <Text>Senha</Text>
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
              className="text-white bg-gray-700 px-2 py-1 rounded-lg" 
              placeholderTextColor='#d9d9d9'
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
        <Text>Confirmar Senha</Text>
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
              className="text-white bg-gray-700 px-2 py-1 rounded-lg" 
              placeholderTextColor='#d9d9d9'
              onChangeText={onChange}
              secureTextEntry
            />
          )}
        />
        {errors.passwordConfirm?.message && <Text className="text-xs text-red-500">* {errors.passwordConfirm?.message}</Text>}
      </View>
    </View>
    <TouchableOpacity 
      className="w-full bg-green-500 items-center justify-center py-3 rounded-lg"
      onPress={handleSubmit(submitForm)}
    >
      <Text className="text-white font-bold">Cadastrar</Text>
    </TouchableOpacity>
  </View>
  )
}