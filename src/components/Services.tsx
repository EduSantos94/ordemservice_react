import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Services: React.FC = () => {
  const [user, setUser] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [price, setPrice] = useState('');

  const handleSave = async () => {
    const user = await AsyncStorage.getItem('user');
    const userObject = JSON.parse(user ?? '{"user_id": ""}');
    const company_id = userObject.company_id;

    // Save the data to your backend or local storage
    console.log('Save button pressed with ', {
      user,
      isPaid,
      isDone,
      price,
      company_id
    });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, React Native with TypeScript!</Text>
      <View>
        <Text style={{ marginBottom: 10 }}>Cliente:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          value={user}
          onChangeText={(text: string) => setUser(text)}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ marginBottom: 10 }}>Price:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8 }}
          value={price}
          onChangeText={(text: string) => setPrice(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Switch
          value={isPaid}
          onValueChange={() => setIsPaid(false)}
          style={{ marginRight: 10 }}
        />
        <Text>Finalizado</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Switch
          value={isDone}
          onValueChange={() => setIsDone(false)}
          style={{ marginRight: 10 }}
        />
        <Text>Pago</Text>
      </View>
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Services;