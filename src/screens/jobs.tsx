import React, { useEffect, useState } from "react";
import { View,Text,FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavMenu } from "../components/navMenu";
import { JobConteiner } from "../components/JobConteiner";
import { Briefcase } from "phosphor-react-native";

type JobsProps = {
  company: string
  title: string
  description: string
  createdAt: Date
  skills: string[]
  locale: string
  salary?: number
}

export function Jobs(){
  const [filterTitle, setFilterTitle] = useState('')
  const [filterSkills, setFilterSkills] = useState('')
  const initialData = [
    {
      company: 'Focus Paulista',
      title: 'Analista Administrativo Jr',
      description: 'Vaga na Região da Paulista, para pessoas que estão buscando uma oportunidade de ingressar na carreira de Analista Administrativo.',
      skills: ['Pro Atividade', 'Pacote Office', 'Inglês Avançado'],
      locale: 'Avenida Paulista, 1000 - 15ª andar',
      salary: 2000,
      createdAt: new Date()
    },
    {
      company: 'Consolação Enterprise',
      title: 'Desenvolvedor Back-End',
      description: 'Vaga na Região da Paulista, para pessoas que estão buscando uma oportunidade de ingressar na carreira de Dev.',
      skills: ['Pro Atividade', 'Pacote Office', 'NodeJs'],
      locale: 'Avenida Consolação, 2000 - 1ª andar',
      salary: 3500,
      createdAt: new Date()
    }
  ]
  const [jobs, setJobs] = useState<JobsProps[]>(initialData)

  useEffect(() =>{
    if (filterTitle.trim() === '' && filterSkills.trim() === '') {
      return setJobs(initialData)
    } else if (filterTitle.trim() !== '') {
      const newData = jobs.filter(job => job.title.toUpperCase().includes(filterTitle.toUpperCase()))
      return setJobs(newData)
    } else if (filterSkills.trim() !== '') {
      const newData = jobs.filter(job => job.skills.find(skill => skill.toUpperCase().includes(filterSkills.toUpperCase())))
      return setJobs(newData)
    }else {
      return setJobs(initialData)
    }
  },[filterTitle,filterSkills])

  return(
    <SafeAreaView className="flex-1 justify-between bg-white">
      <View className="px-4 flex-1">
        <View className="flex-row space-x-2 w-full items-center justify-center">
          <Briefcase size={24}/>
          <Text className="font-bold text-lg text-center">Vagas</Text>
        </View>
        
        <View className="space-y-2 my-5">
          <TextInput className="w-full bg-gray-800 rounded-lg p-2 text-white" placeholderTextColor={'gray'} placeholder="Filtre por: Titulo" onChangeText={setFilterTitle}/>
          <TextInput className="w-full bg-gray-800 rounded-lg p-2 text-white" placeholderTextColor={'gray'} placeholder="Filtre por: Skills"  onChangeText={setFilterSkills}/>
        </View>

        <FlatList 
          keyExtractor={(item) => item.company + item.title}
          data={jobs}
          renderItem={({item}) => (
            <JobConteiner company={item.company} locale={item.locale} skills={item.skills} title={item.title} salary={item.salary}/>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center">
              <Text>Nenhum item encontrado.</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <NavMenu />
    </SafeAreaView>
  )
}