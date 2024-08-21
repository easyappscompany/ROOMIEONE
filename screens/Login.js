import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '680332616069-dnjd4keulv16dbo7l6r0s1nkfq967ae7.apps.googleusercontent.com',
    iosClientId: 'TU_IOS_CLIENT_ID',
    androidClientId: '680332616069-0u8dfu7imc0abmj77j0ftvqsq8gk0kkv.apps.googleusercontent.com',
    webClientId: '680332616069-3tl0kanaf4cq6f2lf8mhkp68ci8npa87.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Aquí puedes usar el token de acceso para autenticar al usuario en tu backend o Firebase
      console.log('Auth token:', authentication.accessToken);
       navigation.navigate('Home');
    }
  }, [response]);

  return (
    <ImageBackground 
      source={require('../assets/imgs/BGLOGIN.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Selector de idioma */}
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>Español (ES)</Text>
        </TouchableOpacity>

        {/* Logo y texto de bienvenida */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/imgs/logoroomieone.jpeg')} style={styles.logo} />
          <Text style={styles.subtitle}>Adapta tu hogar</Text>
          <Text style={styles.subtitle}> adapta tu vida.</Text>
        </View>

        {/* Botón de continuar con número de teléfono */}
        <TouchableOpacity 
          style={styles.phoneButton}
          onPress={() => navigation.navigate('PhoneVerification')}
        >
          <Ionicons name="call" size={20} color="white" />
          <Text style={styles.phoneButtonText}>Continuar con número de teléfono</Text>
        </TouchableOpacity>

        {/* Botón de inicio de sesión con Google */}
        <TouchableOpacity 
          style={styles.googleButton}
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <Ionicons name="logo-google" size={20} color="white" />
          <Text style={styles.googleButtonText}>Continuar con Google</Text>
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
  phoneButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
    padding: 15,
    borderRadius: 10,
  },
  phoneButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#db4437',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  googleButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
