import React, { useState, useEffect } from "react";
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
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";
import { getCountries, getStates, getCities } from "../apiService";

export default function PreferencesScreen({ navigation }) {
  const [movingWith, setMovingWith] = useState("");
  const [companion, setCompanion] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [searchText, setSearchText] = useState(""); // Input de búsqueda
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fetchedCountries = await getCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (country) {
        try {
          const fetchedStates = await getStates(country);
          setStates(fetchedStates);
          setState("");
          setCity("");
        } catch (error) {
          console.error(`Error al obtener los estados de ${country}:`, error);
        }
      }
    };

    fetchStates();
  }, [country]);

  useEffect(() => {
    const fetchCities = async () => {
      if (country && state) {
        try {
          const fetchedCities = await getCities(country, state);
          setCities(fetchedCities);
        } catch (error) {
          console.error(`Error al obtener las ciudades de ${state}:`, error);
        }
      }
    };

    fetchCities();
  }, [state]);

  const isFormComplete = () => {
    return (
      country !== "" ||
      state !== "" ||
      city !== "" ||
      minBudget !== "" ||
      maxBudget !== "" ||
      searchText !== "" ||
      (movingWith === "si" && companion !== "")
    );
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      let roomsQuery = collection(db, "rooms");
      const conditions = [];
  
      // Filtros de ubicación
      if (city) {
        conditions.push(where("city", "==", city));
      } else if (state) {
        conditions.push(where("state", "==", state));
      } else if (country) {
        conditions.push(where("country", "==", country));
      }
  
      // Filtros de presupuesto
      if (minBudget) {
        conditions.push(where("monthlyRent", ">=", parseInt(minBudget)));
      }
      if (maxBudget) {
        conditions.push(where("monthlyRent", "<=", parseInt(maxBudget)));
      }
  
      // Ejecuta la consulta en Firestore con los filtros disponibles
      if (conditions.length > 0) {
        roomsQuery = query(roomsQuery, ...conditions);
      }
  
      const querySnapshot = await getDocs(roomsQuery);
      let roomsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      if (searchText.trim()) {
        const searchWords = searchText.trim().toLowerCase().split(",").map(word => word.trim());

        roomsList = roomsList.filter((room) =>
          searchWords.some((word) =>
            room.description.toLowerCase().includes(word)
          )
        );
      }
  
      // Navegar a la pantalla con los resultados filtrados
      navigation.navigate("FilteredRoomsScreen", { rooms: roomsList });
    } catch (error) {
      console.error("Error al buscar habitaciones: ", error);
    } finally {
      setLoading(false);
    }
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

        <Text style={styles.label}>BÚSQUEDA</Text>
        <View style={styles.inputContainer}>
          <Icon name="search" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Busca por palabras clave (ej: wifi, comedor, terraza)"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <Text style={styles.label}>UBICACIÓN</Text>

        {/* Picker para País */}
        <View style={styles.pickerContainer}>
          <Icon name="place" size={24} color="#888" style={styles.pickerIcon} />
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => setCountry(itemValue)}
            style={styles.picker}
            dropdownIconColor="#888"
          >
            <Picker.Item label="Selecciona un país" value="" />
            {countries.map((country, index) => (
              <Picker.Item key={index} label={country.name} value={country.iso2} />
            ))}
          </Picker>
        </View>

        {/* Picker para Estado */}
        {country && (
          <View style={styles.pickerContainer}>
            <Icon name="place" size={24} color="#888" style={styles.pickerIcon} />
            <Picker
              selectedValue={state}
              onValueChange={(itemValue) => setState(itemValue)}
              style={styles.picker}
              dropdownIconColor="#888"
            >
              <Picker.Item label="Selecciona un estado" value="" />
              {states.map((state, index) => (
                <Picker.Item key={index} label={state.name} value={state.iso2} />
              ))}
            </Picker>
          </View>
        )}

        {/* Picker para Ciudad */}
        {state && (
          <View style={styles.pickerContainer}>
            <Icon name="place" size={24} color="#888" style={styles.pickerIcon} />
            <Picker
              selectedValue={city}
              onValueChange={(itemValue) => setCity(itemValue)}
              style={styles.picker}
              dropdownIconColor="#888"
            >
              <Picker.Item label="Selecciona una ciudad" value="" />
              {cities.map((city, index) => (
                <Picker.Item key={index} label={city.name} value={city.name} />
              ))}
            </Picker>
          </View>
        )}

        <Text style={styles.label}>PRESUPUESTO MENSUAL</Text>
        <View style={styles.budgetContainer}>
          <View style={styles.budgetInputContainer}>
            <Icon name="attach-money" size={24} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="MIN"
              keyboardType="numeric"
              value={minBudget}
              onChangeText={setMinBudget}
            />
          </View>
          <View style={styles.budgetInputContainer}>
            <Icon name="attach-money" size={24} color="#888" style={styles.icon} />
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
          onValueChange={(value) => setMovingWith(movingWith === value ? null : value)}
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
          onPress={handleSearch}
          disabled={!isFormComplete()}
        >
          <Text style={styles.searchButtonText}>
            {loading ? "Buscando..." : "Aplicar filtros"}
          </Text>
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