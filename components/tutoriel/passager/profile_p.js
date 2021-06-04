import React from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


export default class ProfileP extends React.Component {
    RedirectionInfosPersos() {
        this.props.navigation.navigate("Infos");
    }

    RedirectionPhoto() {
        this.props.navigation.navigate("PhotoP");
    }

    Back() {
        this.props.navigation.goBack()
    }
    RedirectionAbonnement() {
        this.props.navigation.navigate("Choose");
    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity onPress={() => this.Back()} style={styles.icon}>
                            <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textone}>Profil</Text>
                    <Text style={styles.texttwo}>Complete ton profil dès maintenant !</Text>
                    <View style={styles.btncontainer}>
                        <TouchableOpacity onPress={() => this.RedirectionInfosPersos()}>
                            <Text style={styles.buttonPink}>INFOS PERSONNELLES</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.RedirectionPhoto()}>
                            <Text style={styles.buttonTextOne}>PHOTO DE PROFIL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.RedirectionAbonnement()}>
                            <Text style={styles.buttonTextOne}>ABONNEMENTS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    container: {

        height: HEIGTH * 0.45,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        color: 'white',
        justifyContent: "space-around",

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
    icon: {

        paddingLeft: 18,
        paddingTop: 12,
        marginTop: 0,

    },
    textone: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: 0,
        paddingLeft: 18,
        paddingTop: 12,
    },
    texttwo: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
        paddingLeft: 18,
        paddingTop: 8,


    },
    btncontainer: {
        alignItems: 'center',
        paddingTop: 30,
    },


});