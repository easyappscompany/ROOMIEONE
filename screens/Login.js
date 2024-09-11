import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../config';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '680332616069-dnjd4keulv16dbo7l6r0s1nkfq967ae7.apps.googleusercontent.com',
    iosClientId: 'TU_IOS_CLIENT_ID',
    androidClientId: '680332616069-0u8dfu7imc0abmj77j0ftvqsq8gk0kkv.apps.googleusercontent.com',
    webClientId: '680332616069-3tl0kanaf4cq6f2lf8mhkp68ci8npa87.apps.googleusercontent.com',
  });

  // Verificar el estado de autenticación al iniciar la app
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Usuario autenticado, redirigir a Inicio
        navigation.navigate('Home');
      } else {
        // Usuario no autenticado, mantener en Login
        console.log('No hay usuario autenticado');
      }
    });

    return () => unsubscribe(); // Limpieza del listener
  }, []);

  useEffect(() => {
    // Registrar el usuario en Firestore si es necesario
    const registerUserInFirestore = async (userInfo) => {
      try {
        const userRef = firebase.firestore().collection('users').doc(userInfo.email);
        const userDoc = await userRef.get();
    
        if (!userDoc.exists) {
          await userRef.set({
            name: userInfo.name,
            email: userInfo.email,
            photo: userInfo.picture,
            additionalData: {} 
          });
        }
      } catch (error) {
        console.error('Error al registrar usuario en Firestore:', error);
      }
    };

    const signInWithFirebase = async (idToken, accessToken) => {
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(idToken, accessToken);

      try {
        await signInWithCredential(auth, credential);
        console.log('Usuario registrado en Firebase Authentication');
      } catch (error) {
        console.error('Error al iniciar sesión en Firebase Authentication:', error);
      }
    };

    const fetchUserInfo = async (accessToken) => {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const userInfo = await response.json();
    
        await registerUserInFirestore(userInfo);
        await AsyncStorage.setItem('userName', userInfo.name);
        await AsyncStorage.setItem('userPhoto', userInfo.picture);
        await AsyncStorage.setItem('userEmail', userInfo.email); 
        await AsyncStorage.setItem('userToken', accessToken);
    
        navigation.navigate('Home');
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (response?.type === 'success') {
      const { authentication, params } = response;
      
      signInWithFirebase(params.id_token, authentication.accessToken);
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  return (
    <ImageBackground 
      source={require('../assets/imgs/BGLOGIN.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>Español (ES)</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={require('../assets/imgs/logoroomieone.jpeg')} style={styles.logo} />
          <Text style={styles.subtitle}>Adapta tu hogar</Text>
          <Text style={styles.subtitle}> adapta tu vida.</Text>
        </View>

        <TouchableOpacity 
          style={styles.googleButton}
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <Image source={require('../assets/imgs/google.png')} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Inicia sesión con Google.</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 220,
  },
  languageButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#00000080',
    borderRadius: 5,
  },
  languageText: {
    color: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004278',
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 10,
  },
  googleIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#3c4043',
    fontSize: 16,
  },
});

export default LoginScreen;