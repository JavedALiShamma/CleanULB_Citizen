import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import HeaderBar from '../compoents/headerBar';

const KnowYourCityUdaipur = () => {
  const city = {
    name: 'UDAIPUR', // City name in uppercase
    headerImage: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4noeQUzlADr0bO0RRdzUyp4J56avVlwbDd_YEBIrYg-zO_q-DbMvGnhXcrGAftaLowHkZJLddWyD0oqbOJdGCOMaFEc6kPVRpO2EV0wT62Dl0PdNtCgYKJIs4ATc0_rCbEzGG8ny4g=w675-h390-n-k-no', // Udaipur lakes image
    overview:
      'Udaipur, often called the "City of Lakes", is a heritage-rich destination in Rajasthan. Known for its stunning palaces, serene lakes, and vibrant culture, Udaipur offers a unique blend of history and natural beauty.',
    municipality:
      'The Udaipur Municipal Corporation governs civic infrastructure, sanitation, heritage preservation, and tourism development. It emphasizes eco-friendly practices and citizen engagement.',
    touristSpots: [
      'City Palace',
      'Lake Pichola',
      'Jag Mandir',
      'Sajjangarh Monsoon Palace',
      'Bagore Ki Haveli',
    ],
    prominentPlaces: [
      'Fateh Sagar Lake',
      'Udaipur Railway Station',
      'Surajpole Market',
      'Saheliyon Ki Bari',
    ],
    specialties: [
      'Miniature Rajasthani Paintings',
      'Silver Jewellery & Crafts',
      'Dal Baati Churma',
      'Mewar Festival & Light Shows',
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* City Header */}
      <HeaderBar props={{ title: 'Know Your City', bgColor: '#4e9c91' }} />
        <View style={{ height: 20 }} />
      <View style={styles.header}>
        <Image source={{ uri: city.headerImage }} style={styles.headerImage} />
        <View style={styles.headerOverlay}>
          <Text style={styles.cityName}>{city.name}</Text>
        </View>
      </View>

      {/* Card: About City */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏙️ About the City</Text>
        <Text style={styles.cardText}>{city.overview}</Text>
      </View>

      {/* Card: Municipality */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏛️ Municipality Details</Text>
        <Text style={styles.cardText}>{city.municipality}</Text>
      </View>

      {/* Card: Tourist Attractions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧭 Tourist Attractions</Text>
        {city.touristSpots.map((spot, idx) => (
          <Text key={idx} style={styles.bullet}>• {spot}</Text>
        ))}
      </View>

      {/* Card: Prominent Places */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Prominent Places</Text>
        {city.prominentPlaces.map((place, idx) => (
          <Text key={idx} style={styles.bullet}>• {place}</Text>
        ))}
      </View>

      {/* Card: City Specialties */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍛 City Specialties</Text>
        {city.specialties.map((item, idx) => (
          <Text key={idx} style={styles.bullet}>• {item}</Text>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default KnowYourCityUdaipur;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f3',
  },
  header: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 220,
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#2c3e50',
  },
  cardText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  bullet: {
    fontSize: 15,
    color: '#333',
    paddingLeft: 8,
    marginTop: 4,
  },
});
