import React, { useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


const Description2_P = (props) => {

    const [state, setState] = useState({
        description: "",
        mdp: "",
        souriant: false,
        timide: false,
        fun: false,
        bavarde: false,
        introvertie: false,
        impulsif: false,
        drole: false,
        extraverti: false,
        calme: false,
        sensible: false,
        reserve: false,
        creatif: false

    });

    const handlerStateText = (name, text) => {
        setState({ ...state, [name]: text })
    }
    const handlerStateText2 = (name) => {
        //cas souriant
        if (name === "souriant") {
            if (state.souriant === false) {
                setState({ ...state, souriant: true })
            }
            else {
                setState({ ...state, souriant: false })
            }

        }
        if (name === "timide") {
            if (state.timide === false) {
                setState({ ...state, timide: true })
            }
            else {
                setState({ ...state, timide: false })
            }

        }
        if (name === "fun") {
            if (state.fun === false) {
                setState({ ...state, fun: true })
            }
            else {
                setState({ ...state, fun: false })
            }

        }
        if (name === "drole") {
            if (state.drole === false) {
                setState({ ...state, drole: true })
            }
            else {
                setState({ ...state, drole: false })
            }

        }
        if (name === "bavarde") {
            if (state.bavarde === false) {
                setState({ ...state, bavarde: true })
            }
            else {
                setState({ ...state, bavarde: false })
            }

        }
        if (name === "calme") {
            if (state.calme === false) {
                setState({ ...state, calme: true })
            }
            else {
                setState({ ...state, calme: false })
            }

        }
        if (name === "creatif") {
            if (state.creatif === false) {
                setState({ ...state, creatif: true })
            }
            else {
                setState({ ...state, creatif: false })
            }

        }
        if (name === "extraverti") {
            if (state.extraverti === false) {
                setState({ ...state, extraverti: true })
            }
            else {
                setState({ ...state, extraverti: false })
            }

        }
        if (name === "impulsif") {
            if (state.impulsif === false) {
                setState({ ...state, impulsif: true })
            }
            else {
                setState({ ...state, impulsif: false })
            }

        }
        if (name === "introvertie") {
            if (state.introvertie === false) {
                setState({ ...state, introvertie: true })
            }
            else {
                setState({ ...state, introvertie: false })
            }

        }
        if (name === "reserve") {
            if (state.reserve === false) {
                setState({ ...state, reserve: true })
            }
            else {
                setState({ ...state, reserve: false })
            }

        }
        if (name === "sensible") {
            if (state.sensible === false) {
                setState({ ...state, sensible: true })
            }
            else {
                setState({ ...state, sensible: false })
            }

        }
    }
    const RedirectionDescription = () => {
        props.navigation.navigate("DescriptionP3");
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
                <View>
                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginVertical: 5 }}>

                        <TouchableOpacity style={state.souriant === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("souriant")}>
                            <Text style={styles.texttwo2}>Souriant.e</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={state.timide === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("timide")}>
                            <Text style={styles.texttwo2}>Timide</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={state.fun === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("fun")}>
                            <Text style={styles.texttwo2}>Fun</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginVertical: 5 }}>

                        <TouchableOpacity style={state.bavarde === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("bavarde")}>
                            <Text style={styles.texttwo2}>Bavard.e</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={state.introvertie === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("introvertie")}>
                            <Text style={styles.texttwo2}>Introverti.e</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={state.impulsif === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("impulsif")}>
                            <Text style={styles.texttwo2}>Impulsif.ve</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginVertical: 5 }}>

                        <TouchableOpacity style={state.drole === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("drole")}>
                            <Text style={styles.texttwo2}>Drole</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={state.extraverti === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("extraverti")}>
                            <Text style={styles.texttwo2}>Extraverti.e</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={state.calme === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("calme")}>
                            <Text style={styles.texttwo2}>Calme</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginVertical: 5 }}>

                        <TouchableOpacity style={state.sensible === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("sensible")}>
                            <Text style={styles.texttwo2}>Sensible</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={state.reserve === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("reserve")}>
                            <Text style={styles.texttwo2}>Reservé</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={state.creatif === false ? (styles.textI) : (styles.textI2)} onPress={() => handlerStateText2("creatif")}>
                            <Text style={styles.texttwo2}>Creatif</Text>
                        </TouchableOpacity>
                    </View>
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
        justifyContent: "space-around"
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
export default Description2_P;