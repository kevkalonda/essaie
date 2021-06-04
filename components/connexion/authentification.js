import React from "react";
import { ImageBackground, Dimensions, StyleSheet, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';

import message from '../../assets/favicon.png';

const { width: WIDTH } = Dimensions.get('window');


const sendMailConfirmation = (props) => {

    const firstConnexion = () => {
        props.navigation.navigate("Connecter");
    }
    const redirectConnexion = () => {
        props.navigation.navigate("Connexion");
    }
    return (
        <View style={styles.container} >
            <View style={styles.container}>
                <Image source={message} style={styles.logo} />
                <Text style={styles.text11} >Confirmation d'inscription</Text>
            </View>
            <Text style={styles.text2} >Un email de confirmation a été envoyer à votre l'adresse mail </Text>
            <View style={styles.container}>
                <TouchableOpacity style={styles.connexionAvec2} onPress={() => firstConnexion()} >
                    <Text style={styles.text3} >Continuer pour se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.connexionAvec} onPress={() => redirectConnexion()} >
                    <Text style={styles.text3}>Retour au menu de connexion</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#17223B',
        textAlign: 'center',

    },
    connexionAvec: {
        borderWidth: 1,
        width: WIDTH - 55,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#073E69",
        padding: 10,
        margin: 5,
    },
    connexionAvec2: {
        borderWidth: 1,
        width: WIDTH - 55,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#BD1550",
        padding: 10,
        margin: 5,
    },
    logo: {
        width: 80,
        height: 55,
    },
    text11: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "bold",
        margin: 10,
    },
    text2: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',

    },
    text3: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'center',

    },
});
export default sendMailConfirmation