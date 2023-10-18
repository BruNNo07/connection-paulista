import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../firebase/functions/database";
import { FormCandidateData } from "../components/formCandidate";
import { FormCompanyData } from "../components/formCompany";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_ID } from "../firebase/AsyncStorage-Keys";

export type UserProps = FormCandidateData & FormCompanyData & {
  role: 'candidate' | 'company'
}

export type UserContextProps = {
  userData: UserProps | null
  userId: string
}

export const UserContext = createContext<UserContextProps | null>(null)

type UserContextProviderProps = {
  children: React.ReactNode
}

export function UserContextProvider ({children}:UserContextProviderProps){
  const [userId,setUserId] = useState('')
  const [user, setUser] = useState<UserProps | null>(null)
  
  async function fetchUser(){
    const userId = await AsyncStorage.getItem(USER_ID)

    if( userId === null) return
    const fetchUser:UserProps = await getUserData(userId)
    setUser(fetchUser)
    setUserId(userId)
  }
  
  useEffect(() => {
    fetchUser()
  },[])
  
  return(
    <UserContext.Provider value={{userData: user, userId}}>
      {children}
    </UserContext.Provider>
  )
}