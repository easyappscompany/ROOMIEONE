import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { getCountries, getStates, getCities } from "../apiService";

// Función para validar RFC
const validarRFC = (rfc) => {
  const regex = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/i;
  return regex.test(rfc);
};

// Función para validar Clave de Elector
const validarClaveElector = (claveElector) => {
  return claveElector.length === 18;
};

const EditProfile = ({ navigation }) => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [rfc, setRfc] = useState("");
  const [claveElector, setClaveElector] = useState("");
  const [gender, setGender] = useState("");
  const [photos, setPhotos] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [interiorNumber, setInteriorNumber] = useState("");
  const [exteriorNumber, setExteriorNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const db = getFirestore();
        const user = auth.currentUser;

        if (user) {
          const userEmail = user.email.trim().toLowerCase();
          const userDocRef = doc(db, "users", userEmail);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setCountry(userData.country || "");
            setBirthDate(
              userData.dob ? new Date(userData.dob.seconds * 1000) : new Date()
            );
            setFormattedDate(
              userData.dob
                ? new Date(userData.dob.seconds * 1000).toLocaleDateString()
                : ""
            );
            setRfc(userData.rfc || "");
            setClaveElector(userData.ine || "");
            setGender(userData.gender || "");
            setState(userData.state || "");
            setCity(userData.city || "");
            setStreet(userData.street || "");
            setInteriorNumber(userData.interiorNumber || "");
            setExteriorNumber(userData.exteriorNumber || "");
            setPostalCode(userData.postalCode || "");
            setPhotos(userData.photos || []);
          } else {
            console.log("No se encontró el documento del usuario.");
          }
        } else {
          console.log("No hay usuario autenticado.");
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const fetchedCountries = await getCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };

    fetchUserData();
    fetchCountries();
  }, [navigation]);

  useEffect(() => {
    const fetchStates = async () => {
      if (country) {
        try {
          const fetchedStates = await getStates(country);
          console.log("Fetched states:", fetchedStates);
          if (Array.isArray(fetchedStates)) {
            setStates(fetchedStates);
          } else {
            console.error("Fetched states is not an array:", fetchedStates);
          }
        } catch (error) {
          console.error(`Error fetching states for country ${country}:`, error);
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
          if (Array.isArray(fetchedCities)) {
            setCities(fetchedCities);
          } else {
            console.error("Fetched cities is not an array:", fetchedCities);
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      } else {
        console.warn("Country or state is empty, skipping fetch cities.");
      }
    };

    fetchCities();
  }, [country, state]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a la galería.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.uri]);
    }
  };

  const removeImage = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === "ios");
    setBirthDate(currentDate);
    setFormattedDate(currentDate.toLocaleDateString());
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const saveProfile = async () => {
    if (!validarRFC(rfc) || !validarClaveElector(claveElector)) {
      alert("Por favor, introduce información válida.");
      return;
    }

    try {
      const auth = getAuth();
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email.trim().toLowerCase();
        const userDocRef = doc(db, "users", userEmail);

        await setDoc(userDocRef, {
          photoURL: photos[0] || user.photoURL,
          email: userEmail,
          dob: birthDate,
          gender: gender,
          ine: claveElector,
          rfc: rfc,
          country: country,
          state: state,
          city: city,
          street: street,
          interiorNumber: interiorNumber,
          exteriorNumber: exteriorNumber,
          postalCode: postalCode,
          photos: photos,
        });

        console.log("Datos de perfil guardados exitosamente.");
        alert("Perfil guardado correctamente.");
        navigation.navigate("Profile");
      } else {
        console.log("No hay usuario autenticado.");
        alert("No hay usuario autenticado. Redirigiendo al inicio de sesión.");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      alert("Hubo un error al guardar el perfil. Por favor, inténtalo de nuevo.");
    }
  };

  const cancelProfile = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.sectionTitle}>Añade tus fotos *</Text>
        <Text style={styles.sectionSubtitle}>
          Asegúrate de añadir fotos en las que se vea tu cara con claridad.
        </Text>
        <View style={styles.photoGrid}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoItem}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          {photos.length < 6 && (
            <TouchableOpacity style={styles.addPhoto} onPress={pickImage}>
              <Text style={styles.addPhotoText}>+</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.photoCount}>{photos.length}/6</Text>

        <View style={styles.inputContainer}>
          <Icon name="public" size={20} color="#666" style={styles.inputIcon} />
          <Picker
            selectedValue={country}
            style={styles.picker}
            onValueChange={(itemValue) => setCountry(itemValue)}
          >
            <Picker.Item label="Seleccione país" value="" />
            {countries.map((country, index) => (
              <Picker.Item key={index} label={country.name} value={country.iso2} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="location-city" size={20} color="#666" style={styles.inputIcon} />
          <Picker
            selectedValue={state}
            style={styles.picker}
            onValueChange={(itemValue) => setState(itemValue)}
          >
            <Picker.Item label="Seleccione estado" value="" />
            {states.map((state, index) => (
              <Picker.Item key={index} label={state.name} value={state.iso2} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="location-city" size={20} color="#666" style={styles.inputIcon} />
          <Picker
            selectedValue={city}
            style={styles.picker}
            onValueChange={(itemValue) => setCity(itemValue)}
          >
            <Picker.Item label="Seleccione ciudad" value="" />
            {cities.map((city, index) => (
              <Picker.Item key={index} label={city.name} value={city.name} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity onPress={showDatepicker}>
          <View pointerEvents="none">
            <View style={styles.inputContainer}>
              <Icon name="calendar-today" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Fecha de nacimiento"
                value={formattedDate}
                editable={false}
              />
            </View>
          </View>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthDate}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Selecciona tu género" value="" />
            <Picker.Item label="Femenino" value="F" />
            <Picker.Item label="Masculino" value="M" />
            <Picker.Item label="Otro" value="O" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="fingerprint" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="RFC"
            value={rfc}
            onChangeText={(text) => setRfc(text)}
            maxLength={13}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="how-to-vote" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Clave de elector"
            value={claveElector}
            onChangeText={(text) => setClaveElector(text)}
            maxLength={18}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="place" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Calle"
            value={street}
            onChangeText={(text) => setStreet(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="home" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Número exterior"
            value={exteriorNumber}
            onChangeText={(text) => setExteriorNumber(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="doorbell" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Número interior"
            value={interiorNumber}
            onChangeText={(text) => setInteriorNumber(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="mail" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Código postal"
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={cancelProfile}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: "#666",
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  photoItem: {
    position: "relative",
    width: "30%",
    marginBottom: 10,
  },
  photo: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 2,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addPhoto: {
    width: "30%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoText: {
    fontSize: 30,
    color: "#666",
  },
  photoCount: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  picker: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EditProfile;
