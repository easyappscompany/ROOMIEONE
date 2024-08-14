import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const MusicSelectScreen = ({ navigation }) => {
  const [selectedMusicGenres, setSelectedMusicGenres] = useState([]);

  const musicOptions = [
    'Rock', 'Pop', 'Jazz', 'Clásica', 'Reggae',
    'Hip-Hop', 'Electrónica', 'Blues', 'Metal', 'Country',
  ];

  const handleSelection = (option) => {
    if (selectedMusicGenres.includes(option)) {
      setSelectedMusicGenres(selectedMusicGenres.filter(item => item !== option));
    } else {
      setSelectedMusicGenres([...selectedMusicGenres, option]);
    }
  };

  const handleSave = () => {
    console.log('Géneros de música seleccionados:', selectedMusicGenres);
    navigation.navigate('Editar perfil');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {musicOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedMusicGenres.includes(option) && styles.selectedButton,
            ]}
            onPress={() => handleSelection(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedMusicGenres.includes(option) && styles.selectedText,
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      paddingTop: 55,
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
      padding: 20
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

export default MusicSelectScreen;
