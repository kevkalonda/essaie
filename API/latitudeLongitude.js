import React, { useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';
const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');
import { getLatitudeLongitude, getLongitude, getLatitude, distanceEntreDeuxPoint } from "./test"


const longitude = (props) => {

    const [state, setState] = useState(null)
    const [statei, setStatei] = useState(null)

    const [state1, setState1] = useState(null)
    const [statei1, setStatei1] = useState(null)

    var adrresse = "102 rue Robespierre, 29200 Brest";
    var adresse2 = "25 rue Mirabeau, brest 29200";
    var adresse3 = "paris"
    var adresse4 = "Brest"

    var latitude1 = getLatitude(adresse3);
    var longitude1 = getLongitude(adresse3);;
    var latitude2 = getLatitude(adresse4);
    var longitude2 = getLongitude(adresse4);
    var distance = distanceEntreDeuxPoint(latitude1, longitude1, latitude2, longitude2)

    console.log(latitude1);



    return (
        <View>
            <Text>{adrresse}</Text>
            <Text>Latitude: {latitude1}</Text>
            <Text>Longitude: {longitude1}</Text>

            <Text>{adresse2}</Text>
            <Text>Latitude: {latitude2}</Text>
            <Text>Longitude: {longitude2} </Text>

            <Text>Distance: {distance} </Text>
        </View>
    )
}

export default longitude;