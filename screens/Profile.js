import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  View,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { Block, Text } from "galio-framework";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [userName, setUserName] = useState("Cargando...");
  const [userPhoto, setUserPhoto] = useState("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540easyappscompany%252Fargon-free-react-native/ImagePicker/705a9012-6f59-4b06-b089-1c71e95a2050.jpeg"
);
  const [userEmail, setUserEmail] = useState("Cargando...");
  const [modalVisible, setModalVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;

  // Nuevos estados
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(""); 
  const [ine, setIne] = useState("");
  const [rfc, setRfc] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [interiorNumber, setInteriorNumber] = useState("");
  const [exteriorNumber, setExteriorNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const loadUserData = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          setUserName(user.displayName || "Nombre no disponible");
          setUserPhoto(user.photos || "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540easyappscompany%252Fargon-free-react-native/ImagePicker/7589d2d2-92d0-4daf-a697-e5bc678d17e1.jpeg");
          setUserEmail(user.email || "Email no disponible");

          const db = getFirestore();
          const userDoc = doc(db, "users", user.email);
          const userSnap = await getDoc(userDoc);

          if (userSnap.exists()) {
            const userData = userSnap.data();

            const dobTimestamp = userData.dob;
            if (dobTimestamp && dobTimestamp.seconds) {
              const dobDate = new Date(dobTimestamp.seconds * 1000);
              setDob(dobDate.toLocaleDateString());
            }

            setGender(userData.gender || "");
            setIne(userData.ine || "");
            setRfc(userData.rfc || "");
            setCountry(userData.country || "");
            setState(userData.state || "");
            setCity(userData.city || "");
            setStreet(userData.street || "");
            setInteriorNumber(userData.interiorNumber || "");
            setExteriorNumber(userData.exteriorNumber || "");
            setPostalCode(userData.postalCode || "");
          } else {
            console.log("No se encontró el documento para este usuario.");
          }
        }
      };

      loadUserData();
    }, [])
  );

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      navigation.navigate("Login");
    });
  };

  const handleImagePress = () => {
    setModalVisible(true);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false} style={{ width }}>
          <Block flex style={styles.profileCard}>
            <Block middle style={styles.avatarContainer}>
              <TouchableOpacity onPress={handleImagePress}>
                <Image
                  source={{ uri: userPhoto }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </Block>
            <Block middle style={styles.nameInfo}>
              <Text bold size={24} color="#32325D">
                {userName}
              </Text>
              <Text size={14} color="#525F7F" style={{ marginTop: 4 }}>
                {userEmail}
              </Text>
            </Block>
            <Block style={styles.editProfileButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
              >
                <View style={styles.editProfileButtonContainer}>
                  <Text style={styles.editProfileButtonText}>
                    Editar perfil
                  </Text>
                </View>
              </TouchableOpacity>
            </Block>

            {/* Nuevos campos */}
            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Fecha de nacimiento</Text>
              <Text style={styles.sectionText}>{dob}</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Género</Text>
              <Text style={styles.sectionText}>{gender}</Text> 
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>INE</Text>
              <Text style={styles.sectionText}>{ine}</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>RFC</Text>
              <Text style={styles.sectionText}>{rfc}</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>País</Text>
              <Text style={styles.sectionText}>{country}</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Estado</Text>
              <Text style={styles.sectionText}>{state}</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Ciudad/Municipio</Text>
              <Text style={styles.sectionText}>{city}</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Calle</Text>
              <Text style={styles.sectionText}>{street}</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Número Interior</Text>
              <Text style={styles.sectionText}>{interiorNumber}</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Número Exterior</Text>
              <Text style={styles.sectionText}>{exteriorNumber}</Text>
            </Block>

            <Block style={styles.section}>
              <Text style={styles.sectionTitle}>Código Postal</Text>
              <Text style={styles.sectionText}>{postalCode}</Text>
            </Block>

            <Block style={styles.logoutButton}>
              <TouchableOpacity onPress={handleLogout}>
                <View style={styles.logoutButtonContainer}>
                  <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                </View>
              </TouchableOpacity>
            </Block>
          </Block>
        </ScrollView>
      </Block>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity onPress={handleCloseModal}>
            <Animated.Image
              source={{ uri: userPhoto }}
              style={[
                styles.modalImage,
                {
                  transform: [{ scale: scaleValue }],
                },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Modal>

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
    </Block>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? 10 : 0,
    flex: 1,
  },
  profileCard: {
    padding: 20,
    marginHorizontal: 20,
    marginTop: 65,
    backgroundColor: "#FFFFFF",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 5,
    zIndex: 2,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -70,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionText: {
    fontSize: 16,
    color: "#525F7F",
  },
  logoutButton: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  logoutButtonContainer: {
    backgroundColor: "#f44336",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default Profile;
