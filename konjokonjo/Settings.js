import React from "react";
import {
    View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView, TextInput,
    Dimensions, PixelRatio, Alert, ScrollView
} from 'react-native';
import 'react-native-gesture-handler';
import SInfo from "react-native-sensitive-info"
import LinearGradient from 'react-native-linear-gradient';

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
                <Text style={{ fontFamily: 'Gill Sans', fontSize: Dimensions.get('window').height * 0.03, padding: Dimensions.get('window').height * 0.04, textAlign: 'center' }}>Settings</Text>
                <View style={styles.settingcard}>
                    <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.018 }} onPress={() => Alert.alert("Change Setting 1")}>
                        <LinearGradient colors={['#81a1c7', '#5696db', '#007bff']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Setting 1</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingcard}>
                    <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.018 }} onPress={() => Alert.alert("Change Setting 2")}>
                        <LinearGradient colors={['#88cc88', '#7cb97c', '#669966']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Setting 2</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingcard}>
                    <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.018 }} onPress={() => Alert.alert("Change Setting 3")}>
                        <LinearGradient colors={['#8381c7', '#6360b6', '#752794']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Setting 3</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingcard}>
                    <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.018 }} onPress={() => this.handleLogout()}>
                        <LinearGradient colors={['#c7a681', '#b09373', '#9d8367']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Logout ➡️🚪</Text>
                        </LinearGradient>
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
        height: Dimensions.get('window').height * 0.14,
        width: Dimensions.get('window').width * 0.85,
        margin: 10,
        borderRadius: 15,
        flex: 1,
        alignItems: "center"
    },
    linearGradient: {
        borderRadius: 15,
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.07

    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }
})