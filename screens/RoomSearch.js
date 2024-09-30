import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import StepNavigator from "../components/StepNavigator";
import { db } from "../config";

export default function RoomSearch() {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [rooms, setRooms] = useState([]); // Estado para almacenar los cuartos obtenidos de Firestore

  // Obtener cuartos de la colección 'rooms'
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const snapshot = await db.collection("rooms")
          .where("isVisible", "==", true) // Filtra los cuartos donde isVisible es true
          .get();
        const roomList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomList);
      } catch (error) {
        console.error("Error obteniendo cuartos:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Busca tu habitación..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate("RoomSearch")}
          >
            <Icon name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Searches")}
          >
            <Icon
              name="bookmark"
              size={16}
              color="#000"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Búsquedas guardadas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Preferences")}
          >
            <Icon
              name="sliders"
              size={20}
              color="#000"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Preferencias de búsqueda</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Busca en</Text>
        {rooms.map((room) => (
          <TouchableOpacity
            key={room.id}
            style={styles.roomContainer}
            onPress={() => navigation.navigate("RoomDetails", { room })}
          >
            <Image
              style={styles.roomImage}
              source={{
                uri: room.imageUrls
                  ? room.imageUrls[0]
                  : "https://via.placeholder.com/150",
              }}
            />
            <View style={styles.textOverlay}>
              <Text style={styles.roomTitle}>{room.title}</Text>
              <Text style={styles.roomPrice}>${room.monthlyRent}/mes</Text>
              <Text style={styles.roomCountry}>{room.country}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.publishButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.publishButtonText}>Publica tu cuarto</Text>
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
            color={route.name === "Fav" ? "#00c06b" : "black"}
          />
          <Text
            style={[
              styles.footerText,
              { color: route.name === "Fav" ? "#00c06b" : "black" },
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
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
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
  },
  scrollViewContent: {
    paddingHorizontal: 18,
    paddingBottom: 130,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#00c06b",
    padding: 10,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    textAlign: "center",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  imageContainer: {
    marginBottom: 16,
    position: "relative",
  },
  cityImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  cityText: {
    position: "absolute",
    bottom: 16,
    left: 16,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  publishButton: {
    backgroundColor: "#00c06b",
    paddingVertical: 14,
    borderRadius: 20,
    position: "absolute",
    bottom: 80, // Para que esté por encima del menú
    left: 16,
    right: 16,
  },
  publishButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
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
  roomInfo: {
    padding: 10,
    backgroundColor: "#fff",
  },
  textOverlay: {
    position: "absolute", // Coloca el texto encima de la imagen
    bottom: 0, // Posiciona el texto en la parte inferior
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Fondo semitransparente
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
});
