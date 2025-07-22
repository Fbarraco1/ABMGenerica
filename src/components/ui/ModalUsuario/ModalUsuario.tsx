// components/ModalUsuario.tsx
import React, { useState } from 'react';
import styles from './ModalUsuario.module.css';
import { useAuthStore } from '../../../auth/store/authStore';


interface ModalUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded?: () => void; // para recargar la tabla después de agregar
}

const ModalUsuario: React.FC<ModalUsuarioProps> = ({ isOpen, onClose, onUserAdded }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const startRegister = useAuthStore((state) => state.startRegister);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await startRegister(email, contrasena);
      if (onUserAdded) onUserAdded(); // para refrescar la tabla
      onClose(); // cerrar modal
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Agregar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <div className={styles.actions}>
            <button type="submit">Registrar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUsuario;
