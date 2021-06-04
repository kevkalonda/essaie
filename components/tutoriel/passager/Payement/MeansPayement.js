import React from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


export default class MeansPayement extends React.Component {


    ChooseAbonnement() {
        this.props.navigation.navigate("Subscription");
    }
    Carte() {
        this.props.navigation.navigate("MeansPayement2");
    }

    Back() {
        this.props.navigation.goBack()
    }
    Suivant() {
        this.props.navigation.navigate("Subscription2")
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
                    <View style={{ alignItems: "center", margin: 10 }}>
                        <Text style={styles.textone}>Paiement</Text>
                        <TouchableOpacity onPress={() => this.Carte()} style={styles.btn}>
                            <Text style={styles.texttwo}>Via Carte Bancaire</Text>
                        </TouchableOpacity>
                        <Text style={styles.textone}>Ou</Text>
                        <TouchableOpacity onPress={() => alert("Paypal")} style={styles.btn}>
                            <Text style={styles.texttwo}>Via Paypal</Text>
                        </TouchableOpacity>
                    </View>
                    <View></View>
                    <View></View>
                </View>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'space-around',
        height: HEIGTH * 0.5,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        color: 'white',

    },
    btnplace: {
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
    bottomContain: {
        flexDirection: 'row',
    },

    btn: {
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
        width: Dimensions.get("screen").width - 140,
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

    input: {
        width: WIDTH - 80,
        height: 30,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        marginTop: 2
    },
    inputname: {
        width: WIDTH / 2 - 55,
        height: 45,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        marginTop: 2,
        justifyContent: 'space-around',
    },

    inputprenom: {
        width: WIDTH / 2 - 55,
        height: 45,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 25,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        marginTop: 2,
        justifyContent: 'space-around',
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
    texttwo: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
        paddingLeft: 18,
        paddingTop: 8,
    },

});