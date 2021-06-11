import React, { useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from '../../firebase/firebase'
import logo from '../../assets/logo.png';
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')


const Introduction = (props) => {

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
    const RedirectionPassager = () => {
        firebase.auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("ici");
                firebase.dataBase.ref('users/' + user.uid).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        data.info_user.firstName = snapshot.val().info_user.firstName;
                        data.info_user.lastName = snapshot.val().info_user.lastName;
                        data.info_user.mail = snapshot.val().info_user.mail;
                        data.info_user.photoUrlProfil = snapshot.val().info_user.photoUrlProfil || "";
                        data.info_user.phone = snapshot.val().info_user.phone || "";
                        data.data_user.uid = snapshot.val().data_user.uid;
                        data.data_user.photoUrl = snapshot.val().data_user.photoUrl || "";
                        data.data_user.statut = "user";
                        firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                            console.log("ajout infos reussi");
                            props.navigation.navigate("WelcomeP")
                        }).catch((err) => {
                            console.log("ajout info")
                            console.log(err)
                        });


                    }
                }).catch((err) => {
                    alert("vous n'etes pas connecté")
                    console.log("No connected");
                    console.log(err);
                })
            }
        })
    }

    const RedirectionBoth = () => {
        firebase.auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("ici");
                firebase.dataBase.ref('users/' + user.uid).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        data.info_user.firstName = snapshot.val().info_user.firstName;
                        data.info_user.lastName = snapshot.val().info_user.lastName;
                        data.info_user.mail = snapshot.val().info_user.mail;
                        data.info_user.photoUrlProfil = snapshot.val().info_user.photoUrlProfil || "";
                        data.info_user.phone = snapshot.val().info_user.phone || "";
                        data.data_user.uid = snapshot.val().data_user.uid;
                        data.data_user.statut = "conducteur";
                        firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                            console.log("ajout infos reussi");
                            props.navigation.navigate("WelcomeP")
                        }).catch((err) => {
                            console.log("ajout info")
                            console.log(err)
                        });


                    }
                }).catch((err) => {
                    alert("vous n'etes pas connecté")
                    console.log("No connected");
                    console.log(err);
                })
            }
        })
    }
    return (
        <ImageBackground source={require('../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
            <View style={styles.container}>
                <Text style={styles.textone}>Introduction</Text>
                <Text style={styles.texttwo}>Comment comptes-tu utiliser WÉ-CO ? Tu pourras le modifier plus tard dans ton profil</Text>
                <View style={styles.btncontainer}>
                    <TouchableOpacity onPress={() => RedirectionPassager()}>
                        <Text style={styles.buttonTextOne}>PASSAGER</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => RedirectionBoth()}>
                        <Text style={styles.buttonTextOne}>CONDUCTEUR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => RedirectionBoth()}>
                        <Text style={styles.buttonboth}>LES DEUX</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    container: {

        height: HEIGTH * 0.5,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        color: 'white',
        flexWrap: 'wrap',
        padding: 0,
        margin: 0,
        justifyContent: "space-around"
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
        fontWeight: "bold",
    },
    buttonboth: {
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
        fontWeight: "bold",
    },
    btncontainer: {
        alignItems: 'center',
        paddingTop: 50,
        justifyContent: 'center',
        textAlign: 'center',
    },
    textone: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: 0,
        paddingLeft: 18,
        paddingTop: 10,
    },
    texttwo: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
        paddingLeft: 18,
        paddingTop: 10,
    },
});

export default Introduction;