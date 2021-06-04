import React from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


export default class Subscription extends React.Component {


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
        this.props.navigation.navigate("Subscription2")
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
                        <Text style={styles.texttwo}>Pour qu’on puisse te proposer les abonnements les plus adaptés, il va nous falloir quelques infos sur tes sorties.</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>

                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handlerStateText('mail', text)}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            placeholder="Adresse Domicile" />
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handlerStateText('mail', text)}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            placeholder="Lieux fréquentés" />
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handlerStateText('mail', text)}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            placeholder="Nombre de sortie/mois" />
                    </View>
                    <View style={{ alignContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.Suivant()} style={styles.btn}>
                            <Text style={styles.texttwo}>Appliquer</Text>
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
        height: HEIGTH * 0.55,
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
        width: WIDTH * 0.45,
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
        width: Dimensions.get("screen").width * 0.45,
    },

    input: {
        width: WIDTH * 0.65,
        borderRadius: 10,
        fontSize: 16,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginTop: 10
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