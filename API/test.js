import React, { useState } from "react";
import { ImageBackground, Dimensions, StyleSheet, Button, View, SafeAreaView, Text, Alert, ProgressViewIOSComponent, Image, TextInput, TouchableOpacity } from 'react-native';


export function getLatitudeLongitude(name) {
    const url = 'https://api-adresse.data.gouv.fr/search/?q=' + name;
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getLongitude(name) {
    var x
    const [state, setState] = useState(null)
    if (name === "") {
        alert("error")
    }
    else {
        getLatitudeLongitude(name).then((repons) => {
            //console.log(repons)
            x = (repons.features[0].geometry.coordinates[0]);
            console.log(x)
            return 10;
        })
    }
    //console.log(state)

}

export function getLatitude(name) {

    const [state, setState] = useState(null)
    var x;
    if (name === "") {
        alert("error")
        return null
    }
    else {
        getLatitudeLongitude(name).then((repons) => {
            //console.log(repons)
            x = (repons.features[0].geometry.coordinates[1]);
            console.log(x)
            return 10
        })
    }
    //console.log(state)

}

export function distanceEntreDeuxPoint(pointxLat, pointxLng, pointyLat, pointyLng) {

    var rad = function (x) {
        return x * Math.PI / 180;
    };

    var R = 6378140; // Earth’s mean radius in meter
    var dLat = rad(pointyLat - pointxLat);
    var dLong = rad(pointyLng - pointxLng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(pointxLat)) * Math.cos(rad(pointyLat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1.12;
    return d; // returns the distance in meter

}