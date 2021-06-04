import React, { useState } from "react";
import { CheckBox, ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')

export default class MeansPayement2 extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        lieux_arrive: "",
        lieux_depart: "",
        login: "",
        mdp: "",
    };
    handlerStateText(name, text) {
        this.setState({ [name]: text })
    }


    ChooseAbonnement() {
        this.props.navigation.navigate("Subscription");
    }
    CalculPrixTrajet() {
        this.props.navigation.navigate("Cost");
    }

    Back() {
        this.props.navigation.goBack()
    }
    Suivant() {
        this.props.navigation.navigate("Payement")
    }



    render() {
        return (
            <ImageBackground source={require('../../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity onPress={() => this.Back()} style={styles.icon}>
                            <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.textone}>Le prix d'un trajet</Text>
                        <Text style={styles.textTwo}>Estime le prix de ton trajet !</Text>
                    </View>
                    <View style={styles.inputcont}>
                        <View style={styles.rowone}>
                            <TextInput
                                style={styles.input1}
                                onChangeText={(text) => this.handlerStateText('lieux_depart', text)}
                                placeholder={'Depart'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                            <TextInput
                                style={styles.input1}
                                onChangeText={(text) => this.handlerStateText('lieux_arrive', text)}
                                placeholder={'Arrivée'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                            <TouchableOpacity onPress={() => CalculPrixTrajet()}>
                                <Text style={styles.btn}>CALCULER LE PRIX DU TRAJET</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowtwo}>
                            <Text style={styles.input1}>00.00£ TTC</Text>
                        </View>
                    </View>
                    <View style={styles.btncontainer}>
                        <TouchableOpacity onPress={() => this.Suivant()} >
                            <Text style={styles.btn1}>RETOUR AU MENU</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'space-around',
        height: HEIGTH * 0.6,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        color: 'white',

    },
    textTwo: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
        paddingLeft: 18,
        paddingTop: 8,
    },
    bottomContain: {
        flexDirection: 'row',
    },
    rowtwo: {
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center'
    },
    rowone: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    texttwo: {
        color: "#FFF",
        opacity: 0.8,
        fontSize: 14,
        paddingLeft: 18,
        paddingTop: 14,
        paddingRight: 18


    },
    btncontainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    btn: {
        padding: 10,
        fontSize: 15,
        textAlign: "center",
        alignItems: 'center',
        color: 'rgba(255,255,255,0.7)',
        backgroundColor: "#4083A7",
        borderRadius: 10,
        margin: 10,
        borderColor: "transparent",
        justifyContent: 'center',
        width: Dimensions.get("screen").width * 0.65,
    },
    btn1: {
        padding: 5,
        fontSize: 10,
        textAlign: "center",
        alignItems: 'center',
        color: 'rgba(255,255,255,0.7)',
        backgroundColor: "#BD1550",
        borderRadius: 10,
        margin: 5,
        borderColor: "transparent",
        justifyContent: 'center',
        width: Dimensions.get("screen").width * 0.40,
        color: "#FFF",
        fontSize: 14,
    },
    inputcont: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        textAlign: 'center',

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
        width: Dimensions.get("screen").width * 0.65,
    },

    input1: {
        width: Dimensions.get("screen").width * 0.65,
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginTop: 10
    },
    input2: {
        width: Dimensions.get("screen").width * 0.65,
        height: 30,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginTop: 2,
    },


    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37
    },
    inputContainer: {
        marginTop: 10,
        alignItems: 'center',
    },

});