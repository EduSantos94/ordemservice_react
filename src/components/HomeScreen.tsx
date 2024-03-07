import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import api from './services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'antd';

const { Meta } = Card;

type HomeScreenProps = {
  navigation: any;
};

interface OrderType {
  name: string;
  price: string;
  // other properties
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('user');
      const userData = JSON.parse(userDataString ?? '{"user_id": ""}');
      const userId = userData.user_id;
      const response = await api.get(`http://localhost:3330/users/${userId}`);
      const data = response.data;
      if(data.user.user_id === null || data.user.user_id === undefined) {
        setUserData([]);
        return;
      }
      const orders = await api.get(`http://localhost:3330/orders/provider/${userId}`);
      setOrderData(orders.data.order);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    {orderData && orderData.map((order: OrderType, index: number) => (
      <Card
        key={index}
        hoverable
        style={styles.card}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      >
        <Meta
          title={order.name ?? "Default Name"}
          description={order.price ?? "Default Email"}
        />
      </Card>
    ))}
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  card: {
    width: 240,
    margin: 8,
  },
  // image: {
  //   width: '100%',
  //   height: 200,
  // },
});

export default HomeScreen;
