import React, { useState } from "react";
import { CheckBox, ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')

const MeansPayement3 = (props) => {


    const handlerStateText = (name, text) => {
        setState({ [name]: text })
    }
    const Back = () => {
        props.navigation.goBack()
    }
    const Suivant = () => {
        props.navigation.navigate("EndPay")
    }

    const [enregistrementCB, setEnregistrementCB] = useState(false);


    return (
        <ImageBackground source={require('../../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => Back()} style={styles.icon}>
                        <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignContent: "center", alignItems: "center" }}>
                    <Text style={styles.textone}>Paiement</Text>
                    <Text style={styles.texttwo}>Abonnement X Km/mois</Text>
                </View>
                <View style={styles.inputcont}>
                    <View style={styles.rowone}>
                        <Text style={styles.input1}>Nom du Client</Text>
                        <TouchableOpacity>
                            <Text style={styles.text3}>Modifier</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowone}>
                        <Text style={styles.input1}>Numero CB Client</Text>
                        <TouchableOpacity>
                            <Text style={styles.text3}>Modifier</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowone}>
                        <Text style={styles.input1}>Montant 14£ TTC</Text>
                        <TouchableOpacity>
                            <Text style={styles.text3}>Modifier</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", margin: 10 }}>
                        <CheckBox
                            value={enregistrementCB}
                            onValueChange={setEnregistrementCB}
                        />
                        <Text style={styles.texttwo}>  Je lu et j'accepte les conditions de confidentialité</Text>
                    </View>
                </View>
                <View style={styles.btncontainer}>
                    <TouchableOpacity onPress={() => Suivant()} style={styles.btn}>
                        <Text style={styles.texttwo}>Payer</Text>
                    </TouchableOpacity>
                </View>



            </View>
        </ImageBackground>
    );

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
    bottomContain: {
        flexDirection: 'row',
    },
    rowone: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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


    },
    text3: {
        color: "#FFF",
        opacity: 0.8,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    btncontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },

    btn: {
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
        justifyContent: 'center',
        width: Dimensions.get("screen").width * 0.55,
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
        width: Dimensions.get("screen").width * 0.80,
    },

    input1: {
        width: Dimensions.get("screen").width * 0.40,
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginTop: 10,
        marginHorizontal: 10
    },
    input2: {
        width: Dimensions.get("screen").width * 0.20,
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginTop: 10,
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
export default MeansPayement3