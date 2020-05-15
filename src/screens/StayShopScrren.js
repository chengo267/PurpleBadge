import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import FlatButton from '../../components/FlatButton';

const StayShopScreen = props => {
    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <View top={50}>
                <Text style={styles.textStyle}>אתה נמצא בבית עסק:</Text>
                <Text style={styles.textStyle}>שם בית העסק</Text>
            </View>
            <View top={170}>
                <Text style={styles.textStyle}>ליציאה לחץ "צא"</Text>
            </View>
            <FlatButton text={'צא'} buttonTop={200}
                on_Press={()=> {props.navigation.navigate('Home')}}/>
            
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
        fontSize:30,
        alignSelf:'center',
        color:'purple'
    }
});

export default StayShopScreen;