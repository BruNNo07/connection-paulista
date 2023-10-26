import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Text,TextInput,TouchableOpacity,View } from 'react-native'
import { NavMenu } from "../components/navMenu";
import { UserContext, UserProps } from "../context/UserContext";
import { Avatar, ScrollView } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { updateUserData } from "../firebase/functions/database";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_ID } from "../firebase/AsyncStorage-Keys";

type ProfileProps = UserProps & {
  photoUrl: string
}

export function Profile(){
  const navigation = useNavigation()

  const user = useContext(UserContext)
  
  useEffect(() => {
    user?.fetchUser()
  },[])

  const { control, handleSubmit, setValue , formState: {errors, isSubmitting },getValues} = useForm<ProfileProps>()

  function transferDataToForm(){
    if (user?.userData?.role === 'company'){
      setValue('companyName', user?.userData?.companyName)
      setValue('companyAdress', user?.userData?.companyAdress)
      setValue('companyNumber', user?.userData?.companyNumber)
      setValue('companyNeighborhood', user?.userData?.companyNeighborhood)
      setValue('companyCity', user?.userData?.companyCity)
      setValue('companyAdressState', user?.userData?.companyAdressState)
    } else if(user?.userData?.role === `candidate`) {
      setValue('name', user?.userData?.name)
      setValue('lastName', user?.userData?.lastName)
      setValue('phone', user?.userData?.phone)
    }
    
  }

  async function onSubmit (data: ProfileProps){
    try {
      await updateUserData(user?.userId!, user?.userData?.role!, data)
    } catch (error) {
      Alert.alert('Salvar Alterações', 'Não foi possivel salvar as alterações.')
    }
  }

  async function handleLogout() {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        onPress: () => {AsyncStorage.removeItem(USER_ID),navigation.navigate('login')}
      },

    ])
  }

  

  useEffect(() =>{
    transferDataToForm()
  },[])

  if (user?.loadingUser){
    return (
      <SafeAreaView className="flex-1 bg-zinc-900 items-center justify-center">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-100 font-bold">Loading...</Text>
        </View>
        
        <NavMenu />
      </SafeAreaView>
    )
  }

  if (!user?.loadingUser){
    return(
      <SafeAreaView className="flex-1 bg-zinc-900 items-center justify-center px-1">
        <View className="items-center my-4 space-y-2">
          {user?.userData?.role === 'company' ? (
            <Text className="text-lg text-gray-100 font-semibold">
              Olá, {user?.userData?.companyName}
            </Text>
          ):
          (
            <Text className="text-lg text-gray-100 font-semibold">
              Olá, {user?.userData?.name}
            </Text>
          )}
          
        </View>
        
        <Text className="text-gray-100 font-semibold text-md">Dados Cadastrais</Text>
        <ScrollView className="flex-1 w-full px-2 mt-2 space-y-4">
          {user?.userData?.role === 'company' ? (
            <>
            <View className="">
              <Text className="text-gray-100 mb-1">Nome Empresa</Text>
              <Controller
                control={control}
                rules={{
                  required: 'Campo Obrigatório'
                }}
                name="companyName"
                render={({field: { onChange,value }})=> (
                  <TextInput placeholder="Analista Administrativo" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1" placeholderTextColor='gray' value={value} onChangeText={onChange}/>
                )}
              />
            </View>
            
            <View className="flex-row space-x-2">
              <View className="flex-1">
                <Text className="text-gray-100 mb-1">Endereço</Text>
                <Controller
                  control={control}
                  rules={{
                    required: 'Campo Obrigatório'
                  }}
                  name="companyAdress"
                  render={({field: { onChange,value }})=> (
                    <TextInput placeholder="Rua Tal" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1" placeholderTextColor='gray' value={value} onChangeText={onChange}/>
                  )}
                />
              </View>

              <View className="">
                <Text className="text-gray-100 mb-1">Nª</Text>
                <Controller
                  control={control}
                  rules={{
                    required: 'Campo Obrigatório'
                  }}
                  name="companyNumber"
                  render={({field: { onChange,value }})=> (
                    <TextInput placeholder="12345" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1" placeholderTextColor='gray' value={String(value)} onChangeText={onChange}/>
                  )}
                />
              </View>
            </View>
            
            <View className="flex-row space-x-2 justify-between">
              <View className="flex-1">
                <Text className="text-gray-100 mb-1">Complemento</Text>
                <Controller
                  control={control}
                  name="companyComplement"
                  render={({field: { onChange,value }})=> (
                    <TextInput placeholder="" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1" placeholderTextColor='gray' value={value} onChangeText={onChange}/>
                  )}
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-100 mb-1">Bairro</Text>
                <Controller
                  control={control}
                  rules={{
                    required: 'Campo Obrigatório'
                  }}
                  name="companyNeighborhood"
                  render={({field: { onChange,value }})=> (
                    <TextInput placeholder="" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1" placeholderTextColor='gray' value={value} onChangeText={onChange}/>
                  )}
                />
              </View>
            </View>

            <View className="flex-row space-x-2 justify-between">
              <View className="flex-1">
                <Text className="text-gray-100 mb-1">Cidade</Text>
                <Controller
                  control={control}
                  rules={{
                    required: 'Campo Obrigatório'
                  }}
                  name="companyCity"
                  render={({field: { onChange,value }})=> (
                    <TextInput placeholder="12345" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1" placeholderTextColor='gray' value={value} onChangeText={onChange}/>
                  )}
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-100 mb-1">Estado</Text>
                <Controller
                  control={control}
                  rules={{
                    required: 'Campo Obrigatório'
                  }}
                  name="companyAdressState"
                  render={({field: { onChange,value }})=> (
                    <TextInput placeholder="12345" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1" placeholderTextColor='gray' value={value} onChangeText={onChange}/>
                  )}
                />
              </View>
            </View>

            <TouchableOpacity className="flex-1 bg-gray-100 items-center justify-center p-2 rounded-lg" onPress={handleSubmit(onSubmit)}>
              <Text className="text-zinc-900 font-bold">Salvar Alterações</Text>
            </TouchableOpacity>
            </>
          ): (
            <>
            <View className="">
              <Text className="text-gray-100 mb-1">Nome</Text>
              <Controller
                control={control}
                rules={{
                  required: 'Campo Obrigatório'
                }}
                name="name"
                render={({field: { onChange,value }})=> (
                  <TextInput placeholder="Analista Administrativo" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1" placeholderTextColor='gray' value={value} onChangeText={onChange}/>
                )}
              />
            </View>

            <View className="">
              <Text className="text-gray-100 mb-1">Sobrenome</Text>
              <Controller
                control={control}
                rules={{
                  required: 'Campo Obrigatório'
                }}
                name="lastName"
                render={({field: { onChange,value }})=> (
                  <TextInput placeholder="Analista Administrativo" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1" placeholderTextColor='gray' value={value} onChangeText={onChange}/>
                )}
              />
            </View>

            <View className="">
              <Text className="text-gray-100 mb-1">Sobrenome</Text>
              <Controller
                control={control}
                rules={{
                  required: 'Campo Obrigatório'
                }}
                name="phone"
                render={({field: { onChange,value }})=> (
                  <TextInput placeholder="Analista Administrativo" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg flex-1" placeholderTextColor='gray' value={value} onChangeText={onChange}/>
                )}
              />
            </View>
            
            <TouchableOpacity className="flex-1 bg-gray-100 items-center justify-center p-2 rounded-lg" onPress={handleSubmit(onSubmit)}>
              <Text className="text-zinc-900 font-bold">Salvar Alterações</Text>
            </TouchableOpacity>
            </>
          )}
        </ScrollView>
        
        <TouchableOpacity className="rounded-lg bg-red-500 w-full items-center py-2 mb-2" onPress={handleLogout}>
          <Text className="font-bold text-gray-100">Sair</Text>
        </TouchableOpacity>
        <NavMenu />
      </SafeAreaView>
    )    
  }
}