import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, BackHandler} from 'react-native';
import CircleButton from '../../components/CircleButton';
import * as firebase from 'firebase';
import "firebase/firestore";

const logedInUser={
    id: "123456",
    name: "chen",
    password:"password",
    tel: "0505050505"
}
  
const StayShopScreen = props => {
    const refVisits = firebase.firestore().collection('Visits');

    useEffect(() => {
        const backAction = () => {return true;};
        const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction);
        return () => backHandler.remove();
      }, []);

    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <View top={10}>
                <Text style={styles.textStyle}>אתה רשאי להיכנס</Text>
                <Text style={styles.textStyle}>ל{props.navigation.getParam('shopName')}</Text>
                <Text style={styles.textStyle}>LOGO</Text>
                <Image style= {styles.logoStyle}
                        source = {{uri:props.navigation.getParam('logo')}}
                />
            </View>
            <View>
                <Text style={styles.textStyle}>ליציאה לחץ "צא"</Text>
            </View>
            <CircleButton text={'צא'} buttonTop={20} 
                on_Press={()=> { var newVisit={
                                    id: logedInUser.id,
                                    name: logedInUser.name,
                                    tel: logedInUser.tel,
                                    shop: props.navigation.getParam('shopName'),
                                    role: props.navigation.getParam('role'),
                                    enterTime: props.navigation.getParam('enter'),
                                    exitTime: new Date().toLocaleString()
                                };
                                refVisits.add(newVisit);
                                props.navigation.navigate('HomeLog')}}/>
            
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
        left: 108,
        top:20
    },
    textStyle:{
        fontSize:30,
        alignSelf:'center',
        color:'purple',
    },
    logoStyle:{
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
});

export default StayShopScreen;