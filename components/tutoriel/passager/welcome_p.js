import React from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../../../firebase/firebase';
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')

export default class WelcomeP extends React.Component {

    state = {
        mailVerifield: false,
    }
    RedirectionCarte() {
        this.props.navigation.navigate("app");
    }
    RedirectionProfil() {
        this.props.navigation.navigate("ProfilP");
    }
    RedirectionAbonnement() {
        this.props.navigation.navigate("Choose");
    }

    render() {

        return this.state.mailVerifield === false ? (
            <ImageBackground source={require('../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
                <View style={styles.container}>
                    <Text style={styles.textone}>Bienvenue dans la WÉ-CO FAMILY</Text>
                    <Text style={styles.texttwo}>Choisis ta route!</Text>
                    <View style={styles.btncontainer}>
                        <TouchableOpacity onPress={() => this.RedirectionProfil()}>
                            <Text style={styles.buttonPink}>COMPLETER MON PROFIL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.RedirectionCarte()}>
                            <Text style={styles.buttonTextOne}>EXPLORER L'APPLICATION</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.RedirectionAbonnement()}>
                            <Text style={styles.buttonTextOne}>DECOUVRIR NOS ABONNEMENTS</Text>
                        </TouchableOpacity></View>
                </View>
            </ImageBackground>
        ) : (
                { ...this.props.navigation.navigate("Authentification") }
            );
    }

}

const styles = StyleSheet.create({
    container: {

        height: HEIGTH * 0.45,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        justifyContent: "space-around",

    },
    btncontainer: {
        alignItems: 'center',
        paddingTop: 30,
    },

    buttonTextOne: {
        padding: 10,
        fontSize: 15,
        textAlign: "center",
        alignItems: 'center',
        color: 'rgba(255,255,255,0.7)',
        backgroundColor: "#4083A7",
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: "transparent",
        width: WIDTH * 0.65,
    },
    buttonPink: {
        padding: 10,
        fontSize: 15,
        textAlign: "center",
        alignItems: 'center',
        color: 'rgba(255,255,255,0.7)',
        backgroundColor: "#BD1550",
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: "transparent",
        width: WIDTH * 0.65,
    },
    textone: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        paddingLeft: 18,
        paddingTop: 12,
    },
    texttwo: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
        paddingLeft: 18,
        paddingTop: 8,
    },

});