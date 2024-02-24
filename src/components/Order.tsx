import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Order: React.FC = () => {
  const [user, setUser] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [price, setPrice] = useState('');
  const [observation, setObservation] = useState('');
  const [services, setServices] = useState('');
  const [products, setProducts] = useState('');

  const handleSave = async () => {
    const user = await AsyncStorage.getItem('user');
    const userObject = JSON.parse(user ?? '{"user_id": ""}');
    const company_id = userObject.company_id;
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
      <Text style={styles.text}>Ordem de Serviço</Text>
      <View>
        <Text style={{ marginBottom: 10 }}>Cliente</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
          value={user}
          onChangeText={(text: string) => setUser(text)}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ marginBottom: 10 }}>Serviços</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8 }}
          value={services}
          onChangeText={(text: string) => setServices(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ marginBottom: 10 }}>Produtos</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8 }}
          value={products}
          onChangeText={(text: string) => setProducts(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ marginBottom: 10 }}>Total</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8 }}
          value={price}
          onChangeText={(text: string) => setPrice(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ marginBottom: 10 }}>Observações:</Text>
        <TextInput
          style={{ height: 100, borderColor: 'gray', borderWidth: 1, padding: 8, textAlignVertical: 'top' }}
          value={observation}
          onChangeText={(text: string) => setObservation(text)}
          multiline
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text>Finalizado</Text>
        <Switch
          value={isPaid}
          onValueChange={(value) => setIsPaid(value)}
          style={{ marginRight: 10 }}
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <Text>Pago</Text>
        <Switch
          value={isDone}
          onValueChange={(value) => setIsDone(value)}
          style={{ marginRight: 10 }}
        />
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

export default Order;