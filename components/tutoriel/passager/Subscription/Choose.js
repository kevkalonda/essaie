import React from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


export default class ChooseAbonnement extends React.Component {

    RedirectionAbonnement() {
        this.props.navigation.navigate("Subscription");
    }
    CalculPrixTrajet() {
        this.props.navigation.navigate("Cost");
    }

    Back() {
        this.props.navigation.goBack()
    }
    RedirectedIntroduction() {
        this.props.navigation.navigate("Introduction");
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
                        <Text style={styles.textone}>Abonnement</Text>
                        <Text style={styles.texttwo}>Pour utiliser WÉ-CO, tu peux soit recharger ton compte, soit prendre un abonnement.
                        L’avantage de l’abonnement, c’est que tu as des bonus qui vont avec ( moins chers, softs offerts, places festivals offertes …)
                    Bien sûr tu peux ne pas choisir maintenant et passer directement à la prochaine étape</Text>
                    </View>
                    <View style={styles.btncontainer}>

                        <TouchableOpacity onPress={() => this.RedirectionAbonnement()}>
                            <Text style={styles.btn}>Choisir un abonnement</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.CalculPrixTrajet()}>
                            <Text style={styles.btn}>Je paye Chaque Trajet Individuellement</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomContain}>
                        <TouchableOpacity style={styles.next} onPress={() => alert('ok')}>
                            <Icon name={'arrow-forward-outline'} size={20} color={'rgba(255,255,255,1)'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.RedirectedIntroduction()}>
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
        height: HEIGTH * 0.6,
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
    btncontainer: {
        alignItems: 'center',
        paddingTop: 30,
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
        width: WIDTH * 0.65,
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
        width: WIDTH * 0.65,
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

});