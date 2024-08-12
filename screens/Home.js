import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native"; // Importar useRoute
import { Ionicons } from "@expo/vector-icons"; // Importar Ionicons para el menú

export default function Home() {
  const navigation = useNavigation(); // Inicializar navigation
  const route = useRoute(); // Obtener la ruta actual

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.header}>Reserva tu habitación con seguridad</Text>
        <Text style={styles.subHeader}>
          Más de <Text style={styles.boldText}>2 millones</Text> de personas ya
          confían en <Text style={styles.boldText}>RommieOne.</Text> ¡Únete!
        </Text>
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
            <Icon name="sliders" size={20} color="#000" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Preferencias de búsqueda</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Busca en</Text>
        {/* Lista de ciudades */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.cityImage}
            source={{
              uri: "https://www.mexicodesconocido.com.mx/wp-content/uploads/2019/04/41525992451_953f7e233b_o.jpg",
            }}
          />
          <Text style={styles.cityText}>CDMX</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cityImage}
            source={{
              uri: "https://images.pexels.com/photos/543252/pexels-photo-543252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
          />
          <Text style={styles.cityText}>GUADALAJARA</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cityImage}
            source={{
              uri: "https://www.shutterstock.com/shutterstock/videos/1084043488/thumb/1.jpg?ip=x480",
            }}
          />
          <Text style={styles.cityText}>MONTERREY</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cityImage}
            source={{
              uri: "https://media.istockphoto.com/id/1128095909/es/foto/fuente-hist%C3%B3rica-puebla.jpg?s=612x612&w=0&k=20&c=Ql0wQCPqNW3Xzkc7Krw9gRspO3KeNKeFFOthMMgqgWg=",
            }}
          />
          <Text style={styles.cityText}>PUEBLA</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cityImage}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt7fRUC_L5wVKN19-f3-RLNiUEQ8lCveULXQ&s",
            }}
          />
          <Text style={styles.cityText}>BOCA DEL RIO</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cityImage}
            source={{
              uri: "https://nitu.mx/wp-content/uploads/2020/09/Puerto-Vallarta_.jpg",
            }}
          />
          <Text style={styles.cityText}>PUERTO VALLARTA</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cityImage}
            source={{
              uri: "https://www.revistatravel.mx/images/showid/5818278",
            }}
          />
          <Text style={styles.cityText}>TIJUANA</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cityImage}
            source={{
              uri: "https://st3.depositphotos.com/4651905/18986/i/950/depositphotos_189865962-stock-illustration-cancun-mexico-inscription-in-front.jpg",
            }}
          />
          <Text style={styles.cityText}>CANCÚN</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cityImage}
            source={{
              uri: "https://res.cloudinary.com/simpleview/image/upload/v1672768705/clients/loscabosmx/The_Arch_3_3__5e43fe14-83a8-41e3-9189-e54dc5c75c95.jpg",
            }}
          />
          <Text style={styles.cityText}>LOS CABOS</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cityImage}
            source={{
              uri: "https://media.admagazine.com/photos/618a6737a9f7fab6f0622ef6/16:9/w_2992,h_1683,c_limit/66143.jpg",
            }}
          />
          <Text style={styles.cityText}>OAXACA</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.publishButton}>
        <Text style={styles.publishButtonText}>Publica tu cuarto</Text>
      </TouchableOpacity>

      {/* Menú de navegación inferior */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
});
