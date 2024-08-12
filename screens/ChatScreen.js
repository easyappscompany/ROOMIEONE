import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
  const [filter, setFilter] = useState('Todos');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute(); // Obtener la ruta actual

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mensajes</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterContainer}>
          <Text style={styles.filterText}>{filter}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Image source={require('../assets/imgs/mailbox.png')} style={styles.image} />
        <Text style={styles.noMessagesText}>No hay mensajes</Text>
        <Text style={styles.subText}>Prueba filtrando por otra categoría.</Text>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => handleFilterChange('Todos')} style={styles.modalItem}>
            <Text style={styles.modalItemText}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('Pendientes')} style={styles.modalItem}>
            <Text style={styles.modalItemText}>Pendientes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('En curso')} style={styles.modalItem}>
            <Text style={styles.modalItemText}>En curso</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilterChange('Terminados')} style={styles.modalItem}>
            <Text style={styles.modalItemText}>Terminados</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons 
            name="home-outline" 
            size={24} 
            color={route.name === 'Home' ? '#00c06b' : 'black'} 
          />
          <Text style={[styles.footerText, { color: route.name === 'Home' ? '#00c06b' : 'black' }]}>
            Inicio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}>
          <Ionicons 
            name="heart-outline" 
            size={24} 
            color={route.name === 'Fav' ? '#00c06b' : 'black'} 
          />
          <Text style={[styles.footerText, { color: route.name === 'Fav' ? '#00c06b' : 'black' }]}>
            Favoritos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons 
            name="chatbubble-outline" 
            size={24} 
            color={route.name === 'Chat' ? '#00c06b' : 'black'} 
          />
          <Text style={[styles.footerText, { color: route.name === 'Chat' ? '#00c06b' : 'black' }]}>
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons 
            name="person-outline" 
            size={24} 
            color={route.name === 'Profile' ? '#00c06b' : 'black'} 
          />
          <Text style={[styles.footerText, { color: route.name === 'Profile' ? '#00c06b' : 'black' }]}>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  noMessagesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginLeft: -5,
    marginTop: 4,
  },
});

export default ChatScreen;
