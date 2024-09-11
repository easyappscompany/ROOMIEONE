import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function PreferencesScreen({ navigation }) {
  const [movingWith, setMovingWith] = useState("no");
  const [companion, setCompanion] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("pais");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const isFormComplete = () => {
    return (
      location !== "" ||
      minBudget !== "" ||
      maxBudget !== "" ||
      (movingWith === "si" && companion !== "")
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Encuentra tu hogar ideal</Text>
        <Text style={styles.subHeader}>
          Puedes cambiar tus preferencias cuando quieras.
        </Text>

        <Text style={styles.label}>UBICACIÓN</Text>

        <View style={styles.pickerContainer}>
          <Icon name="place" size={24} color="#888" style={styles.pickerIcon} />
          <Picker
            selectedValue={locationType}
            onValueChange={(itemValue) => setLocationType(itemValue)}
            style={styles.picker}
            dropdownIconColor="#888"
          >
            <Picker.Item label="Buscar por país" value="pais" />
            <Picker.Item label="Buscar por estado" value="estado" />
            <Picker.Item label="Buscar por ciudad" value="ciudad" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="place" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={`Introduce un ${locationType}`}
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <Text style={styles.label}>PRESUPUESTO MENSUAL</Text>
        <View style={styles.budgetContainer}>
          <View style={styles.budgetInputContainer}>
            <Icon
              name="attach-money"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="MIN"
              keyboardType="numeric"
              value={minBudget}
              onChangeText={setMinBudget}
            />
          </View>
          <View style={styles.budgetInputContainer}>
            <Icon
              name="attach-money"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="MAX"
              keyboardType="numeric"
              value={maxBudget}
              onChangeText={setMaxBudget}
            />
          </View>
        </View>

        <Text style={styles.label}>¿CUARTO COMPARTIDO?</Text>
        <RadioButton.Group
          onValueChange={(value) =>
            setMovingWith(movingWith === value ? null : value)
          }
          value={movingWith}
        >
          <View style={styles.radioOption}>
            <RadioButton value="si" />
            <Text style={styles.radioLabel}>Sí</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="no" />
            <Text style={styles.radioLabel}>No</Text>
          </View>
        </RadioButton.Group>

        {movingWith === "si" && (
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={companion}
              onValueChange={(itemValue) => setCompanion(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Con mi pareja" value="pareja" />
              <Picker.Item label="Con un amigo" value="amigo" />
              <Picker.Item label="Con un familiar" value="familiar" />
            </Picker>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.searchButton,
            isFormComplete()
              ? styles.searchButtonActive
              : styles.searchButtonInactive,
          ]}
          disabled={!isFormComplete()}
        >
          <Text style={styles.searchButtonText}>Aplicar filtros</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 40,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    height: "9%",
  },
  pickerIcon: {
    marginRight: 8,
  },
  picker: {
    flex: 1,
    height: 50,
    color: "#333",
  },
  budgetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  budgetInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioLabel: {
    fontSize: 16,
  },
  searchButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  searchButtonInactive: {
    backgroundColor: "#ccc",
  },
  searchButtonActive: {
    backgroundColor: "#28a745",
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
