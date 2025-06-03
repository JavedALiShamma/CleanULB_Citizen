import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
const data = [
  { title: 'Know your city', subtitle: 'Know about the city and the heritage', color: '#c9e0dd' ,titleColor:"#4e9c91"},
  { title: 'EO Message to citizens', subtitle: 'EO Message to the citizens', color: '#DDD6FE' ,titleColor:"#c6bdf0",iconpath:"../assets/images/auto-tipper.png"},
  { title: 'Chariman Message', subtitle: 'Chariman Message to the citizens', color: '#BBF7D0' ,titleColor:"#4e9c91",iconpath:"../assets/images/auto-tipper.png" },
  { title: 'Track your complaints', subtitle: 'Track your complaints', color: '#FBCFE8',titleColor:"#e099c1" ,iconpath:"../assets/images/auto-tipper.png" },
  { title: 'Track garbage Vehicle', subtitle: 'Scan passports', color: '#BFDBFE' ,titleColor:"#4e9c91",iconpath:"../assets/images/auto-tipper.png"   },
  { title: 'Near by Toilets', subtitle: 'Locate toilets near me', color: '#FCA5A5' ,titleColor:"#e099c1",iconpath:"../assets/images/auto-tipper.png"  },
];

const Card = ({ title, subtitle, color, onPress, iconpath,titleColor }) => (
 
  <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
    {/* Placeholder Icon */}
   {title=="Know your city" && <Text style={{fontWeight:"bold", fontSize:25 , marginBottom:4 , color:"#4E9C91", textAlign:"center"}}>{title}</Text>} 
   {title=="EO Message to citizens" && <Text style={{fontWeight:"bold", fontSize:25 , marginBottom:4 , color:"#8380B0", textAlign:"center"}}>{title}</Text>} 
   {title=="Chariman Message" && <Text style={{fontWeight:"bold", fontSize:25 , marginBottom:4 , color:"white", textAlign:"center"}}>{title}</Text>} 
   {title=="Track your complaints" && <Text style={{fontWeight:"bold", fontSize:25 , marginBottom:4 , color:"#F27A59", textAlign:"center"}}>{title}</Text>} 
   {title=="Track garbage Vehicle" && <Text style={{fontWeight:"bold", fontSize:25 , marginBottom:4 , color:"black", textAlign:"center"}}>{title}</Text>} 
   {title=="Near by Toilets" && <Text style={{fontWeight:"bold", fontSize:25 , marginBottom:4 , color:"white", textAlign:"center"}}>{title}</Text>} 
  
    
    {title === "Know your city" && <Image source={require("../assets/images/smallCity.png")} style={{width:100,height:100,margin:"auto"}}/>}
    {title=="EO Message to citizens" && <Image source={require("../assets/images/message.png")} style={{width:100,height:100,margin:"auto"}}/>}
    {title=="Chariman Message" && <Image source={require("../assets/images/smallCity.png")} style={{width:100,height:100,margin:"auto"}}/>}
    {title=="Track your complaints" && <Image source={require("../assets/images/complain.png")} style={{width:100,height:100,margin:"auto"}}/>}
    {/* {title=="Track garbage Vehicle" && <Image source={require("../assets/images/smallCity.png")} style={{width:100,height:100,margin:"auto"}}/>} */} 
    {title=="Track garbage Vehicle" && <Image source={require("../assets/images/auto-tipper.png")} style={{width:100,height:100,margin:"auto"}}/>}
    {title=="Near by Toilets" && <Image source={require("../assets/images/publicToilet.png")} style={{width:100,height:100,margin:"auto"}}/>}
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Ionicons style={{position:'absolute',right:10,bottom:10}} name="arrow-forward-outline" size={24} color={"#4e9c91"} />
  </TouchableOpacity>
);


const ToolGrid = () => {
  const router = useRouter();
  const navigation=useNavigation();
  const handleCardPress = (title) => {

  
    if(title=="Track garbage Vehicle"){
      //  router.push("/autotipper");
       navigation.navigate("autotipper",{"color":"#579cf2"})
    }
    if(title=="Track your complaints"){
      // router.push("/complaint");
      navigation.navigate("complaint" , {"color":"#FBCFE8"})
    }
    if(title=="Near by Toilets"){
      // We need to send the user to the near by toilets page
      navigation.navigate("NearByToilets" ,{"color":"#FCA5A5"});
    }
    if(title =="EO Message to citizens"){
      // Here we will call EO message section
      navigation.navigate("EOMessage");
    }
    if(title === "Know your city"){
      navigation.navigate("knowYourCity", {"color":"#c9e0dd"})
    }
};
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            color={item.color}
            iconpath={item.iconpath}
            onPress={() => handleCardPress(item.title)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 24;

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop:10,
    padding: 12,
    paddingBottom: 0,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  icon: {
    fontSize: 28,
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 4,
    color:"#e099c1", 
    textAlign:'center'
  },
  subtitle: {
    fontSize: 12,
    color: '#4B5563',
  },
});

export default ToolGrid;