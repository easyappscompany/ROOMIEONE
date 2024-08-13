import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const LifestyleSelectionScreen = ({ navigation }) => {
  const [selectedLifestyles, setSelectedLifestyles] = useState([]);

  const lifestyleOptions = [
    'Activo', 'Sedentario', 'Aventurero', 'Relajado', 'Saludable',
    'Nocturno', 'Cultural', 'Deportivo', 'Minimalista', 'Tecnológico',
    'Naturalista', 'Gourmet', 'Viajero', 'Artístico', 'Familiar',
    'Social', 'Solitario', 'Emprendedor', 'Espiritual', 'Ecológico',
  ];

  const handleSelection = (option) => {
    if (selectedLifestyles.includes(option)) {
      setSelectedLifestyles(selectedLifestyles.filter(item => item !== option));
    } else {
      setSelectedLifestyles([...selectedLifestyles, option]);
    }
  };

  const handleSave = () => {
    // Aquí puedes manejar lo que ocurre al guardar la selección
    console.log('Estilos de vida seleccionados:', selectedLifestyles);
    navigation.navigate('Editar perfil');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu estilo de vida</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {lifestyleOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedLifestyles.includes(option) && styles.selectedButton,
            ]}
            onPress={() => handleSelection(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedLifestyles.includes(option) && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.roundButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#4A90E2',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  roundButton: {
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    width: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LifestyleSelectionScreen;


