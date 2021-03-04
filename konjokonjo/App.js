import React from "react";
import { View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView, TextInput, Dimensions, PixelRatio, Alert, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBarHeightContext, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import EIcon from 'react-native-vector-icons/Entypo'
import OIcon from 'react-native-vector-icons/Octicons'
import IIcon from 'react-native-vector-icons/Ionicons'
import Knowledge from './Knowledge'
import Settings from './Settings'
import Home from "./Home";
import Login from './Login'

function LogoTitle() { return (<Image style={{ width: 40, height: 40 }} source={require('./klogo.png')} />) }

function HomeScreen({ navigation }) { return (<Home />) }

function KnowledgeScreen({ navigation }) { return (<Knowledge />) }

function SettingsScreen({ navigation }) { return (<Settings />) }

function SplashScreen() {
  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: "#81c784" }}>
      <Image source={require("./logo.png")} style={{ width: Dimensions.get('window').width * 0.95, height: Dimensions.get('window').height * 0.25 }} />
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabStack({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Konjo') {
            iconName = focused ? 'text' : 'text';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings';
          } else if (route.name === 'Knowledge') {
            iconName = focused ? 'documents-outline' : 'documents-outline';
          }
          return route.name == 'Konjo' ? <EIcon name={iconName} size={size} color={color} style={{ paddingTop: 10 }} /> : route.name == 'Settings' ? <OIcon name={iconName} size={size} color={color} style={{ paddingTop: 10 }} /> : <IIcon name={iconName} size={size} color={color} style={{ paddingTop: 10 }} />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ACC086',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: props => <LogoTitle {...props} /> }} />
      <Tab.Screen name="Knowledge" component={KnowledgeScreen} options={{ tabBarBadge: 8, headerTitle: props => <LogoTitle {...props} /> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: props => <LogoTitle {...props} /> }} />
    </Tab.Navigator>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator mode='card'>
            <Stack.Screen name="Login" component={Login} options={{ headerTitle: LogoTitle, headerStyle: { backgroundColor: '#4AA748' } }} />
            <Stack.Screen name="Home" component={TabStack} options={{ headerTitle: LogoTitle, headerStyle: { backgroundColor: '#4AA748' }, headerLeft: null, gestureEnabled: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: Dimensions.get('window').height * 0.6,
    width: Dimensions.get('window').width * 0.8,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
    textAlign: "center"
  },
  loginButton: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: Dimensions.get('window').height * 0.08,
    width: Dimensions.get('window').width * 0.85,
    fontSize: 25,
    padding: 15,
    borderRadius: 15,
    textAlign: "center",
    backgroundColor: "green"
  },
  card: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: Dimensions.get('window').height * 0.08,
    width: Dimensions.get('window').width * 0.85,
    fontSize: 25,
    padding: 15,
    borderRadius: 15,
    textAlign: "center"
  },
  settingcard: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').width * 0.85,
    fontSize: 25,
    padding: 15,
    borderRadius: 15,
    textAlign: "center"
  },
  container: {
    flex: 1,
    paddingTop: 10
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  inputContainer: {
    paddingTop: 15
  },
  loginButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5,
    borderRadius: 15
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  },
  checkButton: {
    borderWidth: 1,
    borderColor: "#752794",
    backgroundColor: "#752794",
    padding: 15,
    margin: 5,
    borderRadius: 15
  },
  signupButton: {
    borderWidth: 1,
    borderColor: "#12C16D",
    backgroundColor: "#12C16D",
    padding: 15,
    margin: 5,
    borderRadius: 15
  }
})