import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import FlatButton from '../../components/FlatButton';

const logedInUser={
    id: "123456",
    name: "חן",
    password:"password",
    tel: "0505050505"
}

const HomeScreenUnLog = props => {
    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <Image
                source={require('../../assets/instru.png')}/>
            <View marginTop={70}>
                <FlatButton 
                        text='צור משתמש חדש'
                        on_Press={()=>{props.navigation.navigate('CreateUser')}} />
            </View>
            <View marginTop={30}>
                <FlatButton 
                        text='התחבר'
                        on_Press={()=>{props.navigation.navigate('Login')}} />
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
    textLogoutStyle:{
        color: 'red',
        fontWeight: 'bold',
        fontSize: 25
    },
    textStyle:{
        fontSize:30,
        alignSelf:'flex-end',
        color:'purple',
        marginTop:30
    }
});

export default HomeScreenUnLog;