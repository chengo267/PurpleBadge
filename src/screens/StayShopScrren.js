import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, BackHandler} from 'react-native';
import CircleButton from '../../components/CircleButton';
import * as firebase from 'firebase';
import "firebase/firestore";

const StayShopScreen = props => {
    const [ userName, setUserName ] = useState('');
    const [ phonNum, setPhonNum ] = useState('');
    const [ userId, setUserId ] = useState('');
    
    const refVisits = firebase.firestore().collection('Visits');
    const refUsersDetails = firebase.firestore().collection('UsersDetails');
   
    const logedInUserDBId= firebase.auth().currentUser.uid;
    
    refUsersDetails.doc(logedInUserDBId).get().then(doc=> {const {name, tel, id} = doc.data();
                                                            setUserName(name);
                                                            setPhonNum(tel);
                                                            setUserId(id);}).catch(error=> console.log('Get Data Error'));;
    

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
                <Text style={styles.textStyle}>את/ה רשאי/ת להיכנס</Text>
                <Text style={styles.textStyle}>ל{props.navigation.getParam('shopName')}</Text>
            </View>
            <View>
                <Text style={styles.textStyle}>ליציאה לחץ "צא"</Text>
            </View>
            <CircleButton text={'צא'} buttonTop={20} 
                on_Press={()=> { var newVisit={
                                    id: userId,
                                    name: userName,
                                    tel: phonNum,
                                    shop: props.navigation.getParam('shopName'),
                                    shopId: props.navigation.getParam('shopId'),
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