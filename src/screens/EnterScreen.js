import React, {useState} from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Picker} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Checkbox from '../../components/Checkbox';
import FlatButton from '../../components/FlatButton';

const EnterScreen = props => {
    const [isSelectedOne, setSelectionOne] = useState(false);
    const [isSelectedTwo, setSelectionTwo] = useState(false);
    const [isSelectedThree, setSelectionThree] = useState(false);
    const [isSelectedFour, setSelectionFour] = useState(false);

    
    return (
        <View style= {styles.viewStyle}>
            <Image
                style= {styles.imageStyle}
                source = {require('../../assets/logo.png')}
            />
            <Text style={styles.textStyle}>כניסה לבית עסק</Text>
            <View top={20}>
                <TouchableOpacity>
                    <View style={styles.buttonStyle} >
                        <Text style={styles.buttonText}>לסריקת קוד בית העסק</Text>
                        <IconAnt name={'camera'} size={20} color={'white'}></IconAnt>
                    </View>
                </TouchableOpacity>
            </View> 
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
            <Picker style={styles.pickerStyle}>
                <Picker.Item label='לקוח' value="לקוח" />
                <Picker.Item label="עובד" value="עובד" />
                <Picker.Item label="ספק" value="ספק" />
            </Picker>
            <FlatButton text='כניסה' buttonTop={110}
                on_Press={()=> {if(isSelectedOne && isSelectedTwo && isSelectedThree && isSelectedFour)
                                    props.navigation.navigate('Home');
                                else
                                    alert('את/ה לא רשאי/ת להיכנס! הודעה נשלחה לבעל/ת העסק.');}}/>
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
    },
    textCheckStyle:{
        fontSize:20,
        textAlign:'right', 
        left: -80
    },
    pickerStyle:{
        top:60,
        left:-30
    }
});

export default EnterScreen;