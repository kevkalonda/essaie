// npm install --save react-navigation
// npm install @react-navigation/native
// npm install @react-navigation/stack

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
const image = { uri: "https://images3.livreshebdo.fr/sites/default/files/styles/image_full/public/assets/images/nawak_trump_apocalypse.jpg?itok=dsezkurH" };

import Root from "./navigation";


export default function App() {
    return (
        <NavigationContainer>
            <Root />
        </NavigationContainer>
    );
}

