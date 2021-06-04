import React, { useState, setState } from 'react';
import { ImageBackground, TouchableOpacity, Dimensions, StyleSheet, Image, Text, View, } from 'react-native';
import firebase from '../../firebase/firebase';
const { width: WIDTH } = Dimensions.get('window')



const connexion = (props) => {
    const [state, setState] = useState({
        name: "",
        mail: "",
    });
    const [mailVerifield, setMailVerifield] = useState(false);
    var user = firebase.auth.currentUser;
    const handlerStateText = (name, text) => {
        setState({ ...state, [name]: text })
    }
    const deconnexionUser = async () => {
        await firebase.auth.signOut().then(() => {
            // Sign-out successful.
            console.log("deconnexion")
            props.navigation.navigate("Connexion")
        }).catch((error) => {
            // An error happened.
        });
    }
    firebase.auth.onAuthStateChanged(function (user) {
        if (user) {
            firebase.dataBase.get
            //var emailflag = user.isEmailVerified();
            //console.log(user.emailflag);
            if (user.emailVerified) {
                setMailVerifield(true);
                //console.log(user.getUid());
            }
        }
    });

    return mailVerifield === true ? (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => deconnexionUser()} >
                <Text style={styles.buttonTextOne} >Deconnexion</Text>
            </TouchableOpacity>
            <Text style={styles.text}>You are connected </Text>
            <Text style={styles.text}>Your mail is verifield </Text>
            {/*<TouchableOpacity onPress={() => infoUser()} >
                            <Text style={styles.buttonTextOne} >infoUser</Text>
                        </TouchableOpacity>*/}
        </View >
    ) : (
            <View style={styles.container} >
                <TouchableOpacity onPress={() => deconnexionUser()} >
                    <Text style={styles.buttonTextOne} >Deconnexion</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Your mail is not verifield </Text>
                {/*<TouchableOpacity onPress={() => infoUser()} >
                            <Text style={styles.buttonTextOne} >infoUser</Text>
                        </TouchableOpacity>*/}
            </View >
        );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#17203B",
        textAlign: "center",
        justifyContent: "center",
        alignItems: 'center',
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
    text: {
        fontWeight: "bold",
        padding: 10,
        fontSize: 30,
        textAlign: "center",
        alignItems: 'center',
        color: 'white',
    }
})
export default connexion