// src/auth/pages/Register/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import styles from './Register.module.css';

export const Register = () => {
  const navigate = useNavigate();
  const { startRegister } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await startRegister(name, email, password);
      navigate('/');
    } catch (error) {
      setErrorMsg('Error al registrarse');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};
