import React from "react";
import { View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView, TextInput, Dimensions, PixelRatio, Alert, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import RNSharePointAuth from 'react-native-sp-auth'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ""
        };
    }

    myLoginButton = async () => {
        const sp = new RNSharePointAuth("https://lssoftware.sharepoint.com/");
        const { digest, token } = await sp.login("WesleyScholl@LSsoftware.onmicrosoft.com ", "TAsgiBT$1$1");
        if (token) {
            await Alert.alert("Login Successfull");
            fetch("https://lssoftware.sharepoint.com/_api/Web/Lists(guid'4541133b-d5cc-4eff-8671-c72c134a06fa')/Items", {
                method: "GET",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Cookie": token,
                    "Content-Type": "application/json"
                }
            })
                .then((y) => y.json())
                .then((y) => {
                    // var conStr = "List Names:";
                    // y.d.results.Knowledge.forEach(function (item) {
                    //     conStr += item.Title + ", ";
                    // })
                    console.log(y.d.results)
                    this.setState({ list: y.d.results });

                })
        }
    }

    render() {
        console.log(this.state)
        let lslist;
        this.state.list &&
            (lslist = this.state.list.map((item, id) => {
                return (
                    <View style={{ borderRadius: 15, padding: Dimensions.get('window').height * 0.009, margin: Dimensions.get('window').height * 0.009 }} key={id}>
                        <Text style={{ fontSize: Dimensions.get('window').height * 0.015, textAlign: "center", padding: Dimensions.get('window').height * 0.0000001 }}>
                            {item.Title}
                        </Text>
                        <Text style={{ fontSize: Dimensions.get('window').height * 0.015, textAlign: "center", padding: Dimensions.get('window').width * 0.0000001 }}>
                            Tags: {item.Tags}
                        </Text>
                    </View>
                );
            }));
        return (
            <ScrollView>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                    <Text style={{ fontSize: Dimensions.get('window').height * 0.03, padding: Dimensions.get('window').height * 0.04 }}>Konjo LifeSystem</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={() => this.myLoginButton()}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Login</Text>
                    </TouchableOpacity>
                    {lslist}
                </View>
            </ScrollView>
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
    },
})