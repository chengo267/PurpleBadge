import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import FlatButton from '../../components/FlatButton';

const HomeScreen = props => {
    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <View top={70}>
                <FlatButton 
                    text='צור משתמש חדש'
                    on_Press={()=>{props.navigation.navigate('CreateUser')}} />
                <FlatButton 
                    text='צור בית עסק חדש' 
                    buttonTop={30}
                    on_Press={()=>{props.navigation.navigate('NewShop')}}/>
                <FlatButton 
                    text='כניסה לבית עסק'
                    buttonTop={60}
                    on_Press={()=>{props.navigation.navigate('Enter')}}/>
                <View  alignSelf={'center'}top={100} left={70}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
                        <View>
                            <Text style= {styles.textLoginStyle}>התחבר</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View alignSelf={'center'}top={67} left={-70}>
                    <TouchableOpacity>
                        <View>
                            <Text style= {styles.textLogoutStyle}>התנתק</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
    textLoginStyle:{
        color: 'green',
        fontWeight: 'bold',
        fontSize: 25
    },
    textLogoutStyle:
    {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 25
    }
});

export default HomeScreen;