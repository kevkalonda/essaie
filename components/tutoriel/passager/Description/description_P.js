import React, { useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../../../firebase/firebase';


const DescriptionP = (props) => {

    const [state, setState] = useState({
        description: "",
        mdp: "",
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

    const RedirectionDescription = () => {
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
                        data.info_user.phone = snapshot.val().info_user.phone || "";
                        data.info_user.dateDeNaissance = snapshot.val().info_user.dateDeNaissance || "";

                        data.info_user.age = snapshot.val().info_user.age || "";
                        data.info_user.genre = snapshot.val().info_user.genre || "";
                        data.info_user.adresse = snapshot.val().info_user.adresse || "";
                        data.info_user.codePostal = snapshot.val().info_user.codePostal || "";
                        data.info_user.pays = snapshot.val().info_user.pays || "";
                        data.info_user.ville = snapshot.val().info_user.ville || "";
                        data.info_user.photoUrlProfil = snapshot.val().info_user.photoUrlProfil || "";
                        data.paiement.carteBancaire.dateExpiration = snapshot.val().paiement.carteBancaire.dateExpiration || "";
                        data.paiement.carteBancaire.name = snapshot.val().paiement.carteBancaire.name || "";
                        data.paiement.carteBancaire.numberOfCarte = snapshot.val().paiement.carteBancaire.numberOfCarte || "";

                        data.data_user.description = snapshot.val().data_user.description || "";
                        data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";

                        data.id_card.inf_card.marque = snapshot.val().id_card.inf_card.marque || "";
                        data.id_card.inf_card.modele = snapshot.val().id_card.inf_card.modele || "";
                        data.id_card.inf_card.plaqueImmatriculation = snapshot.val().id_card.inf_card.plaqueImmatriculation || "";

                        data.data_user.uid = snapshot.val().data_user.uid;
                        data.data_user.statut = snapshot.val().data_user.statut;
                        data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";
                        //insertion de la description
                        data.data_user.description = state.description;
                        //console.log(data);

                        //obtention de l'url de l'image telecharger dans store de la firebase
                        firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                            console.log("ajout infos reussi");
                            props.navigation.navigate("DescriptionP2");
                        }).catch((err) => {
                            alert("une erreus s'est produite veuillez contacter Wé-co");
                            console.log(" err ajout info")
                            console.log(err)
                        });
                    }
                })
            }
        })

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
                </View>
                <Text style={styles.textone}>Descris-toi!</Text>
                <Text style={styles.texttwo}>Ecris un petit texte pour que les autres soit plus en confiance en prenant ton convoit</Text>
                <View style={styles.align}>
                    <View style={styles.form}>
                        <Text style={styles.textdescrib}>Description</Text>
                        <View style={styles.input_container}>
                            <TextInput
                                style={styles.input}
                                multiline
                                placeholder={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata'}
                                onChangeText={(text) => handlerStateText('description', text)}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                        </View>
                    </View>
                </View>

                <View style={styles.bottomContain}>

                    <TouchableOpacity style={styles.next} onPress={() => RedirectionDescription()}>
                        <Icon name={'arrow-forward-outline'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => RedirectionIntroduction()}>
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
        justifyContent: "space-around",
    },

    bottomContain: {
        flexDirection: "row-reverse",
        margin: 10,
    },

    icon: {

        paddingLeft: 18,
        paddingTop: 12,
        marginTop: 0,

    },

    input: {
        margin: 5,
        height: HEIGTH * 0.2,
        width: WIDTH * 0.70,
        color: "white",
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
export default DescriptionP;