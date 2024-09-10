import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getCountries, getStates, getCities } from "../apiService";
import { db, storage } from "../config";

const EditRoomScreen = ({ route }) => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [depositRequired, setDepositRequired] = useState(false);
  const navigation = useNavigation();
  const { roomId } = route.params;

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const docRef = doc(db, "rooms", roomId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const roomData = docSnap.data();
          setTitle(roomData.title);
          setDescription(roomData.description);
          setMonthlyRent(roomData.monthlyRent);
          setCountry(roomData.country);
          setState(roomData.state);
          setCity(roomData.city);
          setAddress(roomData.address);
          setHouseNumber(roomData.houseNumber);
          setDepositRequired(roomData.depositRequired);
          setImages(roomData.imageUrls.map((url) => ({ uri: url })));
        }
      } catch (error) {
        console.error("Error al obtener los datos del cuarto:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

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
      if (!country || !state) {
        console.warn("Country or state is empty, skipping fetch cities.");
        return;
      }
  
      try {
        const fetchedCities = await getCities(country, state);
  
        // Añadir validación adicional
        if (!fetchedCities || !Array.isArray(fetchedCities)) {
          console.error("Fetched cities is not an array or is undefined:", fetchedCities);
          setCities([]); // Set cities to empty array to avoid lingering data
          return;
        }
  
        setCities(fetchedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
  
    // Llama a la función solo si country y state están definidos
    if (country && state) {
      fetchCities();
    }
  }, [country, state]);

  const pickImage = async () => {
    if (images.length >= 5) {
      alert("Solo puedes subir hasta 5 fotos.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedImage = result.assets[0];
        const { uri } = pickedImage;

        const response = await fetch(uri);
        const blob = await response.blob();
        const type = blob.type;
        const fileSize = blob.size;

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(type)) {
          alert("Solo se permiten archivos PNG, JPG o JPEG.");
          return;
        }

        if (fileSize > 4 * 1024 * 1024) {
          alert("El tamaño de la imagen no puede exceder los 4 MB.");
          return;
        }

        setImages([...images, pickedImage]);
      } else {
        alert("No se seleccionó ninguna imagen.");
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  const uploadImage = async (imageUri) => {
    if (!imageUri) {
      throw new Error("La URI de la imagen es indefinida.");
    }

    try {
      const response = await fetch(imageUri);
      if (!response.ok) {
        throw new Error("No se pudo obtener la imagen.");
      }

      const blob = await response.blob();
      const storageRef = ref(storage, `images/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error;
    }
  };

  const updateRoomData = async () => {
    try {
      // Validar que los campos no sean undefined o vacíos
      const roomData = {
        title: title || "",
        description: description || "",
        country: country || "",
        state: state || "",
        city: city || "",
        address: address || "",
        houseNumber: houseNumber || "",
        monthlyRent: monthlyRent || "",
        depositRequired: depositRequired || false,
      };

      // Elimina cualquier campo con valor vacío o undefined
      Object.keys(roomData).forEach((key) => {
        if (roomData[key] === undefined || roomData[key] === "") {
          delete roomData[key];
        }
      });

      // Actualizar el documento en Firestore
      await updateDoc(doc(db, "rooms", roomId), roomData);
      console.log("Documento actualizado exitosamente");

      // Navegar a la pantalla MyRooms después de guardar
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MyRooms" }],
        })
      );
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Editar Cuarto</Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.cancelIcon}
            source={{
              uri: "https://img.icons8.com/ios-glyphs/30/000000/multiply.png",
            }}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Añade algunas fotos</Text>
      <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage}>
        {images.length === 0 ? (
          <>
            <Image
              style={styles.cameraIcon}
              source={{
                uri: "https://img.icons8.com/ios-filled/50/000000/camera--v1.png",
              }}
            />
            <Text style={styles.imageUploadText}>
              La experiencia de carga de fotos más sencilla.
            </Text>
            <Text style={styles.imageUploadSubText}>
              Haz clic aquí para buscar en tus carpetas o hacer una foto
            </Text>
          </>
        ) : (
          <ScrollView horizontal>
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={styles.uploadedImage}
              />
            ))}
          </ScrollView>
        )}
      </TouchableOpacity>

      <Text style={styles.inputLabel}>Pon un título a tu anuncio</Text>
      <TextInput
        placeholder="Habitación con wifi, 2 baños"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.inputLabel}>Añade una descripción</Text>
      <TextInput
        placeholder="¿Qué tal el ambiente en el piso? ¿Qué valoras de un inquilino? ¡Describe el piso y alquílalo más rápido!"
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.inputLabel}>País</Text>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={country}
          style={styles.picker}
          onValueChange={(itemValue) => setCountry(itemValue)}
        >
          <Picker.Item label="Seleccione país" value="" />
          {countries.map((country, index) => (
            <Picker.Item
              key={index}
              label={country.name}
              value={country.iso2}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.inputLabel}>Estado</Text>
      <View style={styles.inputContainer}>
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

      <Text style={styles.inputLabel}>Ciudad</Text>
      <View style={styles.inputContainer}>
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

      <Text style={styles.inputLabel}>Dirección y número</Text>
      <TextInput
        placeholder="Calle Ejemplo"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Número de casa"
        style={styles.input}
        value={houseNumber}
        onChangeText={setHouseNumber}
      />

      <Text style={styles.inputLabel}>Renta mensual</Text>
      <TextInput
        placeholder="$5000"
        style={styles.input}
        value={monthlyRent}
        onChangeText={setMonthlyRent}
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>¿Requiere depósito?</Text>
        <Switch
          value={depositRequired}
          onValueChange={(value) => setDepositRequired(value)}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={updateRoomData}>
        <Text style={styles.saveButtonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 8,
  },
  cancelIcon: {
    width: 24,
    height: 24,
  },
  sectionTitle: {
    fontSize: 20,
    marginVertical: 16,
  },
  imageUploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  cameraIcon: {
    width: 50,
    height: 50,
  },
  imageUploadText: {
    marginTop: 8,
    fontSize: 16,
  },
  imageUploadSubText: {
    marginTop: 4,
    fontSize: 12,
    color: "#888",
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  inputLabel: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  descriptionInput: {
    height: 100,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 8,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  switchLabel: {
    fontSize: 16,
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditRoomScreen;
