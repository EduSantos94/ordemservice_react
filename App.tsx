import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Login from './src/components/Login';
import HomeScreen from './src/components/HomeScreen';
import Services from './src/components/Services';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user !== null) {
          setIsLoggedIn(true);
        }
        if (user === null) {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkLoginStatus();
  });

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={isLoggedIn === null ? 'Login' : isLoggedIn ? 'Home' : 'Login'}>
        <Tab.Screen name="Login" component={Login} options={{ tabBarStyle: { display: 'none' } }} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Services" component={Services} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
