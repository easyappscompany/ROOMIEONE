import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para el ícono de la equis
import { CommonActions } from '@react-navigation/native'; // Importar CommonActions

const Step4Availability = () => {
  const navigation = useNavigation(); // Inicializar navegación
  const [availabilityDate, setAvailabilityDate] = useState('');
  const [minStay, setMinStay] = useState('');
  const [maxStay, setMaxStay] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [includesExpenses, setIncludesExpenses] = useState(false);

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
        <Text style={styles.title}>Paso 4: Disponibilidad y Precio</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      
      <Text>Disponibilidad:</Text>
      <TextInput
        placeholder="Fecha de disponibilidad (YYYY-MM-DD)"
        style={styles.input}
        value={availabilityDate}
        onChangeText={setAvailabilityDate}
      />

      <TextInput
        placeholder="Estancia mínima (meses)"
        style={styles.input}
        keyboardType="numeric"
        value={minStay}
        onChangeText={setMinStay}
      />

      <TextInput
        placeholder="Estancia máxima (meses)"
        style={styles.input}
        keyboardType="numeric"
        value={maxStay}
        onChangeText={setMaxStay}
      />

      <TextInput
        placeholder="Alquiler mensual"
        style={styles.input}
        keyboardType="numeric"
        value={monthlyRent}
        onChangeText={setMonthlyRent}
      />

      <View style={styles.switchContainer}>
        <Text>¿Incluye gastos?</Text>
        <Switch value={includesExpenses} onValueChange={setIncludesExpenses} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
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
    width: '100%', // Esto indica el porcentaje del progreso, ajusta según el paso actual
    height: '100%',
    backgroundColor: '#00c899',
    borderRadius: 2.5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default Step4Availability;
