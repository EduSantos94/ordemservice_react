import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


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
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </label>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
