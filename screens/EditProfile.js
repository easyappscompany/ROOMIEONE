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
    // Navega a la pantalla de edición específica según el campo
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

        <TextInput
          style={styles.input}
          placeholder="Nombre(s)"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido(s)"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nacionalidad"
          value={country}
          onChangeText={setCountry}
        />
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            style={styles.dateInput}
            placeholder="Fecha de nacimiento"
            value={formattedDate}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

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
          <TextInput
            style={styles.input}
            placeholder="Idiomas"
            value={selectedLanguages.join(", ")}
            editable={false}
          />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Sobre ti</Text>

        <TouchableOpacity
          style={styles.item}
          onPress={() => handlePress("traits")}
        >
          <View style={styles.iconContainer}>
            <Icon name="person" size={24} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.question}>¿Cómo eres?</Text>
            <Text style={styles.answer}>{aboutYou}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => handlePress("lifestyle")}
        >
          <View style={styles.iconContainer}>
            <Icon name="spa" size={24} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.question}>¿Cuál es tu estilo de vida?</Text>
            <Text style={styles.answer}>{lifestyle}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => handlePress("music")}
        >
          <View style={styles.iconContainer}>
            <Icon name="music-note" size={24} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.question}>¿Qué música escuchas?</Text>
            <Text style={styles.answer}>{music}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => handlePress("sports")}
        >
          <View style={styles.iconContainer}>
            <Icon name="sports-baseball" size={24} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.question}>¿Qué deportes practicas?</Text>
            <Text style={styles.answer}>{sports}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => handlePress("movies")}
        >
          <View style={styles.iconContainer}>
            <Icon name="local-movies" size={24} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.question}>¿Qué películas ves?</Text>
            <Text style={styles.answer}>{movies}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="save" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 10, // Espacio para evitar que el contenido sea ocultado por el botón
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 10,
    color: "#666",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dateInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    marginBottom: 20,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
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
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  addPhotoText: {
    fontSize: 24,
    color: "#ccc",
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
  answer: {
    fontSize: 14,
    color: "#666",
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
