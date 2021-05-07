import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BookTransactionScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }

    getCameraPermission = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === 'granted',
            buttonState: 'clicked'
        })
    }

    handleBarcodeScanned = async({type, data}) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render(){

        const hasCameraPermissions = this.state.hasCameraPermissions

        const scanned = this.state.scanned

        const buttonState = this.state.buttonState

        if (buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned = {scanned?undefined:this.handleBarcodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState === 'normal'){

        return(
            <View style={styles.container}>

                <Text styles={styles.displaytext}>
                    {hasCameraPermissions === true ? 
                    this.state.scannedData : "Request Camera Permission"}

                </Text>

                <TouchableOpacity
                    style={styles.qrcode}
                    onPress={this.getCameraPermission}
                >
                    <Text style={styles.buttonText}>Scan QR Code</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

}

const styles = StyleSheet.create({
    qrcode: {
        borderWeight: 5,
        borderRadius: 50,
        backgroundColour: 'lightblue',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    displaytext: {
        fontSize: 30,
        textDecorationLine: 'underline'
    }
})