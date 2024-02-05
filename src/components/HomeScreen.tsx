import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type HomeScreenProps = {
  navigation: any;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3330/users/1');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bem-vindo à tela inicial</Text>
      <Text style={styles.paragraph}>
        Esta é a tela inicial da sua aplicação. Adicione mais conteúdo aqui conforme necessário.
      </Text>
      {userData && (
        <Text style={styles.paragraph}>
          Dados do usuário: {JSON.stringify(userData)}
        </Text>
      )}
      <Button
        title="Ir para a Tela de Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default HomeScreen;
