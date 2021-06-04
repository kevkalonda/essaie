import React, { useState } from "react";
import { CheckBox, ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../../../firebase/firebase'

const MeansPayement2 = (props) => {

    const [data, setData] = useState({
        id_card: {
            inf_card: {
                photoUrlVehicile: "",
                marque: "",
                modele: "",
                plaqueImmatriculation: "",
                validite: "false",
            },
            parmis: {
                photoUrlPermis: "",
                validite: "false",
            }
        },
        info_user: {
            pays: "",
            mail: "",
            adresse: "",
            codePostal: "",
            ville: "",
            dateDeNaissance: "",
            age: "",
            genre: "",
            lastName: "",
            photoUrlProfil: "",
            phone: "",
            firstName: "",
        },
        data_user: {
            statut: "",
            uid: "",
            description: "",
            lieux_favoris: [],
            user_like: [],
            photoUrl: [],
            photoIdentiteUrl: "",
            photoIdentityValidite: "false",
        },
        paiement: {
            carteBancaire: {
                numberOfCarte: "",
                name: "",
                dateExpiration: "",
            },
            abonnement: {
                validite: "false",
                montant: "",
                nbHeure: "",
            }
        }
    });
    const [state, setState] = useState({
        num: "",
        date: "",
        nom: "",
    })
    const handlerStateText = (name, text) => {
        setState({ ...state, [name]: text })
    }

    const [enregistrementCB, setEnregistrementCB] = useState(false);
    const ChooseAbonnement = () => {
        props.navigation.navigate("Subscription");
    }
    const CalculPrixTrajet = () => {
        props.navigation.navigate("Cost");
    }

    const Back = () => {
        props.navigation.goBack()
    }
    const Suivant = () => {
        if (enregistrementCB == true) {
            firebase.auth.onAuthStateChanged(function (user) {
                if (user) {
                    console.log("ici");
                    firebase.dataBase.ref('users/' + user.uid).get().then((snapshot) => {
                        if (snapshot.exists()) {
                            data.info_user.firstName = snapshot.val().info_user.firstName;
                            data.info_user.lastName = snapshot.val().info_user.lastName;
                            data.info_user.mail = snapshot.val().info_user.mail;
                            data.info_user.photoUrlProfil = snapshot.val().info_user.photoUrl || "";
                            data.info_user.phone = snapshot.val().info_user.phone || "";
                            data.data_user.uid = snapshot.val().data_user.uid;
                            data.data_user.statut = snapshot.val().data_user.statut;

                            data.paiement.carteBancaire.dateExpiration = state.date;
                            data.paiement.carteBancaire.name = state.nom;
                            data.paiement.carteBancaire.numberOfCarte = state.num;


                            firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                                console.log("ajout infos reussi");
                                props.navigation.navigate("WelcomeP")
                            }).catch((err) => {
                                console.log("ajout info")
                                console.log(err)
                            });


                        }
                    })
                }
            }).catch((err) => {
                alert("vous n'etes pas connecté")
                console.log("No connected");
                console.log(err);
            })
        }
        else {
            props.navigation.navigate("Payement")
        }
    }




    return (
        <ImageBackground source={require('../../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => Back()} style={styles.icon}>
                        <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textone}>Paiement</Text>
                </View>
                <View style={styles.inputcont}>
                    <View style={styles.rowone}>
                        <View style={styles.input1}>
                            <Text style={styles.text3}>Numéro de Carte</Text>
                            <TextInput
                                style={{ padding: 5, color: "white" }}
                                onChangeText={(text) => handlerStateText('num', text)}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                        </View>
                        <View style={styles.input2}>
                            <Text style={styles.text3}>Date</Text>
                            <TextInput
                                style={{ padding: 5, color: "white" }}
                                onChangeText={(text) => handlerStateText('Date', text)}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                        </View>
                    </View>
                    <View style={styles.rowone}>
                        <View style={styles.input1}>
                            <Text style={styles.text3}>Nom</Text>
                            <TextInput
                                style={{ padding: 5, color: "white" }}
                                onChangeText={(text) => handlerStateText('nom', text)}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                        </View>

                        <View style={styles.input2}>
                            <Text style={styles.text3}>CVC</Text>
                            <TextInput
                                style={{ padding: 5, color: "white" }}
                                onChangeText={(text) => handlerStateText('cvc', text)}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", margin: 10 }}>
                        <CheckBox
                            value={enregistrementCB}
                            onValueChange={setEnregistrementCB}
                        />
                        <Text style={styles.texttwo}>  Enregistrer cette carte pour mes futurs paiements</Text>
                    </View>
                </View>
                <View style={styles.btncontainer}>
                    <TouchableOpacity onPress={() => Suivant()} style={styles.btn}>
                        <Text style={styles.texttwo}>Sauvegarder</Text>
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
        width: Dimensions.get("screen").width * 0.42,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginTop: 10,
        marginHorizontal: 10
    },
    input2: {
        width: Dimensions.get("screen").width * 0.20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginTop: 10,
    },

    text3: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        margin: 2
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
export default MeansPayement2