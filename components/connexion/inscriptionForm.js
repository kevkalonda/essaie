//npm install react-native-vector-icons
import React from "react";
import { ImageBackground, Dimensions, StyleSheet, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../../assets/logo.png';
import firebase from '../../firebase/firebase';


const { width: WIDTH } = Dimensions.get('window');
export default class login_form_inscription extends React.Component {
    constructor(props) {
        super(props);
    }
    RedirectionConnexion() {
        this.props.navigation.navigate("Connexion");
    }

    stateData = {
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
    };

    state = {
        showPass: true,
        press: false,
        sexe: "",
        nom: "",
        prenom: "",
        mail: "",
        tel: "",
        mdp: "",
        sexe: "",
        statut: "user",
    };
    otherMethodInscription() {
        this.props.navigation.navigate("Application")
    }
    handlerStateText(name, text) {
        this.setState({ [name]: text })
    }

    createUser() {
        if (this.state.mail === '' || this.state.mdp === '') {
            alert("Le champ  mail et le mot de passe sont obligatoires")
        }
        if (this.state.nom === '') {
            alert("Vous devez renseigner votre nom")
        }
        if (this.state.tel.length >= 10 || this.state.tel === "") {
            firebase.auth.createUserWithEmailAndPassword(this.state.mail, this.state.mdp)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;

                    firebase.dataBase.ref().child('users').child(user.uid).get().then(snapShot => {
                        if (snapShot.exists()) {
                            console.log("userExist");
                            alert("Vous posserder déjà un compte");
                        }
                        else {
                            //console.log("utilisateur creer");
                            //stockage des informations saisie par l'utilisateur dans la base firebase
                            this.stateData.info_user.firstName = this.state.nom;
                            this.stateData.info_user.lastName = this.state.prenom;
                            this.stateData.info_user.phone = this.state.tel;
                            this.stateData.info_user.mail = this.state.mail;
                            this.stateData.data_user.uid = userCredential.user.uid;
                            this.stateData.data_user.statut = "user";

                            firebase.dataBase.ref('users/' + userCredential.user.uid).set(this.stateData).then(() => {
                                //console.log("UserCreate");
                                //envoie du mail de confirmation
                                user.sendEmailVerification()
                                this.props.navigation.navigate("Authentification")
                            }).catch((err) => {
                                console.log("echec de creation de l'utilisateur")
                                console.log(err)
                            });
                        }
                    }).catch((err) => {
                        console.log(err)
                    });

                })
                .catch((error) => {
                    //gestion d'erreur, le mot de passe doit contenir minimum 6 char
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === "auth/email-already-in-use") {
                        alert("Un compte existe déjà avec ce mail")
                        console.log( errorCode);
                    }
                    else {
                        alert("le mot de passe doit avoir au moins 6 caractères");
                        console.log(errorMessage);
                    }
                    
                    
                });
        }
        else {
            alert("le numero n'est pas correct");
        }
    }

    //fonction qui traite l'affichage de la visibilité de mot de passe
    showPass = (event) => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        }
        else {
            this.setState({ showPass: true, press: false })
        }
    }
    render() {
        //ici on verifie si l'inscription a bien marcher et on change l'affichage
        return (
            <View style={styles.container}>
                <View style={styles.logocontainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}> Inscription </Text>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={styles.inputTwo}>
                        {/*<Icon name={'ios-person-outline'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                    */}
                        <TextInput
                            style={styles.inputname}
                            onChangeText={(text) => this.handlerStateText('nom', text)}

                            placeholder={'Nom'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />

                        <TextInput
                            style={styles.inputprenom}
                            onChangeText={(text) => this.handlerStateText('prenom', text)}

                            placeholder={'Prénom'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />

                    </View>

                    <View style={styles.inputContainer}>
                        {/*<Icon name={'at'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                    */}
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handlerStateText('mail', text)}
                            placeholder={'Adresse mail'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />
                    </View>

                    <View style={styles.inputContainer}>
                        {/*<Icon name={'ios-call'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                    */}
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handlerStateText('tel', text)}
                            placeholder={'Télephone'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />
                    </View>

                    <View style={styles.inputContainer}>

                        {/*<Icon name={'lock-closed'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                    */}
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handlerStateText('mdp', text)}
                            placeholder={'Mot de passe'}
                            secureTextEntry={this.state.showPass}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />

                        <TouchableOpacity style={styles.eye} onPress={this.showPass.bind(this)}>
                            <Icon name={this.state.press == false ? 'eye-off-outline' : 'eye-outline'} size={26} color={'rgba(255,255,255,0.7)'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => this.createUser()}>
                        <Text style={styles.text}>S'inscrire</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={styles.textlogin}> Déjà membre ? </Text>
                        <TouchableOpacity onPress={() => this.RedirectionConnexion()}>
                            <Text style={styles.textloginSouligne} >connecte-toi</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>

                    <TouchableOpacity onPress={() => this.otherMethodInscription()}>
                        <Text style={styles.textloginSouligne} >Autre methode d'inscription</Text>
                    </TouchableOpacity>
                </View>
                <View></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#17223B',
        textAlign: 'center'
    },
    logocontainer: {
        alignItems: 'center',

    },
    text11: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Cochin',
        fontWeight: "bold",
        margin: 10,
    },

    text2: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        fontStyle: "italic",
        margin: 10,
        textAlign: 'center',

    },
    logo: {
        width: 120,
        height: 150,
    },
    eye: {
        position: 'absolute',
        top: 11,
        right: 37
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
        marginHorizontal: 25,
        marginTop: 2,
        textAlign: "center"
    },
    input2: {
        padding: 10,
        marginTop: 50,
        marginBottom: 50,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginVertical: 5,
        marginHorizontal: 1,
        width: WIDTH - 55,
        fontSize: 20,
        color: 'white',
        textAlign: "center",

    },
    inputname: {
        width: WIDTH / 2 - 55,
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

    inputprenom: {
        width: WIDTH / 2 - 55,
        height: 45,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 25,
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
        alignItems: 'center',
    },
    inputTwo: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        textAlign: 'center'
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
    buttonIcon: {
        position: 'absolute',
        left: 10,
    },
    buttonTextTwo: {
        padding: 10,
        fontSize: 20,
        textAlign: "center",
        alignItems: 'center',
        color: 'rgba(255,255,255,0.7)',
        backgroundColor: "#60A026",
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: "transparent",
        width: WIDTH - 120,
        alignItems: 'center',
        marginBottom: 80,

    },
    choixSexe: {
        flexDirection: "row",
        backgroundColor: "#17203B",
        textAlign: "center",
        alignItems: 'center',
    },
    textlogin: {
        color: 'white',
        marginTop: 15,
    },
    textloginSouligne: {
        color: 'white',
        textDecorationLine: 'underline',
        fontStyle: "italic",
        marginTop: 15,
    }
});