import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';
import "firebase/firestore";

  
const MyShopsScreen = props => {

    const [ shopsList, setshopsList ] = useState([]);
    //const [ indexesShopsList, setIndexesShopsList ] = useState([]);
    const [ search, setSearch ] = useState('');
    const refUsersDetails = firebase.firestore().collection('UsersDetails');
    const logedInUserDBId= '2Y4Iqr3STLTcRQJeKhYoOQ1xjmg1';
    //const logedInUserDBId=firebase.auth().currentUser.uid;
    refUsersDetails.doc(logedInUserDBId).get().then(doc=> {const {shops} = doc.data();
                                                                            console.log(shops.ShopsDetails);

                                                           }).catch(error=> console.log(error));;
    


    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            
          })
      }, []);

    renderHeader = () => {
        return <SearchBar placeholder="חיפוש" 
                          lightTheme
                          round 
                          onChangeText={(newSearch)=> searchFilterFunction(newSearch)}
                          value={search}/>;
    };

    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <Text style={styles.textStyle}>החנויות שלי</Text>
            <View style={styles.viewListStyle}>
                    <FlatList 
                        data={shopsList}
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
                                            // props.navigation.navigate('HealthDeclaration',shop)
                                        }}
                        />
                        )}
                        keyExtractor={item => item.id}
                        scrollEnabled
                        ListHeaderComponent={renderHeader()}/>
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
        left: 108
    },
    textStyle:{
        fontSize: 15,
        alignSelf:'center'
    },
    viewListStyle:{
        width:300, 
        alignSelf:'center',
        marginTop:20
    },
    
});

export default MyShopsScreen;