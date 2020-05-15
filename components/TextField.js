import React from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';

export default function TextField({text, on_change_taxt, val}) {
    return (
        <View >
            <TextInput 
                style={styles.inputStyle}
                placeholder= {text}
                placeholderTextColor='#808080'
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
        alignSelf:'center'
    }
})