import React, { useState, setState, useEffect } from 'react';
import { ImageBackground, TouchableOpacity, Image, Dimensions, StyleSheet, TextInput, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent } from 'react-native';
import firebase from '../../firebase/firebase';
const { width: WIDTH } = Dimensions.get('window');


const motDePasseOublie = (props) => {

    const [state, setState] = useState({
        email: "",
        mot_de_passe_recu_par_mail: "",
    })

    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        console.log("CHAT API SUBSCRIBE")
        //ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // Specify how to clean up after this effect:
        return function cleanup() {
            console.log("CHAT API UNSUBSCRIBE")
            //ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    }, [isOnline]);
    // ...
    const sendEmail = (mail) => {
        if (mail === '') {
            alert("Entrer votre adresse mail dans le champs de saisie");
        }
        else {
            firebase.auth.sendPasswordResetEmail(mail).then(function () {
                //alert("un email vous es éte envoyer");
                setIsOnline(true);

            }).catch(function (error) {
                // An error happened.
                alert("votre mail n'est pas reconnu");
            });
        }

    }
    const redirectConnexion = () => {
        props.navigation.navigate("Connexion");
    }
    const sendMailReinitialisation = (mail) => {
        firebase.auth.sendPasswordResetEmail(mail).then(function () {
            //alert("un email vous es éte envoyer");
            setIsOnline(true);
            console.log("le mail  a été envoyé")
            alert("le mail de reinitialisation du mot de passe a été envoyé");

        }).catch(function (error) {
            // An error happened.
            alert("votre mail n'est pas reconnu");
        });
    }
    const handlerStateText = (name, text) => {
        setState({ ...state, [name]: text })
    }
    return isOnline === false ? (
        <View style={styles.container} >
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text} >MOT DE PASSE OUBLIE ?</Text>
            <Text style={styles.text2} >Saisir l'adresse mail assoccié au compte pour réinitialiser le mot de passe </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => handlerStateText('email', text)}
                placeholder="Adrese mail"
            />
            <TouchableOpacity onPress={() => sendEmail(state.email)} >
                <Text style={styles.buttonTextOne} >ENVOVER</Text>
            </TouchableOpacity>
        </View>
    ) : (
            <View style={styles.container} >
                <Image source={message} style={styles.logo2} />
                <Text style={styles.text} >Un mail de reinitalisation de mot de passe a été envoyé à l'adresse {state.emai} </Text>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.connexionAvec2} onPress={() => sendMailReinitialisation(state.email)} >
                        <Text style={styles.text3}>Renvoyer le mail de confirmation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.connexionAvec} onPress={() => redirectConnexion()} >
                        <Text style={styles.text3}>Retour au menu de connexion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#17203B",
        justifyContent: "center",
        alignItems: 'center',

    },
    connexionAvec2: {
        borderWidth: 1,
        width: WIDTH - 55,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#BD1550",
        padding: 10,
        margin: 5,
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
    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Cochin',
        fontWeight: "bold",
        margin: 10,
    },
    logo2: {
        width: 89,
        height: 65,
        margin: 40,
    },

    text2: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        fontStyle: "italic",
        margin: 10,
        textAlign: 'center',

    },
    text3: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: "left",
        fontSize: 15,
        margin: 15,
        textAlign: 'center',
    },
    logo: {
        width: 80,
        height: 105,
        margin: 30,
    },
    buttonTextOne: {
        padding: 10,
        fontSize: 20,
        textAlign: "center",
        alignItems: 'center',
        color: 'rgba(255,255,255,0.7)',
        backgroundColor: "#D51563",
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: "transparent",
        width: WIDTH - 120,
        alignItems: 'center',
        marginBottom: 80,

    },
    text3: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'center',

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
    },
    input: {
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
        fontSize: 15,
        textAlign: "center",

    }
})
export default motDePasseOublie