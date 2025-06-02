import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  I18nManager,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const translations = {
  en: {
    sectionTitle: 'Our Services',
    services: [
      { title: 'File a Complaint', icon: 'file-alt', color: '#f87171' , description :"Citizen can file a complaint that will be send to municipality & it will be resolved by the municipality " },
      { title: 'Collect C&D Waste', icon: 'truck', color: '#34d399', description:"Citizen can call municipaliy to collect the construction and demolution waste , additional charges are charged" },
      { title: 'Collection Faecal Sludge (Septage)', icon: 'toilet', color: '#60a5fa' ,description:"Faecal Sludge (Septage) is collected through de-sludging trucks by municplaity , extra charges are applied " },
      { title: 'Benefits of Giving User Charges', icon: 'hand-holding-heart', color: '#fbbf24', description:"Municplity will provide extra benifits to the commercail, hotel and schools in waste collection " },
    ]
  },
  hi: {
    sectionTitle: 'हमारी सेवाएँ',
    services: [
      { title: 'शिकायत दर्ज करें', icon: 'file-alt', color: '#f87171', description:"नागरिक शिकायत दर्ज करा सकते हैं जिसे नगर पालिका को भेजा जाएगा और नगर पालिका द्वारा इसका समाधान किया जाएगा"},
      { title: 'C&D मलबा संग्रहण', icon: 'truck', color: '#34d399', description:"नागरिक निर्माण और विध्वंस अपशिष्ट को इकट्ठा करने के लिए नगरपालिका को बुला सकते हैं, अतिरिक्त शुल्क लिया जाता है"  },
      { title: 'मल कीचड़ संग्रहण', icon: 'toilet', color: '#60a5fa',description:"घरों से निकलने वाला मल-मूत्र नगर पालिका द्वारा एकत्र किया जाता है तथा इसके लिए अतिरिक्त शुल्क लिया जाता है।" },
      { title: 'यूज़र चार्ज के लाभ', icon: 'hand-holding-heart', color: '#fbbf24',description:"नगर निगम कचरा संग्रहण में व्यापारियों, होटलों और स्कूलों को अतिरिक्त लाभ प्रदान करेगा" },
    ]
  }
};

export default function ServicesSection() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    I18nManager.forceRTL(newLang === 'hi');
    setLang(newLang);
  };

  return (
    <View style={styles.container}>
      {/* Language Toggle */}
      <View style={styles.langSwitch}>
        <Text style={styles.langLabel}>{lang === 'en' ? 'English' : 'हिन्दी'}</Text>
        <Switch value={lang === 'hi'} onValueChange={toggleLang} />
      </View>

      <Text style={styles.sectionTitle}>{t.sectionTitle}</Text>

      <ScrollView contentContainerStyle={styles.servicesWrapper}>
        {t.services.map((service, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: `${service.color}33` }]}>
            <View style={styles.iconWrapper}>
              <FontAwesome5 name={service.icon} size={30} color={service.color} />
            </View>
            <Text style={[styles.cardText, { color: service.color }]}>{service.title}</Text>
            <Text style={{color:"grey", fontSize:12 , wordWrap:"wrap", marginTop:3}}>{service.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f3f4f6',
  },
  langSwitch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  langLabel: {
    fontSize: 16,
    marginRight: 8,
    color: '#1f2937',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#111827',
   
  },
  servicesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    elevation: 3,
    backgroundColor: '#fff',
    
  },
  iconWrapper: {
    marginBottom: 10,
    marginTop:5
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom:5
  },
});
