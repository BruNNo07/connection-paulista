import { ArrowSquareOut, LinkSimple, MapPin } from 'phosphor-react-native'
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
    <TouchableOpacity className='px-2 py-1 border border-gray-100 rounded-lg mb-2 '>
      <View className='absolute top-2 right-2'>
        <ArrowSquareOut size={24} color='white'/>
      </View>
      <View className='mb-3'>
        <Text className='text-lg font-bold text-gray-100'>{title}</Text>
        <Text className='text-sm text-gray-300'>{company}</Text>
      </View>
      <View className='flex-row space-x-2 mb-3'>
        {skills[0] && <Text className='bg-yellow-200 px-2 py-1 text-xs rounded-full text-zinc-900'>{skills[0]} </Text>}
        {skills[1] && <Text className='bg-yellow-200 px-2 py-1 text-xs rounded-full text-zinc-900'>{skills[1]} </Text>}
        {skills[2] && <Text className='bg-yellow-200 px-2 py-1 text-xs rounded-full text-zinc-900'>{skills[2]}</Text>}
      </View>
      {salary > 0 && <Text className='text-gray-100 w-fit font-bold'>R$ {salary}</Text>}
      <View className='flex-row space-x-2 items-center justify-center mt-3 mb-2 px-2'>
        <MapPin size={18} color='orange' />
        <Text className='text-gray-100 text-center'>{locale}</Text>
      </View>
      
    </TouchableOpacity>
  )
}