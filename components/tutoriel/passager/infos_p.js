import React, { useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../../firebase/firebase';



const InfosP = (props) => {

    const [state, setState] = useState({
        showPass: true,
        press: false,
        pays: "",
        codePostal: "",
        ville: "",
        adresse: ""
    });
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

    const handlerStateText = (name, text) => {
        setState({ ...state, [name]: text })
    }



    const RedirectionInfosPersos = () => {
        props.navigation.navigate("InfosP");
    };
    const Back = () => {
        props.navigation.goBack()
    };
    const Suivant = () => {
        if (state.adresse == "" || state.codePostal == "" || state.pays == "" || state.ville == "") {
            alert("Tout les champs sont obligatoires")
        }
        else {
            firebase.auth.onAuthStateChanged(function (user) {
                if (user) {
                    console.log("ici");
                    firebase.dataBase.ref('users/' + user.uid).get().then((snapshot) => {
                        if (snapshot.exists()) {
                            //on stock les donnée de l'utilisateur pour la reutiliser
                            data.info_user.firstName = snapshot.val().info_user.firstName;
                            data.info_user.lastName = snapshot.val().info_user.lastName;
                            data.info_user.mail = snapshot.val().info_user.mail;
                            data.info_user.photoUrlProfil = snapshot.val().info_user.photoUrlProfil || "";
                            data.data_user.photoUrl = snapshot.val().data_user.photoUrl || [];
                            data.data_user.description = snapshot.val().data_user.description || "";
                            data.info_user.phone = snapshot.val().info_user.phone || "";
                            data.data_user.uid = snapshot.val().data_user.uid;
                            data.data_user.statut = snapshot.val().data_user.statut;
                            data.info_user.dateDeNaissance = snapshot.val().info_user.dateDeNaissance;
                            data.info_user.age = snapshot.val().info_user.age;
                            data.info_user.genre = snapshot.val().info_user.genre;
                            data.info_user.adresse = state.adresse;
                            data.info_user.codePostal = state.codePostal;
                            data.info_user.pays = state.pays;
                            data.info_user.ville = state.ville;
                            data.data_user.description = snapshot.val().data_user.description || "";
                            data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";

                            data.id_card.inf_card.marque = snapshot.val().id_card.inf_card.marque || "";
                            data.id_card.inf_card.modele = snapshot.val().id_card.inf_card.modele || "";
                            data.id_card.inf_card.plaqueImmatriculation = snapshot.val().id_card.inf_card.plaqueImmatriculation || "";
                            console.log(data);
                            //ajout information dans la base
                            firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                                console.log("ajout infos reussi");
                                if (data.data_user.statut === "user") {
                                    props.navigation.navigate("InfosP2");
                                }
                                if (data.data_user.statut === "conducteur") {
                                    props.navigation.navigate("Carte Identite");
                                }
                            }).catch((err) => {
                                console.log("ajout info")
                                console.log(err)
                            });
                        }
                    })
                }
            })


        }

    }
    return (
        <ImageBackground source={require('../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.icon} onPress={() => Back()}>
                        <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textone}>Infos Personnelles</Text>
                    <Text style={styles.texttwo}>Nous devons vérifier ton âge et on identité pour des mesures de sécurité. Tu Pourras créer des itinéraires
                    vers ton domicile et recevoir tes cadeaux
                    </Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handlerStateText('pays', text)}
                            placeholder={'Pays'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handlerStateText('adresse', text)}
                            placeholder={'Adresse'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handlerStateText('codePostal', text)}
                            placeholder={'Code Postal'}
                            keyboardType={"numeric"}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handlerStateText('ville', text)}
                            placeholder={'Ville'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />
                    </View>

                </View>

                <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => Suivant()} style={styles.btn}>
                        <Text style={styles.text}>SUIVANT</Text>
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
        justifyContent: "space-around",
    },
    form: {
        marginTop: 20
    },
    btn: {
        width: WIDTH * 0.35,
        backgroundColor: '#BD1550',
        borderColor: "transparent",
        marginTop: 30,
        padding: 7,
        fontSize: 15,
        textAlign: "center",
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        color: 'white',

    },
    btncontainer: {
        display: 'flex',
        paddingTop: 30,
        marginLeft: 150,
    },
    input: {
        width: WIDTH * 0.65,
        height: 30,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#2A354E',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        marginTop: 2,
        textAlign: "left",
    },
    inputname: {
        width: WIDTH / 2 * 0.65,
        height: 45,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        marginTop: 2,
        justifyContent: 'space-around',
    },

    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37
    },
    inputContainer: {
        marginTop: 10,
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
    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: "bold",
    }

});
export default InfosP;