import React, { useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity, CheckBox } from 'react-native';
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../../firebase/firebase';


const Infos = (props) => {
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
    const [isSelectedHomme, setSelectionHomme] = useState(false);
    const [isSelectedFemme, setSelectionFemme] = useState(false);
    const [state, setState] = useState({
        showPass: true,
        press: false,
        jour: "",
        mois: "",
        annee: "",
        dateNaissance: ""
    });
    const [text, setTest] = useState(null);


    const handlerStateText = (name, text) => {
        setState({ ...state, [name]: text })
    }
    const Back = () => {
        props.navigation.goBack()
    }
    const Suivant = () => {
        if (state.jour.length != 2 || state.mois.length != 2 || state.annee.length != 4) {
            alert("La convention de la date n'est pas respecté")
        }
        else {
            if (state.jour === '' || state.mois === '' || state.annee === "") {
                alert("le champ date de naissance est obligatoire")
            }
            else {
                if (isSelectedHomme === false && isSelectedFemme === false || isSelectedHomme === true && isSelectedFemme === true) {
                    alert("choississez un sexe")
                }
                if (isSelectedHomme != isSelectedFemme) {

                    state.dateNaissance = state.jour + "/" + state.mois + "/" + state.annee;
                    //console.log(state.dateNaissance);
                    //cas utilisateur est un homme
                    if (isSelectedHomme === true) {

                        firebase.auth.onAuthStateChanged(function (user) {
                            if (user) {
                                console.log("ici");
                                firebase.dataBase.ref('users/' + user.uid).get().then((snapshot) => {
                                    if (snapshot.exists()) {
                                        data.info_user.firstName = snapshot.val().info_user.firstName;
                                        data.info_user.lastName = snapshot.val().info_user.lastName;
                                        data.info_user.mail = snapshot.val().info_user.mail;
                                        data.info_user.phone = snapshot.val().info_user.phone || "";
                                        data.data_user.uid = snapshot.val().data_user.uid;
                                        data.data_user.statut = snapshot.val().data_user.statut;
                                        data.info_user.photoUrlProfil = snapshot.val().info_user.photoUrlProfil || "";
                                        data.data_user.photoUrl = snapshot.val().data_user.photoUrl || "";
                                        data.data_user.description = snapshot.val().data_user.description || "";
                                        data.info_user.dateDeNaissance = state.dateNaissance;
                                        var date = new Date().getFullYear();
                                        var anneeNaissance = parseInt(state.dateNaissance.substring(6));
                                        var ageUser = date - anneeNaissance;
                                        data.info_user.age = ageUser.toString();
                                        data.info_user.genre = "Homme";
                                        //console.log(data);
                                        //ajout information dans la base
                                        firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                                            console.log("ajout infos reussi");
                                            props.navigation.navigate("InfosP");
                                        }).catch((err) => {
                                            console.log("ajout info")
                                            console.log(err)
                                        });


                                    }
                                })
                            }
                        })

                    }
                    //cas utilisateur est une femme
                    if (isSelectedFemme === true) {
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
                                        data.info_user.dateDeNaissance = state.dateNaissance;
                                        data.data_user.description = snapshot.val().data_user.description || "";
                                        data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";

                                        data.id_card.inf_card.marque = snapshot.val().id_card.inf_card.marque || "";
                                        data.id_card.inf_card.modele = snapshot.val().id_card.inf_card.modele || "";
                                        data.id_card.inf_card.plaqueImmatriculation = snapshot.val().id_card.inf_card.plaqueImmatriculation || "";
                                        var date = new Date().getFullYear();
                                        var anneeNaissance = parseInt(state.dateNaissance.substring(6));
                                        var ageUser = date - anneeNaissance;
                                        data.info_user.age = ageUser.toString();
                                        data.info_user.genre = "Femme";
                                        console.log(data);
                                        //ajout information dans la base
                                        firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                                            console.log("ajout infos reussi");
                                            props.navigation.navigate("InfosP");
                                        }).catch((err) => {
                                            console.log("err ajout info")
                                            console.log(err)
                                        });
                                    }
                                })
                            }
                        })
                    }
                }

            }

        }

    }
    const textfunction = (y) => {
        if (y.length === 2) {
            setTest(y + "/");
        }
        console.log(text)
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
                        <Text style={styles.textthree}> Date de naissance :</Text>
                        <View style={{ flexDirection: "row", padding: 9, }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => handlerStateText('jour', text)}
                                placeholder={'JJ'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                            <Text style={{ fontSize: 25, color: 'white', marginTop: 10 }}>/</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => handlerStateText('mois', text)}
                                placeholder={'MM'}
                                value={text}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                            <Text style={{ fontSize: 25, color: 'white', marginTop: 10, }}>/</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => handlerStateText('annee', text)}
                                placeholder={'AAAA'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                        </View>

                    </View>
                    <View style={styles.inputContainer2}>
                        <Text style={styles.textthree}>Sexe : </Text>
                        <View style={styles.checkbox}>
                            <CheckBox
                                value={isSelectedHomme}
                                onValueChange={setSelectionHomme}
                            />
                            <Text style={styles.textfive}>  Homme</Text>
                        </View>
                        <View style={styles.checkbox}>
                            <CheckBox
                                value={isSelectedFemme}
                                onValueChange={setSelectionFemme}
                            />
                            <Text style={styles.textfive}>  Femme</Text>

                        </View>

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
        justifyContent: "space-around"
    },
    form: {
        marginTop: 20
    },
    checkbox: {
        flexDirection: "row",
        margin: 10,

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
        width: WIDTH * 0.15,
        borderRadius: 10,
        fontSize: 15,
        padding: 8,
        textAlign: "center",
        backgroundColor: '#2A354E',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 10,
        marginTop: 10,
    },

    inputIcon: {
        position: 'absolute',
        top: 10,
        left: 37
    },
    inputContainer: {
        marginTop: 10,
    },
    inputContainer2: {
        marginTop: 10,
        flexDirection: "row",
        //justifyContent: "space-evenly"
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
    textthree: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
        paddingLeft: 18,
        paddingTop: 8,
        fontWeight: "bold",
    },
    textfive: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
        fontWeight: "bold",
    },
    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: "bold",
    }

});
export default Infos;