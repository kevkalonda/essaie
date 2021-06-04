//npm install react-native-vector-icons

import * as React from 'react';
import { ImageBackground, Linking, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import logo from '../../assets/logo.png';
import firebase from '../../firebase/firebase'

import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH } = Dimensions.get('window')


export default class login_form extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        showPass: true,
        press: false,
        login: "",
        mdp: "",
    };
    motdepasseOublie() {
        this.props.navigation.navigate("MotDePasseOublier");
    }
    inscription() {
        this.props.navigation.navigate("Inscription");
    }
    handlerStateText(name, text) {
        this.setState({ [name]: text })
    }
    connexionUser() {
        if (this.state.login === '' || this.state.mdp === '') {
            alert('Les deux champs sont obligatoires')
        }
        else {

            firebase.auth.signInWithEmailAndPassword(this.state.login, this.state.mdp)
                .then((userCredential) => {
                    var userConnected = (userCredential.user);
                    //console.log(userConnected.uid);
                    //this.props.navigation.navigate("Connecter");
                    firebase.dataBase.ref().child('users').child(userConnected.uid).get().then(snapShot => {
                        if (snapShot.exists()) {
                            //console.log(snapShot.val());
                            this.props.navigation.navigate("Welcome")
                        }
                    }).catch((error) => {
                        console.log("erreurIciConnexionFormulaire");
                        //console.log(error)
                        alert("une erreur s'est produite vueillez contacter le service Wé-co")
                    });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("user not exist")
                    //console.log(error);
                    alert("Mot de passe ou Adresse mail incorrecte")
                });

        }
    }

    connexionUserGmail() {
        var verifExistanceCompte = false;
        var dataUser;
        firebase.auth
            .signInWithPopup(firebase.providerMail)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                //requette qui cherche l'identifiant de l'utilisateur
                firebase.dataBase.ref().child('users').child(user.uid).get().then(snapShot => {
                    //On verifie si l'utilisateur exist
                    if (snapShot.exists()) {
                        console.log("userExist");
                        console.log(snapShot);
                        this.props.navigation.navigate("Welcome");
                    }
                    else {
                        //alert("Vous n'avez pas un compte veuillez en créer un");
                        user.delete().then(function () {
                            // User deleted.
                            //console.log("utilisateur supprimer")
                        }).catch(function (error) {
                            // An error happened.
                            console.log(error)
                            //console.log("erreur dans la suppression de l'utilisateur connexion")
                            alert("une erreur s'est produite vueillez contacter le service Wé-co")
                        });
                        this.props.navigation.navigate("Compte inexistant")
                    }
                }).catch((error) => {
                    console.log("erreurIciConnexionFormulaire");
                    console.log(error)
                    alert("une erreur s'est produite vueillez contacter le service Wé-co")
                });

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                alert("une erreur s'est produite vueillez contacter le service Wé-co")
                // ...
            });
    }


    redirectInscription = () => {
        this.props.navigation.navigate("Inscription");
    }

    //redirection connexion facebook

    connexionUserFacebook = () => {
        //console.log("ici");
        var verifExistanceCompte = false;
        var dataUser;
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
                    //On verifie si l'utilisateur exist
                    if (snapShot.exists()) {
                        //console.log("userExist");
                        //console.log(user);
                        //on verifie son statut
                        this.props.navigation.navigate("Welcome");

                    }
                    else {
                        //alert("Vous n'avez pas un compte veuillez en créer un");
                        user.delete().then(function () {
                            // User deleted.
                            console.log("utilisateur supprimer")
                        }).catch(function (error) {
                            // An error happened.
                            console.log(error)
                            console.log("erreur dans la suppression de l'utilisateur connexion")
                        });
                        this.props.navigation.navigate("Compte inexistant")
                    }
                }).catch((error) => {
                    console.log("erreurIciConnexionFormulaire");
                    console.log(error)
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
                    this.props.navigation.navigate("Welcome");
                }

            });
    }

    showPass = (event) => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        }
        else {
            this.setState({ showPass: true, press: false })
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.logocontainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}> Connexion à votre compte</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.connexionAvec} onPress={() => this.connexionUserGmail()}>
                        <Icon name={'ios-logo-google'} size={20} color={'rgba(255,255,255,0.7)'} style={styles.buttonIcon} />
                        <Text style={styles.text2}>Se connecter avec Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.connexionAvec} onPress={() => this.connexionUserFacebook()}>
                        <Icon name={'ios-logo-facebook'} size={20} color={'rgba(255,255,255,0.7)'} style={styles.buttonIcon} />
                        <Text style={styles.text2} >Se connecter avec Facebook</Text>
                    </TouchableOpacity>
                    {/*<Text style={styles.logoText2} >---------------ou----------------</Text>*/}
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputContainer}>
                        <Icon name={'ios-person-outline'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            onChangeText={(text) => this.handlerStateText('login', text)}
                            style={styles.input}
                            placeholder={'Adresse mail'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name={'lock-closed-outline'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            onChangeText={(text) => this.handlerStateText('mdp', text)}
                            style={styles.input}
                            placeholder={'Mot de passe'}
                            secureTextEntry={this.state.showPass}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />
                        <TouchableOpacity style={styles.eye} onPress={this.showPass.bind(this)}>
                            <Icon name={this.state.press == false ? 'eye-off-outline' : 'eye-outline'} size={26} color={'rgba(255,255,255,0.7)'}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => this.connexionUser()}>
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.motdepasseOublie()}>
                        <Text style={styles.text3}>Mot de passe oublié</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.text31}>Nouveau sur Wé-CO? </Text>
                    <TouchableOpacity onPress={() => this.redirectInscription()}>
                        <Text style={styles.text3}> S'inscrire</Text>
                    </TouchableOpacity>
                </View>

                <View></View>

            </View>


        );
    }
}

function HomeScreen({ navigation }) {
    return (
        <View>
            <Text style={styles.soustext} onPress={() => navigation.push('Inscription')}> Inscription ? </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#17223B'
    },
    logocontainer: {
        alignItems: 'center',


    },
    logo: {
        width: 120,
        height: 150,
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
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    eye: {
        position: 'absolute',
        top: 8,
        right: 37
    },
    btn: {
        borderWidth: 1,
        width: WIDTH - 55,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#BD1550',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10

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
        textAlign: "center",
        fontSize: 13,
        fontStyle: "italic",
        textDecorationLine: 'underline',
        color: 'white',
        marginTop: 15
    },
    text31: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: "center",
        fontSize: 13,
        color: 'white',
        marginTop: 15
    }
});