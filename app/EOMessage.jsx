import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import HeaderBar from "../compoents/headerBar"
// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const EOMessageCard = () => {
  const [expanded, setExpanded] = useState(false);

  const message = {
    title: '🌱 World Environment Day',
    body:
      'प्रिय नागरिकों,\n\nविश्व पर्यावरण दिवस के अवसर पर, आइए हम सब मिलकर अपने शहर को स्वच्छ और हरा-भरा बनाएं। आपके द्वारा लगाया गया हर पेड़, आपके द्वारा उठाया गया हर कूड़ा और प्लास्टिक के उपयोग को कम करने का हर प्रयास एक बेहतर भविष्य में योगदान देता है।\n\nआपके कार्यकारी अधिकारी के रूप में, मैं आपसे स्थानीय स्वच्छता अभियानों में भाग लेने, अपने घरों के आसपास अधिक से अधिक पेड़ लगाने और दूसरों को संधारणीय जीवन जीने के बारे में शिक्षित करने का आग्रह करता हूँ।\n\nआइए हम सब मिलकर अपने बच्चों और आने वाली पीढ़ियों के लिए एक स्वस्थ वातावरण का निर्माण करें।\n\nआपका सहयोग हमारे शहर के परिवर्तन की कुंजी है।\n\nआइए एक स्वच्छ कल के लिए संकल्प लें! 🌿',
    date: 'June 5, 2025',
    time: '10:30 AM',
    eoName: 'Mr. Rajesh Kumar (Executive Officer)',
    eoImage: 'https://static.vecteezy.com/system/resources/thumbnails/029/271/062/small_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg', // Sample EO photo
    sharedImage: 'https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2023/08/Page8-3-1.jpg', // Example of a shared tree planting image
  };

  const toggleExpand = () => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(!expanded);
  };

  return (
    <ScrollView style={styles.container}>
        <HeaderBar props={{title :"EO Message to Citizens", bgColor:"#aea0f2"}} />
      <View style={styles.card}>
        {/* Header: EO info */}
        <View style={styles.header}>
          <Image source={{ uri: message.eoImage }} style={styles.eoImage} />
          <View style={styles.headerText}>
            <Text style={styles.title}>{message.title}</Text>
            <Text style={styles.eoName}>{message.eoName}</Text>
            <Text style={styles.dateTime}>
              {message.date} • {message.time}
            </Text>
          </View>
        </View>

        {/* Shared Image by EO */}
        <Image source={{ uri: message.sharedImage }} style={styles.sharedImage} />

        {/* Message Body */}
        <Text style={styles.bodyText} numberOfLines={expanded ? undefined : 5}>
          {message.body}
        </Text>

        {/* Expand/Collapse */}
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.readMore}>{expanded ? 'Read Less ▲' : 'Read More ▼'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EOMessageCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef7f1',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  eoImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#2ecc71',
    borderWidth: 2,
    alignItems:"center"

  },
  headerText: {
    marginLeft: 12,
    flexShrink: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27ae60',
  },
  eoName: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
  dateTime: {
    fontSize: 12,
    color: '#777',
  },
  sharedImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginVertical: 12,
  },
  bodyText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  readMore: {
    marginTop: 10,
    color: '#2b7df7',
    fontSize: 14,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
});
