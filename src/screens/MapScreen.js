import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import * as Location from 'expo-location';
import {MapView} from 'react-native-maps';
  
const MapScreen = props => {
    const [location, setLocation] = useState(null);
    const [loctionPermission, setLoctionPermission] = useState(null);

    LocationPermission = async () => {
        const {status}= await Location.requestPermissionsAsync();
        setLoctionPermission(status);
        if (status == 'granted'){
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }
    };
  
      useEffect(() => {
          LocationPermission();
      }, []);

      if(loctionPermission=='granted'){
        return (
        <View style={styles.viewStyle}>
            <MapView style={styles.mapStyle} showsUserLocation/>
        </View>
        );
      }
      else{
        return (
          <View>
            <Text style={styles.textStyle}>Location Permission Not Granted</Text>
          </View>
        );
      }
};

const styles = StyleSheet.create({
    textStyle:{
        alignSelf:'center',
        margin:30,
        top:50,
        fontSize:20
    },
    viewStyle: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: 400,
        height: 650,
        top:-35
    },
});

export default MapScreen;