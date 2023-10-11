import {createNativeStackNavigator} from "@react-navigation/native-stack"
import React from "react"
import { Login } from "../screens/login"
import { SignUp } from "../screens/signUp"
import { Jobs } from "../screens/jobs"

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
    </Navigator>
  )
}