import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import TextField from '../../components/TextField';
import FlatButton from '../../components/FlatButton';

const LoginScreen = props => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <Text style={styles.textStyle}>התחברות</Text>
            <View top={50}>
                <TextField text={'מספר ת"ז'}
                           val={id}
                           on_change_taxt={newId=> setId(newId)}/>
                <View top={20}>
                    <TextField text={'סיסמה'}
                               val={password}
                               on_change_taxt={newPassword=> setPassword(newPassword)}/>
                </View>
                <FlatButton text={'התחבר'} buttonTop={90}
                    on_Press={()=> {props.navigation.navigate('Home')}}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle:{
        flex: 1,
        backgroundColor: '#dda0dd'
    },
    imageStyle:{
        width: 170,
        height: 170,
        left: 108
    },
    textStyle:{
        alignSelf:'center'
    }
});

export default LoginScreen;