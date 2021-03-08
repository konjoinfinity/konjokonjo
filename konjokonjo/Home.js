import React from "react";
import {
    View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView,
    KeyboardAvoidingView, TextInput, Dimensions, PixelRatio, Alert, ScrollView
} from 'react-native';
import 'react-native-gesture-handler';
import RNSharePointAuth from 'react-native-sp-auth'
import SInfo from 'react-native-sensitive-info';
import LinearGradient from 'react-native-linear-gradient';

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
                    <Text style={{ fontSize: Dimensions.get('window').height * 0.03, padding: Dimensions.get('window').height * 0.04 }}>Personal Docs</Text>

                    <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.05 }} onPress={() => Alert.alert("Open Doc 1")}>
                        <LinearGradient colors={['#c7a681', '#b09373', '#9d8367']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Doc 1</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.05 }} onPress={() => Alert.alert("Open Doc 2")}>
                        <LinearGradient colors={['#c7a681', '#b09373', '#9d8367']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Doc 2</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.05 }} onPress={() => Alert.alert("Open Doc 3")}>
                        <LinearGradient colors={['#c7a681', '#b09373', '#9d8367']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Doc 3</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.05 }} onPress={() => Alert.alert("Open Doc 4")}>
                        <LinearGradient colors={['#c7a681', '#b09373', '#9d8367']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Doc 4</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.05 }} onPress={() => Alert.alert("Open Doc 5")}>
                        <LinearGradient colors={['#c7a681', '#b09373', '#9d8367']} style={styles.linearGradient}>
                            <Text style={styles.buttonText}>Doc 5</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
        textAlign: "center",
        backgroundColor: "#" + ("000" + (Math.random() * (1 << 24) | 0).toString(16)).substr(-6)
    },
    linearGradient: {
        borderRadius: 15,
        width: Dimensions.get('window').width * 0.70,
        height: Dimensions.get('window').height * 0.08

    },
    buttonText: {
        fontSize: 22,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }
})