import React from "react";
import { View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView, TextInput, Dimensions, PixelRatio, Alert, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import RNSharePointAuth from 'react-native-sp-auth'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

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
                    })
                    console.log(conStr)
                    Alert.alert(conStr)
                })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20, padding: Dimensions.get('window').height * 0.04 }}>Konjo LifeSystem</Text>
                <TouchableOpacity style={styles.loginButton} onPress={() => this.myLoginButton()}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default Home;

const styles = StyleSheet.create({
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
    }
})