import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";

type RouteParams = {
  url: string
}

export function PdfViewer(){
  const route = useRoute()
  const navigation = useNavigation()

  const { url } = route.params as RouteParams

  const pdfResource = { 
    uri: url,
    cache: true
  }

  if(!pdfResource.uri) {
    <SafeAreaView className="flex-1 bg-zinc-900">
      <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
        <ArrowLeft size={24} color="white"/> 
      </TouchableOpacity>
      <View>
        <Text>Esse usuario não possui CV cadastrado</Text>
      </View>
    </SafeAreaView>
  }

  return(
    <SafeAreaView className="flex-1 bg-zinc-900">
      <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
        <ArrowLeft size={24} color="white"/> 
      </TouchableOpacity>
      <Pdf
        source={pdfResource}
        style={{flex:1, backgroundColor: '#18181b'}}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log('number pages:' + numberOfPages)
        }}
      />
    </SafeAreaView>
  )
}