import React from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';

export default function TextField({text, on_change_taxt, val, secureText, KeyBoard, top}) {
    return (
        <View top={top}>
            <TextInput 
                style={styles.inputStyle}
                placeholder= {text}
                autoCorrect={false}
                secureTextEntry={secureText}
                placeholderTextColor='#808080'
                keyboardType={KeyBoard}
                onChangeText={on_change_taxt}
                value={val}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle:{
        borderWidth: 1,
        borderColor: '#808080',
        backgroundColor: '#dcdcdc',
        padding: 8,
        margin:10,
        width:300,
        alignSelf:'center',
    }
})