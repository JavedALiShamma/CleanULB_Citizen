  import { View, Text } from 'react-native'
  import React from 'react'
  import { Stack, Tabs } from 'expo-router'
  import { Ionicons } from '@expo/vector-icons'
  import COLORS from "../../constants/colors"
  export default function TabsLayout() {
    return (<Tabs
    screenOptions={{headerShown:false,
      tabBarLabelStyle:{
        color:COLORS.primary
        }
    }}
    
    >
      <Tabs.Screen
      name='index'
      options={{
        title:"Home",
        tabBarIcon:(color,size)=>{
          return(
            <Ionicons name='home-outline' color={COLORS.primary} size={24}/>
          )
        }
      }}
      />
       <Tabs.Screen
      name='autotipper'
      options={{
        title:"autotipper",
        tabBarIcon:(color,size)=>{
          return(
            <Ionicons name='car-outline' color={COLORS.primary} size={24}/>
          )
        }
      }}
      />
       <Tabs.Screen
      name='complaint'
      options={{
        title:"Complaint",
        tabBarIcon:(color,size)=>{
          return(
            <Ionicons name='help-circle-outline' color={COLORS.primary} size={24}/>
          )
        }
      }}
      />
       <Tabs.Screen
      name='profile'
      options={{
        title:"Profile",
        tabBarIcon:(color,size)=>{
          return(
            <Ionicons name='person-circle-outline' color={COLORS.primary} size={24}/>
          )
        }
      }}
      />

    </Tabs>
    )
  }