import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const Searches = () => {
    const navigation = useNavigation(); // Obtén acceso a la navegación

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('Home')} // Navega a Home.js
            >
                <Text style={styles.backText}>{'<'} </Text>
            </TouchableOpacity>
            <Text style={styles.title}>Mis búsquedas</Text>
            <Text style={styles.subtitle}>
            Este espacio te permite guardar tus búsquedas y acceder a ellas en cualquier momento, sin perder ningún detalle.
            </Text>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/10308/10308116.png' }} // Reemplaza con la URL de tu imagen
                    style={styles.image}
                />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Iniciar una búsqueda nueva</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
    },
    backText: {
        fontSize: 25,
        color: 'black',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6b6b6b',
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#34A853',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Searches;
