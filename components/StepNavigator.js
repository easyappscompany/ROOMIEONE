import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import firebase from '../config'; // Importa la configuración de Firebase
import { useNavigation } from "@react-navigation/native";
import Step1Multimedia from "./Step1Multimedia";

const StepNavigator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [roomData, setRoomData] = useState(null); // Agrega un estado para roomData
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!roomData) {
      Alert.alert('Error', 'No se han recibido datos de la habitación.');
      return;
    }

    try {
      const currentUser = firebase.auth().currentUser;

      if (!currentUser) {
        Alert.alert('Error', 'No se ha encontrado ningún usuario autenticado.');
        return;
      }

      // Asegúrate de que todos los campos tengan valores válidos
      const {
        title = '',
        description = '',
        monthlyRent = '',
        country = '',
        state = '',
        city = '',
        address = '',
        houseNumber = '',
        depositRequired = false,
      } = roomData;

      // Crea un nuevo documento en la colección "rooms"
      const roomRef = await firebase.firestore().collection('rooms').add({
        title,
        description,
        monthlyRent,
        country,
        state,
        city,
        address,
        houseNumber,
        depositRequired,
        userEmail: currentUser.email, // Asocia el cuarto con el usuario autenticado
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Fecha de creación
      });

      Alert.alert('Éxito', 'Tu habitación ha sido publicada correctamente.');
      handleCloseModal();
    } catch (error) {
      console.error('Error al subir los datos: ', error);
      Alert.alert('Error', 'Hubo un problema al publicar tu habitación. Inténtalo de nuevo.');
    }
  };

  const handleCloseModal = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      default:
        return <Step1Multimedia handleSubmit={(data) => setRoomData(data)} />; // Actualiza roomData
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {renderStep()}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    backgroundColor: "#00c899",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StepNavigator;
