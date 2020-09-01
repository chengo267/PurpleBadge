//Create User Screen- If a new user wants sign up the app, he need to enter a full name and ID.

import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import TextInp from '../../components/TextInp';
import FlatButton from '../../components/FlatButton';
import * as firebase from 'firebase';
import "firebase/firestore";
import {isFullName, isId} from "../shared/inputValidaton";

const CreateUserScreen = props => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const refUsers = firebase.firestore().collection('UsersDetails');

    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <Text style={styles.textStyle} >יצירת משתמש חדש</Text>
            <TextInp text={'שם מלא'}
                       val={name}
                       on_change_taxt={newName=> setName(newName)}/>
            <TextInp text={'מספר ת"ז'}
                       val={id}
                       on_change_taxt={newId=> setId(newId)}/>
            <FlatButton text={'אישור'} buttonTop={80} 
                on_Press={()=> {
                    if((!isFullName(name)) || (!isId(id))){
                        Alert.alert('שגיאה', 'חלק מהפרטים חסרים או לא מלאים כראוי');
                    }
                    else{
                            var newUser={
                                name: name, 
                                id: id,
                                tel: props.navigation.getParam('phoneNun'),
                                shops: []}
                            
                            var userDBid= props.navigation.getParam('userId')
                            refUsers.doc(userDBid).set(newUser);
                            props.navigation.navigate('HomeLog');
                    }}}/>
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