import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native'; // Importa CommonActions

const Step2Location = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const handleCancel = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Paso 2: Ubicación</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>

      <Text style={styles.label}>Ciudad *</Text>
      <TextInput
        placeholder="Ej. Cordoba"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Dirección *</Text>
      <TextInput
        placeholder="Ej. Calle Norte 5"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Escalera, piso y puerta</Text>
      <TextInput
        placeholder="Ej.: 2º 3º"
        style={[styles.input, styles.optionalInput]}
        value={houseNumber}
        onChangeText={setHouseNumber}
      />

      <Text style={styles.infoText}>
        No se publicará la dirección completa. Solo la compartiremos con el arrendatario cuando confirmes una visita.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    padding: 5,
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 2.5,
    marginBottom: 20,
  },
  progressBar: {
    width: '40%', // Esto indica el porcentaje del progreso, ajusta según el paso actual
    height: '100%',
    backgroundColor: '#00c899',
    borderRadius: 2.5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    marginBottom: 20,
    paddingVertical: 5,
    fontSize: 16,
  },
  optionalInput: {
    color: '#aaaaaa',
  },
  infoText: {
    fontSize: 14,
    color: '#4a4a4a',
    backgroundColor: '#f1f9ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
});

export default Step2Location;
