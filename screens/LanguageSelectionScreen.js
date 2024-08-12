import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const LanguageSelectionScreen = ({ navigation, route }) => {
  const { selectedLanguages, setSelectedLanguages } = route.params;

  const languages = [
    "Inglés",
    "Español",
    "Francés",
    "Alemán",
    "Chino",
    "Japonés",
    "Ruso",
    "Portugués",
    "Italiano",
    "Árabe",
    "Coreano",
    "Hindi",
    "Bengalí",
    "Turco",
    "Holandés",
  ];

  const toggleLanguageSelection = (language) => {
    const isSelected = selectedLanguages.includes(language);
    const updatedLanguages = isSelected
      ? selectedLanguages.filter((item) => item !== language)
      : [...selectedLanguages, language];

    setSelectedLanguages(updatedLanguages);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedLanguages.includes(item);
    return (
      <TouchableOpacity
        style={[styles.languageContainer, isSelected && styles.selectedLanguage]}
        onPress={() => toggleLanguageSelection(item)}
      >
        <Text style={styles.languageText}>{item}</Text>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  languageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  selectedLanguage: {
    backgroundColor: "#e0f7fa",
  },
  languageText: {
    fontSize: 16,
  },
  checkmark: {
    fontSize: 18,
    color: "#00c853",
  },
  saveButton: {
    backgroundColor: "#00c853",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LanguageSelectionScreen;
