import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import styles from './Beneficiarios.module.css';
import { useAuthStore } from '../../../auth/store/authStore';

interface Beneficiario {
  id: number;
  nombre: string;
  apellido: string;
  dni: number;
  cuil: number;
  telefono: number;
}

export const Beneficiarios: React.FC = () => {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    obtenerBeneficiarios();
  }, []);

  const obtenerBeneficiarios = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/beneficiarios', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBeneficiarios(response.data);
    } catch (error) {
      console.error('Error al obtener beneficiarios:', error);
    }
  };

  const eliminarBeneficiario = async (id: number) => {
    try {
      await axios.delete(`http://localhost:9000/api/beneficiarios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBeneficiarios(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error al eliminar beneficiario:', error);
    }
  };

  const editarBeneficiario = (id: number) => {
    console.log('Editar beneficiario con ID:', id);
    // Podés abrir un modal en el futuro para editar
  };

  const agregarBeneficiario = () => {
    setIsModalOpen(true); // Modal aún no implementado
  };

  return (
    <div className={styles.container}>
  <h2 className={styles.title}>Beneficiarios</h2>
  <button className={styles.addButton} onClick={agregarBeneficiario}>
    <FaPlus /> Agregar Beneficiario
  </button>

  <table className={styles.table}>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>DNI</th>
        <th>CUIL</th>
        <th>Teléfono</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {beneficiarios.map((b) => (
        <tr key={b.id}>
          <td>{b.nombre}</td>
          <td>{b.apellido}</td>
          <td>{b.dni}</td>
          <td>{b.cuil}</td>
          <td>{b.telefono}</td>
          <td className={styles.actions}>
            <FaEdit
              className={styles.editIcon}
              onClick={() => editarBeneficiario(b.id)}
            />
            <FaTrash
              className={styles.deleteIcon}
              onClick={() => eliminarBeneficiario(b.id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};
