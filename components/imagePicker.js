import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { SimpleLineIcons } from '@expo/vector-icons';


const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if (result.status != 'granted') {
            Alert.alert(
                'Insufficient Permissions',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    }
    const takeImageHandler = async () => {
        const hasPermissions = await verifyPermissions()
        if (!hasPermissions) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            // aspect:[16,9],
        });

        setPickedImage(image.uri);
        props.onImageTaken(image.uri)
    };
    return (
        <View>
            <View style={styles.imagePickerContainer }>
                <View style={styles.imagePicker}>
                    <SimpleLineIcons name="camera" size={35} color="green" onPress={takeImageHandler} />
                    <Text>Add Bills</Text>
                </View>
            </View>

            <View style={styles.imagePreview}>
                <Image style={styles.image} source={{ uri: pickedImage }} />

            </View>


        </View>
    )
};

const styles = StyleSheet.create({
    imagePickerContainer: {
        justifyContent: 'center',
        display:'flex',
        alignItems: 'center',
        width:'100%',
        // borderWidth: 1,
        borderColor: '#ccc',
    },
    imagePicker:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal:10,
        paddingVertical:5,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImgPicker;