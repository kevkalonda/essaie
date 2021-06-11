import React, { useState, useCallback, useEffect } from 'react'

import { View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../firebase/firebase';

const AnyReactComponent = ({ text }) => <div ><Icon name={'location-sharp'} size={20} color={'red'} />{text}</div>;

const ajoutArrets =(props)=>{

    //information users
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

    const [adresseUser, setAdresseUser] = useState( {
            adresse: ""
    });

    
    
    

    const navigate=(dataUser)=> {
        firebase.dataBase.ref('users/' + dataUser.uid).get().then((snapshot) => {
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

                data.id_card.parmis.photoUrlPermis = snapshot.val().id_card.parmis.photoUrlPermis || "";

                data.data_user.description = snapshot.val().data_user.description || "";
                data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";
                data.data_user.lieux_favoris = snapshot.val().data_user.lieux_favoris || [];
                data.data_user.user_like = snapshot.val().data_user.user_like || [];

                data.id_card.inf_card.marque = snapshot.val().id_card.inf_card.marque || "";
                data.id_card.inf_card.modele = snapshot.val().id_card.inf_card.modele || "";
                data.id_card.inf_card.plaqueImmatriculation = snapshot.val().id_card.inf_card.plaqueImmatriculation || "";
                data.id_card.inf_card.photoUrlVehicile = snapshot.val().id_card.inf_card.photoUrlVehicile || "";

                data.paiement.carteBancaire.numberOfCarte = snapshot.val().paiement.carteBancaire.numberOfCarte || "";
                data.paiement.carteBancaire.name = snapshot.val().paiement.carteBancaire.name || "";
                data.paiement.carteBancaire.dateExpiration = snapshot.val().paiement.carteBancaire.dateExpiration || "";
                data.paiement.abonnement.montant = snapshot.val().paiement.abonnement.montant || "";
                data.paiement.abonnement.nbHeure = snapshot.val().paiement.abonnement.nbHeure || "";

                adresseUser.adresse = snapshot.val().info_user.adresse + ", " + snapshot.val().info_user.codePostal + " " + snapshot.val().info_user.ville;
                console.log(snapshot.val());
                //data.data_user.statut === "true" ? (stateVerifStatut = true) : (stateVerifStatut = false)

            }
        })
    }
    const [dataProposition, setDataProposition] = useState({
        infoConducteur: {
            idCondu: "",
            nom: "",
            age: "",
            Depart: "",
            arrivee: "",
            heureArrivee: "00:00",
            heureDepart: "",
        },
        date: {
            jour: "",
            mois: "",
            annee: "",
        },
        arrets: [],
        infoClients: [],
        nbClient: 0,
        prix: 0,
    });
    const [state, setState] = useState({
        timeA: "00 : 00",
        timeD: "00 : 00",
    })

    var arret = ""
    const [art, setArt] = useState(true)

    const supprimerArret = (arret_i) => {
        var index = dataProposition.arrets.indexOf(arret_i);
        dataProposition.arrets.splice(index, 1);
        setArt(!art);
    }


    const listArret = dataProposition.arrets.map((arret_i) =>
        <View style={{ borderRadius: 5 ,flexDirection: "row", backgroundColor: "#4083A7", margin: 5, justifyContent: "space-between" }}>
            <Text style={styles.text} > {arret_i} </Text>
            <TouchableOpacity onPress={() => supprimerArret(arret_i)}>
                <Icon style={styles.icon} name={'ios-close'} size={10} color={'white'} />
            </TouchableOpacity>           
        </View>
    )

    const handlerStateText = (name, text) => {
        arret = text;
    }
    const Back = () => {
        props.navigation.goBack()
    }

    const ajouterArret = () => {
        if (arret !== "") {
            dataProposition.arrets.push(arret);
            setArt(!art);
        }
    }
    var carpool = [];
    var indiceMax;

    const RedirectionDescription = () => {
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                firebase.dataBase.ref('carpool/' + user.uid).get().then((res) => {
                    carpool = res.val();
                    indiceMax = res.val().length - 1;
                    dataProposition.infoConducteur.age = res.val()[indiceMax].infoConducteur.age;
                    dataProposition.infoConducteur.nom = res.val()[indiceMax].infoConducteur.nom;
                    dataProposition.infoConducteur.prenom = res.val()[indiceMax].infoConducteur.prenom;
                    dataProposition.infoConducteur.arrivee = res.val()[indiceMax].infoConducteur.arrivee;
                    dataProposition.infoConducteur.Depart = res.val()[indiceMax].infoConducteur.Depart;
                    dataProposition.infoConducteur.heureArrivee = res.val()[indiceMax].infoConducteur.heureArrivee;
                    dataProposition.infoConducteur.heureDepart = res.val()[indiceMax].infoConducteur.heureDepart;
                    dataProposition.infoConducteur.idCondu = res.val()[indiceMax].infoConducteur.idCondu;
                    dataProposition.date.mois = res.val()[indiceMax].date.mois;
                    dataProposition.date.jour = res.val()[indiceMax].date.jour;
                    dataProposition.date.annee = res.val()[indiceMax].date.annee;

                    console.log(carpool);
                    carpool[indiceMax] = dataProposition;
                    console.log(carpool);
                    firebase.dataBase.ref('carpool/' + snapshot.val().data_user.uid).set(this.carpool).then(() => {
                        console.log("ajout infos reussi");
                        //props.navigation.navigate("");
                        alert("ok")
                    }).catch((err) => {
                        alert("une erreus s'est produite veuillez contacter Wé-co");
                        console.log(" err ajout arret")
                        console.log(err)
                    });
                 
                })
            }
        });
    }

    useEffect(() => {
        console.log("ajout arret");
    });

        return (
            // Important! Always set the container height explicitly
            
            <View style={styles.container}> 
/
                <View style={styles.container2}>
                        <View>
                            <Text style={styles.firsttext}>Bienvenu Conducteur </Text>
                            <Text style={styles.text3}>Renseignez le nom ou l'adresse de l'arrets deans le champ puis cliquer sur plus pour ajouter</Text>
            
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <TextInput
                                    onChangeText={(text) => handlerStateText('arret', text)}
                                    style={styles.input2}
                                    placeholder={'Arrets'}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent' />
                                <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.35)', margin: 10, padding: 10, borderRadius: 10, }} onPress={() => ajouterArret()}>
                                    <Icon name={'add'} size={20} color={'rgba(255,255,255,1)'} />
                                </TouchableOpacity>

                        </View>
                        <View>
                            {listArret}
                        </View>
                        
                    </View>

                        
    
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent:"center", }}>
                        <TouchableOpacity style={styles.connexionAvec2} onPress={() => Back()}>
                            <Text style={styles.text3}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.connexionAvec} onPress={() => RedirectionDescription()}>
                            <Text style={styles.text3}>Continuer</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    
            </View>

        )
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: '#17223B',
        padding: 20,
        width: "100%",
        height: "100%",
        color: 'black',
    },
    textTime: {
        margin: 10,
        color: "white",
        fontSize: 15,
        padding: 10,
        textAlign: "center"

    },
    timeInp: {
        width: "30%",
        padding: 10,
        borderRadius: 5,
        fontSize: 15,
        color: 'white',
        backgroundColor: '#17223B',
        margin: 10
    },
    firsttext: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10
    },
    next: {

        backgroundColor: '#BD1550',
        borderRadius: 5,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row-reverse"
    },
    container2: {
        alignItems: "center",
        justifyContent: "space-around",
        alignContent: "center",
        backgroundColor: '#2A354E',
        borderRadius: 10,
        padding: 20,
        width: "85%",
        height: "90%",
        color: 'black',
    },
    icon: {

        alignItems: "center",
        alignContent: "center",
        margin: 7,

    },
    icon2: {

        paddingLeft: 18,
        paddingTop: 12,
        marginTop: 0,

    },
    text: {

        color: "white",
        fontSize: 16,
        textAlign: "center"

    },

    greatPlaceStyle: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
    },
    input: {
        width: "83%",
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        color: 'white',
        backgroundColor: '#17223B',
        margin: 10
    },
    input2: {
        width: "75%",
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        color: 'white',
        margin: 10,
        backgroundColor: '#17223B',
    },
    text3: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 15,
        textAlign: 'center',

    },
    text4: {
        color: '#BD1550',
        fontSize: 15,
        textAlign: 'center',

    },

    connexionAvec: {
        width: "50%",
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#BD1550",
        padding: 10,
        margin: 5,
    },
    connexionAvec2: {
        width: "50%",
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#073E69",
        padding: 10,
        margin: 5,
    },

});

export default ajoutArrets;