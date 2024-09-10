import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('window'); 

export default function MyRoomDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { roomId } = route.params; // Obtenemos el ID del cuarto desde la navegación
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomDoc = await db.collection('rooms').doc(roomId).get();
        if (roomDoc.exists) {
          setRoom(roomDoc.data());
        } else {
          console.log('No se encontró el cuarto.');
        }
      } catch (error) {
        console.error('Error obteniendo los detalles del cuarto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00c06b" />;
  }

  return (
    <View style={styles.wrapper}>
      {/* Botón Go Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('MyRooms')}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <ScrollView style={styles.container}>

        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {room.imageUrls.map((imageUrl, index) => (
              <Image key={index} style={styles.image} source={{ uri: imageUrl }} />
            ))}
          </ScrollView>

          <Text style={styles.swipeText}>Desliza para ver más</Text>

          <View style={styles.indicatorContainer}>
            {room.imageUrls.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === 0 ? styles.activeIndicator : styles.inactiveIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{room.title}</Text>
          <Text style={styles.price}>${room.monthlyRent}/mes</Text>

          <View style={styles.detailBox}>
            <Text style={styles.description}>{room.description}</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.location}><Text style={styles.label}>País:</Text>{room.country}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Estado:</Text> {room.estate}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Ciudad:</Text> {room.city}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Dirección:</Text> {room.address}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Número de casa:</Text> {room.houseNumber}</Text>
            <Text style={styles.detail}><Text style={styles.label}>Depósito requerido:</Text> {room.depositRequired ? 'Sí' : 'No'}</Text>
          </View>

          {/* Botón Editar Cuarto */}
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditRoom', { roomId })}>
            <Icon name="edit" size={20} color="#fff" />
            <Text style={styles.editButtonText}>Editar Cuarto</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
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
  backButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});
