import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavMenu } from "../components/navMenu";
import { ScrollView } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createUserApply, getJobDetails } from "../firebase/functions/database";
import { JobsProps } from "./jobs";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import { ArrowLeft, Circle, MapPin } from "phosphor-react-native";
import { UserContext } from "../context/UserContext";

type RouteParams = {
  jobId: string
}

export function JobDetails (){
  const route = useRoute()
  const navigation = useNavigation()

  const { jobId } = route.params as RouteParams

  const [jobDetails, setJobDetails] = useState<JobsProps | null>(null)
  const [postDate, setPostDate] = useState('')

  async function FetchJobDetails () {
    try {
      const response = await getJobDetails(jobId)

      if(response) {
        setJobDetails(response)
      }
    } catch (error) {
      console.log(error)
    }finally {

    }    
  }

  function handleCalculatePostedAt() {
    if(jobDetails){
      const postDate = new Date(jobDetails.createdAt).getTime() 
      const nowDate = new Date().getTime()
      const days =  ( nowDate - postDate ) / 86400000 
      const hours = ( nowDate - postDate ) / 3600000
      const minutes = ( ( nowDate - postDate )  / 60000 ) % 60

      if (days >= 1) {
        setPostDate(Math.floor(days) + ' dias')
      } else if(hours >= 1) {
        setPostDate(Math.floor(hours) + ' horas')
      } else {
        setPostDate(Math.floor(minutes) + ' minutos')
      }
    }
   
  }

  async function handleCreateUserApply() {
    try {
      if(user){
        await createUserApply(jobId, user?.userId)
      }
      Alert.alert('Candidatar-se', 'Candidatura realizada com sucesso.')
    } catch (error) {
      Alert.alert('Candidatar-se', String(error))
      console.log(error)
    }
  }

  useEffect(() => {
    FetchJobDetails()
  },[])

  useEffect(() => {
    handleCalculatePostedAt()
  },[jobDetails])

  const user = useContext(UserContext)
  
  useEffect(() => {
    user?.fetchUser()
  },[])
  
  if (!postDate){
    return (
      <SafeAreaView className="flex-1 bg-zinc-900 items-center justify-center">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-100 font-bold">Loading...</Text>
        </View>
        
        <NavMenu />
      </SafeAreaView>
    )
  }

  return(
    <SafeAreaView className="flex-1 bg-zinc-900 px-2">
      <TouchableOpacity onPress={() => navigation.navigate('jobs')} className="p-2">
        <ArrowLeft size={24} color="white"/> 
      </TouchableOpacity>
      
      <View className="space-y-1">
        <Text className="text-xl text-gray-100 text-center font-bold">{jobDetails?.position}</Text>
        <Text className="text-md text-gray-400 text-center">{jobDetails?.seniority}</Text>
        <Text className="text-md text-gray-400 text-center">{jobDetails?.company}</Text>
        <View className="flex-row items-center space-x-2 justify-center">
          <MapPin size={16} color="blue"/>
          <Text className="text-md text-gray-400 text-center">{jobDetails?.companyLocale}</Text>
        </View>
      </View>

      <View className="flex-row justify-end mt-2 pb-4">
        <Text className="text-gray-300 text-end">Postado há: {postDate}</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="mt-2">
          <Text className="text-gray-100 text-justify w-full">{jobDetails?.description} </Text>
        </View>

        <View className="mt-4 space-y-2">
          <Text className="text-gray-100 font-semibold">Principais Funções</Text>

          {jobDetails?.functions && jobDetails?.functions.map((jobFunction) => {
            return (
              <View className="flex-row items-center space-x-2"key={jobFunction}>
                <Circle size={12} color="green"/>
                <Text className="text-gray-100">{jobFunction}</Text>
              </View>
            )
          })}
        </View>

        <View className="mt-4 space-y-2">
          <Text className="text-gray-100 font-semibold">Beneficios</Text>

          {jobDetails?.benefits && jobDetails?.benefits.map((jobFunction) => {
            return (
              <View className="flex-row items-center space-x-2" key={jobFunction}>
                <Circle size={12} color="green"/>
                <Text className="text-gray-100">{jobFunction}</Text>
              </View>
            )
          })}
        </View>

        <View className="mt-4 space-y-1">
          <Text className="text-gray-100"> 📋 Contrato: {jobDetails?.typeContract}</Text>
          {jobDetails?.salary && <Text className="text-gray-100"> 💰 Salário: {Number(jobDetails?.salary).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>}
        </View>

      </ScrollView>

      {user?.userData?.role === 'candidate' && (
        <TouchableOpacity className="bg-emerald-500 rounded py-2 items-center my-3" onPress={handleCreateUserApply}>
          <Text className="text-gray-100 font-bold text-lg">Candidatar-se</Text>
        </TouchableOpacity>
      )}

      {user?.userData?.companyName === jobDetails?.company && (
        <TouchableOpacity className="bg-blue-500 rounded py-2 items-center my-3" onPress={() => navigation.navigate('applications', { jobId })}>
          <Text className="text-gray-100 font-bold text-lg">Visualizar Candidaturas</Text>
        </TouchableOpacity>
      )}
      
      <NavMenu />
    </SafeAreaView>
  )
}