import React, { useState, useCallback, useEffect } from 'react'

import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Dimensions, TextInput, FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../firebase/firebase';

const rechercheCoivoiturage = (props) => {

    const data = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur ?";
    const renderItem = () => {
        <TouchableOpacity >
            <Text style={styles.text1}>ici</Text>
        </TouchableOpacity>
    }
    const RedirectionSoiree=()=>{
        props.navigation.navigate("Recherche soiree")
    }
    const retourMap = () => {
        props.navigation.navigate("app")
    }
    const filtre = () => {
        props.navigation.navigate("filtre")
    }
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <TouchableOpacity style={styles.retourAlaMap} onPress={() => retourMap()}>
                    <Icon name={'md-arrow-back'} size={20} color={'rgba(255,255,255,1)'} />
                    <Text style={styles.text1}>Retour a la map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuFiltre} onPress={() => filtre()}>
                    <Icon name={'menu'} size={30} color={'rgba(255,255,255,1)'} />
                </TouchableOpacity>

            </View>
            <View style={{ alignContent: "flex-start", width:"90%" }}>
                <Text style={styles.text}>A proximite</Text>
            </View>          
            <View style={styles.container3}>
                <TouchableOpacity style={styles.connexionAvec}>
                    <Text style={styles.choix1}>Covoiturage</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.connexionAvec} onPress={() => RedirectionSoiree()}>
                    <Text style={styles.choix2}>Soirées</Text>
                </TouchableOpacity>               
            </View>
            <SafeAreaView>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                       />
            </SafeAreaView>
        </View>        
        )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        alignContent: "center",
        backgroundColor: '#17223B',
        padding: 20,
        width: "100%",
        height: "100%",
    },
    retourAlaMap: {       
        flexDirection: "row",
        width:"100%",
        
    },
    menuFiltre: {
        width: "100%",

    },
    container2: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
    },
    container3: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "60%",
        margin: 20,
        
    },
    text: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    text1: {
        color: "white",
        fontSize: 15,
    },
    connexionAvec: {
        borderWidth: 1,
        width: "100%",
        justifyContent: 'center',
        borderColor:'rgba(255,255,255,1)',
        flexDirection: 'row',
        backgroundColor: "#17223B",
        textAlign: "center"

    },
    choix1: {
        color: "#326620",
        fontSize: 20,
        padding:10,
    },
    choix2: {
        color: "white",
        padding:10,
        fontSize: 20,
    }
});
export default rechercheCoivoiturage;