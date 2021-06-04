//npm install react-native-web-maps --save
//npm install react-google-maps --save
//npm install --save google-map-react
//npm install @react-native-community/geolocation --save
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../firebase/firebase'
import { getLatitudeLongitude, getLongitude, getLatitude, distanceEntreDeuxPoint } from "./test"

const AnyReactComponent = ({ text }) => <div ><Icon name={'location-sharp'} size={20} color={'red'} />{text}</div>;


class SimpleMap extends Component {

    //information users

    static defaultProps = {
        center: {
            lat: 48.8534,
            lng: 2.3488
        },
        zoom: 11,

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
    componentWillMount() {
        // Add listener here
        this.unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.navigate(user);
                console.log(this.__latitude("Paris"))
            }
        });

    }

    componentWillUnmount() {
        // Don't forget to unsubscribe when the component unmounts
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
                console.log(this.props.data);
                console.log(this.props.adresseUser);

                //this.__longitude("Brest");

            }
        })
    }

    /*__latitude(ville) {
        console.log( getLatitude("Brest"));
    }*/

    __longitude(ville) {

        //console.log( getLongitude("Brest"));
    }



    render() {

        return (
            // Important! Always set the container height explicitly
            <View style={{ flex: 1, justifyContent: "space-around" }}>
                <View style={{
                    height: HEIGTH * 0.83, width: '100%', justifyContent: "center", alignItems: "center"
                }}>
                    <View style={styles.container}>
                        <TouchableOpacity>
                            <Icon name={'filter'} size={20} color={'black'} />
                        </TouchableOpacity>

                        {/*<TextInput
                            style={styles.input}
                            placeholder={'Soirrée à proximité'}
                            placeholderTextColor={'black'} />*/}
                        <TouchableOpacity>
                            <Icon name={'md-search'} size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyC4 - mA_rr5q2VEu2qm7A0GuMPtz5sfuZZM" }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        onGoogleApiLoaded={({ map, maps }) => console.log(map, maps)}
                    >

                        <AnyReactComponent
                            lat={48.8534}
                            lng={2.3488}
                            text="Weco"
                        />

                    </GoogleMapReact>

                </View>
                <View style={{ alignItems: "center", alignContent: "center", justifyContent: "flex-end", }}>
                    <View style={{ width: '100%', flexDirection: "row", justifyContent: "center", backgroundColor: "#17223B", margin: 10, padding: 5 }}>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => RedirectionDescription()}>
                            <Icon style={styles.icon} name={'map-outline'} size={25} color={'#BD1550'} />
                            <Text style={{ color: "#BD1550", fontSize: 11, textAlign: "center" }}>Carte</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => RedirectionDescription()}>
                            <Icon style={styles.icon} name={'md-today-sharp'} size={25} color={'rgba(255,255,255,1)'} />
                            <Text style={styles.text}>Agenda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => RedirectionDescription()}>
                            <Icon style={styles.icon} name={'add-circle'} size={25} color={'rgba(255,255,255,1)'} />
                            <Text style={styles.text}>Proposer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => RedirectionDescription()}>
                            <Icon style={styles.icon} name={'chatbubble'} size={25} color={'rgba(255,255,255,1)'} />
                            <Text style={styles.text}>Message</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => RedirectionDescription()}>
                            <Icon style={styles.icon} name={'ios-person'} size={25} color={'rgba(255,255,255,1)'} />
                            <Text style={styles.text}>Compte</Text>
                        </TouchableOpacity>



                    </View>
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
        flexDirection: "row",
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        width: "100%",
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
        width: WIDTH - 55,
        height: 45,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 45,
        color: 'black',
        marginHorizontal: 25,
        fontWeight: "bold",
    },

});

export default SimpleMap;