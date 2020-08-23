import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import TextInp from '../../components/TextInp';
import FlatButton from '../../components/FlatButton';
import * as firebase from 'firebase';
import "firebase/firestore";

const AuthScreen = props => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [userObj, setUserObj] = useState(null);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    if(userObj){
      if(userObj.additionalUserInfo.isNewUser==true){
        const userDetails={userId: userObj.user.uid, 
                          phoneNun: userObj.user.phoneNumber}
        props.navigation.navigate('CreateUser', userDetails);
      }
      else{
        props.navigation.navigate('HomeLog');
      }
    }
  }, [userObj]);

  const sendVerification = () => {
    const phone= phoneNumber.slice(1);
    const israelCode = '+972';
    const legalPhone = israelCode.concat(phone);

    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(legalPhone, recaptchaVerifier.current)
      .then(setVerificationId).catch(error=> console.log('Auth Error')); 
  };
  
  const confirmCode = () => { 
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result)=>{ setUserObj(result)}).catch(error=> console.log('Auth Error'));
  };

  
  const phoneOrCode = () => {
    if(verificationId==null)
    {
      return (
        <View>
          <TextInp text={'מספר טלפון'}
                    val={phoneNumber}
                    on_change_taxt={newNum=> {setPhoneNumber(newNum)}}
                    top={100}/>
          <FlatButton text={'שלח'} buttonTop={120} 
                        on_Press={sendVerification}/>
        </View>
      );
    }
    else{
      return(
        <View>
          <TextInp text={'קוד אימות'}
                    val={code}
                    on_change_taxt={code=> setCode(code)}
                    top={100}/>
          <FlatButton text={'שלח'} buttonTop={120} 
                    on_Press={confirmCode}/>
        </View>
      );
    }
  }

  return (
    <View style= {styles.viewStyle}>
      <Image
        style= {styles.imageStyle}
        source = {require('../../assets/logo.png')}/>
      <Image
        source={require('../../assets/instru.png')}/>
      <Text style={styles.textStyle}>התחברות</Text>
      {phoneOrCode()}
      <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app().options}
      />
    </View>);
}

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
    alignSelf:'center',
    top:30
  }
});

export default AuthScreen;
