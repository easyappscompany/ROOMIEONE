import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat';

const PhoneVerificationScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const fullPhoneNumber = phoneNumber.startsWith('+52') ? phoneNumber : `+52${phoneNumber}`;
        
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(fullPhoneNumber, recaptchaVerifier.current)
            .then((verificationId) => {
                setVerificationId(verificationId);
                Alert.alert('Éxito', 'El código de verificación ha sido enviado.');
            })
            .catch(error => Alert.alert('Error', error.message));
        setPhoneNumber('');
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
            .then(() => {
                setCode('');
                navigation.navigate('Home');
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <ImageBackground source={require('../assets/imgs/BGLOGIN.jpeg')} style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Verifica tu número de teléfono</Text>
                <View style={styles.phoneInputContainer}>
                    <Text style={styles.countryCode}>+52</Text>
                    <TextInput
                        placeholder='Número de teléfono'
                        onChangeText={setPhoneNumber}
                        keyboardType='phone-pad'
                        autoComplete='tel'
                        style={styles.phoneNumberInput}
                        value={phoneNumber}
                    />
                </View>
                <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                    <Text style={styles.buttonText}>Enviar verificación</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder='Confirma el código'
                    onChangeText={setCode}
                    keyboardType='phone-pad'
                    style={styles.TextInput}
                    value={code}
                />
                <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                    <Text style={styles.buttonText}>Confirmar verificación</Text>
                </TouchableOpacity>

                {/* Nuevo botón para ir directamente a Home */}
                <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Omitir verificación</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default PhoneVerificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '65%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0.6)',
        backgroundColor: 'transparent',
    },
    countryCode: {
        paddingHorizontal: 10,
        fontSize: 17,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    phoneNumberInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        color: '#fff',
        backgroundColor: 'transparent',
    },
    TextInput: {
        height: 40,
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        color: '#fff',
    },
    sendVerification: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    sendCode: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    skipButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
});
