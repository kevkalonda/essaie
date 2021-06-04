import React from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


export default class BookingFee extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        showPass: true,
        press: false,
        login: "",
        mdp: "",
    };

    handlerStateText(name, text) {
        this.setState({ [name]: text })
    }

    howAreCalculer() {
        this.props.navigation.navigate("Comment");
    }
    whatIstheCost() {
        this.props.navigation.navigate("Correspondance de frais");
    }

    Back() {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <ImageBackground source={require('../../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity style={styles.icon} onPress={() => this.Back()}>
                            <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.textone}>Les frais de reservation</Text>
                        <Text style={styles.texttwo}>C'est quuoi ?</Text>
                    </View>
                    <View style={{ alignContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.howAreCalculer()}>
                            <Text style={styles.btn1}>COMMENT SONT CALCULES LES FRAIS ?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.whatIstheCost()}>
                            <Text style={styles.btn}>A QUOI CORRESPONDENT LES FRAIS ?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert("Contactez nous!!")}>
                            <Text style={styles.btn}>DES QUESTIONS ? CONTACTEZ NOUS</Text>
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
        height: HEIGTH * 0.60,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        color: 'white',

    },
    icon: {

        paddingLeft: 18,
        paddingTop: 12,
        marginTop: 0,

    },
    texttwo: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
        paddingLeft: 18,
        paddingTop: 8,
    },
    textone: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: 0,
        paddingLeft: 18,
        paddingTop: 12,
    },
    bottomContain: {
        flexDirection: "row-reverse",
        margin: 10,
    },
    next: {

        backgroundColor: '#BD1550',
        borderRadius: 5,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    passer: {
        paddingTop: 8,
        paddingRight: 7,
        textDecorationLine: 'underline',
        color: '#959DAD'
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
        width: Dimensions.get("screen").width * 0.65,
    },
    btn1: {
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