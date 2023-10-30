import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Text, TouchableOpacity} from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, ScrollView, View } from "native-base";
import { getUsersApply } from "../firebase/functions/database";
import { ArrowLeft } from "phosphor-react-native";
import { ApplyConteiner } from "../components/ApplyConteiner";
import { LoadingConteiner } from "../components/LoadingConteiner";
import { NavMenu } from "../components/navMenu";

type RouteParams = {
  jobId: string
}

type Applys = {
  users: string[]
}

export function Applications() {
  const route = useRoute()
  const navigation = useNavigation()

  const { jobId } = route.params as RouteParams

  const [applys, setApplys] = useState<Applys | null>(null)

  async function fetchApplys(){
    try {
      const response = await getUsersApply(jobId)

      setApplys(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApplys()
  },[]) 

  if (!applys?.users) {
    return <LoadingConteiner />
  }

  if (applys?.users) {
    return(
      <SafeAreaView className="bg-zinc-900 flex-1 px-2">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <ArrowLeft size={24} color="white"/> 
        </TouchableOpacity>
        <View className="justify-center items-center mb-4">
          <Text className="font-bold text-gray-100 text-lg">Candidaturas</Text>
          <Text className="text-gray-300">Total de candidaturas: {applys.users.length}</Text>
        </View>

        <ScrollView>
          {applys.users.map(apply => (
            <ApplyConteiner key={apply} userId={apply}/>
          ))}

          {!applys.users && (
            <View className="flex-1">
              <Text className="text-gray-100">Nenhuma candidatura encontrada.</Text>
            </View>
          )}
        </ScrollView>

        <NavMenu />
      </SafeAreaView>
    )
  }
  }
  