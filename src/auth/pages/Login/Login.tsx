// src/auth/pages/Login/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import styles from './Login.module.css';

export const Login = () => {
  const navigate = useNavigate();
  const { startLogin } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await startLogin(email, password);
      navigate('/');
    } catch (error) {
      setErrorMsg('Credenciales inválidas');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

