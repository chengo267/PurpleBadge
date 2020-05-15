import React, {useState} from 'react';
import { StyleSheet, View, Image, Text} from 'react-native';
import TextField from '../../components/TextField';
import Checkbox from '../../components/Checkbox';
import FlatButton from '../../components/FlatButton';

const NewShopScreen = props => {
    const [shopName, setShopName] = useState('');
    const [address, setAddress] = useState('');
    const [workerNum, setWorkerNum] = useState(0);
    const [bosName, setBosName] = useState('');
    const [bosTel, setBosTel] = useState('');
    const [bosId, setBosId] = useState('');
    const [isSelectedShop, setSelectionShop] = useState(false);
    const [isSelectedFactory, setSelectionFactory] = useState(false);
    
    return (
        <View style= {styles.viewStyle}>
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
            <TextField text='מספר העובדים'
                       val={workerNum}
                       on_change_taxt={newNum=> setWorkerNum(newNum)}/>
            <Checkbox text='חנות מסחר' leftText={120}
                      val={isSelectedShop}
                      on_val_change={setSelectionShop}  />
            <Checkbox text='מפעל תעשייתי'
                      val={isSelectedFactory}
                      on_val_change={setSelectionFactory}   />
            <TextField text='שם בעל העסק'
                       val={bosName}
                       on_change_taxt={newName=> setBosName(newName)}/>
            <TextField text='מספר טלפון'
                       val={bosTel}
                       on_change_taxt={newTel=> setBosTel(newTel)}/>
            <TextField text='מספר ת"ז'
                       val={bosId}
                       on_change_taxt={newId=> setBosId(newId)}/>
            <FlatButton text='אישור'
                        on_Press={()=> props.navigation.navigate('Home')}/>

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
    }
});

export default NewShopScreen;