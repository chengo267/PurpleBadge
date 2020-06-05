import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default function Logo(){

    const [image, setImage]= useState('https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png');

    pickImage = async () => {
        var result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View>
            <Text style={styles.textStyle}>לוגו בית העסק</Text>
            <TouchableOpacity onPress={pickImage}>
                <Image style= {styles.logoStyle}
                    source = {{uri:image}}/>
            </TouchableOpacity>
        </View>
    )
    
}

const styles = StyleSheet.create({
    logoStyle:{
        width: 150,
        height: 150,
        alignSelf: 'center',
        margin: 10
    },
    textStyle:{
        alignSelf:'center'
    }
});