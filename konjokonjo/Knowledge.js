import React from "react";
import {
    View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView,
    TextInput, Dimensions, PixelRatio, Alert, ScrollView
} from 'react-native';
import 'react-native-gesture-handler';
import RNSharePointAuth from 'react-native-sp-auth'
import SInfo from 'react-native-sensitive-info';

const STORAGE_KEY = "id_token";
const STORAGE_USER = "username";


class Knowledge extends React.Component {
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
    }

    async componentDidMount() {
        await this.getToken();
        await fetch("https://lssoftware.sharepoint.com/_api/Web/Lists(guid'4541133b-d5cc-4eff-8671-c72c134a06fa')/Items", {
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Cookie": `${this.state.userToken}`,
                "Content-Type": "application/json"
            }
        }).then((y) => y.json())
            .then((y) => {
                // var conStr = "List Names:";
                // y.d.results.Knowledge.forEach(function (item) {
                //     conStr += item.Title + ", ";
                // })
                console.log(y.d.results)
                this.setState({ list: y.d.results }).catch(error => {
                    Alert.alert('Error' + `${error.message}!`);
                });
            })
    }

    render() {
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
                    <Text style={{ fontSize: Dimensions.get('window').height * 0.03, padding: Dimensions.get('window').height * 0.04 }}>Knowledge</Text>
                    {lslist}
                </View>
            </ScrollView>
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
    }
})