
import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent } from 'react-native';

export default function Accueilbar(props) {

    const redirectionConnexion = () => {
        props.navigation.navigate("Application")
    }
    const redirectionConnexionPro = () => {
        console.log(props);
    }

    const redirectionTutoriel = () => {
        props.navigation.navigate("Welcome")
    }
    return (
        <Text>Accueil_entreprise</Text>

    );
}