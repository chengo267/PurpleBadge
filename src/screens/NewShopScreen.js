import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import TextField from '../../components/TextField';
import FlatButton from '../../components/FlatButton';
import * as firebase from 'firebase';
import "firebase/firestore";
import {isFullName, isId, isPhoneNum} from "../shared/inputValidaton";
import * as ImagePicker from 'expo-image-picker';
import QRCode from 'qrcode';

const NewShopScreen = props => {
    const [shopName, setShopName] = useState('');
    const [address, setAddress] = useState('');
    const [bosName, setBosName] = useState('');
    const [bosTel, setBosTel] = useState('');
    const [bosId, setBosId] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [image, setImage]= useState('https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png');
    const [collectionSize, setCollectionSize] = useState(0);
    const refShops = firebase.firestore().collection('ShopsDetails');
    const refUsers = firebase.firestore().collection('UsersDetails');
    const refCollectionSizeDoc=refShops.doc('collectionSize');
    const logedInUserDBId= firebase.auth().currentUser.uid;
    const increment=firebase.firestore.FieldValue.increment(1);
  
    refCollectionSizeDoc.get().then(doc=> {const {size} = doc.data();
                                            setCollectionSize(size);});

    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('שגיאה', 'מצטערים, אין לנו גישה לגלריה');
                }
            }
        })();
      }, []);

    pickImage = async () => {
        var result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.viewStyle} behavior={'height'}>
        <ScrollView>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <Text style={styles.textStyle}>יצירת בית עסק חדש</Text>
            <TextField text='שם בית העסק'
                       val={shopName}
                       on_change_taxt={newShopName=> setShopName(newShopName)}/>
            <TextField text='כתובת בית העסק'
                       val={address}
                       on_change_taxt={newAddress=> setAddress(newAddress)}/>
            <TextField text='שם בעל העסק'
                       val={bosName}
                       on_change_taxt={newName=> setBosName(newName)}/>
            <TextField text='מספר טלפון'
                       val={bosTel}
                       on_change_taxt={newTel=> setBosTel(newTel)}/>
            <TextField text='מספר ת"ז'
                       val={bosId}
                       on_change_taxt={newId=> setBosId(newId)}/>
            <View alignSelf={'center'}>
                <Text style={styles.textStyle}>לוגו בית העסק</Text>
                <TouchableOpacity onPress={pickImage} >
                    <View alignSelf={'center'}>
                        <Image style= {styles.logoStyle}
                            source = {{uri:image}}/>
                    </View>
                </TouchableOpacity>
            </View>
            <FlatButton text='אישור'
                        on_Press={()=> 
                        {
                            if(address =='' || (!isId(bosId)) || (!isFullName(bosName)) || (!isPhoneNum(bosTel)) || shopName ==''){
                                    Alert.alert('שגיאה','חלק מהפרטים חסרים או לא מלאים כראוי');
                            }
                            else{
                                    var id = (collectionSize).toString();
                                    var qrDetails={
                                        shopName: shopName,
                                        shopId:id
                                    }

                                    QRCode.toDataURL(qrDetails)
                                    .then(url => {
                                        setQrCode(url);
                                    });

                                    var newShop={
                                        address: address, 
                                        bosId: bosId,
                                        bosName: bosName,
                                        bosTel: bosTel,
                                        shopName: shopName,
                                        logo: image,
                                        qrCode:qrCode
                                    }

                                    refShops.doc(id).set(newShop);
                                    var UserRef = refUsers.doc(logedInUserDBId);
                                    UserRef.update({shops: firebase.firestore.FieldValue.arrayUnion( refShops.doc(id))});
                                    refCollectionSizeDoc.update({size: increment});
                                    props.navigation.navigate('HomeLog');
                            }
                        }}/>
        </ScrollView>
        </KeyboardAvoidingView>
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
    },
    textStyle:{
        fontSize: 15,
        alignSelf:'center'
    },
    logoStyle:{
        width: 150,
        height: 150,
        alignSelf: 'center',
        margin: 10
    },

});

export default NewShopScreen;