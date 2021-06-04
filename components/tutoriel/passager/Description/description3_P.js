import React, { useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


const Description3_P = (props) => {

    const [state, setState] = useState({
        cuisiner: false,
        danser: false,
        chanter: false,
        sport: false,
        art: false,
        photo: false,
        dessin: false,
        mode: false,
        voyager: false,
        nature: false,
        animaux: false,
        foot: false

    });

    const handlerStateText = (name, text) => {
        setState({ ...state, [name]: text })
    }
    const handlerStateText2 = (name) => {
        //cas souriant
        if (name === "animaux") {
            if (state.animaux === false) {
                setState({ ...state, animaux: true })
            }
            else {
                setState({ ...state, animaux: false })
            }

        }
        if (name === "art") {
            if (state.art === false) {
                setState({ ...state, art: true })
            }
            else {
                setState({ ...state, art: false })
            }

        }
        if (name === "chanter") {
            if (state.chanter === false) {
                setState({ ...state, chanter: true })
            }
            else {
                setState({ ...state, chanter: false })
            }

        }
        if (name === "cuisiner") {
            if (state.cuisiner === false) {
                setState({ ...state, cuisiner: true })
            }
            else {
                setState({ ...state, cuisiner: false })
            }

        }
        if (name === "danser") {
            if (state.danser === false) {
                setState({ ...state, danser: true })
            }
            else {
                setState({ ...state, danser: false })
            }

        }
        if (name === "dessin") {
            if (state.dessin === false) {
                setState({ ...state, dessin: true })
            }
            else {
                setState({ ...state, dessin: false })
            }

        }
        if (name === "foot") {
            if (state.foot === false) {
                setState({ ...state, foot: true })
            }
            else {
                setState({ ...state, foot: false })
            }

        }
        if (name === "mode") {
            if (state.mode === false) {
                setState({ ...state, mode: true })
            }
            else {
                setState({ ...state, mode: false })
            }

        }
        if (name === "nature") {
            if (state.nature === false) {
                setState({ ...state, nature: true })
            }
            else {
                setState({ ...state, nature: false })
            }

        }
        if (name === "photo") {
            if (state.photo === false) {
                setState({ ...state, photo: true })
            }
            else {
                setState({ ...state, photo: false })
            }

        }
        if (name === "sport") {
            if (state.sport === false) {
                setState({ ...state, sport: true })
            }
            else {
                setState({ ...state, sport: false })
            }

        }
        if (name === "voyager") {
            if (state.voyager === false) {
                setState({ ...state, voyager: true })
            }
            else {
                setState({ ...state, voyager: false })
            }

        }
    }
    const RedirectionDescription = () => {
        props.navigation.navigate("DescriptionP4");
    }

    const RedirectionIntroduction = () => {
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
                    <Text style={styles.textone}>Déscris-toi </Text>
                    <Text style={styles.texttwo}>Décrivez-nous ce que vous aimez !</Text>
                </View>

                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginVertical: 5 }}>

                    <TouchableOpacity style={state.animaux === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("animaux")}>
                        <Text style={styles.texttwo2}>Animaux</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={state.art === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("art")}>
                        <Text style={styles.texttwo2}>Art</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={state.chanter === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("chanter")}>
                        <Text style={styles.texttwo2}>Chanter</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginVertical: 5 }}>

                    <TouchableOpacity style={state.cuisiner === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("cuisiner")}>
                        <Text style={styles.texttwo2}>Cuisiner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={state.danser === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("danser")}>
                        <Text style={styles.texttwo2}>Danser</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={state.dessin === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("dessin")}>
                        <Text style={styles.texttwo2}>Dessiner</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginVertical: 5 }}>

                    <TouchableOpacity style={state.foot === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("foot")}>
                        <Text style={styles.texttwo2}>Football</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={state.mode === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("mode")}>
                        <Text style={styles.texttwo2}>Mode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={state.nature === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("nature")}>
                        <Text style={styles.texttwo2}>Nature</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginVertical: 5 }}>

                    <TouchableOpacity style={state.photo === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("photo")}>
                        <Text style={styles.texttwo2}>Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={state.sport === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("sport")}>
                        <Text style={styles.texttwo2}>Sport</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={state.voyager === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("voyager")}>
                        <Text style={styles.texttwo2}>Voyager</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomContain}>

                    <TouchableOpacity style={styles.next} onPress={() => RedirectionDescription()}>
                        <Icon name={'arrow-forward-outline'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => RedirectionIntroduction()} >
                        <Text style={styles.passer}>Passer</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {
        height: HEIGTH * 0.6,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        color: 'white',
    },

    textI: {
        backgroundColor: 'rgba(0,0,0,0.35)',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: WIDTH * 0.20,
        alignItems: "center"
    },
    textI2: {
        backgroundColor: "#4083A7",
        padding: 10,
        borderRadius: 10,
        margin: 5,
        width: WIDTH * 0.20,
        alignItems: "center"
    },
    bottomContain: {
        flexDirection: "row-reverse",
        margin: 10,
        alignItems: "flex-end",
        marginTop: 10
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

    texttwo2: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
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

export default Description3_P;