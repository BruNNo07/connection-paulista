import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavMenu } from "./navMenu";


export function LoadingConteiner() {
  return(
    <SafeAreaView className="flex-1 bg-zinc-900 items-center justify-center">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-100 font-bold">Loading...</Text>
        </View>
        
        <NavMenu />
    </SafeAreaView>
  )
}