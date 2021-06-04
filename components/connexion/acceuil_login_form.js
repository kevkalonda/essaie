//npm install react-native-vector-icons

import React, { useState, setState, useEffect } from 'react';
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH } = Dimensions.get('window');
import logo from '../../assets/logo.png';
import firebase from '../../firebase/firebase';


const modeInscription = (props) => {

    //donnée de l'utilisateur
    const [stateData, setStateData] = useState({
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
    })

    //redirection connection
    const RedirectionConnexion = () => {
        props.navigation.navigate("Connexion");
    }


    //redirection inscription
    const RedirectionInscription = () => {
        props.navigation.navigate("Inscription");
    }

    //inscription avec facebook
    const inscriptionUserFacebook = () => {
        firebase
            .auth
            .signInWithPopup(firebase.provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;
                //on verifie si le uid exist si oui on se connect direct dans la base
                firebase.dataBase.ref().child('users').child(user.uid).get().then(snapShot => {
                    if (snapShot.exists()) {
                        console.log("userExist");
                        alert("un compte existe déjà avec ce Facebook");
                    }
                    else {
                        //cas utilisateur n'existe pas on créer un nouveau
                        //console.log("userNotExist");
                        stateData.info_user.firstName = user.displayName;
                        stateData.info_user.lastName = user.displayName;
                        stateData.info_user.phone = user.phoneNumber || "";
                        stateData.info_user.mail = user.email;
                        stateData.info_user.photoUrlProfil = user.photoURL || "";
                        stateData.data_user.photoUrl = [user.photoURL];
                        stateData.data_user.uid = user.uid;
                        stateData.data_user.statut = "user";

                        firebase.dataBase.ref('users/' + user.uid).set(stateData).then(() => {
                            //console.log("user create");
                            //console.log(stateData);
                            props.navigation.navigate("Welcome");
                        }).catch((err) => {
                            console.log(err)
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                    alert("une erreur s'est produite vueillez contacter le service Wé-co")
                });

            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                //console.log(email);
                if (email) {
                    console.log(" passer catch");
                    alert("un compte existe déjà avec ce facebook");
                }
            });
    }


    //inscription google
    const inscriptionUserGmail = () => {
        var verifExistanceCompte = false;
        firebase.auth
            .signInWithPopup(firebase.providerMail)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(user);
                //requette qui cherche l'identifiant de l'utilisateur
                firebase.dataBase.ref().child('users').child(user.uid).get().then(snapShot => {
                    if (snapShot.exists()) {
                        console.log("userExist");
                        alert("un compte existe déjà avec ce mail");
                    }
                    else {
                        //console.log("userNotExist");
                        stateData.info_user.firstName = user.displayName;
                        stateData.info_user.lastName = user.displayName;
                        stateData.info_user.phone = user.phoneNumber || "";
                        stateData.info_user.mail = user.email;
                        stateData.info_user.photoUrlProfil = user.photoURL || "";
                        stateData.data_user.photoUrl = [user.photoURL];
                        stateData.data_user.uid = user.uid;
                        stateData.data_user.statut = "user";
                        firebase.dataBase.ref('users/' + user.uid).set(stateData).then(() => {
                            //console.log("user create");
                            //console.log(stateData);
                            props.navigation.navigate("Welcome");
                        }).catch((err) => {
                            //console.log(err)
                            alert("une erreur s'est produite vueillez contacter le service Wé-co")
                        });
                    }
                }).catch((err) => {
                    console.log(err)
                    alert("une erreur s'est produite vueillez contacter le service Wé-co")
                });

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                alert("une erreur s'est produite vueillez contacter le service Wé-co")
                // ...
            });
    }
    return (
        <View style={styles.container}>
            <View style={styles.logocontainer}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View>
                <Text style={styles.firsttext}>Bienvenu dans la Wé-CO Family</Text>
                <Text style={styles.secondtext}>Connecte-toi ou  inscrit-toi</Text>
            </View>
            <View>
                <Text style={styles.text4}>choisis ta route</Text>
                <TouchableOpacity style={styles.connexionAvec} onPress={() => inscriptionUserGmail()}>
                    <Icon name={'ios-logo-google'} size={20} color={'rgba(255,255,255,0.7)'} style={styles.buttonIcon} />
                    <Text style={styles.text2}>S'inscrire avec Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.connexionAvec} onPress={() => inscriptionUserFacebook()}>
                    <Icon name={'ios-logo-facebook'} size={20} color={'rgba(255,255,255,0.7)'} style={styles.buttonIcon} />
                    <Text style={styles.text2} >S'inscrire avec Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.connexionMail} onPress={() => RedirectionInscription()}>
                    <Icon name={'ios-mail'} size={20} color={'rgba(255,255,255,0.7)'} style={styles.buttonIcon} />
                    <Text style={styles.text2} >S'inscrire avec Email</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.textlogin}> Déjà membre ? </Text>
                <TouchableOpacity onPress={() => RedirectionConnexion()}>
                    <Text style={styles.textloginSouligne} >connecte-toi</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#17223B',
        justifyContent: 'space-around',
    },
    logocontainer: {
        alignItems: 'center',
    },
    secondtext: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: "center",
        margin: 10
    },
    text4: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        textAlign: "center",
        margin: 10
    },
    firsttext: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10
    },
    logo: {
        width: 90,
        height: 90,

    },
    connexionAvec: {
        borderWidth: 1,
        width: WIDTH - 55,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#073E69",
        padding: 10,
        margin: 5,
    },
    connexionMail: {
        borderWidth: 1,
        width: WIDTH - 55,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        color: 'rgba(255,255,255,0.7)',
        backgroundColor: "#E42C64",
        padding: 10,
        margin: 5,
    },

    logoText: {
        color: 'white',
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    logoText2: {
        color: 'white',
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5,
        justifyContent: 'center',
        width: WIDTH - 55,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37
    },
    inputContainer: {
        marginTop: 10
    },
    eye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    btn: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#BD1550',
        justifyContent: 'center',
        marginTop: 20,

    },
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    },
    text2: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: "center",
        fontSize: 15,

    },
    buttonIcon: {
        position: 'absolute',
        left: 10,
    },
    text3: {
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
        margin: 10,
        textAlign: "center",
        fontSize: 20,
        fontStyle: "italic",
        textDecorationLine: 'underline',
    },
    logocontainer: {
        alignItems: 'center',

    },
    logo: {
        width: 120,
        height: 150,
    },
    logoText: {
        color: 'white',
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    text31: {
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
        margin: 10,
        textAlign: "center",
        fontSize: 16,

    },
    textlogin: {
        color: 'white',
        marginTop: 15
    },
    textloginSouligne: {
        color: 'white',
        marginTop: 15,
        textDecorationLine: 'underline',
        fontStyle: "italic",
    }
});
export default modeInscription;