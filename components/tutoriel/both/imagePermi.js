//npm install react-dropzone
import React, { useState, useCallback } from 'react'
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dropzone from 'react-dropzone';
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../../firebase/firebase';


const imagePermis = (props) => {

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
    const RedirectionInfosPersos = () => {
        props.navigation.navigate("Introduction");
    }
    const Back = () => {
        props.navigation.goBack()
    }

    var verifImport = false;
    const Redirection = () => {
        if (verifImport) {
            props.navigation.navigate("Smoke");
        }
        else {
            alert("Vous devez importez votre Permis");
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
                    <Text style={styles.textone}>Voiture</Text>
                    <Text style={styles.texttwo}>Les Profils complétés permettent aux passagers d'etre rassurés et tu rempliras plus rapidement les places disponiblie dans ta voiture</Text>

                </View>
                <View style={styles.import}>
                    <Dropzone onDrop={acceptedFiles => {
                        acceptedFiles.forEach((file) => {
                            const reader = new FileReader()
                            reader.onabort = () => console.log('file reading was aborted')
                            reader.onerror = () => console.log('file reading has failed')
                            reader.onload = () => {
                                // Do whatever you want with the file contents
                                const binaryStr = reader.result
                                console.log(binaryStr)
                            }
                            reader.readAsArrayBuffer(file);
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
                                            data.data_user.uid = snapshot.val().data_user.uid;
                                            data.data_user.statut = snapshot.val().data_user.statut;
                                            data.info_user.dateDeNaissance = snapshot.val().info_user.dateDeNaissance;
                                            data.info_user.age = snapshot.val().info_user.age;
                                            data.info_user.genre = snapshot.val().info_user.genre;
                                            data.info_user.adresse = snapshot.val().info_user.adresse;
                                            data.info_user.codePostal = snapshot.val().info_user.codePostal;
                                            data.info_user.pays = snapshot.val().info_user.pays;
                                            data.info_user.ville = snapshot.val().info_user.ville;

                                            data.data_user.description = snapshot.val().data_user.description || "";
                                            data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";

                                            data.id_card.inf_card.marque = snapshot.val().id_card.inf_card.marque || "";
                                            data.id_card.inf_card.modele = snapshot.val().id_card.inf_card.modele || "";
                                            data.id_card.inf_card.plaqueImmatriculation = snapshot.val().id_card.inf_card.plaqueImmatriculation || "";
                                            console.log(data);
                                            //ajout information dans la base

                                            firebase.storage.ref('users/' + snapshot.val().data_user.uid + '/permis')
                                                .child('image').put(file).then((snapshot2) => {
                                                    console.log("le fichier a été importé dans la store");
                                                    verifImport = true;
                                                    //obtention de l'url de l'image telecharger dans store de la firebase
                                                    firebase.storage.ref('users/' + snapshot.val().data_user.uid + '/carteIdentite').child('image')
                                                        .getDownloadURL().then((url) => {
                                                            console.log(url);
                                                            //affectation de l'url dans la firebase realtimes
                                                            data.id_card.parmis.photoUrlPermis = url;
                                                            //insertions des nouveaux donnée dans la firebase
                                                            firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                                                                console.log("ajout infos reussi");
                                                                alert("votre Permis a été télécharger");
                                                            }).catch((err) => {
                                                                console.log("ajout info")
                                                                console.log(err)
                                                            });
                                                        })
                                                })
                                        }
                                    })
                                }
                            })

                        })
                    }}>
                        {({ getRootProps, getInputProps }) => (
                            <View style={styles.btn2}>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Text style={styles.text}>IMPORTER LA PHOTO DU PERMIS </Text>
                                    <Text style={styles.text}> (JPEG,PNG,PDF)</Text>
                                </div>
                            </View>
                        )}
                    </Dropzone>
                </View>
                <View style={styles.containericon}>
                    <TouchableOpacity style={styles.next} onPress={() => Redirection()}>
                        <Icon name={'md-arrow-forward'} size={30} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {

        height: HEIGTH * 0.45,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        justifyContent: "space-around",

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
    inputContainer: {
        marginTop: 10,
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
    next: {
        backgroundColor: '#BD1550',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    containericon: {
        alignItems: 'flex-end',
        padding: 10,
        margin: 5,
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
        marginLeft: 40
    },

    list: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'white'
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
export default imagePermis;