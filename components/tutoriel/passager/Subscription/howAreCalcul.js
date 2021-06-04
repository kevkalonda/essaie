import React, { useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../../../firebase/firebase';


const DescriptionP = (props) => {

    const [state, setState] = useState({
        description: "",
        mdp: "",
    });

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
                    <Text style={styles.textone}>Comment sont calculés les frais ?</Text>
                </View>

                <View style={styles.align}>
                    <View style={styles.form}>
                        <View style={styles.input_container}>
                            <Text style={styles.textHow}>Les frais de réservation sont calculés sur la base du montant choisi par le conducteur ou la conductrice au moment de publier son trajet. Le montant visible dans les résultats de recherche prend en compte les frais de réservation, qui incluent eux-mêmes la TVA (20%).</Text>
                            <Text style={styles.textHow}>Les frais de réservation des trajets dont le montant est inférieur ou égal à 5 € sont plafonnés à 1 €. Par la suite, ils évoluent proportionnellement en fonction du coût du trajet proposé par le conducteur ou la conductrice.</Text>
                            <Text style={styles.textHow}>Nous ne déduisons pas les frais de réservation du prix du trajet. Le conducteur ou la conductrice reçoit exactement le paiement correspondant au prix fixé lors de la création de son trajet.</Text>
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
        height: HEIGTH * 0.9,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        color: 'white',
        justifyContent: "space-around",
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
        paddingTop: 10,
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
        paddingTop: 8,
        paddingRight: 7,
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
export default DescriptionP;