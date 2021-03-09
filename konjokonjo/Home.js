import React from "react";
import {
    View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView,
    KeyboardAvoidingView, TextInput, Dimensions, PixelRatio, Alert, ScrollView
} from 'react-native';
import 'react-native-gesture-handler';
import RNSharePointAuth from 'react-native-sp-auth'
import SInfo from 'react-native-sensitive-info';
import LinearGradient from 'react-native-linear-gradient';
import Knowledge from "./Knowledge";

const STORAGE_KEY = "id_token";
const STORAGE_USER = "username";
const STORAGE_PASS = "password";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: "",
            email: "",
            userToken: ""
        };
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
        // https://abcd.sharepoint.com/sites/RohitW/_api/Web/lists/getbytitle('DocLibTest1')/RootFolder
        // https://hostssite/apps/TestAppsite/_api/Web/Lists/GetByTitle(‘Divisions’)/items?$select=*&$filter=Title eq ‘test1’
        await fetch("https://lssoftware.sharepoint.com/_api/Web/Lists(guid'4541133b-d5cc-4eff-8671-c72c134a06fa')/Items", {
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Cookie": `${userToken}`,
                "Content-Type": "application/json"
            }
        }).then((y) => y.json())
            .then((y) => {
                // this.setState({ list: y.d.results })
                console.log(y)
                this.setState({ list: y.d.results })
            })
    }

    render() {
        let userlist;
        let filterlist;
        this.state.list &&
            (filterlist = this.state.list.filter(list => list.EditorId == 29));
        console.log(filterlist)
        this.state.list &&
            (userlist = filterlist.map((item, id) => {
                return (
                    <View key={id}>
                        <TouchableOpacity style={{ marginTop: Dimensions.get('window').height * 0.03 }} onPress={() => Alert.alert("Open: " + `${item.Title}`)}>
                            <LinearGradient colors={['#c7a681', '#b09373', '#9d8367']} style={styles.linearGradient}>
                                <Text style={styles.buttonText}>
                                    {item.Title}
                                </Text>
                                <Text style={styles.buttonText}>
                                    Tags: {item.Tags}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                );
            }));
        return (
            <ScrollView>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontFamily: 'Gill Sans', fontSize: Dimensions.get('window').height * 0.03, padding: Dimensions.get('window').height * 0.04 }}>Personal Docs</Text>
                    {userlist}
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
        fontSize: Dimensions.get('window').height * 0.015,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    }
})