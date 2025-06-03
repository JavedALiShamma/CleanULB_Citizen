import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderBar from '../compoents/headerBar'
import COLORS from '../constants/colors'
import { useRoute } from '@react-navigation/native'
import ToiletLocator from '../compoents/nearByToiletCards'

const NearByToilets = () => {
  // Here we use route.params to get the data passed from the previous screen
  const route = useRoute();
  const statusColr = route.params?.color || COLORS.primary;


  const flexStyleRow={display :"flex", flexDirection:"row"}
  const flexStyleColumn={display :"flex", flexDirection:"column"}
  return (
    <>
    
    <SafeAreaView
    style={{flex:1 , backgroundColor:"white"}}
    >
      <HeaderBar props={{title:"Near by toilets" , bgColor:statusColr}}/>
      <ToiletLocator/>
    </SafeAreaView>
    </>
  )
}

export default NearByToilets