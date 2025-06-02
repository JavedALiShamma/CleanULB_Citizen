import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Switch,
  I18nManager,
  Alert,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import ProfileCard from '../compoents/MunicpalityUserChargeCard';
import { Stack, useNavigation } from 'expo-router';

const translations = {
  en: {
    userCharges: 'What Are User Charges?',
    userChargesText: 'User charges are monthly fees collected for waste collection and disposal under Swachh Bharat Mission.',
    compulsory: 'Is It Compulsory?',
    compulsoryText: 'Yes, all citizens must pay user charges. It is legally mandated under SWM Rules, 2016 and Rajasthan’s SWM Policy, 2019.',
    factors: 'Factors Affecting Charges',
    factorsText: '• Type of property\n• Waste generated\n• Property size\n• Ward classification',
    rates: 'Sample User Charge Rate List monthy',
    ratesText: '🏠 Residential (Small): ₹20–30\n🏘 Residential (Medium): ₹50–75\n🏢 Shops: ₹250–500\n🍽 Restaurants: ₹1000–2000\n🏨 Hotels: ₹1500–5000\n🎓 Schools: ₹1000–3000',
    faq: 'Frequently Asked Questions',
    viewPDF: 'View Notification PDF',
    pickPDF: 'Pick PDF from Device',
    close: 'Close',
  },
  hi: {
    userCharges: 'यूज़र चार्ज क्या हैं?',
    userChargesText: 'यूज़र चार्ज हर महीने कचरा संग्रहण और निपटान के लिए लिए जाते हैं।',
    compulsory: 'क्या यह अनिवार्य है?',
    compulsoryText: 'हाँ, सभी नागरिकों को यूज़र चार्ज देना अनिवार्य है। यह स्वच्छ भारत नियम 2016 और राजस्थान नीति 2019 के अंतर्गत है।',
    factors: 'यूज़र चार्ज के कारक',
    factorsText: '• संपत्ति का प्रकार\n• उत्पन्न कचरे की मात्रा\n• संपत्ति का आकार\n• वार्ड वर्गीकरण',
    rates: 'यूज़र चार्ज दर सूची',
    ratesText: '🏠 आवासीय (छोटा): ₹20–30\n🏘 आवासीय (मध्यम): ₹50–75\n🏢 दुकानें: ₹250–500\n🍽 रेस्टोरेंट: ₹1000–2000\n🏨 होटल: ₹1500–5000\n🎓 स्कूल: ₹1000–3000',
    faq: 'अक्सर पूछे जाने वाले प्रश्न',
    viewPDF: 'नोटिफिकेशन PDF देखें',
    pickPDF: 'डिवाइस से PDF चुनें',
    close: 'बंद करें',
  }
};

export default function UserChargeInfoScreen() {
  const [lang, setLang] = useState('en');
  const [showFAQ, setShowFAQ] = useState(false);
  const t = translations[lang];

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    I18nManager.forceRTL(newLang === 'hi');
    setLang(newLang);
  };

  const openPdfFromWeb = async () => {
    const url = 'http://lsg.urban.rajasthan.gov.in/content/raj/udh/nagar-palika-kpatan/en/citizen-corner/citizen-charter/swm-user-charge-notification.html'; // Replace with actual PDF URL
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (err) {
      Alert.alert('Error', 'Could not open PDF.');
    }
  };

  const openPdfFromDevice = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (result.type === 'success') {
        await WebBrowser.openBrowserAsync(result.uri);
      }
    } catch (err) {
      Alert.alert('Error', 'Could not open selected PDF.');
    }
  };
  const navigation = useNavigation();
  return (
    <>
    <View style={styles.screen}>
      {/* Language Switch */}
       <Ionicons onPress={()=>{navigation.goBack()}} style={{position:"absolute" , left: 10 , top: 15}} name='arrow-back-outline' size={30} color={"blue"}/>
      <View style={styles.langSwitch}>
       
        <Text style={styles.langLabel}>{lang === 'en' ? 'English' : 'हिन्दी'}</Text>
        <Switch value={lang === 'hi'} onValueChange={toggleLang} />
      </View>

      <ScrollView style={styles.container}>
        {/* PDF Buttons */}
        <TouchableOpacity style={styles.pdfButton} onPress={openPdfFromWeb}>
          <MaterialIcons name="picture-as-pdf" size={20} color="#fff" />
          <Text style={styles.pdfText}>{t.viewPDF}</Text>
        </TouchableOpacity>
        <ProfileCard/>

        {/* Info Cards */}
        {[
          { icon: 'info-circle', color: '#2563eb', title: t.userCharges, text: t.userChargesText },
          { icon: 'gavel', color: '#dc2626', title: t.compulsory, text: t.compulsoryText },
          { icon: 'balance-scale', color: '#059669', title: t.factors, text: t.factorsText },
          { icon: 'list-alt', color: '#d97706', title: t.rates, text: t.ratesText },
        ].map((item, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.headerRow}>
              <FontAwesome5 name={item.icon} size={20} color={item.color} />
              <Text style={[styles.headerText, { color: item.color }]}>{item.title}</Text>
            </View>
            <Text style={styles.bodyText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Floating FAQ Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setShowFAQ(true)}>
        <Ionicons name="help-circle" size={30} color="#fff" />
      </TouchableOpacity>

      {/* FAQ Modal */}
      <Modal visible={showFAQ} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t.faq}</Text>
            <Text style={styles.modalText}>
              • What if I don’t pay the charges?{"\n"}
              • How is my charge calculated?{"\n"}
              • Where can I pay the charges?
            </Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowFAQ(false)}>
              <Text style={styles.closeText}>{t.close}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
     
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f3f4f6' },
  container: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    
  },
  bodyText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  pdfButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a8a',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    justifyContent: 'center',
  },
  pdfText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  langSwitch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  langLabel: {
    fontSize: 16,
    marginRight: 8,
    color: '#111827',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 50,
    elevation: 6,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 20,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ef4444',
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 15,
  },
});
