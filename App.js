import Login from './Login';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <div className="App">
      <Login />
    </div>
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
