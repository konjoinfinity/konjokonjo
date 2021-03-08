import React from "react";
import { Image, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert, Dimensions } from "react-native";
import SInfo from 'react-native-sensitive-info';
import RNSharePointAuth from 'react-native-sp-auth'
// import { useNavigation } from '@react-navigation/native';

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
            // WesleyScholl@LSsoftware.onmicrosoft.com
            // TAsgiBT$1$1
            if (token) {
                await Alert.alert("Login Successful")
                console.log(this.state)
                console.log(token)
                this.onValueChange(STORAGE_KEY, token);
                this.onValueChange(STORAGE_USER, this.state.email);
                navigation.navigate('Home');
                this.loginClear();
            }
        } else {
            Alert.alert("Please enter a valid email.");
        }
    }

    render() {
        // function LoginButtonTest() {
        //     const navigation = useNavigation();
        //     return (
        //         <TouchableOpacity
        //             style={styles.loginButton}
        //             onPress={() => { navigation.navigate('Home') }}>
        //             <Text style={styles.buttonText}>Login 🔑</Text>
        //         </TouchableOpacity>
        //     );
        // }
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
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => { this.props.navigation.navigate('Home') }}>
                                <Text style={styles.buttonText}>Login 🔑</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.signupButton}
                                onPress={() => this.props.navigation.push("Signup")}>
                                <Text style={styles.buttonText}>Don't have an Account? Signup! ⌨️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.checkButton}
                                onPress={() => this.getUsername()}>
                                <Text style={styles.buttonText}>Check User ❔</Text>
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
    textInput: {
        borderColor: "#CCCCCC",
        borderWidth: 1,
        height: 50,
        fontSize: Dimensions.get('window').height * 0.017,
        paddingLeft: 20,
        paddingRight: 20,
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
});
