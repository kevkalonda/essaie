import React from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


export default class welcomBoth extends React.Component {
    Redirection() {
        this.props.navigation.navigate("WelcomeP");
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
                <View style={styles.container}>
                    <Text style={styles.textone}>Bienvenue !</Text>
                    <Text style={styles.texttwo}>Bienvenue officielement dans la Wé-CO family, on espère que tu vas faires de belles rencontres et que tu ferras attention au cours de tes procheines soirées !</Text>

                    <View style={styles.containericon}>
                        <TouchableOpacity style={styles.next1} onPress={() => this.Redirection()}>
                            <Icon name={'md-arrow-forward'} size={30} color={'rgba(255,255,255,1)'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.next} onPress={() => this.Redirection()}>
                            <Icon name={'ios-arrow-back-outline'} size={30} color={'rgba(255,255,255,1)'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: HEIGTH * 0.55,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        flexWrap: 5,

    },
    textone: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: 5,
        marginBottom: 10,
        paddingLeft: 20,
        paddingTop: 15
    },
    texttwo: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 15,
        paddingLeft: 15,
    },
    next: {
        backgroundColor: '#243352',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10
    },
    next1: {
        backgroundColor: '#BD1550',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10
    },
    containericon: {
        margin: 10,
        flexDirection: "row-reverse",
    }
});