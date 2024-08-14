import React, { useState } from "react";
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
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons"; // Asegúrate de instalar esta librería

const EditProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [rfc, setRfc] = useState(""); // Nuevo estado para RFC
  const [claveElector, setClaveElector] = useState(""); // Nuevo estado para Clave de Elector
  const [gender, setGender] = useState(""); // 'male' or 'female'
  const [occupation, setOccupation] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [aboutYou, setAboutYou] = useState("Alegre");
  const [lifestyle, setLifestyle] = useState("Amante de los animales");
  const [music, setMusic] = useState("Rock");
  const [sports, setSports] = useState("Béisbol");
  const [movies, setMovies] = useState("Documental");
  const [photos, setPhotos] = useState([]);

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

  const openLanguageSelection = () => {
    navigation.navigate("LanguageSelection", {
      selectedLanguages,
      setSelectedLanguages,
    });
  };

  const handlePress = (field) => {
    navigation.navigate(field);
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

        {/* Input con icono */}
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre(s)"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        {/* Input con icono */}
        <View style={styles.inputContainer}>
          <Icon name="people" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Apellido(s)"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Input con icono */}
        <View style={styles.inputContainer}>
          <Icon name="public" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nacionalidad"
            value={country}
            onChangeText={setCountry}
          />
        </View>

        {/* Input con icono */}
        <TouchableOpacity onPress={showDatepicker}>
          <View style={styles.inputContainer}>
            <Icon name="calendar-today" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.dateInput}
              placeholder="Fecha de nacimiento"
              value={formattedDate}
              editable={false}
            />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        {/* Input con icono para RFC */}
        <View style={styles.inputContainer}>
          <Icon name="assignment-ind" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="RFC"
            value={rfc}
            onChangeText={setRfc}
          />
        </View>

        {/* Input con icono para Clave de Elector */}
        <View style={styles.inputContainer}>
          <Icon name="fingerprint" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Clave de elector"
            value={claveElector}
            onChangeText={setClaveElector}
          />
        </View>

        <Text style={styles.sectionTitle}>Género</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "male" && styles.genderButtonSelected,
            ]}
            onPress={() => setGender("male")}
          >
            <Text
              style={[
                styles.genderButtonText,
                gender === "male" && styles.genderButtonTextSelected,
              ]}
            >
              Hombre
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "female" && styles.genderButtonSelected,
            ]}
            onPress={() => setGender("female")}
          >
            <Text
              style={[
                styles.genderButtonText,
                gender === "female" && styles.genderButtonTextSelected,
              ]}
            >
              Mujer
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={occupation}
            onValueChange={(itemValue) => setOccupation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona tu ocupación" value="" />
            <Picker.Item label="Ingeniero" value="Ingeniero" />
            <Picker.Item label="Médico" value="Médico" />
            <Picker.Item label="Profesor" value="Profesor" />
            <Picker.Item label="Abogado" value="Abogado" />
            <Picker.Item label="Arquitecto" value="Arquitecto" />
            <Picker.Item label="Enfermero" value="Enfermero" />
            <Picker.Item label="Programador" value="Programador" />
            <Picker.Item label="Contador" value="Contador" />
            <Picker.Item label="Diseñador" value="Diseñador" />
            <Picker.Item label="Chef" value="Chef" />
            <Picker.Item label="Mecánico" value="Mecánico" />
            <Picker.Item label="Artista" value="Artista" />
            <Picker.Item label="Escritor" value="Escritor" />
            <Picker.Item label="Fotógrafo" value="Fotógrafo" />
            <Picker.Item label="Carpintero" value="Carpintero" />
          </Picker>
        </View>

        <TouchableOpacity onPress={openLanguageSelection}>
          <View style={styles.inputContainer}>
            <Icon name="language" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Idiomas"
              value={selectedLanguages.join(", ")}
              editable={false}
            />
          </View>
        </TouchableOpacity>

      </ScrollView>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="save" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#d6d6d6",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  dateInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photoItem: {
    width: "30%",
    position: "relative",
    marginBottom: 10,
  },
  photo: {
    width: "100%",
    height: 100,
    borderRadius: 5,
  },
  addPhoto: {
    width: "30%",
    height: 100,
    backgroundColor: "#c2c2c2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  addPhotoText: {
    fontSize: 24,
    color: "#000",
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  photoCount: {
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    marginHorizontal: 5,
  },
  genderButtonSelected: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  genderButtonText: {
    fontSize: 16,
    color: "#333",
  },
  genderButtonTextSelected: {
    color: "white",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4A90E2",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Sombra en Android
  },
});

export default EditProfile;
