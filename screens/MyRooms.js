import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import StepNavigator from "../components/StepNavigator";
import { db } from "../config";
import { getAuth } from "firebase/auth";

export default function MyRooms() {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

  // Obtener cuartos de la colección 'rooms' filtrados por el usuario autenticado
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userEmail = user.email;
          const snapshot = await db
            .collection("rooms")
            .where("userEmail", "==", userEmail)
            .get();

          const roomList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRooms(roomList);
        } else {
          console.log("No hay usuario autenticado.");
        }
      } catch (error) {
        console.error("Error obteniendo cuartos:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <View style={styles.container}>
      {rooms.length === 0 ? (
        <Text style={styles.noRoomsText}>No tienes cuartos publicados</Text>
      ) : (
        rooms.map((room) => (
          <View key={room.id} style={styles.roomContainer}>
            {/* Imagen y detalles del cuarto */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MyRoomDetails", { roomId: room.id })
              }
            >
              <Image
                style={styles.roomImage}
                source={{
                  uri: room.imageUrls ? room.imageUrls[0] : "https://via.placeholder.com/150",
                }}
              />
              <View style={styles.textOverlay}>
                <Text style={styles.roomTitle}>{room.title}</Text>
                <Text style={styles.roomPrice}>${room.monthlyRent}/mes</Text>
                <Text style={styles.roomCountry}>{room.country}</Text>
              </View>
            </TouchableOpacity>
  
            {/* Botón para editar el cuarto */}
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => navigation.navigate("EditRoom", { roomId: room.id })}
            >
              <Icon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))
      )}

      <TouchableOpacity
        style={styles.publishButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-outline" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <StepNavigator closeModal={() => setModalVisible(false)} />
      </Modal>

      {/* Menú de navegación inferior */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Inicio")}>
          <Ionicons
            name="home-outline"
            size={24}
            color={route.name === "Home" ? "#00c06b" : "black"}
          />
          <Text
            style={[
              styles.footerText,
              { color: route.name === "Home" ? "#00c06b" : "black" },
            ]}
          >
            Inicio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Favoritos")}>
          <Ionicons
            name="heart-outline"
            size={24}
            color={route.name === "Favoritos" ? "#00c06b" : "black"}
          />
          <Text
            style={[
              styles.footerText,
              { color: route.name === "Favoritos" ? "#00c06b" : "black" },
            ]}
          >
            Favoritos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={route.name === "Chat" ? "#00c06b" : "black"}
          />
          <Text
            style={[
              styles.footerText,
              { color: route.name === "Chat" ? "#00c06b" : "black" },
            ]}
          >
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
          <Ionicons
            name="person-outline"
            size={24}
            color={route.name === "Profile" ? "#00c06b" : "black"}
          />
          <Text
            style={[
              styles.footerText,
              { color: route.name === "Profile" ? "#00c06b" : "black" },
            ]}
          >
            Perfil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 16,
  },
  roomContainer: {
    marginBottom: 16,
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  textOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
  },
  roomTitle: {
    color: "#00c06b",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  roomPrice: {
    fontSize: 16,
    color: "#00c06b",
    marginBottom: 4,
  },
  roomCountry: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  editIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#00c06b",
    padding: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  publishButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#00c06b",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    marginLeft: -5,
    marginTop: 4,
  },
  noRoomsText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  
});
