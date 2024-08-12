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
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function PreferencesScreen({ navigation }) {
  const [placeType, setPlaceType] = useState("cualquiera");
  const [moveDate, setMoveDate] = useState("cuanto-antes");
  const [specificDate, setSpecificDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [movingWith, setMovingWith] = useState("solo");
  const [companion, setCompanion] = useState("");
  const [location, setLocation] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || specificDate;
    setShowDatePicker(Platform.OS === "ios");
    setSpecificDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const isFormComplete = () => {
    return (
      location !== "" &&
      minBudget !== "" &&
      maxBudget !== "" &&
      (movingWith !== "con-otra-persona" || companion !== "")
    );
  };

  const budgetRanges = [
    "Si",
    "No",
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Encuentra tu hogar ideal</Text>
        <Text style={styles.subHeader}>
          Puedes cambiar tus preferencias cuando quieras.
        </Text>

        <Text style={styles.label}>UBICACIÓN</Text>
        <View style={styles.inputContainer}>
          <Icon name="place" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Introduce una ubicación"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <Text style={styles.label}>TIPO DE LUGAR</Text>
        <RadioButton.Group
          onValueChange={(value) =>
            setPlaceType(value === placeType ? null : value)
          }
          value={placeType}
        >
          <View style={styles.radioOption}>
            <RadioButton value="habitacion-privada" />
            <Text style={styles.radioLabel}>Habitación privada</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="alojamiento-entero" />
            <Text style={styles.radioLabel}>Alojamiento entero</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="cualquiera" />
            <Text style={styles.radioLabel}>Cualquiera</Text>
          </View>
        </RadioButton.Group>

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

        <Text style={styles.label}>FECHA DE MUDANZA</Text>
        <RadioButton.Group
          onValueChange={(value) =>
            setMoveDate(value === moveDate ? null : value)
          }
          value={moveDate}
        >
          <View style={styles.radioOption}>
            <RadioButton value="cuanto-antes" />
            <Text style={styles.radioLabel}>Cuanto antes</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="sin-fecha" />
            <Text style={styles.radioLabel}>Aún no tengo fecha</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="fecha-especifica" />
            <Text style={styles.radioLabel}>En una fecha específica</Text>
          </View>
        </RadioButton.Group>

        {moveDate === "fecha-especifica" && (
          <View>
            <TouchableOpacity
              onPress={showDatePickerModal}
              style={styles.dateInput}
            >
              <Text style={styles.dateInputText}>
                {specificDate.toDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={specificDate}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        )}

        <Text style={styles.label}>¿CUARTO COMPARTIDO?</Text>
        <RadioButton.Group
          onValueChange={(value) =>
            setMovingWith(value === movingWith ? null : value)
          }
          value={movingWith}
        >
          <View style={styles.radioOption}>
            <RadioButton value="si" />
            <Text style={styles.radioLabel}>Si</Text>
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
  budgetSelectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  budgetButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    width: "29%",
    alignItems: "center",
  },
  selectedBudgetButton: {
    backgroundColor: "#28a745",
  },
  budgetButtonText: {
    fontSize: 16,
    color: "#000",
  },
  selectedBudgetButtonText: {
    color: "#fff",
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
  dropdownContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 24,
  },
  picker: {
    height: 50,
    width: "100%",
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
  dateInput: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  dateInputText: {
    fontSize: 16,
  },
});
