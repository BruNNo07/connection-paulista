import {createNativeStackNavigator} from "@react-navigation/native-stack"
import React from "react"
import { Login } from "../screens/login"
import { SignUp } from "../screens/signUp"
import { Jobs } from "../screens/jobs"
import { NewJob } from "../screens/newJob"
import { Profile } from "../screens/profile"

const { Screen,Navigator }= createNativeStackNavigator()

export function AppRoutes(){
  return(
    <Navigator screenOptions={{ headerShown: false}}>
      <Screen 
        name='login'
        component={Login}
      />

      <Screen 
        name='signUp'
        component={SignUp}
      />

      <Screen 
        name='jobs'
        component={Jobs}
      />

      <Screen 
        name='newJob'
        component={NewJob}
      />

      <Screen 
        name='profile'
        component={Profile}
      />
    </Navigator>
  )
}