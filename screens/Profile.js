import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Obtener la ruta actual

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false} style={{ width }}>
          <Block flex style={styles.profileCard}>
            <Block middle style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://media.vogue.es/photos/5cc7630a329302148b86b773/master/w_1600%2Cc_limit/vogue_news_383814183.jpg",
                }}
                style={styles.avatar}
              />
            </Block>
            <Block middle style={styles.nameInfo}>
              <Text bold size={24} color="#32325D">
                Vanessa Santiago
              </Text>
              <Text size={16} color="#32325D" style={{ marginTop: 4 }}>
                28
              </Text>
              <Text size={12} color="#525F7F" style={{ marginTop: 4 }}>
                Miembro desde jueves, 08 de agosto de 2024
              </Text>
              <Text size={12} color="#525F7F" style={{ marginTop: 4 }}>
                0 Valoraciones
              </Text>
            </Block>
            <Block style={styles.editProfileButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
              >
                <View style={styles.editProfileButtonContainer}>
                  <Text style={styles.editProfileButtonText}>
                    editar perfil
                  </Text>
                </View>
              </TouchableOpacity>
            </Block>
            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Idiomas</Text>
              <Text style={styles.sectionText}>Español</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Área profesional</Text>
              <Text style={styles.sectionText}>Informática</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Personalidad e intereses</Text>

              <View style={styles.interestBlock}>
                <Ionicons
                  name="person-circle-outline"
                  size={24}
                  color="black"
                />
                <View>
                  <Text style={styles.interestTitle}>Personalidad</Text>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Alegre</Text>
                  </View>
                </View>
              </View>

              <View style={styles.interestBlock}>
                <Ionicons name="leaf-outline" size={24} color="black" />
                <View>
                  <Text style={styles.interestTitle}>Estilo de vida</Text>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Amante de los animales</Text>
                  </View>
                </View>
              </View>

              <View style={styles.interestBlock}>
                <Ionicons
                  name="musical-notes-outline"
                  size={24}
                  color="black"
                />
                <View>
                  <Text style={styles.interestTitle}>Música</Text>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Rock</Text>
                  </View>
                </View>
              </View>

              <View style={styles.interestBlock}>
                <Ionicons name="football-outline" size={24} color="black" />
                <View>
                  <Text style={styles.interestTitle}>Deportes</Text>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Béisbol</Text>
                  </View>
                </View>
              </View>

              <View style={styles.interestBlock}>
                <Ionicons name="film-outline" size={24} color="black" />
                <View>
                  <Text style={styles.interestTitle}>Tipos de películas</Text>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Documental</Text>
                  </View>
                </View>
              </View>
            </Block>
          </Block>
        </ScrollView>
      </Block>

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
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -20 : 0,
    flex: 1,
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    backgroundColor: theme.COLORS.black,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -70,
  },
  avatar: {
    width: 484,
    height: 464,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    alignItems: "center",
    marginTop: 20,
  },
  editProfileButton: {
    alignItems: "center",
    marginTop: 20,
  },
  editProfileButtonContainer: {
    backgroundColor: "#00c853",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  editProfileButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  additionalInfo: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 5,
  },
  subSectionTitle: {
    marginTop: 10,
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
    marginTop: 4,
  },
  interestBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  interestTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  tag: {
    backgroundColor: "#e0f7fa",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginLeft: 10,
  },
  tagText: {
    fontSize: 14,
    color: "#00796b",
  },
});

export default Profile;
