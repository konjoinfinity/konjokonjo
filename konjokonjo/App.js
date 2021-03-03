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
import RNSharePointAuth from 'react-native-sp-auth'


var screenWidth = Dimensions.get('window').width * PixelRatio.get(), screenHeight = Dimensions.get('window').height * PixelRatio.get()
var lslist = ""
let mine;

myLoginButton = async () => {
  const sp = new RNSharePointAuth("https://lssoftware.sharepoint.com/");
  const { digest, token } = await sp.login("WesleyScholl@LSsoftware.onmicrosoft.com ", "TAsgiBT$1$1");
  if (token) {
    await Alert.alert("Login Successfull");
    fetch("https://lssoftware.sharepoint.com/_api/web/lists", {
      method: "GET",
      headers: {
        "Accept": "application/json;odata=verbose",
        "Cookie": token,
        "Content-Type": "application/json"
      }
    })
      .then((y) => y.json())
      .then((y) => {
        var conStr = "List Names:";
        y.d.results.forEach(function (item) {
          conStr += item.Title + ", ";
          lslist = item;
        })
        console.log(conStr)
        Alert.alert(conStr)
      })
    // this.setState({status:conStr})})
    // await this.setState({status:token});
    // await Alert.alert(digest+ " " +token);
    // await console.log(digest,token)
  }
  // this.setState({status:"Livingston"});
}

function LogoTitle() {
  return (
    <Image style={{ width: 40, height: 40 }} source={require('./klogo.png')} />
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, padding: Dimensions.get('window').height * 0.04 }}>Konjo LifeSystem</Text>
      <TouchableOpacity style={styles.loginButton} onPress={() => this.myLoginButton()}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>
      {/* <TextInput style={styles.textInput} /> */}
    </View>
  );
}

function KnowledgeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView>
        <Text style={{ fontSize: 20, padding: Dimensions.get('window').height * 0.04, textAlign: 'center' }}>Knowledge</Text>
        <View style={{ padding: Dimensions.get('window').height * 0.009 }}></View>
        <View style={styles.card}>
          <Button title="Doc 8" onPress={() => Alert.alert('open doc 8')} />
        </View>
      </ScrollView>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, padding: Dimensions.get('window').height * 0.04, textAlign: 'center' }}>Settings</Text>
      <View style={{ padding: Dimensions.get('window').height * 0.01 }}></View>
      <View style={styles.settingcard}>
        <Button title="Setting 1" onPress={() => Alert.alert('adjust setting 1')} />
      </View>
      <View style={{ padding: Dimensions.get('window').height * 0.01 }}></View>
      <View style={styles.settingcard}>
        <Button title="Setting 2" onPress={() => Alert.alert('adjust setting 2')} />
      </View>
      <View style={{ padding: Dimensions.get('window').height * 0.01 }}></View>
      <View style={styles.settingcard}>
        <Button title="Setting 3" onPress={() => Alert.alert('adjust setting 3')} />
      </View>
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
      <Tab.Screen name="Konjo" component={HomeScreen} options={{ headerTitle: props => <LogoTitle {...props} /> }} />
      <Tab.Screen name="Knowledge" component={KnowledgeScreen} options={{ tabBarBadge: 8, headerTitle: props => <LogoTitle {...props} /> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: props => <LogoTitle {...props} /> }} />
    </Tab.Navigator>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      knowledge: "test"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(knowledge) { this.setState({ email }) }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator mode="modal">
            <Stack.Screen name="Home" component={TabStack} options={{ headerTitle: LogoTitle, headerStyle: { backgroundColor: '#4AA748' } }} />
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
  }
})