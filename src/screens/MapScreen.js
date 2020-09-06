//Map Screen- in this screen shop owner markes his shop location on a map.

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
  
const MapScreen = props => {
    const [cuurLocation, setLocation] = useState(null);
    const [loctionPermission, setLoctionPermission] = useState(null);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    // asking for location permission
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
        navigator.geolocation.getCurrentPosition((position) =>{
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);

        }, (error)=>console.log(error));
    }, []);

      
      if(loctionPermission=='granted'){
        return(
        <View style={styles.viewStyle}>
            <MapView style={styles.mapStyle} showsUserLocation 
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                      }}>
                <MapView.Marker
                    draggable
                    coordinate={{latitude: (latitude ),
                                 longitude: (longitude )}}
                    onDragEnd={(position) =>{
                        setLatitude(position.nativeEvent.coordinate.latitude);
                        setLongitude(position.nativeEvent.coordinate.longitude);}}
                        />
            </MapView>
            <View alignSelf={'center'}>
                <TouchableOpacity onPress={()=>{ var coord={latitude:latitude,
                                                            longitude:longitude};
                                                    props.navigation.navigate('NewShop', coord)}}>
                    <View >
                          <Text style={styles.textStyle}>אישור</Text>
                    </View>
                </TouchableOpacity>
              </View>
        </View>
        );
      }
      else{
        return(
          <View>
            <Text style={styles.textStyle}>Location Permission Not Granted</Text>
          </View>
        );
      }
};

const styles = StyleSheet.create({
    textStyle:{
        alignSelf:'center',
        margin:20,
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