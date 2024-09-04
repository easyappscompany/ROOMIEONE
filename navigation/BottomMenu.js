import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Importa tus pantallas
import HomeScreen from '../screens/Home';
import FavoriteAdsScreen from '../screens/FavoriteAdsScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function BottomMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Inicio':
              iconName = 'home';
              break;
            case 'Favoritos':
              iconName = 'heart';
              break;
            case 'Chat':
              iconName = 'chatbubble';
              break;
            case 'Perfil':
              iconName = 'person';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Favoritos" component={FavoriteAdsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
