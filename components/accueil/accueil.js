
import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent } from 'react-native';

export default function Accueil(props) {

    const redirectionConnexion = () => {
        props.navigation.navigate("Application")
    }
    const redirectionConnexionPro = () => {
        props.navigation.navigate("AccueilPro")
    }

    const redirectionTutoriel = () => {
        props.navigation.navigate("Welcome")
    }
    return (
        <ImageBackground source={require('./a.png')} style={{ flex: 1, justifyContent: 'center', fontWeight: 50 }}  >
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1 }} />
            <View style={styles.container}  >
                <Text style={styles.text}>Bienvenue dans la Wé-Co Family </Text>
                <Text style={styles.soustext}>Ton covoiturage de nuit pour toutes tes sorties</Text>
                <Text style={styles.text3}>Choisis ta route :</Text>
                <TouchableOpacity onPress={() => redirectionConnexion()}>
                    <Text style={styles.buttonTextOne}>APPLICATION</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => redirectionConnexionPro()}>
                    <Text style={styles.buttonTextTwo}> Je suis un Professionnel </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => redirectionTutoriel()}>
                    <Text style={styles.buttonTextTwo}> Je Découvre Wé-CO</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {

        flex: 4,
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "top",
        alignItems: 'center',
        //backgroundColor:"#171E3B",
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
