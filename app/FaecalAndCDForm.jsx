import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import HeaderBar from "../compoents/headerBar"
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState('');
  const [newWardText, setNewWardText] = useState('');
  const [region, setRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [markerCoords, setMarkerCoords] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      setRegion({
        ...region,
        latitude,
        longitude,
      });
      setMarkerCoords({ latitude, longitude });
    })();
  }, []);

  const addWard = () => {
    const trimmed = newWardText.trim();
    if (!trimmed) {
      Alert.alert('Validation', 'Please enter a ward name.');
      return;
    }
    if (wards.includes(trimmed)) {
      Alert.alert('Already exists', `"${trimmed}" is already in the list.`);
      return;
    }
    setWards([...wards, trimmed]);
    setSelectedWard(trimmed);
    setNewWardText('');
  };

  const onMapLongPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoords({ latitude, longitude });
  };

  const onSubmit = () => {
    if (!name || !mobile || !address || !selectedWard || !markerCoords) {
      Alert.alert('Missing fields', 'Please fill all fields and place a marker.');
      return;
    }

    const payload = {
      name,
      mobile,
      address,
      category,
      ward: selectedWard,
      location: {
        lat: markerCoords.latitude,
        lng: markerCoords.longitude,
      },
    };

    console.log('Form submitted:', payload);
    Alert.alert('Form Submitted', JSON.stringify(payload, null, 2));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <HeaderBar props={{"title":"Waste Collection Request","bgColor":"grey" }} />
        {category === 'Faecal Sludge' ? (<Text style={{color:"red" , marginTop:10, marginBottom:10}}>
          NOTE :- Municiplaity will charge ₹1500 for fecal sludge collection.
        </Text>) :(<Text style={{color:"red", marginTop:10 , marginBottom:10}}> Municipality charge ₹1700 for collection and demolution waste</Text>)}
        <Text style={{color:"green"}}> Your request will only be accepted after the call from the municipality on given number is approved</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="आवेदक का नाम दर्ज करें"
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          placeholder="मोबाइल नंबर दर्ज करें"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="वह पता दर्ज करें जहां कचरा एकत्र किया जाना है"
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker  selectedValue={category} onValueChange={(value) => setCategory(value)}>
            <Picker.Item label='कचरे का प्रकार चुनें' value={null} selectedValue />
            <Picker.Item label="Faecal Sludge (Septage)/मल कीचड़ (सेप्टेज)" value="Faecal Sludge" />
            <Picker.Item style={{textAlign:"center"}} label="Construction & demolition waste/निर्माण और विध्वंस अपशिष्ट" value="Construction and demolition waste" />
          </Picker>
        </View>
          {category != null && category ==="Faecal Sludge" ? (<Text style={{color:"darkred" , marginTop:10}}>सेप्टेज विशेष रूप से सेप्टिक टैंकों से निकाला गया मल कीचड़ है, जिसे Desludding Vehicle द्वारा एकत्र किया जाता है</Text>):(<Text style={{color:"darkred", marginTop:10}}>निर्माण और विध्वंस (सीएंडडी) अपशिष्ट निर्माण, नवीनीकरण और विध्वंस परियोजनाओं से उत्पन्न मलबा है। इसमें लकड़ी, कंक्रीट, धातु, प्लास्टर और डामर जैसी कई तरह की सामग्रियाँ शामिल हैं जिन्हें ट्रैक्टरों के ज़रिए एकत्र किया जाता है</Text>) }
        <Text style={styles.label}>Ward</Text>
        <View style={styles.pickerContainer}>
        <TextInput
          style={styles.input}
          // Number only input for ward
          value={selectedWard}
          onChangeText={setSelectedWard}
          placeholder="अपना वार्ड नंबर दर्ज करें"

        />
        </View>

        {/* <View style={styles.addWardContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={newWardText}
            onChangeText={setNewWardText}
            placeholder="Add new ward"
          />
          <Button title="Add" onPress={addWard} />
        </View> */}

        <Text style={styles.label}>Select Location (Long-press or Drag marker)</Text>
        <View style={{width:"100%", height:"auto" , padding:10 , borderRadius:6 , borderWidth:1 , borderColor:"#bbb"}}>
          <MapView style={styles.map} region={region} onLongPress={onMapLongPress}
            onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            
            // showsUserLocation={true}
          >
          {markerCoords && (
            <Marker
              coordinate={markerCoords}
              draggable
              onDragEnd={(e) => {
                setMarkerCoords(e.nativeEvent.coordinate);
              }}
            />
          )}
        </MapView>
        </View>
        

        {markerCoords && (
          <View style={styles.coordsContainer}>
            <Text style={styles.label}>Selected Latitude</Text>
            <TextInput
              style={styles.input}
              value={markerCoords.latitude.toFixed(6).toString()}
              editable={false}
            />
            <Text style={styles.label}>Selected Longitude</Text>
            <TextInput
              style={styles.input}
              value={markerCoords.longitude.toFixed(6).toString()}
              editable={false}
            />
          </View>
        )}

        <View style={styles.submitButton}>
          <Button title="Submit" onPress={onSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
  },
  addWardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  map: {
    width: '100%',
    height: 250,
    marginTop: 8,
    borderRadius: 6,
  },
  coordsContainer: {
    marginTop: 12,
  },
  submitButton: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
});
