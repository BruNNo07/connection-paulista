import { Briefcase, Newspaper, Plus, User } from "phosphor-react-native";
import React, { useEffect,useState } from "react";
import { TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_ID } from "../firebase/AsyncStorage-Keys";
import { getUserData } from "../firebase/functions/database";
import { FormCompanyData } from "./formCompany";
import { FormCandidateData } from "./formCandidate";
import { useNavigation, useRoute } from "@react-navigation/native";


export function NavMenu(){
  const { navigate } = useNavigation()

    return(
      <View className="flex-row justify-around items-center bg-zinc-900 py-1 w-full fixed">
        <TouchableOpacity className="border-r border-white w-32 items-center" onPress={() => navigate('jobs')}>
          <Briefcase size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="border-r border-white w-32 items-center">
          <Newspaper size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="w-32 items-center" onPress={() => navigate('profile')}>
          <User size={24} color="white" />
        </TouchableOpacity>
      </View>
    )  
}