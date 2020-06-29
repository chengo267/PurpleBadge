import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, BackHandler} from 'react-native';
import * as firebase from 'firebase';
import { ListItem, SearchBar } from 'react-native-elements';
import "firebase/firestore";
import IconAnt from 'react-native-vector-icons/AntDesign';

const HomeScreenLog = props => {

    const [ userName, setUserName ] = useState('');
    const [ search, setSearch ] = useState('');
    const [ shopList, setshopList ] = useState([]);
    const [ realTimeShopList, setRealTimeShopList ] = useState([]);
    const refShopsDetails = firebase.firestore().collection('ShopsDetails');
    const refUsersDetails = firebase.firestore().collection('UsersDetails');
    const logedInUserDBId= firebase.auth().currentUser.uid;
    
    refUsersDetails.doc(logedInUserDBId).get().then(doc=> {const {name} = doc.data();
                                                           setUserName(name);}).catch(error=> console.log('Get Data Error'));;

    useEffect(()=>{
        refShopsDetails.onSnapshot(querySnapshot =>{
            const list = [];
            querySnapshot.forEach(doc =>{
                if(doc.id!='collectionSize'){
                    const {shopName, logo}=doc.data();
                    list.push({id: doc.id, name: shopName, avatar_url: logo});
                }
            });
            setshopList(list);
            setRealTimeShopList(list);
        });

        const backAction = () => {return true;};
        const backHandler = BackHandler.addEventListener("hardwareBackPress",backAction);
        return () => backHandler.remove();
    }, []);

    
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
                    <View>
                        <Text>בעל בית עסק? לחץ כדי להוסיף אותו לאפליקציה!</Text>
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
                            subtitle={'קוד בית העסק: '+item.id}
                            leftAvatar={{ source: { uri: item.avatar_url } }}
                            bottomDivider
                            chevron    
                            onPress={() => {var shop={shopName: item.name, shopId: item.id}
                                            props.navigation.navigate('Enter',shop)}}
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
        width:250, 
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
});

export default HomeScreenLog;