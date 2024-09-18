import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function FilteredRoomsScreen({ route }) {
  const { rooms } = route.params || { rooms: [] };  // Predeterminado a un array vacío si no se pasan habitaciones

  const renderRoom = ({ item }) => {
    const roomImageUrl = item.imageUrls && item.imageUrls.length > 0
      ? item.imageUrls[0]  // Toma la primera imagen si hay imágenes disponibles
      : 'https://via.placeholder.com/400x300';  // Imagen de reemplazo si no hay imágenes

    return (
      <TouchableOpacity style={styles.card}>
        <Image
          style={styles.roomImage}
          source={{ uri: roomImageUrl }}  // Muestra la primera imagen o el placeholder
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.budget}>
            Presupuesto: {item.monthlyRent !== undefined && item.monthlyRent !== null ? `$${item.monthlyRent}` : 'No especificado'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {rooms.length > 0 ? (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id}
          renderItem={renderRoom}
        />
      ) : (
        <Text style={styles.noResultsText}>No se encontraron cuartos.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  roomImage: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  budget: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
