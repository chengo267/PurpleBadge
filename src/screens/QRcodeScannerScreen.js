import React, {useState, useEffect} from 'react';
import { Dimensions, LayoutAnimation, Text, View, StyleSheet } from 'react-native';
import {BarCodeScanner} from 'expo';
import * as Permissions from 'expo-permissions';

const QRcodeScannerScreen = () => {

    const [ hasCameraPermission, setCameraPermission ] = useState(null);
    const [ lastScannedUrl, setLastScannedUrl ] = useState(null);

    _requestCameraPermission = async () => {
        //const { status } = await Permissions.askAsync(Permissions.CAMERA);
        setCameraPermission(await Permissions.askAsync(Permissions.CAMERA));
    };

    useEffect(() => {
        _requestCameraPermission();
    }, []);

    handleBarCodeRead = result => {
        if (result.data !== state.lastScannedUrl) {
          LayoutAnimation.spring();
          setLastScannedUrl(result.data);

        }
    };

    return (
        <View style={styles.container}>
            {hasCameraPermission == null
            ? <Text>Requesting for camera permission</Text>
            : hasCameraPermission == false
                ? <Text style={{ color: '#fff' }}>
                    Camera permission is not granted
                  </Text>
                : <View>
                    <BarCodeScanner
                        onBarCodeRead={handleBarCodeRead}
                        style={{
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').width,
                        }}
                    />
                  </View>
                }
        </View>
      );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      },
});

export default QRcodeScannerScreen;