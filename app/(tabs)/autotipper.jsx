import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE }from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';


const GOOGLE_MAPS_APIKEY = 'AIzaSyCV_KMd361LiXqgpElJRjjTYe5oKtuaG0A';

const AutoTipper = () => {
  const mapRef = useRef(null);

  const origin = { latitude: 28.2925, longitude: 74.9707 };      // Rider location
  const destination = { latitude: 28.2927, longitude: 74.9778 }; // User location

  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          ...origin,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={origin} title="Auto-tipper"
        image={require("../../assets/images/auto-tipper.png")}
        ></Marker>
        <Marker coordinate={destination} title="You" image={require("../../assets/images/house.png")} />

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          
          strokeWidth={6}
          strokeColor="green"
          onReady={result => {
            setDistance(result.distance);
            setDuration(result.duration);

            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: { top: 80, right: 80, bottom: 300, left: 80 },
              animated: true,
            });
          }}
        />
      </MapView>

      <View style={styles.bottomCard}>
      
        <View style={styles.row}>
          <Text style={styles.label}>AUTO-TIPPER:</Text>
          <Text style={styles.value}>RJ10 -CA-3342</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>From:</Text>
          <Text style={styles.value}>Thrift Mail Box</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>To:</Text>
          <Text style={styles.value}>Julie Robinson</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>520 g</Text>
        </View>
        <View style={[styles.row, { marginTop: 12 }]}>
          <Text style={styles.status}>🟡 On the way</Text>
          {distance && duration && (
            <Text style={styles.distanceInfo}>
              ETA: {Math.round(duration)} min ({distance.toFixed(1)} km)
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#e7e7e7',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 10,
   
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontWeight: '500',
    color: '#111',
  },
  status: {
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  distanceInfo: {
    color: '#333',
    fontWeight: '500',
  },
});

export default AutoTipper;
