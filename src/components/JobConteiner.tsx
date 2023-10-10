import { MapPin } from 'phosphor-react-native'
import React from 'react'
import {TouchableOpacity,View, Text} from 'react-native'

type JobConteinerProps= {
  title: string
  company: string
  salary?: number
  skills: string[]
  locale: string
}

export function JobConteiner({company,skills,title,salary = 0,locale}:JobConteinerProps){
  return(
    <TouchableOpacity className='px-2 py-1 border border-gray-700 rounded-lg mb-2 '>
      <View className='mb-3'>
        <Text className='text-lg font-bold text-gray-800'>{title}</Text>
        <Text className='text-sm text-gray-900'>{company}</Text>
      </View>
      <View className='flex-row space-x-2 mb-3'>
        {skills[0] && <Text className='bg-orange-500/50 px-2 py-1 text-xs rounded-full'>{skills[0]} </Text>}
        {skills[1] && <Text className='bg-orange-500/50 px-2 py-1 text-xs rounded-full'>{skills[1]} </Text>}
        {skills[2] && <Text className='bg-orange-500/50 px-2 py-1 text-xs rounded-full'>{skills[2]}</Text>}
      </View>
      {salary > 0 && <Text className='text-emerald-700 w-fit font-bold'>R$ {salary.toFixed(2)}</Text>}
      <View className='flex-row space-x-2 justify-center mt-3'>
        <MapPin size={18} color='blue' />
        <Text>{locale}</Text>
      </View>
      
    </TouchableOpacity>
  )
}