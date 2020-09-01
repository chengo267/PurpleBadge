// Health Declaration Screen - The user should enter a health declaration and their role when entering the shop. 
//In addition, in order to be allowed to enter the shop, the user must be able to check all the four conditions.

import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, Alert} from 'react-native';
import Checkbox from '../../components/Checkbox';
import FlatButton from '../../components/FlatButton';
import { Dropdown } from 'react-native-material-dropdown';
import "firebase/firestore";


const HealthDeclarationScreen = props => {

    const [role, setRole] = useState('');
    const [isSelectedOne, setSelectionOne] = useState(false);
    const [isSelectedTwo, setSelectionTwo] = useState(false);
    const [isSelectedThree, setSelectionThree] = useState(false);
    const [isSelectedFour, setSelectionFour] = useState(false);
   
    const roleList=[{value: 'לקוח'}, {value: 'ספק'}, {value: 'עובד'}];
   
    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <Text style={styles.textStyle}>הצהרת בריאות</Text>
            <View top={50}>
                <Checkbox text={'לא משתעל (באופן לא כרוני)'}
                          val={isSelectedOne}
                          on_val_change={setSelectionOne}  />
                <Checkbox text={'אין לי חום מעל 38 מעלות'}
                          val={isSelectedTwo}
                          on_val_change={setSelectionTwo}  />
                <Checkbox text={'לא היה לי חום מעל 38 מעלות '}
                          val={isSelectedThree}
                          on_val_change={setSelectionThree}  />
                <Text style={styles.textCheckStyle}>בשבוע האחרון</Text>
                <Checkbox text={'לא הייתי במגע עם חולה קורונה'}
                          val={isSelectedFour}
                          on_val_change={setSelectionFour}  />
                <Text style={styles.textCheckStyle}>בשבועיים האחרונים</Text>
            </View>
            <View style={styles.dropdownStyle} top={50}>
                <Dropdown label='בחר תפקיד' 
                          data={roleList}
                          value={role}
                          onChangeText={newRole=> setRole(newRole)}
                          containerStyle={styles.dropdownRoleStyle}
                           />
            </View>
            <FlatButton text='כניסה' buttonTop={80} 
                on_Press={()=> {if(isSelectedOne && isSelectedTwo && isSelectedThree && isSelectedFour && (role!=''))
                                    {
                                        var newVisit={enter: new Date().toLocaleString(),
                                                      shopName: props.navigation.getParam('shopName'),
                                                      shopId: props.navigation.getParam('shopId'),
                                                      role: role  }
                                        props.navigation.navigate('Stay', newVisit);
                                    }
                                else if(role=='')
                                    Alert.alert('שגיאה','חלק מהפרטים לא מלאים');
                                else
                                    Alert.alert('הוראה','את/ה לא רשאי/ת להיכנס!');}}/>
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
    textCheckStyle:{
        fontSize:20,
        textAlign:'right',
        left: -80
    },
    dropdownRoleStyle:{
        padding: 5, 
        width:110, 
        left:170, 
        height:70}
});

export default HealthDeclarationScreen;