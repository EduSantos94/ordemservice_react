import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, GestureResponderEvent } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


type LoginProps = {};

type UserData = {
  token: string;
  user: [
    user_id: string
  ];
};

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3330/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
        setLoading(false);
        return;
      }
      const userData: UserData = await response.json();
      if (!userData.token) {
        alert('Login failed: No token received');
        setLoading(false);
        return;
      }
      // localStorage.setItem('user_token', userData.token);
      await AsyncStorage.setItem('user_token', userData.token);
      await AsyncStorage.setItem('user', JSON.stringify(userData.user));
      navigation.navigate('Home');
      setLoading(false);
    } catch (error) {
      console.error('Error during login:', error);
      setLoading(false);
    }
  };

  return (
    <View style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Login</Text>
      <View>
        <Text style={{ marginBottom: 10 }}>Username:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          value={username}
          onChangeText={(text: string) => setUsername(text)}
        />
      </View>
      <View>
        <Text style={{ marginBottom: 10 }}>Password:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          secureTextEntry
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />
      </View>
      <Button
        title="Login"
        onPress={(event) => handleLogin(event)}
        color="#4CAF50"
      />
    </View>
  );
};

export default Login;