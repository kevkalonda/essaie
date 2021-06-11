import React, { Component } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../firebase/firebase'


//const AnyReactComponent = ({ text }) => <div ><Icon name={'location-sharp'} size={20} color={'red'} />{text}</div>;


class proposerCourse extends Component {

    //information users

    static defaultProps = {
        center: {
            lat: 48.8534,
            lng: 2.3488
        },
        zoom: 11,
        stateVerifStatut: true,

        data: {
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
        },
        adresseUser: {
            adresse: ""
        }
    };
    dataProposition = {
        infoConducteur: {
            idCondu: "",
            nom: "",
            prenom: "",
            age: "",
            Depart: "",
            arrivee: "",
            heureArrivee: "",
            heureDepart: "",
        },
        date: {
            jour: "",
            mois: "",
            annee: "",
        },
        placeDisponible:"",
        arrets: [],
        infoClients: [],
        nbClient: 0,
        prix: 0,
    }
    carpool = [];
    redirectConnexion() {
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                firebase.dataBase.ref('users/' + user.uid).get().then((snapshot) => {
                    if (snapshot.exists()) {
                        /*if (snapshot.val().data_user.photoIdentityValidite === "false" || snapshot.val().id_card.inf_card.validite === "false" || snapshot.val().id_card.parmis.validite === "false") {
                            alert("Vos documents ne sont pas valides");
                        }
                        else {*/
                            if (this.state.mm === "" || this.state.jj === "" || this.state.aaaa === "" || this.state.arrive === "" || this.state.depart === "") {
                                alert("Tout les champs sont obligatoire");
                            }
                            else {
                                this.dataProposition.infoConducteur.age = snapshot.val().info_user.age;
                                this.dataProposition.infoConducteur.nom = snapshot.val().info_user.firstName;
                                this.dataProposition.infoConducteur.prenom = snapshot.val().info_user.lastName;
                                this.dataProposition.infoConducteur.arrivee = this.state.arrive;
                                this.dataProposition.infoConducteur.Depart = this.state.depart;
                                this.dataProposition.infoConducteur.heureArrivee = this.state.timeA;
                                this.dataProposition.infoConducteur.heureDepart = this.state.timeD;
                                this.dataProposition.infoConducteur.idCondu = user.uid;
                                this.dataProposition.date.mois = this.state.mm;
                                this.dataProposition.date.jour = this.state.jj;
                                this.dataProposition.date.annee = this.state.aaaa;
                                this.dataProposition.placeDisponible = this.state.place;

                                firebase.dataBase.ref('carpool/' + snapshot.val().data_user.uid).get().then((res) => {

                                    this.carpool = res.val();
                                    console.log(this.carpool);
                                    this.carpool.push(this.dataProposition)

                                    //ajout des information de la course dans la base

                                    firebase.dataBase.ref('carpool/' + snapshot.val().data_user.uid).set(this.carpool).then(() => {
                                        console.log("ajout infos reussi");
                                        this.props.navigation.navigate("Ajouts arrets");
                                    }).catch((err) => {
                                        alert("une erreus s'est produite veuillez contacter Wé-co");
                                        console.log(" err ajout info")
                                        console.log(err)
                                    });
                                });                               
                            }                           
                        }
                    //}
                })

            }
        });
    }
    componentDidMount() {
        this.unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.navigate(user);
            }
        });
    }
    componentDidUpdate() {
        this.unsubscribe();
    }
   

    navigate(dataUser) {
        firebase.dataBase.ref('users/' + dataUser.uid).get().then((snapshot) => {
            if (snapshot.exists()) {

                //on stock les donnée de l'utilisateur pour la reutiliser
                this.props.data.info_user.firstName = snapshot.val().info_user.firstName;
                this.props.data.info_user.lastName = snapshot.val().info_user.lastName;
                this.props.data.info_user.mail = snapshot.val().info_user.mail;
                this.props.data.info_user.photoUrlProfil = snapshot.val().info_user.photoUrlProfil || "";
                this.props.data.data_user.photoUrl = snapshot.val().data_user.photoUrl || [];
                this.props.data.info_user.phone = snapshot.val().info_user.phone || "";
                this.props.data.data_user.uid = snapshot.val().data_user.uid;
                this.props.data.data_user.statut = snapshot.val().data_user.statut;
                this.props.data.info_user.dateDeNaissance = snapshot.val().info_user.dateDeNaissance;
                this.props.data.info_user.age = snapshot.val().info_user.age;
                this.props.data.info_user.genre = snapshot.val().info_user.genre;
                this.props.data.info_user.adresse = snapshot.val().info_user.adresse;
                this.props.data.info_user.codePostal = snapshot.val().info_user.codePostal;
                this.props.data.info_user.pays = snapshot.val().info_user.pays;
                this.props.data.info_user.ville = snapshot.val().info_user.ville;

                this.props.data.id_card.parmis.photoUrlPermis = snapshot.val().id_card.parmis.photoUrlPermis || "";

                this.props.data.data_user.description = snapshot.val().data_user.description || "";
                this.props.data.data_user.photoIdentiteUrl = snapshot.val().data_user.photoIdentiteUrl || "";
                this.props.data.data_user.lieux_favoris = snapshot.val().data_user.lieux_favoris || [];
                this.props.data.data_user.user_like = snapshot.val().data_user.user_like || [];

                this.props.data.id_card.inf_card.marque = snapshot.val().id_card.inf_card.marque || "";
                this.props.data.id_card.inf_card.modele = snapshot.val().id_card.inf_card.modele || "";
                this.props.data.id_card.inf_card.plaqueImmatriculation = snapshot.val().id_card.inf_card.plaqueImmatriculation || "";
                this.props.data.id_card.inf_card.photoUrlVehicile = snapshot.val().id_card.inf_card.photoUrlVehicile || "";

                this.props.data.paiement.carteBancaire.numberOfCarte = snapshot.val().paiement.carteBancaire.numberOfCarte || "";
                this.props.data.paiement.carteBancaire.name = snapshot.val().paiement.carteBancaire.name || "";
                this.props.data.paiement.carteBancaire.dateExpiration = snapshot.val().paiement.carteBancaire.dateExpiration || "";
                this.props.data.paiement.abonnement.montant = snapshot.val().paiement.abonnement.montant || "";
                this.props.data.paiement.abonnement.nbHeure = snapshot.val().paiement.abonnement.nbHeure || "";

                this.props.adresseUser.adresse = snapshot.val().info_user.adresse + ", " + snapshot.val().info_user.codePostal + " " + snapshot.val().info_user.ville;
                console.log(snapshot.val());                
                                
            }
        })
    }
    
    state = {
        timeA: "00 : 00",
        timeD: "00 : 00",
        arrive: "",
        depart: "",
        mm: "",
        jj: "",
        aaaa: "",
        place: "",
    }

    ajoutArrets() {
        this.props.navigation.navigate("Ajouts arrets");
    }
  
    handlerStateText(name, text) {
        if (name === "timeA") {
            this.setState({ timeA: text });
        }
        if (name === "timeD") {
            this.setState({ timeD: text });
        }
        if (name === "arrive") {
            this.setState({ arrive: text });
        }
        if (name === "depart") {
            this.setState({ depart: text });
        }
        if (name === "mm") {
            this.setState({ mm: text });
        }
        if (name === "jj") {
            this.setState({ jj: text });
        }
        if (name === "aaaa") {
            this.setState({ aaaa: text });
        }
        if (name === "place") {
            this.setState({ place: text });
        }
        
    }
    Redirectioncarte() {
        this.props.navigation.navigate("app");
    }
    RedirectionRecherche() {
        this.props.navigation.navigate("Recherche covoit");
    }
    render() {

        return this.props.stateVerifStatut === true ?(
            // Important! Always set the container height explicitly
            <View style={styles.container}>
                <View style={styles.container2}>
                    <View>
                        <Text style={styles.firsttext}>Bienvenu Conducteur </Text>
                        <Text style={styles.text3}>Renseignez Les informations de votre course</Text> 
                    </View>

                    <View style={{ justifyContent: "center", alignItems:"center" }}>
                        <View>                            
                            <View style={{ flexDirection: "row", justifyContent: "center", }}>
                                <Text style={styles.textTime}>Heure Depart :</Text>
                                <TextInput style={styles.timeInp}
                                    keyboardType={"numeric"}
                                    value={this.state.timeA}
                                    onChangeText={(time) => this.handlerStateText("timeA", time)} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <Text style={styles.textTime}>Heure Arrivée:</Text>
                                <TextInput style={styles.timeInp}
                                    keyboardType={"numeric"}
                                    value={this.state.timeD}
                                    onChangeText={(time) => this.handlerStateText("timeD", time)} />
                            </View>
                        </View>   
                        <TextInput
                            onChangeText={(text) => this.handlerStateText('depart', text)}
                            style={styles.input}
                            placeholder={'Lieux de depart'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />
                        <TextInput
                            onChangeText={(text) => this.handlerStateText('arrive', text)}
                            style={styles.input}
                            placeholder={'Lieux de destination'}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent' />
                        <View style={styles.inputContainer}>
                            <Text style={styles.textthree}>Date</Text>
                            <View style={{ flexDirection: "row", padding: 5, }}>
                                <TextInput
                                    style={styles.inputDate}
                                    onChangeText={(text) => this.handlerStateText('jj', text)}
                                    placeholder={'JJ'}
                                    keyboardType={"numeric"}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent' />
                                <Text style={{ fontSize: 25, color: 'white', marginTop: 10 }}>/</Text>
                                <TextInput
                                    style={styles.inputDate}
                                    onChangeText={(text) => this.handlerStateText('mm', text)}
                                    placeholder={'MM'}
                                    keyboardType={"numeric"}
                                    
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent' />
                                <Text style={{ fontSize: 25, color: 'white', marginTop: 10, }}>/</Text>
                                <TextInput
                                    style={styles.inputDate}
                                    onChangeText={(text) => this.handlerStateText('aaaa', text)}
                                    placeholder={'AAAA'}
                                    keyboardType={"numeric"}
                                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                                    underlineColorAndroid='transparent' />
                            </View>
                            

                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 15, color: 'white', margin: 10, padding:10 }}>Nombre de place disponible :</Text>
                            <TextInput
                                onChangeText={(text) => this.handlerStateText('place', text)}
                                style={styles.inputDate}
                                placeholder={'0'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                keyboardType={"numeric"}
                                underlineColorAndroid='transparent' />
                        </View>
                        
                    </View>
                   
                    <View>
                        <TouchableOpacity style={styles.connexionAvec} onPress={() => this.redirectConnexion()} >
                            <Text style={styles.text3}>Continuer</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <View style={{ alignItems: "center", alignContent: "center", justifyContent: "flex-end", }}>
                    <View style={{ width: '100%', flexDirection: "row", justifyContent: "center", backgroundColor: "#17223B", margin: 10, padding: 5 }}>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => this.Redirectioncarte()}>
                            <Icon style={styles.icon} name={'map-outline'} size={25} color={'rgba(255,255,255,1)'} />
                            <Text style={styles.text}>Carte</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => alert("non implementer")}>
                            <Icon style={styles.icon} name={'md-today-sharp'} size={25} color={'rgba(255,255,255,1)'} />
                            <Text style={styles.text}>Agenda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => alert("non implementer")}>
                            <Icon style={styles.icon} name={'add-circle'} size={25} color={'#BD1550'} />
                            <Text style={{ color: "#BD1550", fontSize: 11, textAlign: "center" }}>Proposer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => this.RedirectionRecherche()}>
                            <Icon style={styles.icon} name={'md-search'} size={25} color={'rgba(255,255,255,1)'} />
                            {/*<Icon style={styles.icon} name={'ios-person'} size={25} color={'rgba(255,255,255,1)'} />*/}
                            <Text style={styles.text}>Rechercher</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => alert("non implementer")}>
                            <Icon style={styles.icon} name={'chatbubble'} size={25} color={'rgba(255,255,255,1)'} />
                            <Text style={styles.text}>Message</Text>
                        </TouchableOpacity>                        
                    </View>
                </View>
            </View>

        ) : (
                <View style={styles.container}>
                    <View style={styles.container2}>
                        <Text>Vous n'etes pas concucteur veuillez modifier votre statut pour proposer des voyages</Text>
                    </View>
                </View>
                );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-around",
        alignContent: "center",
        backgroundColor: '#17223B',
        padding: 20,
        width: "100%",
        height:"100%",
        color: 'black',
    },
    inputContainer: {
        marginTop: 10,
        flexDirection: "row"
    },
    textthree: {
        color: "#FFF",
        opacity: '0.8',
        fontSize: 15,
        margin: 10,
        padding:10,
        padding:10,
        fontWeight: "bold",
    },
    textTime: {
        margin:10,
        color: "white",
        fontSize: 15,
        padding: 5,
        textAlign: "center"

    },
    timeInp: {
        width: "30%",
        padding: 5,
        borderRadius: 5,
        fontSize: 15,
        color: 'white',
        backgroundColor: '#17223B',
        margin: 10,
        textAlign: "center"
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
        width: "98%",
        height:"90%",
        color: 'black',
    },
    icon: {

        alignItems: "center",
        alignContent: "center",
        margin: 7,

    },
    text: {

        color: "white",
        fontSize: 11,
        textAlign: "center"

    },
    greatPlaceStyle: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
    },
    input: {
        width: "83%",
        padding:10,
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
        margin:10,
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
    inputDate: {
        width: WIDTH * 0.15,
        borderRadius: 10,
        fontSize: 15,
        padding: 10,
        margin: 10,
        textAlign: "center",
        backgroundColor: '#17223B',
        color: 'rgba(255,255,255,0.7)',
        
    },
    
    connexionAvec: {
        width: "83%",
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#BD1550",
        padding: 10,
        margin: 5,
    },
    connexionAvec2: {
        borderWidth: 1,
        width: "83%",
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#17223B",
        padding: 10,
        margin: 5,
    },

});

export default proposerCourse;