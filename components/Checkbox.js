import React, {useState} from 'react';
import { StyleSheet, View, Text, CheckBox} from 'react-native';

export default function Checkbox({text, val, on_val_change}) {

    return (
        <View flexDirection='row-reverse'  left={-40} >
            <CheckBox style={styles.checkboxStyle}
                      value={val}
                      onValueChange={on_val_change} />
            <Text style={styles.checkboxTextStyle} > {text} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxStyle:{
        alignSelf:'flex-end'
    },
    checkboxTextStyle:{
        fontSize:20,
        textAlign:'right'
    }
})