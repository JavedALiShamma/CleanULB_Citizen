import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const HeaderBar = (props) => {
    const navigation = useNavigation();
    const{title ,bgColor}= props.props;
   
  return (
    <View style={{width : "95%",marginLeft:"2.5%",height:60 , backgroundColor:bgColor , borderRadius:15, padding:10 ,position:"fixed", top:0, marginTop:5, display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Ionicons
        onPress={()=>{navigation.goBack()}}
        style={{position:"absolute" , left:10 , top:15 , color:"white"}}
        name='arrow-back' size={30} />
        <Text style={{textAlign:"center", color:"white", fontSize :20, fontWeight:800}}>{title}</Text>
    </View>

  )
}

export default HeaderBar;