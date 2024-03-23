import React, { useState, useEffect } from 'react';
import { View, Text, TextInput ,StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './services/api';
import { BASE_URL } from '@env';

const App: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [plan, setPlan] = useState<string>('');
  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('user');
      const userData = JSON.parse(userDataString ?? '{"user_id": ""}');
      const userId = userData.user_id;
      const response = await api.get(`${BASE_URL}users/${userId}`);
      const data = response.data;
      if(data.user.user_id === null || data.user.user_id === undefined) {
        setUserData([]);
        return;
      }
      setUserData(data);
      setName(data.user.name);
      setEmail(data.user.email);
      setPhone(data.user.phone);
      setPassword(data.user.password);
      setCompany(data.user.company);
      setPlan(data.user.plan);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`${BASE_URL}users/${userData.user.user_id}`, {
        name,
        email,
        phone,
        password,
      });
      const data = response.data;
      if(data.user.user_id === null || data.user.user_id === undefined) {
        setUserData([]);
        return;
      }
      setUserData(data);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <View style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Conta</Text>
      <View>
        <Text style={{ marginBottom: 10 }}>Name:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          value={name}
          onChangeText={(text: string) => setName(text)}
        />
      </View>
      <View>
        <Text style={{ marginBottom: 10 }}>Email:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          value={email}
          onChangeText={(text: string) => setEmail(text)}
        />
      </View>
      <View>
        <Text style={{ marginBottom: 10 }}>Celular:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          value={phone}
          onChangeText={(text: string) => setPhone(text)}
        />
      </View>
      <View>
        <Text style={{ marginBottom: 10 }}>Empresa:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          value={company}
          onChangeText={(text: string) => setCompany(text)}
        />
      </View>
      <View>
        <Text style={{ marginBottom: 10 }}>Plano:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          value={plan}
          onChangeText={(text: string) => setPlan(text)}
        />
      </View>
      {/* <View>
        <Text style={{ marginBottom: 10 }}>Password:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          secureTextEntry
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />
      </View> */}
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#45a049' : '#4CAF50',
          padding: 10,
          alignItems: 'center',
          borderRadius: 5,
        })}
        onPress={handleSave}
        role="button"
      >
        <Text style={{ color: 'white' }}>Login</Text>
      </Pressable>
    </View>
  );
};

export default App;
