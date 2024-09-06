import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener esta biblioteca instalada

const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla

export default function RoomDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { room } = route.params; // Obtener los detalles del cuarto desde los parámetros de navegación
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice actual de la imagen

  // Función para regresar a la pantalla RoomSearch
  const goBack = () => {
    navigation.navigate('RoomSearch'); // Asegúrate de que 'RoomSearch' esté configurada en tus rutas
  };

  // Función para actualizar el índice actual cuando se desliza
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / width);
    setCurrentIndex(currentIndex);
  };

  // Función para contactar al dueño (puedes modificarla según tus necesidades)
  const contactOwner = () => {
    // Aquí puedes implementar la lógica para contactar al dueño, como abrir un chat, enviar un correo, etc.
    alert('Contactando al dueño...');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Botón de regreso */}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
            onScroll={handleScroll}
            scrollEventThrottle={16} // Asegura que el evento de scroll se detecte de forma fluida
          >
            {room.imageUrls.map((imageUrl, index) => (
              <Image key={index} style={styles.image} source={{ uri: imageUrl }} />
            ))}
          </ScrollView>

          {/* Texto indicador para deslizar */}
          <Text style={styles.swipeText}>Desliza para ver más</Text>

          {/* Indicador visual (puntos) */}
          <View style={styles.indicatorContainer}>
            {room.imageUrls.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentIndex === index ? styles.activeIndicator : styles.inactiveIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{room.title}</Text>
          <Text style={styles.price}>${room.monthlyRent}/mes</Text>

          {/* Caja con detalles principales */}
          <View style={styles.detailBox}>
            <Text style={styles.description}>{room.description}</Text>
          </View>

          {/* Caja con información del cuarto */}
          <View style={styles.detailBox}>
            <Text style={styles.location}><Text style={styles.label}>País:</Text>{room.country}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Estado:</Text> {room.estate}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Ciudad:</Text> {room.city}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Dirección:</Text> {room.address}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Número de casa:</Text> {room.houseNumber}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Depósito requerido:</Text> {room.depositRequired ? 'Sí' : 'No'}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botón de "Contactar al dueño" */}
      <TouchableOpacity style={styles.contactButton} onPress={contactOwner}>
        <Icon name="call" size={20} color="#fff" style={styles.contactIcon} />
        <Text style={styles.contactButtonText}>Contactar al propietario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00c06b',
    padding: 10,
    borderRadius: 8,
    margin: 16,
    alignSelf: 'flex-start',
  },
  carouselContainer: {
    position: 'relative',
  },
  carousel: {
    height: 300,
  },
  image: {
    width: width,
    height: 300,
  },
  swipeText: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    flexDirection: 'row',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: 'rgb(0, 192, 107)',
  },
  inactiveIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  price: {
    fontSize: 20,
    color: '#00c06b',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 8,
  },
  detailBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  detail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  location: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
  contactButton: {
    backgroundColor: '#00c06b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  contactIcon: {
    marginRight: 8,
  },
});
