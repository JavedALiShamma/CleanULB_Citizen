import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import haversine from 'haversine-distance';

const mockToiletData = [
  {
    id: '1',
    name: 'Public Toilet - Station Road',
    address: 'Station Road, Bikaner',
    latitude: 28.0229,
    longitude: 73.3119,
  },
  {
    id: '2',
    name: 'Toilet - Junagarh Fort',
    address: 'Near Junagarh Fort, Bikaner',
    //28.021599, 73.319906
    latitude: 28.021599,
    longitude: 73.319906,
  },
  {
    id: '3',
    name: 'Community Toilet - Rani Bazar',
    address: 'Rani Bazar, Bikaner',
    latitude: 28.0333,
    longitude: 73.3200,
  },
];

export default function ToiletLocator() {
  const [location, setLocation] = useState(null);
  const [nearbyToilets, setNearbyToilets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to find nearby toilets.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      //// Here instead of using coords of the user 
      //28.026860, 73.320810
      loc.coords.latitude="28.026860",
      loc.coords.longitude="73.320810",
    //// Here the location of the user is changed to detect the location 
    //// This needs to be changed 
      setLocation(loc.coords);
      findNearbyToilets(loc.coords);
    })();
  }, []);

  const findNearbyToilets = (userCoords) => {
    const radius = 5000; // 5 km in meters

    const filtered = mockToiletData
      .map((toilet) => {
        const distance = haversine(userCoords, {
          latitude: toilet.latitude,
          longitude: toilet.longitude,
        });
        return { ...toilet, distance };
      })
      .filter((t) => t.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    setNearbyToilets(filtered);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Fetching nearby toilets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={nearbyToilets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.address}</Text>
            <Text style={styles.distance}>
              Distance: {(item.distance / 1000).toFixed(2)} km
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.center}>No nearby toilets found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
   
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distance: {
    marginTop: 4,
    color: 'gray',
  },
  center: {
    textAlign: 'center',
    marginTop: 20,
  },
});
