import React, {useState} from 'react';
import { StyleSheet, View, Image, Text} from 'react-native';
import TextField from '../../components/TextField';
import FlatButton from '../../components/FlatButton';
import { useScreens } from 'react-native-screens';

const CreateUserScreen = props => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <Text style={styles.textStyle} >יצירת משתמש חדש</Text>
            <TextField text={'שם מלא'}
                       val={name}
                       on_change_taxt={newName=> setName(newName)}/>
            <TextField text={'מספר ת"ז'}
                       val={id}
                       on_change_taxt={newId=> setId(newId)}/>
            <TextField text={'מספר פלאפון'}
                       val={tel}
                       on_change_taxt={newTel=> setTel(newTel)}/>
            <TextField text={'סיסמה'}
                       val={password}
                       on_change_taxt={newPassword=> setPassword(newPassword)}/>
            <FlatButton text={'אישור'} buttonTop={80}
                on_Press={()=> props.navigation.navigate('Home')}/>
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

export default CreateUserScreen;