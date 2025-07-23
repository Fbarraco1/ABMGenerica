import React, { useState } from 'react';
import { useAuthStore } from '../../../auth/store/authStore'; 
import styles from './modalBeneficiario.module.css';
import axios from 'axios';

interface ModalBeneficiarioProps {
  isOpen: boolean;
  onClose: () => void;
  onBeneficiarioAdded?: () => void;
}

const ModalBeneficiario: React.FC<ModalBeneficiarioProps> = ({ isOpen, onClose, onBeneficiarioAdded }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [cuil, setCuil] = useState('');
  const [telefono, setTelefono] = useState('');
  const token = useAuthStore((state) => state.token); 

  const createBene = async (
    nombre: string,
    apellido: string,
    dni: string,
    cuil: string,
    telefono: string
  ) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/beneficiarios',
        { nombre, apellido, dni, cuil, telefono }, // <-- los datos van aquí
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status < 200 || response.status >= 300) throw new Error('Error al crear beneficiario');
      // const data = response.data;
    } catch (error) {
      console.error('Login error:', error);
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createBene(nombre, apellido, dni, cuil, telefono);
    
      if (onBeneficiarioAdded) onBeneficiarioAdded();
      onClose();
    } catch (error) {
      console.error('Error al crear beneficiario:', error);
    }
    handleClose();
  };

  const handleClose = () => {
    setNombre('');
    setApellido('');
    setDni('');
    setCuil('');
    setTelefono('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Agregar Beneficiario</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          <label>DNI:</label>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />

          <label>CUIL:</label>
          <input
            type="text"
            value={cuil}
            onChange={(e) => setCuil(e.target.value)}
            required
          />

          <label>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          <div className={styles.actions}>
            <button type="submit">Agregar</button>
            <button type="button" onClick={handleClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBeneficiario;
