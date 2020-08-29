import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import TextInp from '../../components/TextInp';
import FlatButton from '../../components/FlatButton';
import * as firebase from 'firebase';
import "firebase/firestore";
import {isFullName, isId, isValidPassword} from "../shared/inputValidaton";
import IconAnt from 'react-native-vector-icons/AntDesign';

const CreateUserScreen = props => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
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
            <TextInp text={'סיסמה'}
                       val={password}
                       on_change_taxt={newPassword=> setPassword(newPassword)}/>
            <View top={-40} left={15} alignSelf={'baseline'}>
                <TouchableOpacity onPress={()=> Alert.alert('הוראה','הסיסמה צריכה להיות מורכבת מלפחות 8 תווים של אותיות אנגליות ומספרים')}>
                    <View >
                        <IconAnt name={'exclamationcircleo'} size={20}></IconAnt>
                    </View>
                </TouchableOpacity>
            </View> 
            <FlatButton text={'אישור'} buttonTop={80} 
                on_Press={()=> {
                    if((!isFullName(name)) || (!isId(id)) || (!isValidPassword(password))){
                        Alert.alert('שגיאה', 'חלק מהפרטים חסרים או לא מלאים כראוי');
                    }
                    else{
                            var newUser={
                                name: name, 
                                id: id,
                                tel: props.navigation.getParam('phoneNun'),
                                password: password,
                                shops: []}
                            
                            var userDBid= props.navigation.getParam('userId')
                            refUsers.doc(userDBid).set(newUser);
                            props.navigation.navigate('HomeLog');}}}/>
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