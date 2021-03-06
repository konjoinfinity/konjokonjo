import React from "react";
import {
    View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView,
    TextInput, Dimensions, PixelRatio, Alert, ScrollView, Linking, Animated, Easing
} from 'react-native';
import 'react-native-gesture-handler';
import RNSharePointAuth from 'react-native-sp-auth'
import SInfo from 'react-native-sensitive-info';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationEvents } from "react-navigation"
import * as Animatable from 'react-native-animatable';

AnimatableView = Animatable.createAnimatableComponent(View);

spinValue = new Animated.Value(0);

Animated.loop(
    Animated.timing(
        this.spinValue,
        {
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true
        }
    )
).start();

const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
})

const STORAGE_KEY = "id_token";
const STORAGE_USER = "username";
const STORAGE_PASS = "password";


class Knowledge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: "",
            email: "",
            userToken: "",
            search: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    async getToken() {
        const token = await SInfo.getItem(STORAGE_KEY, {});
        this.setState({ userToken: token });
        const username = await SInfo.getItem(STORAGE_USER, {});
        this.setState({ email: username });
        const password = await SInfo.getItem(STORAGE_PASS, {});
        this.setState({ password: password });
    }

    async componentDidMount() {
        const sp = new RNSharePointAuth('https://lssoftware.sharepoint.com');
        try {
            // trying to restore session
            const digest = await sp.renewDigest();
        } catch (e) {
            // can't automatic restore the session, read token from Storage
            const token = await SInfo.getItem(STORAGE_KEY, {});
            if (token) {
                // await sp.setToken(token);
                // try {
                //     const digest = await sp.renewDigest();
                // } catch (e1) {
                // can't restore the session, re-login
                const username = await SInfo.getItem(STORAGE_USER, {});
                const password = await SInfo.getItem(STORAGE_PASS, {});
                const { digest, token } = await sp.login(username + "@lssoftware.onmicrosoft.com", password);
                // store token back to Storage
                await SInfo.setItem(STORAGE_KEY, token, {});
                // }
            }
        }
        const userToken = await SInfo.getItem(STORAGE_KEY, {});
        // await this.getToken()
        // "https://mySite/_api/lists/getbytitle('" + myList + "')/items?$top=5000"
        // https://lssoftware.sharepoint.com/_api/Web/Lists(guid'4541133b-d5cc-4eff-8671-c72c134a06fa')/Items
        await fetch("https://lssoftware.sharepoint.com/_api/lists/getbytitle('Knowledge')/items?$top=5000", {
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Cookie": `${userToken}`,
                "Content-Type": "application/json"
            }
        }).then((y) => y.json())
            .then((y) => {
                this.setState({ list: y.d.results })
            })
    }

    handleChange(searchtext) {
        this.setState({ search: searchtext });
    }

    render() {
        let listSearch;
        this.state.list && (listSearch = this.state.list);
        let search;
        this.state.list && (
            (search = this.state.search.trim().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").toLowerCase()))
        // add a method to search tags, combine, then filter out duplicates (would this slow down the search?)
        this.state.list &&
            search.length > 0 && (
                (listSearch = listSearch.filter(function (item) {
                    return item.Title.toLowerCase().match(search);
                }))
            )
        let results;
        this.state.list &&
            (results = listSearch.map((item, id) => {
                return (
                    <TouchableOpacity
                        key={id}
                        style={{
                            borderWidth: 1,
                            borderColor: "#FFFFFF",
                            backgroundColor: "#" + ("000" + (Math.random() * (1 << 24) | 0).toString(16)).substr(-6),
                            padding: 10,
                            margin: 5,
                            borderRadius: 15
                        }}
                        onPress={() => Linking.openURL("https://lssoftware.sharepoint.com/Knowledge/" + `${item.Title}`)}>
                        <Text style={styles.communityButtonText}>{item.Title}</Text>
                    </TouchableOpacity>
                );
            }));
        let newsearch;
        this.state.list !== "" && (
            newsearch =
            this.state.search !== "" &&
            (results.length === 0 && (
                <View style={{ borderRadius: 15 }}>
                    <Text style={{ fontSize: 20, textAlign: "center", padding: 5 }}>Create a New Doc</Text>
                    <TouchableOpacity
                        style={styles.newButton}
                        onPress={() => Alert.alert("Create: " + `${this.state.search}`)}>
                        <Text style={styles.newButtonText}>➕ {this.state.search}</Text>
                    </TouchableOpacity>
                </View>
            )));
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <NavigationEvents onDidFocus={() => this.textInput.focus()} />
                <ScrollView ref={ref => this.scrollView = ref}>
                    <View style={{ borderRadius: 15, paddingTop: 5 }}>
                        <Text style={styles.header}>Global Docs</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                autoCapitalize="none"
                                placeholder="Search"
                                name="searchtext"
                                id="searchtext"
                                onChangeText={this.handleChange}
                                value={this.state.search}
                                ref={(input) => { this.textInput = input; }} />
                        </View>
                    </View>
                    {this.state.search === "" &&
                        <View style={{ borderRadius: 15 }}>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Animated.Image source={require("./konjosun.png")}
                                    style={{
                                        width: Dimensions.get('window').width * 0.6, height: Dimensions.get('window').height * 0.32,
                                        marginTop: 15, transform: [{ rotate: spin }]
                                    }} resizeMode={"contain"} />
                            </View>
                        </View>}
                    {this.state.search !== "" &&
                        <View style={{
                            marginTop: Dimensions.get('window').height * 0.025, flexDirection: "row", flexWrap: "wrap",
                            justifyContent: "center", backgroundColor: "#12C16D", borderRadius: 15
                        }}>
                            {results}
                        </View>}
                    {newsearch}
                </ScrollView>
            </KeyboardAvoidingView >
        );
    }
}
export default Knowledge;

const styles = StyleSheet.create({
    card: {
        borderColor: "#CCCCCC",
        borderWidth: 1,
        height: Dimensions.get('window').height * 0.08,
        width: Dimensions.get('window').width * 0.85,
        fontSize: 25,
        padding: 15,
        borderRadius: 15,
        textAlign: "center"
    },
    linearGradient: {
        borderRadius: 15,
        width: Dimensions.get('window').width * 0.70,
        height: Dimensions.get('window').height * 0.08

    },
    buttonText: {
        fontSize: Dimensions.get('window').height * 0.015,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
        paddingTop: Dimensions.get('window').width * 0.02
    },
    inputContainer: {
        paddingTop: 15,
        flex: 1,
        alignItems: "center"
    },
    textInput: {
        borderColor: "#CCCCCC",
        borderWidth: 1,
        height: 50,
        fontSize: Dimensions.get('window').height * 0.025,
        width: Dimensions.get('window').width * 0.85,
        borderRadius: 15,
        textAlign: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    communityButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        textAlign: "center"
    },
    communities: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    newButton: {
        borderWidth: 1,
        borderColor: "#12C16D",
        backgroundColor: "#12C16D",
        padding: 15,
        margin: 5,
        borderRadius: 15
    },
    newButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: "center"
    },
    header: {
        fontSize: 26,
        textAlign: "center",
        margin: 5
    }
})