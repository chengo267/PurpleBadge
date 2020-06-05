import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function CircleButton({ text, buttonTop, on_Press}) {
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
        borderRadius: 200,
        paddingVertical: 20, 
        paddingHorizontal: 30,
        width:150,
        height:150,
        alignSelf:'center',
        backgroundColor:'#8b008b',
       
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30, 
        textAlign: 'center',
        top:30
    }
})