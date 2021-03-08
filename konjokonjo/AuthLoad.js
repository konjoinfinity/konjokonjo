import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import SInfo from 'react-native-sensitive-info';

class AuthLoadScreen extends React.Component {
    constructor(props) {
        super(props);
        this.bootstrapAsync();
    }

    bootstrapAsync = async () => {
        const userToken = await SInfo.getItem('id_token', {});
        setTimeout(() => {
            this.props.navigation.navigate(userToken ? 'App' : 'Auth');
        }, 2500);
    };

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: "#81c784" }}>
                <Image source={require("./logo.png")} style={{ width: Dimensions.get('window').width * 0.95, height: Dimensions.get('window').height * 0.25 }} />
            </View>
        );
    }
}

export default AuthLoadScreen;