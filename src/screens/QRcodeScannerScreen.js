import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

const QRcodeScannerScreen = props => {

    const [ hasCameraPermission, setCameraPermission ] = useState(null);
    const [ data, setData ] = useState(null);

    requestCameraPermission = async () => {
        setCameraPermission(await Permissions.askAsync(Permissions.CAMERA));
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
        Alert.alert('ברקוד לא חוקי', 'שגיאה');
      }
      else{
        var shop={shopName: name, shopId: id};
        props.navigation.navigate('Enter',shop)
      }
    };

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

};

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#000',
      },
      textStyle:{
        fontSize:20
      }
});

export default QRcodeScannerScreen;