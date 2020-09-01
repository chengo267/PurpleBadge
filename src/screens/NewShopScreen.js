import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import TextInp from '../../components/TextInp';
import FlatButton from '../../components/FlatButton';
import IconAnt from 'react-native-vector-icons/AntDesign';
import * as firebase from 'firebase';
import "firebase/firestore";
import {isFullName, isId, isPhoneNum, IsValidEmail, isValidPassword} from "../shared/inputValidaton";
import * as ImagePicker from 'expo-image-picker';
import * as geofirestore from 'geofirestore';

const NewShopScreen = props => {
    // Create a Firestore reference
    const firestore = firebase.firestore();
    
    // Create a GeoFirestore reference
    const GeoFirestore = geofirestore.initializeApp(firestore);
    
    
    // Create a GeoCollection reference
    const refShopsGeo = GeoFirestore.collection('ShopsDetails');
    const [shopName, setShopName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [bosName, setBosName] = useState('');
    const [bosTel, setBosTel] = useState('');
    const [bosId, setBosId] = useState('');
    const [image, setImage]= useState('https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png');
    const [collectionSize, setCollectionSize] = useState(0);
    const refShops = firebase.firestore().collection('ShopsDetails');
    const refUsers = firebase.firestore().collection('UsersDetails');
    const refCollectionSizeDoc=refShops.doc('collectionSize');
    const logedInUserDBId= firebase.auth().currentUser.uid;
    const increment=firebase.firestore.FieldValue.increment(1);
  


    refCollectionSizeDoc.get().then(doc=> {const {size} = doc.data();
                                            setCollectionSize(size);}).catch(error=> console.log('Get Data Error'));;

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
            <TextInp text='שם בית העסק'
                       val={shopName}
                       on_change_taxt={newShopName=> setShopName(newShopName)}/>
            <View >
                <TouchableOpacity onPress={()=> props.navigation.navigate('Map')}>
                    <View  flexDirection='row-reverse' alignSelf={'center'} >
                        <Text>סמן את כתובת בית העסק   </Text>
                        <IconAnt name={'enviroment'} size={20}/>
                    </View>
                </TouchableOpacity>
            </View> 
            <TextInp text='שם בעל העסק'
                       val={bosName}
                       on_change_taxt={newName=> setBosName(newName)}/>
            <TextInp text='מספר טלפון'
                       val={bosTel}
                       on_change_taxt={newTel=> setBosTel(newTel)}/>
            <TextInp text='מספר ת"ז'
                       val={bosId}
                       on_change_taxt={newId=> setBosId(newId)}/>
            <TextInp text='כתובת מייל'
                       val={email}
                       on_change_taxt={newId=> setEmail(newId)}/>
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
                            if((!isId(bosId)) || (!isFullName(bosName)) || (!isPhoneNum(bosTel)) || (!isValidPassword(password)) || (!IsValidEmail(email)) || shopName ==''){
                                    Alert.alert('שגיאה','חלק מהפרטים חסרים או לא מלאים כראוי');
                            }
                            else{
                                    var id = (collectionSize).toString();
                                    var qrDetails={
                                        shopName: shopName,
                                        shopId:id
                                    }

                                    var newShop={
                                        coordinates: new firebase.firestore.GeoPoint(props.navigation.getParam('latitude'), props.navigation.getParam('longitude')),
                                        bosId: bosId,
                                        bosName: bosName,
                                        bosTel: bosTel,
                                        shopName: shopName,
                                        email: email,
                                        password: password,
                                        logo: image,
                                    }

                                    refShopsGeo.doc(id).set(newShop);
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