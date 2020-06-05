import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';
import * as firebase from 'firebase';
import "firebase/firestore";

const ShopsList = props => {

    const [ shopName, setshopName ] = useState('');
    const [ logo, setLogo ] = useState('');
    const [ shopList, setshopList ] = useState([]);
    const refShopsDetails = firebase.firestore().collection('ShopsDetails');

    useEffect(()=>{
        return refShopsDetails.onSnapshot(querySnapshot =>{
            const list = [];
            querySnapshot.forEach(doc =>{
                const {shopName, logo}=doc.data();
                list.push({id: doc.id, name: shopName, avatar_url: logo});
            });
            setshopList(list);
        });
    }, []);

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            leftAvatar={{ source: { uri: item.avatar_url } }}
            bottomDivider
            chevron     
            onPress={() => {}}
        />
    )
    
    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <FlatList
                keyExtractor={keyExtractor}
                data={shopList}
                renderItem={renderItem}
                width={270}
                alignSelf={'center'}
            />
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
        marginBottom:40
    },
    textStyle:{
        alignSelf:'center'
    }
});

export default ShopsList;