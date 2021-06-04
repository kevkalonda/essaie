//npm install reactjs-popup

import React, { useState, useCallback } from 'react'
import { ImageBackground, Dimensions, StyleSheet, Button, ActivityIndicator, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../../../firebase/firebase';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function imagePfl(props) {
    firebase.auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log("ici");
            firebase.dataBase.ref('users/' + user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    state.photoProfil = snapshot.val().info_user.photoUrlProfil || "";
                    state.listPhoto = snapshot.val().data_user.photoUrl || "";
                    console.log(state.photoProfil);
                }
            })
        }
    });
}


const PhotoP2 = (props) => {

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
    const [state, setState] = useState({
        showPass: true,
        press: false,
        login: "",
        mdp: "",
        photoProfil: "",
        listPhoto: [],
    });
    const [x, setX] = useState(null);
    const [listPhoto, setListPhoto] = useState([]);
    const [isLoadig, setIsLoadig] = useState(true);

    const displayLoading = () => {
        console.log(isLoadig)
        if (isLoadig === true) {
            return (<div >
                <ActivityIndicator size="large" color="red" />
            </div>);

        }
    }
    const Suivant = () => {
        props.navigation.navigate("DescriptionP")
    }
    const menu = () => {
        alert("menu profil");
    }
    const supprimerCommeProfil = () => {
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
                        data.info_user.adresse = snapshot.val().info_user.adresse;
                        data.info_user.codePostal = snapshot.val().info_user.codePostal;
                        data.info_user.pays = snapshot.val().info_user.pays;
                        data.info_user.ville = snapshot.val().info_user.pays;
                        console.log(data);
                        data.info_user.photoUrlProfil = "";

                        //ajout information dans la base
                        firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                            console.log("ajout infos reussi");
                            props.navigation.navigate("PhotoP2");
                        }).catch((err) => {
                            console.log("err ajout info")
                            console.log(err)
                        });
                    }
                })
            }
        })
    }
    const ajoutPhotoProfil = (p_url) => {
        firebase.auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("ici");
                firebase.dataBase.ref('users/' + user.uid).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        setIsLoadig();
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
                        data.info_user.adresse = snapshot.val().info_user.adresse;
                        data.info_user.codePostal = snapshot.val().info_user.codePostal;
                        data.info_user.pays = snapshot.val().info_user.pays;
                        data.info_user.ville = snapshot.val().info_user.pays;
                        console.log(data);
                        data.info_user.photoUrlProfil = p_url;
                        //ajout des nouvelles informations dans la base
                        firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                            alert("profil de profil a été modifier");
                            console.log("ajout infos reussi");
                            props.navigation.navigate("PhotoP2");
                        }).catch((err) => {
                            console.log("err ajout info")
                            console.log(err)
                        });
                    }
                })
            }
        })
    }
    const supprimerPhoto = (p_url) => {
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
                        data.info_user.adresse = snapshot.val().info_user.adresse;
                        data.info_user.codePostal = snapshot.val().info_user.codePostal;
                        data.info_user.pays = snapshot.val().info_user.pays;
                        data.info_user.ville = snapshot.val().info_user.pays;
                        console.log(data);
                        data.info_user.photoUrlProfil = "";
                        //ici on efface la photo
                        var index = data.data_user.photoUrl.indexOf(p_url);
                        data.data_user.photoUrl.splice(index, 1)
                        //ajout des nouvelles informations dans la base
                        firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                            alert("suppression reussi")
                            console.log("ajout infos reussi");
                            props.navigation.navigate("PhotoP2");
                        }).catch((err) => {
                            console.log("err ajout info")
                            console.log(err)
                        });
                    }
                })
            }
        })
    }

    const listItems = listPhoto.map((photo_i) =>
        <View style={{ marginVertical: 5, margin: 5 }}>
            <Popup trigger={<button>
                <Image source={{
                    uri: photo_i, width: 50,
                    height: 50,
                }} style={{ width: 55 }} />
            </button>} position="center">
                <View >
                    <TouchableOpacity style={{ margin: 10 }} onPress={() => ajoutPhotoProfil(photo_i)}>
                        <Text style={styles.text2}>Ajouter comme photo de profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 10 }} onPress={() => supprimerPhoto(photo_i)}>
                        <Text style={styles.text2}>supprimer la photo</Text>
                    </TouchableOpacity>
                </View>
            </Popup>
        </View>
    );
    const fonct = () => {
        firebase.auth.onAuthStateChanged(function (user) {
            if (user) {
                firebase.dataBase.ref('users/' + user.uid).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        setX(snapshot.val().info_user.photoUrlProfil || "");
                        setListPhoto(snapshot.val().data_user.photoUrl || []);
                        //console.log(snapshot.val().data_user.photoUrl);
                    }
                })
            }
        });
        return true;
    }

    const Back = () => {
        props.navigation.goBack()
    }
    fonct();
    return isLoadig === true ? (
        <ImageBackground source={require('../../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.icon} onPress={() => Back()}>
                        <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.mainphoto}   {...console.log(isLoadig)}     >
                    <View style={styles.photo} >
                        <Popup trigger={<button>
                            <Image style={styles.img} source={{
                                uri: x, width: Dimensions.get("screen").width * 0.6,
                                height: HEIGTH * 0.25,
                            }} />
                        </button>} position="center">
                            <View >
                                <TouchableOpacity style={{ margin: 10 }} onPress={() => supprimerCommeProfil()}>
                                    <Text style={styles.text2}>supprimer comme photo de profil</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ margin: 10 }} onPress={() => supprimerPhoto(x)}>
                                    <Text style={styles.text2}>supprimer la photo</Text>
                                </TouchableOpacity>
                            </View>
                        </Popup>

                    </View>
                </View>
                <View style={styles.photos}>
                    <Text style={styles.textone}>Récentes :</Text>
                    <View style={styles.displayphotos}>
                        <View style={styles.containerphotos} >
                            {listItems}
                        </View>

                    </View>

                </View>


                <View style={styles.btncontainer}>

                    <TouchableOpacity onPress={() => Suivant()} style={styles.btn}>
                        <Text style={styles.text}>SAUVEGARDER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    ) : (
            <ImageBackground source={require('../../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >

                <View style={styles.display}>
                    <ActivityIndicator size="large" color="#BD1550" />
                </View>

            </ImageBackground>
        );

}

const styles = StyleSheet.create({
    container: {
        height: HEIGTH * 0.75,
        width: WIDTH * 0.80,
        backgroundColor: '#17223B',
        borderRadius: 10,
        color: 'white',

    },
    btncontainer: {
        alignContent: "flex-end",
        alignItems: "flex-end"
    },
    img: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: "bold",
    },
    text2: {
        color: 'blue',
        fontSize: 15,
        fontWeight: "bold",
    },

    btn: {
        width: Dimensions.get("screen").width * 0.25,
        backgroundColor: '#BD1550',
        borderColor: "transparent",
        padding: 7,
        fontSize: 15,
        textAlign: "center",
        alignItems: 'center',
        borderRadius: 10,
        color: 'white',
        margin: 20,
        justifyContent: "flex-end",
    },
    mainphoto: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,

    },
    display: {
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
    },
    displayphotos: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,

    },

    containerphotos: {

        width: Dimensions.get("screen").width * 0.70,
        height: HEIGTH * 0.2,
        backgroundColor: 'white',
        opacity: 0.7,
        paddingLeft: 18,
        paddingTop: 5,
        flexDirection: "row"

    },
    photo: {
        width: Dimensions.get("screen").width * 0.70,
        height: HEIGTH * 0.3,
        backgroundColor: 'white',
        opacity: 0.7,
        paddingLeft: 18,
    },

    bottomContain: {
        flexDirection: 'row',
        paddingLeft: 210,
        paddingTop: 1

    },

    icon: {

        paddingLeft: 18,
        paddingTop: 12,
        marginTop: 0,

    },

    input: {
        height: 120,
        width: WIDTH - 55,
    },

    form: {
        backgroundColor: '#2A354E',
        borderRadius: 5,
        width: WIDTH - 55,

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
        fontSize: 12,
        fontWeight: "bold",
        color: "#FFF",
        marginTop: 0,
        paddingLeft: 18,
        paddingTop: 8,
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
        opacity: 0.8,
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
export default PhotoP2;