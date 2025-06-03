  import { View, Text } from 'react-native'
  import React from 'react'
  import { Stack, Tabs } from 'expo-router'
  import { Ionicons } from '@expo/vector-icons'
  import COLORS from "../../constants/colors"
  export default function TabsLayout() {
    return (<Tabs
      
    screenOptions={{headerShown:false,
      tabBarLabelStyle:{
        color:COLORS.primary,
        fontFamily:"Poppins_500Medium",
        fontSize:11,
        fontWeight:"bold",
        borderRadius:10,
        marginBottom:5,
    
        },
      tabBarStyle:{
        position:"fixed",
        bottom:10,
        left:10,
        right:10,
        height:60,
        borderRadius:20,
        backgroundColor:"white",
        elevation:5,
        shadowColor:"#000",
        shadowOpacity:0.1,
        shadowRadius:6,
        padding:10,
        borderWidth:1,
        borderColor:"#e7e7e7",
        shadowOffset: {
          width: 0,
          height: 2,
        },
      }
    }}
    
    >
      <Tabs.Screen
      name='index'
      options={{
        title:"Home",
        tabBarIcon:(color,size)=>{
          return(
            <Ionicons name='home-outline' color={COLORS.primary} size={28}/>
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
            <Ionicons name='car-outline' color={COLORS.primary} size={28}/>
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
            <Ionicons name='help-circle-outline' color={COLORS.primary} size={28}/>
          )
        }
      }}
      />
       <Tabs.Screen
      name='Services'
      options={{
        title:"services",
        tabBarIcon:(color,size)=>{
          return(
            <Ionicons name='cog-outline' color={COLORS.primary} size={28}/>
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
            <Ionicons name='person-circle-outline' color={COLORS.primary} size={28}/>
          )
        }
      }}
      />

    </Tabs>
    )
  }