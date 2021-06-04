
import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent } from 'react-native';

export default function AccueilPro(props) {

    const redirectionEcole = () => {
        props.navigation.navigate("Accueil_ecole")
    }
    const redirectionBars = () => {
        props.navigation.navigate("Accueil_bars")
    }

    const redirectionConcerts = () => {
        props.navigation.navigate("Accueil_concert")
    }
    const redirectionEntreprises = () => {
        props.navigation.navigate("Accueil_entreprise")
    }
    return (
        <View style={styles.container}  >

            <Text style={styles.text}>Bienvenue dans la Wé-Co Family </Text>
            <Text style={styles.soustext}>Quel type de professionnel êtes vous ?</Text>
            <TouchableOpacity onPress={() => redirectionEcole()}>
                <Text style={styles.buttonTextOne}>Etablissement scolaire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => redirectionBars()}>
                <Text style={styles.buttonTextTwo}> Bars et boites de nuits </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => redirectionConcerts()}>
                <Text style={styles.buttonTextTwo}> Concerts et Festivals</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => redirectionEntreprises()}>
                <Text style={styles.buttonTextTwo}> Entreprises</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {

        flex: 4,
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "top",
        alignItems: 'center',

        backgroundColor: "#171E3B",

        flex: 4,
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: 'center',


    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10
    },
    soustext: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    text3: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        margin: 10,
        textAlign: "center",
        marginTop: "1%",
        fontStyle: "italic",
    },
    buttonTextOne: {
        borderWidth: 1,
        padding: 10,
        fontSize: 15,
        textAlign: "center",
        alignItems: 'center',
        color: 'rgba(255,255,255,0.7)',
        backgroundColor: "#BD1550",
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: "transparent",
        width: Dimensions.get("screen").width * 0.80,
    },
    buttonTextTwo: {
        borderWidth: 1,
        padding: 10,
        fontSize: 15,
        textAlign: "center",
        alignItems: 'center',
        color: 'rgba(255,255,255,0.7)',
        backgroundColor: "#073E69",
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: "transparent",
        width: Dimensions.get("screen").width * 0.80,
    },

});
