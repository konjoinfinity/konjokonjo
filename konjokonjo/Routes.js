import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack"
import { createSwitchNavigator } from "react-navigation"
import HomeScreen from "./Home"
import KnowledgeScreen from "./Knowledge"
import SettingsScreen from "./Settings"
import { View, TouchableOpacity, Dimensions, Text, Image } from "react-native"
import AuthLoadScreen from "./AuthLoad"
import LoginScreen from "./Login"
import SignupScreen from "./Signup"
import EIcon from 'react-native-vector-icons/Entypo'
import OIcon from 'react-native-vector-icons/Octicons'
import IIcon from 'react-native-vector-icons/Ionicons'
import Icon from "react-native-vector-icons/FontAwesome5"
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons"
import MIcon from "react-native-vector-icons/MaterialIcons"

class LogoTitle extends React.Component {
    render() {
        return (<Image source={require("./klogo.png")} style={{ width: 30, height: 30 }} />);
    }
}


const AppStack = createStackNavigator({
    MyTab: {
        screen: createMaterialTopTabNavigator({
            Home: {
                screen: HomeScreen,
                navigationOptions: {
                    tabBarLabel: ({ tintColor }) => (
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center", paddingTop: 2 }}>
                            <EIcon name="text" color={tintColor === '#ffffff' ? "#ACC086" : "#81c784"} size={25} />
                            <Text style={{ fontSize: 10, color: tintColor }}>Konjo</Text></View>)
                },
            },
            Knowledge: {
                screen: KnowledgeScreen,
                navigationOptions: {
                    tabBarLabel: ({ tintColor }) => (
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center", paddingTop: 2 }}>
                            <IIcon name="documents-outline" color={tintColor === '#ffffff' ? "#ACC086" : "#81c784"} size={25} />
                            <Text style={{ fontSize: 10, color: tintColor }}>Knowledge</Text></View>)
                },
            },
            Settings: {
                screen: SettingsScreen,
                navigationOptions: {
                    tabBarLabel: ({ tintColor }) => (
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center", paddingTop: 2 }}>
                            <OIcon name="settings" color={tintColor === '#ffffff' ? "#ACC086" : "#81c784"} size={25} />
                            <Text style={{ fontSize: 10, color: tintColor }}>Settings</Text></View>)

                },
            }
        },
            {
                initialRouteName: 'Home',
                headerTitle: () => <LogoTitle />,
                swipeEnabled: false,
                tabBarPosition: 'bottom',
                tabBarOptions: {
                    style: { backgroundColor: '#ffffff', borderTopWidth: 0.5, borderTopColor: "#e0e0e0" },
                    indicatorStyle: { backgroundColor: "#81c784" },
                    labelStyle: { margin: 0, padding: 0 },
                    activeTintColor: "gray", inactiveTintColor: '#ffffff', upperCaseLabel: false, showLabel: true, showIcon: false,
                    tabStyle: { height: Dimensions.get('window').height * 0.088, width: Dimensions.get('window').width * 0.33 }
                }
            }),
        navigationOptions: ({ navigation }) => ({
            title: `Konjo LifeSystem`,
            headerStyle: { backgroundColor: '#81c784' },
            headerTitleStyle: {
                color: "#ffffff", fontSize: 25, fontWeight: '400'
            },
            headerRight: () => (<View style={{ flexDirection: "row" }}>
                <TouchableOpacity accessibilityLabel="chat" style={{
                    height: 30, width: 30, alignItems: 'center', justifyContent: 'center', marginRight: 15,
                    borderRadius: 50, padding: 2, backgroundColor: "#ffffff", shadowColor: 'black', shadowOpacity: 0.5, shadowOffset: { width: 2, height: 2 }
                }}>
                    {/* onPress={() => navigation.push("PubChat")} */}
                    <MIcon name="logout" color="#43a047" size={18} style={{ height: 18, width: 18, textAlign: 'center' }} /></TouchableOpacity>
            </View>),
            headerLeft: () => (<View style={{ flexDirection: "row" }}>
                <TouchableOpacity accessibilityLabel="chat" style={{
                    height: 30, width: 30, alignItems: 'center', justifyContent: 'center', marginLeft: 15,
                    borderRadius: 50, padding: 2, backgroundColor: "#ffffff", shadowColor: 'black', shadowOpacity: 0.5, shadowOffset: { width: 2, height: 2 }
                }}>
                    {/* onPress={() => navigation.push("Push")} */}
                    <MatIcon name="information-variant" color="#43a047" size={18} style={{ height: 18, width: 18, textAlign: 'center' }} /></TouchableOpacity>
            </View>)
        })
    },
    // Chat: ChatScreen,
    // Push: PushScreen,
    // PubChat: PubChatScreen
})

const AuthStack = createStackNavigator({ Login: LoginScreen, Signup: SignupScreen },
    {
        initialRouteName: 'Login',
        headerTitleAlign: 'center',
        defaultNavigationOptions: ({
            title: "Konjo LifeSystem", headerStyle: { backgroundColor: '#81c784' }, headerTitle: () => <LogoTitle />, headerLeft: () => null,
            headerTitleStyle: { color: "#ffffff", fontSize: 25, textAlign: "center", fontWeight: '400' }
        })
    })

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoad: AuthLoadScreen,
        App: AppStack,
        Auth: AuthStack
    },
    { initialRouteName: 'AuthLoad' }
));