import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons';
import ToolGrid from '../../compoents/Card';

const screenWidth = Dimensions.get('window').width;

const carouselItems = [
  { title: 'Explore the world', image: 'https://swachhbharatmission.ddws.gov.in/themes/custom/repo-theme-master/images/Reel_Making_Competition.jpg' },
  { title: 'Discover new places', image: 'https://kushaagra.org/wp-content/uploads/2023/02/swach-bharat_urban.png' },
];

const categories = [
  { title: 'Countdown', icon: 'time-outline' },
  { title: 'Event', icon: 'calendar-outline' },
  { title: 'Reminders', icon: 'notifications-outline' },
  { title: 'Deadlines', icon: 'alarm-outline' },
  { title: 'Timers', icon: 'hourglass-outline' },
];

const nearbyPlaces = [
  { title: 'Summer Beach', image: 'https://img.freepik.com/free-photo/beach_1203-1375.jpg' },
  { title: 'Tropical Mall', image: 'https://img.freepik.com/free-photo/shopping-mall_1127-3215.jpg' },
];
const data = [
  { title: 'Documents', subtitle: 'Scan multiple documents', color: '#FDE68A' },
  { title: 'ID card', subtitle: 'Scan ID cards', color: '#DDD6FE' },
  { title: 'Measure', subtitle: 'Measure length and area', color: '#BBF7D0' },
  { title: 'Count', subtitle: 'Count similar objects', color: '#FBCFE8' },
  { title: 'Passport', subtitle: 'Scan passports', color: '#BFDBFE' },
  { title: 'Math', subtitle: 'Solve math problems', color: '#FCA5A5' },
];

const Card = ({ title, subtitle, color, onPress }) => (
  <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
    {/* You can replace below with icons */}
    <Text style={styles.icon}>📄</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
  return (
    <>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.userName}>Virat sharma </Text>
          <Text style={styles.subtitle}>Nirman nagar</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <View style={{ width: screenWidth, alignSelf: 'center' }}>
        <Carousel
          loop
          width={screenWidth * 0.98}
          height={180}
          autoPlay
          data={carouselItems}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View style={styles.carouselCard}>
              <Image source={{ uri: item.image }} style={styles.carouselImage} />
              <Text style={styles.carouselText}>{item.title}</Text>
            </View>
          )}
        />
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>What can you do make the city cleanner</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat, index) => (
            <View key={index} style={styles.categoryItem}>
              <Ionicons name={cat.icon} size={26} color="grey" style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{cat.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Nearby From You */}
     
      <ToolGrid/>
     
    </ScrollView>
    
    </>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', paddingTop: 30},
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16, marginBottom: 16,
  },
  userName: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#999' },

  carouselCard: {
    backgroundColor: '#e0f7fa',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
  },
  carouselImage: { width: '100%', height: 160 ,resizeMode:"cover" },
  carouselText: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowRadius: 6,
  },

  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 12
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  seeAll: { color: '#777' },

  categoryItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    width: 80,
    borderWidth:1
  },
  categoryIcon: { marginBottom: 6 },
  categoryText: { color: 'black', fontSize: 12, textAlign: 'center' },

  nearbyCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  nearbyImage: { width: '100%', height: 100 },
  nearbyText: { padding: 8, fontWeight: '600' }
});

export default HomeScreen;
