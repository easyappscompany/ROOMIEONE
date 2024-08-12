import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

// Datos actualizados
const favoriteAds = [
  {
    id: "1",
    title: "Cuarto para una persona",
    image:
      "https://d38qrl83hrqn1t.cloudfront.net/media/catalog/product/cache/e5313a059d82e47a0dd0c73b13afb6be/r/e/recamara-moderna-ks-cindy-chapa-okume-decorado-dc-20_web.jpg", // URL de la imagen
    user: "Juan Pérez",
    age: 30,
    price: "$100 MXN/mes",
  },
  {
    id: "2",
    title: "Cuarto minimalista",
    description: "Descripción del anuncio 2",
    image:
      "https://scontent-hou1-1.xx.fbcdn.net/v/t1.6435-9/40020423_1746756535423363_474230360176066560_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=25d718&_nc_eui2=AeG6YfF0W8UYc8HysA3lB9uotx9AuwmBvGa3H0C7CYG8ZgJHlaq9XgWOvY9_0Vry4VPSDqrcMvxSbqa2rzzdpQnT&_nc_ohc=4L9odAm7wq4Q7kNvgHf8BLT&_nc_ht=scontent-hou1-1.xx&oh=00_AYC7DFVDmxO-CHHjeVFXE4FNsHSRpqWWP4DnY5r_pqv8dg&oe=66DDE132", // URL de la imagen
    user: "María López",
    age: 25,
    price: "$200 MXN/mes",
  },
];

const FavoriteAdsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const renderItem = ({ item }) => (
    <View style={styles.adItem}>
      <Image source={{ uri: item.image }} style={styles.adImage} />
      <View style={styles.adInfo}>
        <Text style={styles.adTitle}>{item.title}</Text>
        {item.description && (
          <Text style={styles.adDescription}>{item.description}</Text>
        )}
        <Text style={styles.adUser}>
          Publicado por: {item.user}, Edad: {item.age}
        </Text>
        <Text style={styles.adPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Anuncios Favoritos</Text>
      </View>

      <FlatList
        data={favoriteAds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <Button
        title="Empezar a buscar"
        onPress={() => navigation.navigate("Buscar")}
        style={styles.searchButton}
      />

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchButton: {
    marginBottom: 52, 
  },
  list: {
    flexGrow: 1,
    marginVertical: 20,
  },
  adItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  adImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  adInfo: {
    flex: 1,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  adDescription: {
    fontSize: 16,
    color: "#555",
  },
  adUser: {
    fontSize: 14,
    color: "#888",
  },
  adPrice: {
    fontSize: 16,
    color: "#00c06b",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    marginLeft: -5,
    marginTop: 4,
  },
});

export default FavoriteAdsScreen;
