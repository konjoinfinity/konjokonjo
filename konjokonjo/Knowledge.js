import React from "react";
import { View, StatusBar, Text, Button, Image, TouchableOpacity, StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView, TextInput, Dimensions, PixelRatio, Alert, ScrollView } from 'react-native';
import 'react-native-gesture-handler';


class Knowledge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView>
                    <Text style={{ fontSize: 20, padding: Dimensions.get('window').height * 0.04, textAlign: 'center' }}>Knowledge</Text>
                    <View style={{ padding: Dimensions.get('window').height * 0.009 }}></View>
                    <View style={styles.card}>
                        <Button title="Doc 8" onPress={() => Alert.alert('open doc 8')} />
                    </View>
                </ScrollView>
            </View>
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