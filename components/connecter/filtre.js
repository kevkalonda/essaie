import React, { useState, useCallback, useEffect } from 'react'

import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Dimensions, TextInput, FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import firebase from '../../firebase/firebase';

const filtre = (props) => {
    const [state, setState] = useState({
        Jdepart: "",
        Jarrive: "",

    })
    const handlerStateText = () => {
        console.log("il vient de saisir la date");
    }
    const RedirectionSoiree = () => {
        props.navigation.navigate("Recherche soiree")
    }
    return(
        <View style={styles.container}>
            <View style={styles.container3}>
                    <Text style={styles.text1}> Filtre</Text>
            </View>
            <View style={styles.container2}>               
                <View>
                    <View style={{ flexDirection: "row-reverse" }}>
                        <TouchableOpacity onPress={() => RedirectionSoiree()}>
                            <Icon name={'ios-close'} size={25} color={'rgba(255,255,255,1)'} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.text1}>Date :</Text>
                        <View style={styles.inputForm}>
                            <Text style={styles.tinput}>Du :</Text>
                            <TextInput
                                onChangeText={(text) => handlerStateText('login', text)}
                                style={styles.input}
                                placeholder={'jj'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                            <Text style={styles.tinput}> / </Text>
                            <TextInput
                                onChangeText={(text) => handlerStateText('login', text)}
                                style={styles.input}
                                placeholder={'mm'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                            
                            <Text style={styles.tinput}> Au : </Text>
                            <TextInput
                                onChangeText={(text) => handlerStateText('login', text)}
                                style={styles.input}
                                placeholder={'jj'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                            <Text style={styles.tinput}> / </Text>
                            <TextInput
                                onChangeText={(text) => handlerStateText('login', text)}
                                style={styles.input}
                                placeholder={'mm'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />                            
                        </View>
                        <View>
                            <Text style={styles.text1}>Horaire :</Text>
                        </View>
                        <View style={styles.inputForm}>
                            <Text style={styles.tinput}>Du :</Text>
                            <TextInput
                                onChangeText={(text) => handlerStateText('login', text)}
                                style={styles.input}
                                placeholder={'00'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                            <Text style={styles.tinput}> : </Text>
                            <TextInput
                                onChangeText={(text) => handlerStateText('login', text)}
                                style={styles.input}
                                placeholder={'00'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />

                            <Text style={styles.tinput}> Au : </Text>
                            <TextInput
                                onChangeText={(text) => handlerStateText('login', text)}
                                style={styles.input}
                                placeholder={'00'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                            <Text style={styles.tinput}> : </Text>
                            <TextInput
                                onChangeText={(text) => handlerStateText('login', text)}
                                style={styles.input}
                                placeholder={'00'}
                                placeholderTextColor={'rgba(255,255,255,0.7)'}
                                underlineColorAndroid='transparent' />
                        </View>
                        
                    </View>
                </View>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#17223B',
        padding: 20,
        width: "100%",
        height: "100%",
        color: 'black',
    },
    inputForm: {
        backgroundColor: '#17223B',
        flexDirection: "row",
        color: "white",
        width: "100%",
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
    tinput: {
        color: "white",
        padding:10,
    },
    text1: {
        color: "white",
        padding: 10,
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
        alignContent: "center",
        backgroundColor: '#2A354E',
        borderRadius: 10,
        padding: 20,
        width: "100%",
        height: "90%",
        color: 'black',
    },
    container3:{
        alignItems: "center",
        backgroundColor: '#2A354E',
        borderRadius: 10,
        marginBottom:2,
        width: "20%",
        justifyContent:"cente",
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
        width: "10%",
        textAlign:"center",
        borderRadius: 5,
        fontSize: 16,
        color: 'white',
        backgroundColor: '#17223B',
  
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

export default filtre;