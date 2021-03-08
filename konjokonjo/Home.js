import React from "react";
import {
    View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView,
    KeyboardAvoidingView, TextInput, Dimensions, PixelRatio, Alert, ScrollView
} from 'react-native';
import 'react-native-gesture-handler';
import RNSharePointAuth from 'react-native-sp-auth'
import SInfo from 'react-native-sensitive-info';

const STORAGE_KEY = "id_token";
const STORAGE_USER = "username";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: "",
            email: "",
            userToken: ""
        };
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: Dimensions.get('window').height * 0.03, padding: Dimensions.get('window').height * 0.04 }}>Profile</Text>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Personal Docs</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ padding: Dimensions.get('window').height * 0.01 }}></View>
                        <View style={styles.settingcard}>
                            <Button title="Doc 1" onPress={() => Alert.alert('Open doc 1')} />
                        </View>
                        <View style={{ padding: Dimensions.get('window').height * 0.01 }}></View>
                        <View style={styles.settingcard}>
                            <Button title="Doc 2" onPress={() => Alert.alert('Open doc 2')} />
                        </View>
                        <View style={{ padding: Dimensions.get('window').height * 0.01 }}></View>
                        <View style={styles.settingcard}>
                            <Button title="Doc 3" onPress={() => Alert.alert('Open doc 3')} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default Home;

const styles = StyleSheet.create({
    loginButton: {
        borderColor: "#81c784",
        borderWidth: 1,
        height: Dimensions.get('window').height * 0.08,
        width: Dimensions.get('window').width * 0.85,
        fontSize: 25,
        padding: 15,
        borderRadius: 15,
        textAlign: "center",
        backgroundColor: "#81c784"
    },
    settingcard: {
        borderColor: "#CCCCCC",
        borderWidth: 1,
        height: Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width * 0.85,
        fontSize: 25,
        padding: 15,
        borderRadius: 15,
        textAlign: "center"
    }
})