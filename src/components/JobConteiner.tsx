import { useNavigation } from '@react-navigation/native'
import { ArrowSquareOut, LinkSimple, MapPin } from 'phosphor-react-native'
import React from 'react'
import {TouchableOpacity,View, Text} from 'react-native'

type JobConteinerProps= {
  jobId: string
  title: string
  company: string
  salary?: number
  skills: string[]
  locale: string
}

export function JobConteiner({company,skills,title,salary = 0,locale, jobId}:JobConteinerProps){
  const navigation = useNavigation()
  return(
    <TouchableOpacity className='px-2 py-1 border border-gray-100 rounded-lg mb-2 ' onPress={() => navigation.navigate('jobDetails', { jobId })}>
      <View className='absolute top-2 right-2'>
        <ArrowSquareOut size={24} color='white'/>
      </View>
      <View className='mb-3'>
        <Text className='text-lg font-bold text-gray-100'>{title}</Text>
        <Text className='text-sm text-gray-300'>{company}</Text>
      </View>
      <View className='flex-row space-x-2 mb-3 flex-1 items-center justify-center'>
        {
        skills[0] && (
          <View className='bg-yellow-200 py-1 px-1 rounded-full w-[26vw] items-center'>
            <Text className='text-xs text-zinc-900' numberOfLines={1}>{skills[0]} </Text>
          </View>
        )
        }
        {
        skills[1] && (
          <View className='bg-yellow-200 py-1 px-1 rounded-full w-[26vw] items-center'>
            <Text className='text-xs text-zinc-900' numberOfLines={1}>{skills[1]} </Text>
          </View>
        )
        }
        {
        skills[2] && (
          <View className='bg-yellow-200 py-1 px-1 rounded-full w-[26vw] items-center '>
            <Text className='text-xs text-zinc-900' numberOfLines={1} > {skills[2]} </Text>
          </View>
        )
        }
      </View>
      {salary > 0 && <Text className='text-gray-100 w-fit font-bold'>R$ {salary}</Text>}
      <View className='flex-row space-x-2 items-center justify-center mt-3 mb-2 px-2'>
        <MapPin size={18} color='orange' />
        <Text className='text-gray-100 text-center'>{locale}</Text>
      </View>
      
    </TouchableOpacity>
  )
}