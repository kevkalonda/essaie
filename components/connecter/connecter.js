//npm install --save  @react-navigation/bottom-tabs

import * as React from 'react';
import { Text, View } from 'react-native';



function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

const setting =()=>{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello World!</Text>
        </View>
    );
}

export default setting;



