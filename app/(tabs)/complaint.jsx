import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import { PieChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';
import HeaderBar from '../../compoents/headerBar';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import COLORS from "../../constants/colors"
const Complaints = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Dead animal');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  
  const router = useRouter();
   const route = useRoute();
  const statusColr = route.params?.color || COLORS.primary;
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleMapPress = (e) => {
    setLocation(e.nativeEvent.coordinate);
  };

  const handleSubmit = async () => {
    if (!name || !number || !ward || !address || !location) {
      Alert.alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('number', number);
    formData.append('ward', ward);
    formData.append('address', address);
    formData.append('category', selectedCategory);
    formData.append('latitude', location.latitude);
    formData.append('longitude', location.longitude);

    if (image) {
      const filename = image.split('/').pop();
      const fileType = filename.split('.').pop();

      formData.append('image', {
        uri: image,
        name: filename,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await fetch('http://<YOUR-IP>:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      Alert.alert(result.message || 'Complaint submitted!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error submitting complaint.');
    }
  };

  const addNewComplaint = () => {

    router.push('/Add_New_Complaint');
  };
  const screenWidth = Dimensions.get('window').width;

  
  const pieData = [
    { name: 'Pending', count: 0, color: '#FFA500', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Resolved', count: 10, color: '#32CD32', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'In Processing', count: 4, color: '#1E90FF', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <HeaderBar props={{"title":"Complaint Overview", bgColor:"grey"}}/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ padding: 10 }} keyboardShouldPersistTaps="handled">
           

            <PieChart
              data={pieData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={'count'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              absolute
            />
              <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
                <TouchableOpacity onPress={addNewComplaint} style={buttonStyle}>
                  <Text style={{color:'#fff'}}>See All Complaints</Text>
                </TouchableOpacity>
              </View>
         
            <View style={{marginTop:20, padding:10, marginBottom:25,backgroundColor:"#fff", borderRadius:10, borderWidth:1, borderColor:"grey"}}>

         
            <Text style={{ fontSize: 18, fontWeight: '600', marginVertical: 15 , color:"blue" ,textAlign:"center", padding:10, borderRadius:10}}> Add New Complaint</Text>

            <TextInput placeholder="Name" value={name} onChangeText={setName} style={inputStyle} />
            <TextInput placeholder="Phone Number" value={number} onChangeText={setNumber} keyboardType="phone-pad" style={inputStyle} />
            <TextInput placeholder="Ward" value={ward} onChangeText={setWard} style={inputStyle} />
            <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={inputStyle} />

            <Text style={{ marginVertical: 5 }}>Select Category:</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={{ marginBottom: 10 }}
            >
              <Picker.Item label="Dead animal" value="Dead animal" />
              <Picker.Item label="Bins not cleaned" value="Bins not cleaned" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            <TouchableOpacity onPress={pickImage} style={buttonStyle}>
              <Text style={{ color: '#fff' }}>Upload Photo</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200, marginTop: 10 }} />}

            <Text style={{ marginTop: 20 }}>Select Your Location:</Text>
            {location && (
              <MapView
                style={{ width: '100%', height: 200, marginTop: 10 }}
                initialRegion={{
                  ...location,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                onPress={handleMapPress}
              >
                <Marker coordinate={location} />
              </MapView>
            )}

            <TouchableOpacity style={{ ...buttonStyle, marginTop: 20,marginBottom:50 }} onPress={handleSubmit}>
              <Text style={{ color: '#fff' }}>Submit Complaint</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const inputStyle = {
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 10,
  marginBottom: 10,
  borderRadius: 10,
};

const buttonStyle = {
  backgroundColor: '#007BFF',
  padding: 15,
  alignItems: 'center',
  borderRadius: 10,
};

export default Complaints;
