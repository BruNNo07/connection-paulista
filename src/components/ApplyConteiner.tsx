import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import {TouchableOpacity, Text} from 'react-native'
import { getUserData } from '../firebase/functions/database'
import { UserProps } from '../context/UserContext'
import { View } from 'native-base'
import { DownloadSimple } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

type ApplyConteinerProps = {
  userId : string
}

export function ApplyConteiner({userId}:ApplyConteinerProps){
  const [userData, setUserData] = useState<UserProps | null>(null)

  const navigation = useNavigation()
  
  async function fetchUser(){
    try {
      const response = await getUserData(userId)

      setUserData(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  },[])

  return(
    <TouchableOpacity className='flex-1 px-4 py-2 border border-blue-500 rounded-lg mb-2'>
      <View className='flex-row space-x-2 justify-between'>
        <View>
          <Text className='text-gray-100'>{userData?.name} {userData?.lastName}</Text>
          <Text className='text-gray-100'>{userData?.email}</Text>
          <Text className='text-gray-100'>Telefone: {userData?.phone}</Text>
        </View>
        <TouchableOpacity className='items-center justify-center' onPress={() => navigation.navigate('pdfViewer', { url: userData?.cvUrl!})}>
          <DownloadSimple size={28} color='#4a5bf5'/>
          <Text className='text-gray-100'>Visualizar CV</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
  
}