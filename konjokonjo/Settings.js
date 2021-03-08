import React from "react";
import { View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView, TextInput, Dimensions, PixelRatio, Alert, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import SInfo from "react-native-sensitive-info"

const STORAGE_KEY = "id_token";
const STORAGE_USER = "username";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async handleLogout() {
        await SInfo.deleteItem(STORAGE_KEY, {});
        await SInfo.deleteItem(STORAGE_USER, {});
        this.props.navigation.navigate("Login")
    }

    render() {
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
                    <TouchableOpacity
                        style={{ borderWidth: 1, borderColor: "#12C16D", backgroundColor: "#12C16D", padding: 15, margin: 5, borderRadius: 15 }}
                        onPress={() => this.handleLogout()}>
                        <Text style={{ color: "#FFFFFF", fontSize: 20, textAlign: "center" }}>Logout ➡️🚪</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default Settings;

const styles = StyleSheet.create({
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