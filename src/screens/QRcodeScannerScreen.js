import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

const QRcodeScannerScreen = props => {

    const [ cameraPermission, setCameraPermission ] = useState(null);
    const [ data, setData ] = useState(null);

    requestCameraPermission = async () => {
      const {status}=await Permissions.askAsync(Permissions.CAMERA);
      setCameraPermission(status);
    };

    useEffect(() => {
        requestCameraPermission();
    }, []);

    handleBarCodeRead = ({ type, data }) => {
      setData(data);
      var index = data.search(" ");
      var id = data.slice(0,index);
      var name = data.slice(index+1);
      if((index==-1)||/^[0-9]/.test(id)){
        Alert.alert('שגיאה', 'ברקוד לא חוקי');
      }
      else{
        var shop={shopName: name, shopId: id};
        props.navigation.navigate('Enter',shop)
      }
    };

    if(cameraPermission=='granted'){
      return (
          <View>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeRead}
              style={{
              height: 630,
              width: 400,}}
            />
            <View alignSelf={'center'}>
                  <TouchableOpacity onPress={()=>props.navigation.navigate('HomeLog')}>
                      <View >
                          <Text style={styles.textStyle}>Cancel</Text>
                      </View>
                  </TouchableOpacity>
              </View>
          </View>
        );
    }
    else{
      return (
        <View>
          <Text style={styles.textStyle} alignSelf={'center'}>Camera Permission Not Granted</Text>
            <View alignSelf={'center'}>
                  <TouchableOpacity onPress={()=>props.navigation.navigate('HomeLog')}>
                      <View >
                          <Text style={styles.textStyle}>Cancel</Text>
                      </View>
                  </TouchableOpacity>
            </View>
        </View>
      );
    }
    
};

const styles = StyleSheet.create({
      textStyle:{
        fontSize:20
      }
});

export default QRcodeScannerScreen;