import React, { useState, useCallback } from 'react'
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Dropzone from 'react-dropzone';
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../../firebase/firebase';


const PhotoP = (props) => {


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


    const RedirectionChoixPhotoGmail = () => {
        firebase.auth
            .signInWithPopup(firebase.providerMail)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                console.log("ici")
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var userData = result.user;
                //requette qui cherche l'identifiant de l'utilisateur
                firebase.dataBase.ref().child('users').child(userData.uid).get().then(snapShot => {
                    //On verifie si l'utilisateur exist
                    if (snapShot.exists()) {
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
                                        data.info_user.photoUrlProfil = user.photoURL;
                                        data.paiement.carteBancaire.dateExpiration = snapshot.val().paiement.carteBancaire.dateExpiration || "";
                                        data.paiement.carteBancaire.name = snapshot.val().paiement.carteBancaire.name || "";
                                        data.paiement.carteBancaire.numberOfCarte = snapshot.val().paiement.carteBancaire.numberOfCarte || "";

                                        data.data_user.uid = snapshot.val().data_user.uid;
                                        data.data_user.statut = snapshot.val().data_user.statut;
                                        data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";
                                        data.data_user.photoUrl.push(userData.photoURL);
                                        //console.log(data);

                                        //obtention de l'url de l'image telecharger dans store de la firebase

                                        firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                                            console.log("ajout infos reussi");
                                            props.navigation.navigate("PhotoP2");
                                        }).catch((err) => {
                                            console.log("ajout info")
                                            console.log(err)
                                        });
                                    }
                                })
                            }
                        })
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
                        props.navigation.navigate("Compte inexistant")
                    }
                }).catch((error) => {
                    console.log("erreurIciConnexionFormulaire");
                    console.log(error)
                });

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                //console.log(errorMessage)
                // ...
            });
        //props.navigation.navigate("DescriptionP");
    }
    const Suivant = () => {
        //console.log(dataUrl.imgurl);
        props.navigation.navigate("PhotoP2")
    }
    const Back = () => {
        props.navigation.goBack()
    }
    const RedirectionDescription = () => {
        props.navigation.navigate("PhotoP2")
    }
    const RedirectionIntroduction = () => {
        props.navigation.navigate("WelcomeP");
    }
    const RedirectionChoixPhotoFacebook = () => {
        firebase
            .auth
            .signInWithPopup(firebase.provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var userData = result.user;
                //on verifie si le uid exist si oui on se connect direct dans la base
                firebase.dataBase.ref().child('users').child(userData.uid).get().then(snapShot => {
                    //On verifie si l'utilisateur exist
                    if (snapShot.exists()) {
                        console.log("userExist");
                        console.log(userData);
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
                                        data.info_user.photoUrlProfil = user.photoURL;
                                        data.paiement.carteBancaire.dateExpiration = snapshot.val().paiement.carteBancaire.dateExpiration || "";
                                        data.paiement.carteBancaire.name = snapshot.val().paiement.carteBancaire.name || "";
                                        data.paiement.carteBancaire.numberOfCarte = snapshot.val().paiement.carteBancaire.numberOfCarte || "";

                                        data.data_user.uid = snapshot.val().data_user.uid;
                                        data.data_user.statut = snapshot.val().data_user.statut;
                                        data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";
                                        data.data_user.description = snapshot.val().data_user.description || "";
                                        data.data_user.photoUrl.push(userData.photoURL);
                                        //console.log(data);
                                        data.info_user.photoUrlProfil = userData.photoURL;
                                        //obtention de l'url de l'image telecharger dans store de la firebase
                                        firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                                            console.log("ajout infos reussi");
                                            props.navigation.navigate("PhotoP2");
                                        }).catch((err) => {
                                            console.log("ajout info")
                                            console.log(err)
                                        });
                                    }
                                })
                            }
                        })

                    }
                    else {
                        //suppression du compte
                        userData.delete().then(function () {
                            // User deleted.
                            console.log("utilisateur supprimer");
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
                                            data.data_user.description = snapshot.val().data_user.description || "";
                                            data.info_user.age = snapshot.val().info_user.age || "";
                                            data.info_user.genre = snapshot.val().info_user.genre || "";
                                            data.info_user.adresse = snapshot.val().info_user.adresse || "";
                                            data.info_user.codePostal = snapshot.val().info_user.codePostal || "";
                                            data.info_user.pays = snapshot.val().info_user.pays || "";
                                            data.info_user.ville = snapshot.val().info_user.ville || "";
                                            data.info_user.photoUrlProfil = user.photoURL;
                                            data.paiement.carteBancaire.dateExpiration = snapshot.val().paiement.carteBancaire.dateExpiration || "";
                                            data.paiement.carteBancaire.name = snapshot.val().paiement.carteBancaire.name || "";
                                            data.paiement.carteBancaire.numberOfCarte = snapshot.val().paiement.carteBancaire.numberOfCarte || "";

                                            data.data_user.uid = snapshot.val().data_user.uid;
                                            data.data_user.statut = snapshot.val().data_user.statut;
                                            data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";

                                            data.data_user.photoUrl.push(userData.photoURL);
                                            //console.log(data);

                                            //obtention de l'url de l'image telecharger dans store de la firebase
                                            data.info_user.photoUrlProfil = userData.photoURL;
                                            firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                                                console.log("ajout infos reussi");
                                                props.navigation.navigate("PhotoP2");
                                            }).catch((err) => {
                                                console.log("ajout info")
                                                console.log(err)
                                            });
                                        }
                                    })
                                }
                            })
                        }).catch(function (error) {
                            // An error happened.
                            console.log(error)
                            console.log("erreur dans la suppression de l'utilisateur connexion")
                        });
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
                    alert("une erreur s'est produite contacter le service d'acceuil")
                }

            });
    }
    return (
        <ImageBackground source={require('../../../assets/font.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 50 }}  >
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.icon} onPress={() => Back()}>
                        <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.textone}>Profil</Text>
                <Text style={styles.texttwo}>Complete ton profil dès maintenant !</Text>

                <View style={styles.btncontainer}>
                    <TouchableOpacity onPress={() => RedirectionChoixPhotoFacebook()}>
                        <Text style={styles.buttonPink}>FACEBOOK</Text>
                    </TouchableOpacity>

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
                                                data.info_user.dateDeNaissance = snapshot.val().info_user.dateDeNaissance || "";
                                                data.info_user.age = snapshot.val().info_user.age || "";
                                                data.info_user.genre = snapshot.val().info_user.genre || "";
                                                data.info_user.adresse = snapshot.val().info_user.adresse || "";
                                                data.info_user.codePostal = snapshot.val().info_user.codePostal || "";
                                                data.info_user.pays = snapshot.val().info_user.pays || "";
                                                data.info_user.ville = snapshot.val().info_user.ville || "";
                                                data.data_user.description = snapshot.val().data_user.description || "";

                                                data.data_user.description = snapshot.val().data_user.description || "";
                                                data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";

                                                data.id_card.inf_card.marque = snapshot.val().id_card.inf_card.marque || "";
                                                data.id_card.inf_card.modele = snapshot.val().id_card.inf_card.modele || "";
                                                data.id_card.inf_card.plaqueImmatriculation = snapshot.val().id_card.inf_card.plaqueImmatriculation || "";

                                                data.paiement.carteBancaire.dateExpiration = snapshot.val().paiement.carteBancaire.dateExpiration || "";
                                                data.paiement.carteBancaire.name = snapshot.val().paiement.carteBancaire.name || "";
                                                data.paiement.carteBancaire.numberOfCarte = snapshot.val().paiement.carteBancaire.numberOfCarte || "";

                                                data.data_user.uid = snapshot.val().data_user.uid;
                                                data.data_user.statut = snapshot.val().data_user.statut;
                                                data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";
                                                console.log(data);
                                                var rand = 5 + parseInt(Math.random() * (1000));
                                                //ajout image dans la Store de la firebase
                                                firebase.storage.ref('users/' + snapshot.val().data_user.uid + '/profilImport')
                                                    .child('image' + rand).put(file).then((snapshot2) => {
                                                        console.log("le fichier a été importé dans la store");
                                                        console.log(rand);
                                                        //obtention de l'url de l'image telecharger dans store de la firebase
                                                        firebase.storage.ref('users/' + snapshot.val().data_user.uid + '/profilImport').child('image' + rand)
                                                            .getDownloadURL().then((url) => {
                                                                console.log(url);
                                                                //affectation de l'url dans la firebase realtimes
                                                                data.info_user.photoUrlProfil = url;

                                                                data.data_user.photoUrl.push(url);
                                                                console.log(data)

                                                                //insertions des nouveaux donnée dans la firebase
                                                                firebase.dataBase.ref('users/' + snapshot.val().data_user.uid).set(data).then(() => {
                                                                    console.log("ajout infos reussi");
                                                                    props.navigation.navigate("PhotoP2");
                                                                    //alert("telechargement reussi")
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
                                <View style={styles.buttonTextOne}>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, }}>GALERIE PHOTO</Text>
                                    </div>
                                </View>
                            )}
                        </Dropzone>
                    </View>

                    {/*<TouchableOpacity onPress={() => alert('Instagram')}>
                    <Text style={styles.buttonTextOne}>INSTAGRAM</Text>
                    </TouchableOpacity>*/}

                    <TouchableOpacity onPress={() => RedirectionChoixPhotoGmail()}>
                        <Text style={styles.buttonTextOne}>GOOGLE</Text>
                    </TouchableOpacity>
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
    btncontainer: {
        justifyContent: 'center', alignItems: 'center'
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
    passer: {
        paddingTop: 8,
        paddingRight: 7,
        textDecorationLine: 'underline',
        color: '#959DAD'

    },
    bottomContain: {
        flexDirection: 'row-reverse',
        margin: 10,
    },
    icon: {

        paddingLeft: 18,
        paddingTop: 12,
        marginTop: 0,

    },
    next: {

        backgroundColor: '#BD1550',
        borderRadius: 5,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
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
        width: WIDTH * 0.65,
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
        width: WIDTH * 0.65,
    },

});

export default PhotoP;