import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform,ImageBackground } from 'react-native'
import React, { useState } from 'react'
import {Link} from "expo-router"
import styles from "../../assets/styles/login.styles";
import {Image} from "react-native"
import COLORS from '../../constants/colors';
import {Ionicons} from "@expo/vector-icons";
import { useRouter } from 'expo-router';


function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [showPassword,setShowPassword]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const router = useRouter();
  const handleLogin=()=>{
    // I want to send it to the (tabs) page
    router.push('/(tabs)');
  }
  return (
    <KeyboardAvoidingView
    style={{flex:1}}
    behavior={Platform.OS ==="ios" ? "padding":"height"}
    >
   
    <View style={styles.container}>
    <View style={{width:"100%", height:"45%" ,backgroundColor:"white"}}>
      <ImageBackground
      source={require("../../assets/images/CCBackground.png")}
      resizeMode="contain"
      style={{width:"100%", height:"100%", position:"absolute"}}

      
      >
          <Image
        source={require("../../assets/images/cleanCityNoBG.png")}
        resizeMode='contain'
        style={styles.illustrationImage}
        />
       
      </ImageBackground>
    </View>
    {/* <View style={styles.topIllustration}>
      
      </View> */}
      {/* Here we will add illustration */}
      <View style={styles.topIllustration}
      >
      </View>
      <View style={{padding:20 ,backgroundColor:"white"}}>
      <View style={styles.card}>
      {/* <Text style={styles.title}> Login As User</Text> */}
      <View style={styles.formContainer}>
      {/* Here we will add email and password section */}
      {/* Email */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
        <Ionicons
        name="mail-outline"
        size={20}
        color={COLORS.primary}
        style={styles.inputIcon}

        />
        <TextInput
        style={styles.input}
        placeholder='Enter your email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'        
        />
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          {/* LEFT ICON */}
          <Ionicons
          name='lock-closed-outline'
          size={20}
          color={COLORS.primary}
          style={styles.inputIcon}
          />
          {/* TEXT INPUT */}
          <TextInput
          style={styles.input}
          placeholder='Enter the password'
          placeholderTextColor={COLORS.placeholderText}
          value={password}
          onChange={setPassword}
          secureTextEntry={!showPassword}
          />
          {/* RIGHT ICON */}
          <TouchableOpacity
          onPress={()=>setShowPassword(!showPassword)}
          style={styles.eyeIcon}
          >
            <Ionicons
            name={showPassword ? "eye-outline":"eye-off-outline"}
            size={20}
            color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}
      disabled={isLoading}
      >
        {isLoading ?(
          <ActivityIndicator color="#fff"/>
        ):(
          <Text style={styles.buttonText}>Login</Text>
        )}

      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account</Text>
        <Link href="/signup" asChild>
        <TouchableOpacity>
          <Text
          style={styles.link}>
            Sign Up
          </Text>
        </TouchableOpacity>
        </Link>

      </View>
      </View>
      </View>

      </View>
    </View>
    </KeyboardAvoidingView>
  )
    
  
}
export default Login;