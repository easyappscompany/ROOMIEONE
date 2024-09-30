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
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../config"; // Asegúrate de tener bien configurado Firebase en config.js
import { getCountries, getStates, getCities } from "../apiService";

const Step1Multimedia = ({ handleSubmit }) => {
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
          setState(""); // Restablecer el estado cuando se selecciona un nuevo país
          setCity(""); // Restablecer la ciudad cuando se selecciona un nuevo país
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

  const handleCancel = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

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

  const submitRoomData = async () => {
    if (images.length === 0) {
      alert("Debes subir al menos una foto.");
      return;
    }

    try {
      // Subir las imágenes y obtener sus URLs
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          if (image.uri) {
            return uploadImage(image.uri);
          } else {
            throw new Error("La URI de la imagen es indefinida.");
          }
        })
      );

      const user = auth.currentUser;
      const userEmail = user?.email;

      // Crear el objeto roomData con los datos del cuarto y las URLs de las imágenes
      const roomData = {
        title,
        description,
        monthlyRent: parseFloat(monthlyRent) || 0,
        country,
        state,
        city,
        address,
        houseNumber,
        depositRequired,
        isVisible, // Añadir el campo isVisible
        userEmail,
        imageUrls, // Agregar las URLs de las imágenes aquí
        latitud: parseFloat(latitud),  // Agregar latitud al objeto
        longitud: parseFloat(longitud), // Agregar longitud al objeto
      };

      // Guardar el objeto roomData en la colección 'rooms'
      const roomDocRef = await addDoc(collection(db, "rooms"), roomData);
      console.log("Documento de cuarto escrito con ID: ", roomDocRef.id);

      handleSubmit(roomData);

      // Navegar de vuelta a Home
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    } catch (e) {
      console.error("Error al añadir el documento:", e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Multimedia</Text>
        <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>¿Cuarto visible?</Text>
        <Switch
          value={isVisible}
          onValueChange={(value) => setIsVisible(value)} // Controlar la visibilidad
        />
      </View>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Image
            style={styles.cancelIcon}
            source={{
              uri: "https://img.icons8.com/ios-glyphs/30/000000/multiply.png",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Descubre cómo alquilar tu habitación de manera rápida y sencilla.
        </Text>
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

      <Text style={styles.inputLabel}>Dirección</Text>
      <TextInput
        placeholder="Dirección completa"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.inputLabel}>Número de casa</Text>
      <TextInput
        placeholder="Número de casa"
        style={styles.input}
        value={houseNumber}
        onChangeText={setHouseNumber}
      />

      <Text style={styles.inputLabel}>Renta mensual</Text>
      <TextInput
        placeholder="$1000"
        style={styles.input}
        value={monthlyRent}
        onChangeText={(value) => setMonthlyRent(parseFloat(value) || 0)}
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>¿Se requiere depósito?</Text>
        <Switch
          value={depositRequired}
          onValueChange={(value) => setDepositRequired(value)}
        />
      </View>

      <TouchableOpacity
  style={[styles.submitButton, !buttonActive && styles.disabledButton]}
  onPress={buttonActive ? submitRoomData : () => alert("Debes suscribirte para publicar otro cuarto.")}
  disabled={!buttonActive}
>
  <Text style={styles.submitButtonText}>Publicar</Text>
</TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  disabledButton: {
    backgroundColor: "gray", // Color para el botón deshabilitado
  },
  subscriptionNotice: {
    color: "red",
    padding: 10,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  stepText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 5,
  },
  cancelIcon: {
    width: 20,
    height: 20,
  },
  banner: {
    backgroundColor: "#3baaf7",
    padding: 10,
    marginVertical: 10,
  },
  bannerText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    paddingLeft: 10,
  },
  imageUploadBox: {
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  cameraIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  imageUploadText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  imageUploadSubText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
    paddingLeft: 10,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  descriptionInput: {
    height: 80,
    marginVertical: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#00c899",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  switchLabel: {
    fontSize: 18,
    color: "#333",
  },
});

export default Step1Multimedia;