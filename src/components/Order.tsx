import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, Pressable,Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './services/api';
// import { MultiSelect } from "react-multi-select-component";
// import { PaperSelect } from 'react-native-paper-select';

interface Product {
  product_id: number;
  name: string;
  price: number;
}

interface Service {
  product_id: number;
  name: string;
  price: number;
}

const Order: React.FC = () => {
  const [user, setUser] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [price, setPrice] = useState('');
  const [observation, setObservation] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState('');
  const [newService, setNewService] = useState('');
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);

  const saveNewProduct = async () => {
    try {
      const response = await api.post('products', {
        name: newProduct,
        price: '0.00'
      });
      const data = response.data;
      if(data.product.name === null || data.product.name === undefined) {
        return;
      }
      setProducts([...products, data.product.product_id]);
      setProductModalVisible(!productModalVisible);
    } catch (error) {
      console.error('Error during login:', error);
      setProductModalVisible(productModalVisible);
    }
  };

  const saveNewService = async () => {
    try {
      const response = await api.post('services', {
        name: newService,
        price: '0.00'
      });
      const data = response.data;
      if(data.service.name === null || data.service.name === undefined) {
        return;
      }
      setServices([...services, data.service.service_id]);
      setServiceModalVisible(!serviceModalVisible);
    } catch (error) {
      console.error('Error during login:', error);
      setServiceModalVisible(serviceModalVisible);
    }
  };

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
        <Modal animationType="slide"
        transparent={true}
        visible={serviceModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setServiceModalVisible(!serviceModalVisible);
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Novo serviço</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
                value={newService}
                onChangeText={(text: string) => setNewService(text)}
              />
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => saveNewService()}>
                <Text style={styles.textStyle}>Salvar</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setServiceModalVisible(true)}>
        <Text style={styles.textStyle}>+</Text>
      </Pressable>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ marginBottom: 10 }}>Produtos</Text>
        <Modal animationType="slide"
        transparent={true}
        visible={productModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setProductModalVisible(!productModalVisible);
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Novo produto</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
                value={newProduct}
                onChangeText={(text: string) => setNewProduct(text)}
              />
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => saveNewProduct()}>
                <Text style={styles.textStyle}>Salvar</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setProductModalVisible(true)}>
        <Text style={styles.textStyle}>+</Text>
      </Pressable>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ marginBottom: 10 }}>Total</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8 }}
          value={price}
          onChangeText={(text: string) => setPrice(text)}
          inputMode="numeric"
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ marginBottom: 10 }}>Observações:</Text>
        <TextInput
          style={{ height: 100, borderColor: 'gray', borderWidth: 1, padding: 8, verticalAlign: 'top' }}
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
      <Pressable onPress={handleSave}>
        <Text>Save</Text>
      </Pressable>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#45a049',
  },
  buttonClose: {
    backgroundColor: '#45a049',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Order;