import React from "react";
import { Image, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert, Dimensions } from "react-native";
import SInfo from 'react-native-sensitive-info';
import RNSharePointAuth from 'react-native-sp-auth'
import LinearGradient from 'react-native-linear-gradient';

const STORAGE_KEY = "id_token";
const STORAGE_USER = "username";

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.loginClear = this.loginClear.bind(this);
    }

    async componentDidMount() {
        // add check for token, if present - navigate to Home
        const username = await SInfo.getItem(STORAGE_USER, {});
        if (username !== undefined) {
            await SInfo.deleteItem(STORAGE_KEY, {});
            await SInfo.deleteItem(STORAGE_USER, {});
            // const passchange = this.props.navigation.getParam('passchange', 'false');
            if (passchange === true) {
                Alert.alert('Password changed. Please login with your new password.');
            } else {
                Alert.alert('You have logged out.');
            }
        }
    }

    handleEmailChange(email) {
        this.setState({ email });
    }
    handlePasswordChange(password) {
        this.setState({ password });
    }

    loginClear() {
        this.setState({ email: "", password: "" });
        Keyboard.dismiss();
    }

    async getUsername() {
        const username = await SInfo.getItem(STORAGE_USER, {});
        Alert.alert(username === undefined ? "No user logged in" : username + " is logged in");
    }

    async onValueChange(item, selectedValue) {
        try {
            await SInfo.setItem(item, selectedValue, {});
        } catch (error) {
            console.log("SensitiveInfoStorage error: " + error.message);
        }
    }

    async handleLogin() {
        let text = this.state.email
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (reg.test(text) === true) {
            const sp = new RNSharePointAuth("https://lssoftware.sharepoint.com/");
            const { digest, token } = await sp.login(this.state.email, this.state.password);
            // add bad user/pass alert
            if (token) {
                await Alert.alert("Login Successful")
                this.onValueChange(STORAGE_KEY, token);
                this.onValueChange(STORAGE_USER, this.state.email);
                this.props.navigation.navigate('Home')
                this.loginClear();
            } else {
                Alert.alert("User does not have a valid token.");
            }
        } else {
            Alert.alert("Please enter a valid email.");
        }

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView>
                    <View style={{ borderRadius: 15, padding: 10, margin: 10 }}>
                        <Text style={styles.header}>Login</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoFocus={true}
                                autoCapitalize="none"
                                name="email"
                                id="email"
                                returnKeyType={"next"}
                                blurOnSubmit={false}
                                onChangeText={this.handleEmailChange}
                                value={this.state.email}
                                onSubmitEditing={() => { this.passInput.focus(); }} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Password"
                                secureTextEntry={true}
                                name="password"
                                id="password"
                                onChangeText={this.handlePasswordChange}
                                ref={(input) => { this.passInput = input; }}
                                onSubmitEditing={() => this.handleLogin()}
                                value={this.state.password}
                                returnKeyType='send' />
                        </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.018 }} onPress={() => this.handleLogin()}>
                                <LinearGradient colors={['#81a1c7', '#5696db', '#007bff']} style={styles.linearGradient}>
                                    <Text style={styles.buttonText}>Login 🔑</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.018 }} onPress={() => this.props.navigation.push("Signup")}>
                                <LinearGradient colors={['#88cc88', '#7cb97c', '#669966']} style={styles.linearGradient}>
                                    <Text style={styles.buttonText}>Don't have an Account? Signup! ⌨️</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.018 }} onPress={() => this.getUsername()}>
                                <LinearGradient colors={['#8381c7', '#6360b6', '#752794']} style={styles.linearGradient}>
                                    <Text style={styles.buttonText}>Check User ❔</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        alignItems: "center"
    },
    header: {
        fontSize: 30,
        textAlign: "center",
        margin: 10
    },
    inputContainer: {
        paddingTop: 15
    },
    textInput: {
        borderColor: "#CCCCCC",
        borderWidth: 1,
        height: 50,
        width: Dimensions.get('window').width * 0.85,
        fontSize: Dimensions.get('window').height * 0.017,
        borderRadius: 15,
        textAlign: "center"
    },
    loginButton: {
        borderWidth: 1,
        borderColor: "#007BFF",
        backgroundColor: "#007BFF",
        padding: 15,
        margin: 5,
        borderRadius: 15
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
    },
    linearGradient: {
        borderRadius: 15,
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').height * 0.07

    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }
});
