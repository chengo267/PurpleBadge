import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import FlatButton from '../../components/FlatButton';
import * as firebase from 'firebase';
import "firebase/firestore";
import SearchableDropdown from 'react-native-searchable-dropdown';
import IconAnt from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons';

const logedInUser={
    id: "123456",
    name: "חן",
    password:"password",
    tel: "0505050505"
}

const HomeScreenLog = props => {

    const [ shopName, setshopName ] = useState('');
    const [ shopList, setshopList ] = useState([]);
    const refShopsDetails = firebase.firestore().collection('ShopsDetails');

    useEffect(()=>{
        return refShopsDetails.onSnapshot(querySnapshot =>{
            const list = [];
            querySnapshot.forEach(doc =>{
                const {shopName, logo}=doc.data();
                list.push({id: doc.id, name: shopName});
            });
            setshopList(list);
        });
    }, []);

    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <Image
                source={require('../../assets/instru.png')}/>
            <Text style={styles.textStyle}> שלום {logedInUser.name}!</Text>
            {/* <View top={20}>
                <TouchableOpacity>
                    <View style={styles.buttonStyle} >
                        <Text style={styles.buttonText}>בחירת בית עסק מרשימה</Text>
                        <IconAnt name={'clipboard-list'} size={20} color={'white'}></IconAnt>
                    </View>
                </TouchableOpacity>
            </View>  */}
            <View style={styles.dropdownStyle} >
                <SearchableDropdown items={shopList}
                                    onItemSelect={(item) => {setshopName(item.name)}}       
                                    itemStyle={styles.itemStyle} 
                                    placeholder={'בחר בית עסק'}
                                    placeholderTextColor={'#808080'}
                                    containerStyle={styles.containerStyle}
                                     />
            </View>
            <View>
                <TouchableOpacity>
                    <View style={styles.buttonStyle} marginTop={30}>
                        <Text style={styles.buttonText}>לסריקת קוד בית העסק</Text>
                        <IconAnt name={'camera'} size={20} color={'white'}></IconAnt>
                    </View>
                </TouchableOpacity>
            </View> 
            <FlatButton 
                    text='אישור '
                    buttonTop={40}
                    on_Press={()=>{var shop={shopName: shopName}
                                   props.navigation.navigate('Enter',shop)}}/>
            <View alignSelf={'center'} left={-140} top={90}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('HomeUnlog')}>
                        <View>
                        <Text style= {styles.textLogoutStyle}>התנתק</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View alignSelf={'center'} top={100} >
                <TouchableOpacity  onPress={()=>props.navigation.navigate('NewShop')}>
                        <View>
                        <Text>בעל בית עסק? לחץ כדי להוסיף אותו לאפליקציה!</Text>
                    </View>
                </TouchableOpacity>
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
    textLogoutStyle:{
        color: 'red',
        fontWeight: 'bold',
        fontSize: 25
    },
    textStyle:{
        fontSize:25,
        alignSelf:'flex-end',
        color:'purple',
        marginTop:30,
    },
    dropdownStyle:{
        width:250,
        alignSelf:'center',
    },
    itemStyle:{
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
    },
    containerStyle:{
        padding: 5, 
        backgroundColor:'#dcdcdc', 
        marginTop:15 
    },
    buttonStyle:{
        borderRadius: 20,
        paddingVertical: 10, 
        paddingHorizontal: 10,
        width:200,
        alignSelf:'center',
        backgroundColor:'#8b008b',
        flexDirection:'row'
    },
    buttonText:{
        color: 'white',
        fontSize: 16, 
        textAlign: 'center'
    }
});

export default HomeScreenLog;