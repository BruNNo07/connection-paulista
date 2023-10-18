import { useNavigation } from "@react-navigation/native";
import { Select } from "native-base";
import { ArrowLeft, Minus, Plus } from "phosphor-react-native";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createJobOportunity } from "../firebase/functions/database";
import { UserContext, UserProps } from "../context/UserContext";

export type NewJobProps = {
  position: string
  description: string
  functions: string[]
  benefits: string[]
  typeContract: 'PJ' | 'CLT' | 'Temporário'
  seniority: 'Jovem Aprendiz' | 'Estagio' | 'Junior' | 'Pleno' | 'Senior'
  salary: number
}

export function NewJob(){
  const navigation = useNavigation()

  const [typeContract, setTypeContract] = useState<'PJ' | 'CLT' | 'Temporário'>('PJ')
  const [functions, setFunctions] = useState<string[]>([])
  const [functionsText, setFunctionsText] = useState<string>('')
  const [benefits, setBenefits] = useState<string[]>([])
  const [benefitsText, setBenefitsText] = useState<string>('')

  const user = useContext(UserContext)

  const { control, handleSubmit, setValue , formState: {errors, isSubmitting },getValues} = useForm<NewJobProps>()

  async function submitForm (data: NewJobProps){
    try {    
      await createJobOportunity(data, user?.userData!)
      Alert.alert('Criação de Vaga', 'Vaga Criada com sucesso.')
      navigation.navigate('jobs')
    } catch (error) {
      Alert.alert('Criação de Vaga', 'Não foi possível criar a vaga, tente novamente.')
      console.log(error)
    }
  }

  function handleAddFunctions (){
    setFunctions(state => [...state, functionsText])
    setValue('functions', functions)
    setFunctionsText('')
  }

  function handleRemFunctions (text: string){
    const newData = functions.filter(data => data !== text)

    setFunctions(newData)    
    setValue('functions', newData)
  }

  function handleAddBenefits (){
    setBenefits(state => [...state, benefitsText])
    setValue('benefits', benefits)
    setBenefitsText('')
  }

  function handleRemBenefits (text: string){
    const newData = benefits.filter(data => data !== text)

    setBenefits(newData)    
    setValue('benefits', newData)
  }

  return(
    <SafeAreaView className="flex-1 bg-zinc-900">
      <ScrollView className="px-4 py-2 space-y-3">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <ArrowLeft size={24} color="white"/> 
        </TouchableOpacity>
        <Text className="text-gray-100 font-bold text-lg text-center">Cadastre uma nova vaga</Text>

        <View className="space-y-2 mt-3">
          <View className="space-y-2">
            <Text className="text-gray-100 font-semibold mb-1">Posição</Text>
            <Controller
              control={control}
              rules={{
                required: 'Campo Obrigatório'
              }}
              name="position"
              render={({field: { onChange }})=> (
                <TextInput placeholder="Analista Administrativo" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" placeholderTextColor='gray' onChangeText={onChange}/>
              )}
            />
          </View>
        </View>

        <View className="space-y-2 mt-3">
          <View className="space-y-2">
            <Text className="text-gray-100 font-semibold mb-1">Senhoridade</Text>
            <Controller
              control={control}
              rules={{
                required: 'Campo Obrigatório'
              }}
              name="seniority"
              render={({field: { onChange, value }})=> (
                <Select onValueChange={onChange} selectedValue={value} color={'gray.100'} className="text-sm">
                  <Select.Item label="Jovem Aprendiz" value="Jovem Aprendiz" />
                  <Select.Item label="Estágio" value="Estagio" />
                  <Select.Item label="Júnior" value="Junior" />
                  <Select.Item label="Pleno" value="Pleno" />
                  <Select.Item label="Sênior" value="Senior" />
                </Select>
              )}
            />
          </View>
        </View>

        <View className="space-y-2 mt-3">
          <View className="space-y-2">
            <Text className="text-gray-100 font-semibold mb-1">Descrição da Vaga</Text>
            <Controller
              control={control}
              name="description"
              rules={{
                required: 'Campo Obrigatório'
              }}
              render={({field: { onChange }})=> (
                <TextInput 
                  multiline 
                  numberOfLines={10}
                  placeholder="Vaga voltada para..."
                  className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" 
                  placeholderTextColor='gray' 
                  onChangeText={onChange}/>
              )}
            />
          </View>
        </View>

        <View className="space-y-2">
          <Text className="text-gray-100 font-semibold mb-1">Funcões</Text>
          <View className="flex-row space-x-2">
            <TextInput
              placeholder="Você vai trabalhar com ..."
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1"
              placeholderTextColor='gray'
              onChangeText={setFunctionsText}
              onSubmitEditing={handleAddFunctions}
              value={functionsText}
            />
            <TouchableOpacity className="p-2 bg-emerald-500 items-center justify-center rounded-lg" onPress={handleAddFunctions}>
              <Text>
                <Plus size={16} color="white"/>
              </Text>
            </TouchableOpacity>
          </View>
          
          <View className="space-y-3">
            {functions.map(item => {
              return (
                <View className="flex-row space-x-2 items-center justify-center">
                  <View className="border border-emerald-500 p-1 rounded-full"></View>
                  <Text className="text-gray-100 flex-1 text-justify">{item}</Text>
                  <TouchableOpacity className="p-1" onPress={() => handleRemFunctions(item)}>
                    <Minus size={20} color="red" />
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>
        </View>

        <View className="space-y-2">
          <Text className="text-gray-100 font-semibold mb-1">Benefícios</Text>
          <View className="flex-row space-x-2">
            <TextInput
              placeholder="🚌 Vale transporte"
              className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1"
              placeholderTextColor='gray'
              onChangeText={setBenefitsText}
              onSubmitEditing={handleAddBenefits}
              value={benefitsText}
            />
            <TouchableOpacity className="p-2 bg-emerald-500 items-center justify-center rounded-lg" onPress={handleAddBenefits}>
              <Text>
                <Plus size={16} color="white"/>
              </Text>
            </TouchableOpacity>
          </View>
          
          <View className="space-y-3">
            {benefits.map(item => {
              return (
                <View className="flex-row space-x-2 items-center justify-center">
                  <View className="border border-emerald-500 p-1 rounded-full"></View>
                  <Text className="text-gray-100 flex-1 text-justify">{item}</Text>
                  <TouchableOpacity className="p-1" onPress={() => handleRemBenefits(item)}>
                    <Minus size={20} color="red" />
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>
        </View>

        <View className="">
          <Text className="text-gray-100 font-semibold">Tipo de Contrato</Text>
          <View className="flex-row space-x-2 justify-around mt-1">
            {typeContract === 'PJ' ? (
              <TouchableOpacity onPress={() => {setTypeContract('PJ'), setValue('typeContract', 'PJ') }} className="rounded border border-gray-100 bg-orange-500 w-24 py-1 items-center">
                <Text className="text-gray-100">PJ</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => {setTypeContract('PJ'), setValue('typeContract', 'PJ') }} className="rounded border border-orange-500 w-24 py-1 items-center">
                <Text className="text-gray-100">PJ</Text>
              </TouchableOpacity>
            )}
            {typeContract === 'CLT' ? (
              <TouchableOpacity onPress={() => {setTypeContract('CLT'), setValue('typeContract', 'CLT') }} className="rounded border border-gray-100 bg-orange-500 w-24 py-1 items-center">
                <Text className="text-gray-100">CLT</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => {setTypeContract('CLT'), setValue('typeContract', 'CLT') }} className="rounded border border-orange-500 w-24 py-1 items-center">
                <Text className="text-gray-100">CLT</Text>
              </TouchableOpacity>
            )}
            {typeContract === 'Temporário' ? (
              <TouchableOpacity onPress={() => {setTypeContract('Temporário'), setValue('typeContract', 'Temporário') }} className="rounded border border-gray-100 bg-orange-500 w-24 py-1 items-center">
                <Text className="text-gray-100">Temporário</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => {setTypeContract('Temporário'), setValue('typeContract', 'Temporário') }} className="rounded border border-orange-500 w-24 py-1 items-center">
                <Text className="text-gray-100">Temporário</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View className="">
          <Text className="text-gray-100 font-semibold mb-1">Salário</Text>
          <Controller
            control={control}
            name="salary"
            rules={{
              required: 'Se não deseja informar salário, favor preencha 0.'
            }}
            render={({field: { onChange }})=> (
              <TextInput 
                defaultValue='0'
                className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg"
                placeholderTextColor='gray' 
                onChangeText={onChange}
                keyboardType="number-pad"
              />
            )}
          />
        </View>

        <TouchableOpacity 
          onPress={handleSubmit(submitForm)}
          className="w-full bg-emerald-500 px-4 py-3 items-center mb-5 rounded-lg"
        >
          <Text className="text-gray-100 font-bold">Publicar Vaga</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}