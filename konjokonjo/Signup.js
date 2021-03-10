import React from "react";
import { Image, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Dimensions } from "react-native";
import SInfo from 'react-native-sensitive-info';
import LinearGradient from 'react-native-linear-gradient';

const STORAGE_KEY = "id_token";
const STORAGE_USER = "username";

class SignupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmpass: ""
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.loginClear = this.loginClear.bind(this);
    }

    componentDidMount() {
        // console.log("Signup Loaded")
    }

    handleEmailChange(email) {
        this.setState({ email });
    }
    handlePasswordChange(password) {
        this.setState({ password });
    }
    handleConfirmPassChange(confirmpass) {
        this.setState({ confirmpass });
    }

    loginClear() {
        this.setState({
            email: "",
            password: "",
            confirmpass: ""
        });
    }

    async onValueChange(item, selectedValue) {
        try {
            await SInfo.setItem(item, selectedValue, {});
        } catch (error) {
            console.log("SensitiveInfoStorage error: " + error.message);
        }
    }

    handleSignup() {
        let text = this.state.email
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (reg.test(text) === true) {
            if (this.state.password.length >= 8) {
                Alert.alert("Add POST for user signup")
                // fetch(konjoUrl + "users/signup", {
                //     method: "POST",
                //     headers: {
                //         "Content-type": "application/json"
                //     },
                //     body: JSON.stringify({
                //         email: this.state.email,
                //         password: this.state.password,
                //         confirmpass: this.state.confirmpass
                //     })
                // })
                // .then(response => response.json())
                // .then(responseData => {
                //     if (responseData.error) {
                //         Alert.alert('Error' + `${responseData.error}`);
                //     } else {
                //         this.onValueChange(STORAGE_KEY, responseData.token);
                //         this.onValueChange(STORAGE_USER, this.state.email);
                //         this.props.navigation.navigate("Home", { signup: true, email: this.state.email });
                //         this.loginClear();
                //     }
                // })
                // .catch(err => {
                //     console.log(err);
                // });
            } else {
                Alert.alert("Passwords are required to have at least 8 characters.");
            }
        } else {
            Alert.alert('Warning', "Please enter valid email.");
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView>
                    <View style={{ borderRadius: 15, padding: 10, margin: 10 }}>
                        <Text style={styles.header}>Signup</Text>
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
                                returnKeyType={"next"}
                                blurOnSubmit={false}
                                onChangeText={this.handlePasswordChange}
                                ref={(input) => { this.passInput = input; }}
                                onSubmitEditing={() => { this.confirmpassInput.focus(); }}
                                value={this.state.password} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                name="confirmpass"
                                id="confirmpass"
                                onChangeText={this.handleConfirmPassChange}
                                ref={(input) => { this.confirmpassInput = input; }}
                                onSubmitEditing={() => this.handleSignup()}
                                value={this.state.confirmpass}
                                returnKeyType='send' />
                        </View>
                        <View style={styles.inputContainer}>

                            <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.018 }} onPress={() => this.handleSignup()}>
                                <LinearGradient colors={['#88cc88', '#7cb97c', '#669966']} style={styles.linearGradient}>
                                    <Text style={styles.buttonText}>Signup ⌨️</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.018 }} onPress={() => this.props.navigation.push("Login")}>
                                <LinearGradient colors={['#81a1c7', '#5696db', '#007bff']} style={styles.linearGradient}>
                                    <Text style={styles.buttonText}>⬅️ Back to Login 🔑</Text>
                                </LinearGradient>
                            </TouchableOpacity>


                            {/* <TouchableOpacity
                                style={styles.signupButton}
                                onPress={() => this.handleSignup()}>
                                <Text style={styles.buttonText}>Signup ⌨️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => this.props.navigation.push("Login")}>
                                <Text style={styles.buttonText}>⬅️ Back to Login 🔑</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView >
        );
    }
}
export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        alignItems: "center"
    },
    header: {
        fontSize: 30,
        textAlign: "center",
        margin: 10,
        fontFamily: 'Gill Sans'
    },
    inputContainer: {
        paddingTop: 15
    },
    textInput: {
        borderColor: "#CCCCCC",
        borderWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 15,
        textAlign: "center"
    },
    signupButton: {
        borderWidth: 1,
        borderColor: "#12C16D",
        backgroundColor: "#12C16D",
        padding: 15,
        margin: 5,
        borderRadius: 15
    },
    loginButton: {
        borderWidth: 1,
        borderColor: "#007BFF",
        backgroundColor: "#007BFF",
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
