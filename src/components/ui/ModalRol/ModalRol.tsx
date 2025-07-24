import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../auth/store/authStore';
import styles from './ModalRol.module.css';
import axios from 'axios';

interface ModalRolProps {
  isOpen: boolean;
  onClose: () => void;
  onRolAdded?: () => void;
}

interface Area {
    id: number;
    nombre: string;
}


export const ModalRol: React.FC<ModalRolProps> = ({ isOpen, onClose, onRolAdded }) => {
  const [nombre, setNombre] = useState('');
  const [areas, setAreas] = useState<Area[]>([]);
  const [area, setArea] = useState<number>(0);
  
  const token = useAuthStore((state) => state.token);

    useEffect(() => {
    obtenerAreas();
  }, []);

  const obtenerAreas = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/areas', {
      });
      setAreas(response.data);
    } catch (error) {
      console.error('Error al obtener Areas:', error);
    }
  };

  const createRol = async (
    nombre: string, 
    area: number
  ) => {
        try {
      const response = await axios.post(
        'http://localhost:9000/api/roles',
        { nombre, area: { id: area } }, // <-- Cambia aquí
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status < 200 || response.status >= 300) throw new Error('Error al crear Rol');
      // const data = response.data;
    } catch (error) {
      console.error('error:', error);
    }
  }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        await createRol(nombre, area);
      
        if (onRolAdded) onRolAdded();
        onClose();
      } catch (error) {
        console.error('Error al crear beneficiario:', error);
      }
      handleClose();
    };
  
    const handleClose = () => {
      setNombre('');
      onClose();
    };
  
    if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Agregar Rol</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
            <label>Area:</label>
          <select
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            required
            >
            <option value={0} disabled>Seleccione un área</option>
            {areas.map((a) => (
                <option key={a.id} value={a.id}>
                {a.nombre}
                </option>
            ))}
           </select>

          <div className={styles.actions}>
            <button type="submit">Agregar</button>
            <button type="button" onClick={handleClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
