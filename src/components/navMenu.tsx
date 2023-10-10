import { Briefcase, Newspaper, User } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";


export function NavMenu(){
  return(
    <View className="flex-row justify-around items-center bg-gray-700 py-2 w-full">
      <TouchableOpacity className="border-r border-black w-32 items-center">
        <Briefcase size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity className="border-r border-black w-32 items-center">
        <Newspaper size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity className="w-32 items-center">
        <User size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}