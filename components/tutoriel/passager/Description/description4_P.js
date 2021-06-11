import React, { useState, useEffect } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import ajoutArrets from "../../../connecter/Ajoutarrets";
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


const DescriptionP4 = (props) => {

    const [state, setState] = useState({
        description: "",
        mdp: "",
    });
    useEffect(() => {
        console.log("ajout arret");
    });

    var x = "";
    const handlerStateText = (name, text) => {
        x = text;
    }
    const RedirectionDescription = () => {
        props.navigation.navigate("WelcomeP");
    }
    const RedirectionWelcomP = () => {
        props.navigation.navigate("WelcomeP");
    }
    const Back = () => {
        props.navigation.goBack()
    }

    const [dataProposition, setDataProposition] = useState({
        arrets: [],
    });

    const [art, setArt] = useState(true)

    const supprimerArret = (arret_i) => {
        var index = dataProposition.arrets.indexOf(arret_i);
        dataProposition.arrets.splice(index, 1);
        setArt(!art);
    }

    const ajoutFavorisLieux = () => {
        if (x != "") {
            dataProposition.arrets.push(x);
            setArt(!art);
        }
    }

    const listLieuxFavoris = dataProposition.arrets.map((arret_i) =>
        <View style={{ borderRadius: 5, flexDirection: "row", backgroundColor: "#4083A7", margin: 5, justifyContent: "space-between", padding:5 }}>
            <Text style={styles.text} > {arret_i} </Text>
            <TouchableOpacity onPress={() => supprimerArret(arret_i)}>
                <Icon style={styles.icon} name={'ios-close'} size={10} color={'white'} />
            </TouchableOpacity>
        </View>
    )

    return (
        <ImageBackground source={require('../../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.icon} onPress={() => Back()}>
                        <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                    <Text style={styles.textone}>Déscris-toi </Text>
                    <Text style={styles.texttwo}>Décris nous ce que tu aimes !</Text>
                </View>

                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginVertical: 10 }}>
                    <TextInput
                        onChangeText={(text) => handlerStateText('description', text)}
                        style={styles.input}
                        placeholder={'Lieux de sorties habituels'}
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent' />
                    <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.35)', padding: 10, borderRadius: 10, }} onPress={() => ajoutFavorisLieux()}>
                        <Icon name={'add'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                    
                </View>
                <View>
                    {listLieuxFavoris}
                </View>

                <View style={styles.bottomContain}>

                    <TouchableOpacity style={styles.next} onPress={() => RedirectionDescription()}>
                        <Icon name={'arrow-forward-outline'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => RedirectionWelcomP()}>
                        <Text style={styles.passer}>Passer</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        height: HEIGTH * 0.75,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        color: 'white',
    },
    text: {

        color: "white",
        fontSize: 16,
        textAlign: "center"

    },
    bottomContain: {
        flexDirection: "row-reverse",
        margin: 10,
        alignItems: "flex-end",
        marginTop: 100
    },

    icon: {

        paddingLeft: 18,
        paddingTop: 12,
        marginTop: 0,

    },

    input: {
        padding: 10,
        margin: 5,
        width: WIDTH * 0.50,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: "white",
        borderRadius: 10,
    },

    form: {
        backgroundColor: '#2A354E',
        borderRadius: 5,
        width: WIDTH * 0.75,
        margin: 5

    },

    align: {
        justifyContent: 'center', alignItems: 'center',
        paddingTop: 10
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
export default DescriptionP4;