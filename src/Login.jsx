import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://backnodecisneros.onrender.com/siginUsuario', {
        nombre,
        password
      });

      const data = response.data;
      if (data.existe) {
        onLogin(true);
        if (data.admin) {
          navigate('/admin'); // Redirige a la página del administrador
        } else {
          navigate('/home'); // Redirige a la página de inicio para usuarios normales
        }
      } else {
        onLogin(false);
        alert('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="container">
      <img src="/assets/cropped-iconoweb.png" alt="Logo" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Iniciar sesión</button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
