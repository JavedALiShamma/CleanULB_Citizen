import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import  {LinearGradient}  from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const ProfileCard = () => {
    const d= new Date();
    const month =d.getMonth();
    const navigation =useNavigation();
    const handlePayment=()=>{
      navigation.navigate("RazorPaySection");
    }
  return (
    <LinearGradient
      colors={['#3fb26d', '#93c643']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
      
        <View style={{alignItems:"center"}}>
          <Text style={styles.name}>Municipality Name</Text>
          <Text style={styles.title}>District and City</Text>
        </View>
        
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>STATUS </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>MONTH</Text>
          <Text style={styles.statLabel}>{month}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>YEAR</Text>
          <Text style={styles.statLabel}>{d.getFullYear()}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handlePayment} style={{width:"100%", height:50, borderRadius:12 , backgroundColor:"white", display:"flex", flexDirection:"row" ,gap: 10,alignItems:"center", justifyContent:"space-around"}}>
        <Ionicons name='cash' size={30} color="#3fb26d"/>
        <Text style={{fontSize:22 , fontWeight:900 , color:"#3fb26d"}}>PAY</Text>
        <Ionicons name='arrow-forward-circle-outline' size={30} color={"#3fb26d"}/>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    margin: 20,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 12,
  },
  ranking: {
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  rankText: {
    color: '#fff',
    fontSize: 12,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:5
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statLabel: {
    color: '#fff',
    fontSize: 12,
  },
});

export default ProfileCard;
