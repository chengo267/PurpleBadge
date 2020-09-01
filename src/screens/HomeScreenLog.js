// Home Screen LOg- home screen for login users. In this screen the user selects the shop he wants to enter. 
// He can do this in three ways: by shop name, shop code or scanning QR code.
// Also, the list of shops is sorted by location.
//In addition, shop owner can add his shop to the shops list.

import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, BackHandler} from 'react-native';
import * as firebase from 'firebase';
import { ListItem, SearchBar } from 'react-native-elements';
import "firebase/firestore";
import IconAnt from 'react-native-vector-icons/AntDesign';
import * as geofirestore from 'geofirestore';
import * as Location from 'expo-location';
import geohash from 'ngeohash';

const HomeScreenLog = props => {

    var GeohashDistance = require('geohash-distance');
    const firestore = firebase.firestore();
    const GeoFirestore = geofirestore.initializeApp(firestore);
    const refShopsDetails = GeoFirestore.collection('ShopsDetails');
    const [ userName, setUserName ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ shopList, setshopList ] = useState([]);
    const [ realTimeShopList, setRealTimeShopList ] = useState([]);
    const [location, setLocation] = useState(null);
    const [loctionPermission, setLoctionPermission] = useState(null);
    const refUsersDetails = firebase.firestore().collection('UsersDetails');
    const logedInUserDBId= firebase.auth().currentUser.uid;
    refUsersDetails.doc(logedInUserDBId).get().then(doc=> {const {name} = doc.data();
                                                           setUserName(name);}).catch(error=> console.log('Get Data Error'));;

    // asking for location permission
    LocationPermission = async () => {
        const {status}= await Location.requestPermissionsAsync();
        setLoctionPermission(status);
        if (loctionPermission == 'granted'){ 
            let location = await Location.getCurrentPositionAsync({});
            if(location==null){
                setLocation(location);}
    }};
    
    useEffect(()=>{
        LocationPermission();
        refShopsDetails.onSnapshot(querySnapshot =>{
            const list = [];
            querySnapshot.forEach(doc =>{
                if(doc.id!='collectionSize'){
                    const {shopName, logo, g}=doc.data();
                    list.push({id: doc.id, name: shopName, avatar_url: logo, geohash: g.geohash});
                }
            });
            
            //sort by location
            if(location){
                const locationHash = geohash.encode(location.coords.latitude, location.coords.longitude, 10);
                list.sort((a,b)=>{
                return GeohashDistance.inKm(a.geohash, locationHash) - GeohashDistance.inKm(b.geohash, locationHash);});
            }
            setshopList(list);
            setRealTimeShopList(list);
        });

        const backAction = () => {return true;};
        const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction);
        return () => backHandler.remove();
    }, [location]);

    //search function to the shops list
    searchFilterFunction = (newSearch)=> {
        setSearch(newSearch);
            const newShopList = shopList.filter(item => {
            const itemData = `${item.name} ${item.id}`;
            const textData = newSearch
            return itemData.includes(textData); 
          });
        
          setRealTimeShopList(newShopList);
    }

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." 
                          lightTheme
                          round 
                          onChangeText={(newSearch)=> searchFilterFunction(newSearch)}
                          value={search}/>;
    };
    
    return (
        <View style= {styles.viewStyle}>
            <View flexDirection={'row'}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Auth')}>
                    <View>
                        <Text style= {styles.textLogoutStyle}>התנתק</Text>
                    </View>
                </TouchableOpacity>
                <Image
                    style= {styles.imageStyle}
                    source = {require('../../assets/logo.png')}
                    />
            </View>
            <Text style={styles.textStyle}> שלום {userName}!</Text>
            <Image
                source={require('../../assets/instru.png')}/>
            <View alignSelf={'center'} >
                <TouchableOpacity  onPress={()=>props.navigation.navigate('NewShop')}>
                    <View flexDirection={'row'}>
                        <Text> כדי להוסיף אותו לאפליקציה!</Text>
                        <Text style={styles.underStyle}>לחץ כאן</Text>
                        <Text> בעל בית עסק? </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View flexDirection={'row'} alignSelf={'center'}>
                <View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('QRcodeScanner')}>
                        <View style={styles.buttonStyle} >
                            <IconAnt name={'camera'} size={30} color={'white'} ></IconAnt>
                            <IconAnt name={'qrcode'} size={30} color={'white'}></IconAnt>
                        </View>
                    </TouchableOpacity>
                </View> 
                <View style={styles.viewListStyle}>
                    <FlatList 
                        data={realTimeShopList}
                        renderItem={({ item }) => (
                        <ListItem
                            title={item.name}
                            titleStyle={styles.titleStyle}
                            subtitle={'קוד בית העסק: '+item.id}
                            subtitleStyle={styles.titleStyle}
                            leftAvatar={{ source: { uri: item.avatar_url } }}
                            bottomDivider
                            chevron    
                            onPress={() => {var shop={shopName: item.name, shopId: item.id}
                                            props.navigation.navigate('HealthDeclaration',shop)}}
                        />
                        )}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={renderHeader()}/>
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
        marginTop:0,
        alignSelf:'center',
        left: 50
    },
    viewListStyle:{
        width:270, 
        alignSelf:'flex-end',
        marginTop:20
    },
    textLogoutStyle:{
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20,
        left:20
    },
    textStyle:{
        fontSize:20,
        alignSelf:'flex-end',
        color:'purple',
    },
    buttonStyle:{
        borderRadius: 20,
        paddingVertical: 10, 
        paddingHorizontal: 10,
        width:80,
        alignSelf:'center',
        backgroundColor:'#8b008b',
        marginRight:20,
        marginTop:25,
        flexDirection:'row'
    },
    titleStyle:{
        alignSelf:'flex-end'
    },
    underStyle:{
        textDecorationLine: 'underline'
    }
});

export default HomeScreenLog;