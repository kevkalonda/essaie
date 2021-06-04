//npm install --save google-map-react
import React, {  useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../firebase/firebase'
import { getLatitudeLongitude, getLongitude, getLatitude, distanceEntreDeuxPoint } from "./test"

const AnyReactComponent = ({ text }) => <div ><Icon name={'location-sharp'} size={20} color={'red'} />{text}</div>;

const SimpleMap = () => {

    const [centre, setCentre] = useState({
        lat: 48.8534,
        lng: 2.3488
    })

    const zoom = 10;

    const [isOnline, setIsOnline] = useState(false);
    var lat;
    var lng;
    useEffect(() => {
        console.log("CHAT API SUBSCRIBE")
        //ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // Specify how to clean up after this effect:
        return function cleanup() {
            console.log("CHAT API UNSUBSCRIBE")
            //ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    }, [lat, lng]);

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
    })

    const [adresse, setAdresse] = useState("");

    const navigate = () => {
        //console.log("ici");
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                //console.log("ici");
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

                        setAdresse(snapshot.val().info_user.adresse + ", " + snapshot.val().info_user.codePostal + " " + snapshot.val().info_user.ville);
                        //console.log(data);
                        //console.log(adresse);

                        lat = getLatitude(adresse);
                        lng = getLatitude(adresse);



                        console.log(centre)
                    }
                })
            }
        });
    }
    return (
        // Important! Always set the container height explicitly
        <View style={{ flex: 1, justifyContent: "space-around" }} {...navigate()}>
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
                    defaultCenter={centre}
                    defaultZoom={zoom}
                    onGoogleApiLoaded={({ map, maps }) => console.log(map, maps)}
                >

                    <AnyReactComponent
                        lat={getLatitude("25 rue Mirabeau, Brest 29200")}
                        lng={getLongitude("25 rue Mirabeau, Brest 29200")}
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