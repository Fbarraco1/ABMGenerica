import React, { useState } from 'react';
import styles from './modalBeneficiario.module.css';

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


      
  const createBene = async (nombre, apellido, dni, cuil, telefono) => {
        try {
          const response = await fetch('http://localhost:9000/api/beneficiarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, dni, cuil, telefono }),
          });

          if (!response.ok) throw new Error('Error al crear beneficiario');

          const data = await response.json();
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
            type="number"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          <div className={styles.actions}>
            <button type="submit">Agregar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBeneficiario;
