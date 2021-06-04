import React, { useState} from 'react'

import { ImageBackground, Dimensions, StyleSheet, CheckBox, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../../firebase/firebase';


const smoke = (props) => {

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
    const [isIdentiyCarte, setIsIdentiyCarte] = useState(false);
    const [isPassport, setIsPassport] = useState(false);
    const [isPermis, setIsPermis] = useState(false);

    var verifImport = false;

    const RedirectionInfosPersos = () => {
        props.navigation.navigate("Introduction");
    }
    const Back = () => {
        props.navigation.goBack()
    }


    const Suivant = () => {
        //ici ajout dans la base
        props.navigation.navigate("ProfilP");
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
                    <Text style={styles.textone}>Acceptez-vous les fumeurs ?</Text>

                </View>
                <View style={styles.steps}>
                    <View style={styles.list}>
                        <CheckBox
                            value={isIdentiyCarte}
                            onValueChange={setIsIdentiyCarte}
                        />
                        <Text style={styles.choix}>  OUI</Text>

                    </View>

                    <View style={styles.list}>
                        <CheckBox
                            value={isPassport}
                            onValueChange={setIsPassport}
                        />
                        <Text style={styles.choix}>  NON</Text>

                    </View>

                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => Suivant()} style={styles.btn}>
                        <Text style={styles.text}>Suivant</Text>
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
        justifyContent: "space-around",

    },

    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: "bold",
    },
    btn2: {
        width: WIDTH * 0.65,
        height: 45,
        borderRadius: 5,
        backgroundColor: '#4083A7',
        justifyContent: 'center',
        marginTop: 25,
    },
    choix: {
        marginRight: 100,
        textAlign: 'left',
        color: 'rgba(255,255,255,0.7)',
    },
    import: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    steps: {
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 40,
        flexDirection: "row"
    },

    list: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'white',
        marginHorizontal: 10,
        marginVertical: 5
    },

    btn: {
        width: WIDTH * 0.40,
        backgroundColor: '#BD1550',
        borderColor: "transparent",
        marginTop: 30,
        padding: 7,
        fontSize: 15,
        textAlign: "center",
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        color: 'white',

    },
    btncontainer: {

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
    textsuite: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 14,
        paddingLeft: 18,
    }
});
export default smoke;