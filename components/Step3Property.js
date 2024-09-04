import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Importación correcta
import { useNavigation } from "@react-navigation/native"; // Importar useNavigation
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para el ícono de la equis
import { CommonActions } from '@react-navigation/native'; // Importar CommonActions

const Step3Property = () => {
  const navigation = useNavigation(); // Inicializar navegación
  const [roomSize, setRoomSize] = useState("");
  const [hasElevator, setHasElevator] = useState(false);
  const [residentGender, setResidentGender] = useState("Hombre");
  const [amenities, setAmenities] = useState({
    internet: false,
    tv: false,
    heating: false,
    airConditioning: false,
  });

  const toggleAmenity = (amenity) => {
    setAmenities({ ...amenities, [amenity]: !amenities[amenity] });
  };

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
        <Text style={styles.title}>Paso 3: Propiedad</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      {/* Barra de progreso */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>

      <TextInput
        placeholder="Tamaño del cuarto en m²"
        style={styles.input}
        keyboardType="numeric"
        value={roomSize}
        onChangeText={setRoomSize}
      />

      <View style={styles.switchContainer}>
        <Text>¿Hay ascensor?</Text>
        <Switch value={hasElevator} onValueChange={setHasElevator} />
      </View>

      <Text>¿Quién vive en el alojamiento?</Text>
      <Picker
        selectedValue={residentGender}
        onValueChange={(itemValue) => setResidentGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Hombre" value="Hombre" />
        <Picker.Item label="Mujer" value="Mujer" />
      </Picker>

      <Text style={styles.comodidadesText}>Comodidades:</Text>
      <View style={styles.switchContainer}>
        <Text>Internet</Text>
        <Switch
          value={amenities.internet}
          onValueChange={() => toggleAmenity("internet")}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>TV</Text>
        <Switch
          value={amenities.tv}
          onValueChange={() => toggleAmenity("tv")}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Calefacción</Text>
        <Switch
          value={amenities.heating}
          onValueChange={() => toggleAmenity("heating")}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text>Aire acondicionado</Text>
        <Switch
          value={amenities.airConditioning}
          onValueChange={() => toggleAmenity("airConditioning")}
        />
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
    fontWeight: "bold",
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
    width: '75%', // Esto indica el porcentaje del progreso, ajusta según el paso actual
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  picker: {
    marginBottom: 10,
  },
  comodidadesText: {
    fontSize: 18,               // Tamaño de fuente
    fontWeight: 'bold',        // Negrita
    color: '#333',             // Color del texto
    marginVertical: 1,        // Espaciado vertical
    paddingHorizontal: 10,     // Espaciado horizontal
  },
});

export default Step3Property;
