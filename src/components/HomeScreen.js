import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bem-vindo à tela inicial</Text>
      <Text style={styles.paragraph}>
        Esta é a tela inicial da sua aplicação. Adicione mais conteúdo aqui conforme necessário.
      </Text>
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
