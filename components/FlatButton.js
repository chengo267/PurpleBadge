import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function FlatButton({ text, buttonTop, on_Press}) {
    return (
        <View top={buttonTop} alignSelf={'center'}>
            <TouchableOpacity onPress={on_Press}>
                <View style={styles.buttonStyle} >
                    <Text style={styles.buttonText}>{text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    buttonStyle:{
        borderRadius: 30,
        paddingVertical: 20, 
        paddingHorizontal: 30,
        width:240,
        alignSelf:'center',
        backgroundColor:'#8b008b',
        margin:10
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22, 
        textAlign: 'center'
    }
})