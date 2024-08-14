import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; // Asegúrate de estar usando el hook de navegación

const LoginScreen = () => {
  const navigation = useNavigation(); // Hook de navegación

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
          onPress={() => navigation.navigate('PhoneVerification')} // Navega a la pantalla de verificación
        >
          <Ionicons name="call" size={20} color="white" />
          <Text style={styles.phoneButtonText}>Continuar con número de teléfono</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen para que cubra toda la pantalla
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 220
  },
  languageButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#00000080', // Fondo semi-transparente
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0057a0',
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
    backgroundColor: '#00000080', // Fondo semi-transparente
    padding: 15,
    borderRadius: 10,
  },
  phoneButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
