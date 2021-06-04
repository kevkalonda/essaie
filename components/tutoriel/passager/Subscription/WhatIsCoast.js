import React, { useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');


const whatIsCoast = (props) => {

    const [state, setState] = useState({
        description: "",
        mdp: "",
    });

    const handlerStateText = (name, text) => {
        setState({ ...state, [name]: text })
    }
    const redirection = () => {
        props.navigation.navigate("WelcomeP");
    }


    const Back = () => {
        props.navigation.goBack()
    }

    return (
        <ImageBackground source={require('../../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.icon} onPress={() => Back()}>
                        <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                    <Text style={styles.textone}>A quoi correspondent les frais ?</Text>
                </View>

                <View style={styles.align}>
                    <View style={styles.form}>
                        <View style={styles.input_container}>
                            <Text style={styles.textHow}>Les frais de réservations permettent à wé-co de vous trouver les meilleurs covoiturages et d’employer des collaborateur.rice.s passioné.e.s</Text>
                            <Text style={styles.textHow}>Ils nous aident à améliorer votre sécurité pour vous garantir la meilleure expérience possible sur notre plateforme de covoiturage festif.</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row-reverse", margin: 10, flexDirection: "row-reverse", }}>
                        <TouchableOpacity onPress={() => redirection()}>
                            <Text style={styles.passer}>Passer</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        height: HEIGTH * 0.65,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        color: 'white',
    },

    bottomContain: {
        flexDirection: "row-reverse",
        margin: 10,
    },

    icon: {

        paddingLeft: 18,
        paddingTop: 12,
        marginTop: 0,

    },

    input: {
        margin: 5,
        height: HEIGTH * 0.2,
        width: WIDTH * 0.70,
        color: "white",
    },

    form: {
        backgroundColor: '#2A354E',
        borderRadius: 5,
        width: WIDTH * 0.75,
        margin: 5

    },

    align: {
        justifyContent: 'center', alignItems: 'center',
        paddingTop: 5,
        height: HEIGTH * 0.5
    },

    input_container: {
        justifyContent: 'center',
        textAlign: 'left',
    },

    next: {

        backgroundColor: '#BD1550',
        borderRadius: 5,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textone: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: 0,
        paddingLeft: 18,
        paddingTop: 12,
        justifyContent: "space-around"
    },

    textdescrib: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#FFF",
        paddingTop: 10,
        paddingLeft: 18,
    },
    textHow: {
        fontSize: 13,
        color: "#FFF",
        marginTop: 15,
        margin: 10
    },

    texttwo: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
        paddingLeft: 18,
        paddingTop: 8,
    },
    passer: {
        textDecorationLine: 'underline',
        color: '#959DAD'
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
        width: Dimensions.get("screen").width * 0.80,
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
        width: Dimensions.get("screen").width * 0.80,
    },

});
export default whatIsCoast;