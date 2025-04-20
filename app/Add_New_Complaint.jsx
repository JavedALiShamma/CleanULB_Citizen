import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,ScrollView ,Image} from 'react-native';
import SafeScreen from "../compoents/SafeScreen"
import { Stack } from 'expo-router';

const data=[
    {complainID:"800465RS761",
        complainType:"garbage",
        complainDate:"2024-01-01",
        complainStatus:"Pending",
        complainDescription:"Garbage is not collected",
        complainLocation:"123 Main St, Anytown, USA",
        complainImage:"https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticle_images%2F2015%2F10%2F28%2F508695.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&q=70&w=400&dpr=2",
        resolveDate:"2024-01-01",
        resolveTime:"10:00 AM",
        resolveStatus:"Resolved",

    },
    {complainID:"800465RS762",
        complainType:"Public Toilet",
        complainDate:"2024-01-01",
        complainStatus:"Pending",
        complainDescription:"toilet boilting is not working",
        complainLocation:"123 Main St, Anytown, USA",
        complainImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjwiC-xbQFzzdWr_V-NUcnSBHquXd86Ww5Aw&s",
        resolveDate:"2024-01-01",
        resolveTime:"10:00 AM",
        resolveStatus:"Resolved",
    }
]
const AddNewComplaint = () => {
    return (
        <SafeScreen>
    <SafeAreaView>
            <Stack.Screen options={{
                headerTitle: "Track older Complaints",
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#fff",
                },
            }} />
             <ScrollView>
            <View style={{flex:1,padding:10}}>
                {data.map((item,index)=>(
                    <View key={index} style={{backgroundColor:"#fff",padding:10,borderRadius:10,marginBottom:10,flexDirection:"row"}}>
                        <Image source={{uri:item.complainImage}} style={{width:100,height:100,borderRadius:10}}/>
                        <View style={{flex:1,padding:10}}>
                        <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold"}}> Complaint ID: {item.complainID}</Text>
                        <Text style={{textAlign:"center",fontSize:12,color:"black"}} > complaint type: {item.complainType}</Text>
                        <Text style={{textAlign:"center",fontSize:12,color:"grey"}} > complaint Description: {item.complainDescription}</Text>
                        </View>
                    <View style={{width:"20%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                        <TouchableOpacity style={{backgroundColor:"blue",padding:10,borderRadius:10}}> <Text style={{color:"#fff", fontSize:12}}>See Response</Text></TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:"green",padding:10,borderRadius:10}}> <Text style={{color:"#fff", fontSize:12}}>{item.resolveStatus}</Text></TouchableOpacity>
                    </View>
                    </View>
                ))}
            </View>
             </ScrollView>
        </SafeAreaView>
        </SafeScreen>);
};

export default AddNewComplaint;
