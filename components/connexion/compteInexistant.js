import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, Image, Text, View, } from 'react-native';
import logo from '../../assets/logo.png';

const compteInexistant = (props) => {
    const redirectionInscription = () => {
        props.navigation.navigate("Inscription");
    }
    return (
        <View style={styles.container} >
            <View style={styles.logocontainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.logoText}> Compte inexistant </Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Désolé vous ne possedez pas un compte chez Wé-CO :( </Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.text2}>Créer votre compte en cliquant</Text>
                    <TouchableOpacity onPress={() => redirectionInscription()} >
                        <Text style={styles.text3} >ici</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#17203B",
        textAlign: "center",
        justifyContent: "space-around",
        alignItems: 'center',
    },
    text: {
        padding: 10,
        fontSize: 20,
        textAlign: "center",
        alignItems: 'center',
        color: 'white',
    },
    inputContainer: {
        flexDirection: "row",
    },
    logoText: {
        color: 'white',
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    text2: {
        padding: 10,
        fontSize: 15,
        textAlign: "center",
        alignItems: 'center',
        color: 'white',
        fontStyle: "italic",
    },
    text3: {
        padding: 10,
        fontSize: 15,
        textAlign: "center",
        alignItems: 'center',
        color: '#BD1550',
        fontStyle: "italic",
    },
    logocontainer: {
        alignItems: 'center',

    },
    logo: {
        width: 120,
        height: 150,
        marginTop: 50
    },
})
export default compteInexistant