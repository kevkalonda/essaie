import React from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


export default class Welcome extends React.Component {
    Redirection() {
        this.props.navigation.navigate("WelcomeP");
    }

    render() {
        return (
            <ImageBackground source={require('../../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.textone}> Paiement</Text>
                        <Text style={styles.texttwo}> Bienvenue dans la WE-CO family !</Text>
                        <Text style={styles.texttwo}>Bravo ! Tu as pris ton premier abonnement chez WE-CO ! Tu peux désormais te déplacer en toute sécurité grâce à WE-CO</Text>
                    </View>
                    <View style={styles.containericon}>
                        <TouchableOpacity style={styles.next} onPress={() => this.Redirection()}>
                            <Icon name={'md-arrow-forward'} size={30} color={'rgba(255,255,255,1)'} />
                        </TouchableOpacity>
                    </View>

                </View>

            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        height: HEIGTH * 0.35,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,

    },
    containericon: {
        alignItems: 'flex-end',
        padding: 10,
        margin: 5,
    },
    next: {
        backgroundColor: '#4083A7',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    contain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texttwo: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 16,
        paddingLeft: 18,
        paddingTop: 8,
    },
    textone: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: 0,
        paddingLeft: 18,
        paddingTop: 12,
    },
    icon: {

        paddingLeft: 18,
        paddingTop: 12,
        marginTop: 0,

    },
});