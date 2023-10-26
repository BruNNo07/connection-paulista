import React, { useContext, useEffect, useState } from "react";
import { View,Text,FlatList, TextInput, TouchableOpacity } from "react-native";
import { Modal, Slider } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavMenu } from "../components/navMenu";
import { JobConteiner } from "../components/JobConteiner";
import { Briefcase, FunnelSimple, Plus } from "phosphor-react-native";
import { UserContext, UserContextProps} from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { getAllJobs } from "../firebase/functions/database";

export type JobsProps = {
  key:string
  benefits: string[]
  company: string
  companyLocale: string
  createdAt: string
  description: string
  functions: string[]
  position: string
  salary: number
  seniority: string
  typeContract: 'CLT' | 'PJ' | 'Temporário'
}

export function Jobs(){
  const [modalVisible, setModalVisible] = useState(false);
  const [jobs, setJobs] = useState<JobsProps[]>([])

  async function FetchJobs() {
    const jobsData = await getAllJobs()

    setJobs(jobsData)
  }

  useEffect(()=>{
    FetchJobs()
  },[jobs])


  const { navigate } = useNavigation()

  const user = useContext(UserContext)

  useEffect(()=>{
    user?.fetchUser()
  },[])

  if (user?.loadingUser) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-900">
        <Text className="text-gray-100">Loading</Text>
      </View>
    )
  }

  if(!user?.loadingUser) {
    return(
      <SafeAreaView className="flex-1 justify-between bg-zinc-900">
        <View className="px-4 flex-1">
          <View className="flex-row space-x-2 w-full items-center justify-center">
            <Briefcase size={24} color="white"/>
            <Text className="font-bold text-lg text-center text-gray-100">Vagas</Text>
          </View>
          
          <View className="flex-row space-x-2 w-full items-center justify-end mb-4">
            <TouchableOpacity className="flex-row px-4 py-2 space-x-2 items-center rounded-lg" onPress={() => setModalVisible(true)}>
              <FunnelSimple size={24} color="white"/>
              <Text className="font-bold text-lg text-gray-100">Filtrar</Text>
            </TouchableOpacity>
          </View>

          <Modal className="" isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="flex-start" top={8} size="full">
            <Modal.Content className="bg-zinc-900">
              <Modal.CloseButton />
              <Modal.Header className="bg-zinc-900">
                <Text className="text-gray-100 text-lg font-bold">Filtrar</Text>
              </Modal.Header>
              <Modal.Body className="space-y-3">
                <View className="space-y-1">
                  <Text className="text-gray-100 font-semibold">Posição</Text>
                  <TextInput placeholder="Analista Administrativo" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" placeholderTextColor='gray' />
                </View>
                <View className="space-y-1">
                  <Text className="text-gray-100 font-semibold">Função</Text>
                  <TextInput placeholder="Analista Administrativo" className="text-zinc-900 bg-gray-100 px-2 py-1 rounded-lg" placeholderTextColor='gray' />
                </View>
                <View>
                  <Text className="text-gray-100 font-semibold">Salário</Text>
                  <Slider defaultValue={5000} minValue={0} maxValue={15000} size="lg">
                    <Slider.Track>
                      <Slider.FilledTrack />
                    </Slider.Track>
                    <Slider.Thumb />
                  </Slider>
                </View>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <FlatList 
            keyExtractor={(item) => item.company + item.position}
            data={jobs}
            renderItem={({item}) => (
              <JobConteiner company={item.company} locale={item.companyLocale} skills={item.functions} title={item.position} salary={item.salary} jobId={item.key}/>
            )}
            ListEmptyComponent={() => (
              <View className="flex-1 items-center justify-center">
                <Text>Nenhum item encontrado.</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {user?.userData?.role === 'company' && (
          <TouchableOpacity className="absolute bottom-12 right-4 rounded-full p-2 bg-blue-500 border border-gray-100" onPress={() => navigate('newJob')}>
            <Plus size={24} color="white"/>
          </TouchableOpacity>
        )}
        <NavMenu />
      </SafeAreaView>
    )
  }
  
}