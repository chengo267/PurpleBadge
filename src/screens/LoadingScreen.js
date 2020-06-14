import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import * as firebase from 'firebase';
import "firebase/firestore";

  
const LoadingScreen = props => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
              props.navigation.navigate('HomeLog');}
            else{
              props.navigation.navigate('Auth');}
          })
      }, []);

    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size='large' />
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
        left: 108,
        top:100
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
});

export default LoadingScreen;