import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button } from 'react-native';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleLogin = async (e) => {
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
      const userData = await response.json();
      if (!userData.token) {
        alert('Login failed: No token received');
        setLoading(false);
        return;
      }
      setToken(userData.token);
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
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View>
        <Text style={{ marginBottom: 10 }}>Password:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
        title="Login"
        onPress={handleLogin}
        color="#4CAF50"
      />
    </View>
  );
};

export default Login;
