import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();


    const router = useRouter();

    return (
      <View style={styles.container}>
        
        <View style={{width:"80%", height:"30%", display:"flex",alignItems:"center", justifyContent:"center"}}>
          <Image
          source={require("../../assets/images/cleanCityNoBG.png")}
          resizeMethod='contain'
          style={{width:"100%",height:"50%"}}
          />
        </View>
        <Image
        source={require("../../assets/images/ulbLogo.png")}
        style={{width:"100%", height:"25%"}}
        />
        <Text style={styles.message}>
          Through this app, you can:
          {"\n"}• Know your municipalality and help to make it clean 
          {"\n"}• File a complaint
          {"\n"}• Track auto tippers
          {"\n"}• Locate nearby toilets
          {"\n"}• Call for collection of Septage
          {"\n"}• Call for collection of Construction and Demolition (C&D) waste
          {"\n"}Make your city beautiful 🌿
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/signup')}>
            <Text style={styles.signupText}>New User? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'start',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#51AE36',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#7BCB29',
    marginBottom: 30,
  },
  message: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 24,
    
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    display:"flex",
    flexDirection:"row",
    alignContent:"center",
    justifyContent:"space-around"
  },
  loginButton: {
    backgroundColor: '#51AE36',
    paddingVertical: 14,
    width: '40%',
    borderRadius: 10,
  
  },
  signupButton: {
    borderColor: '#7BCB29',
    borderWidth: 2,
    paddingVertical: 14,
    width: '40%',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  signupText: {
    color: '#7BCB29',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
});
