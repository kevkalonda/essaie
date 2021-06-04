import React from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


export default class Cost extends React.Component {
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

    CalculPrixTrajet() {
        this.props.navigation.navigate("Simulation Prix");
    }
    howCalculate() {
        this.props.navigation.navigate("Booking");
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
                        <Text style={styles.textone}>Le prix d'un trajet</Text>
                        <Text style={styles.texttwo}>Simuler le prix s'un trajet</Text>
                    </View>
                    <View style={{ alignContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.CalculPrixTrajet()}>
                            <Text style={styles.btn1}>Calculer le prix d'un trajet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.howCalculate()}>
                            <Text style={styles.btn}>Le frais de reservation c'est quoi?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomContain}>
                        <TouchableOpacity style={styles.next} onPress={() => alert('ok')}>
                            <Icon name={'arrow-forward-outline'} size={20} color={'rgba(255,255,255,1)'} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.passer}>Passer</Text>
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
        height: HEIGTH * 0.40,
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