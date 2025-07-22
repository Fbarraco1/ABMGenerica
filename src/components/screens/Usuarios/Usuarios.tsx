// src/pages/Usuarios.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './Usuarios.module.css';
import ModalUsuario from '../../ui/ModalUsuario/ModalUsuario'; // Asegúrate que la ruta sea correcta

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const eliminarUsuario = async (id: number) => {
    try {
      await axios.delete(`http://localhost:9000/api/usuarios/${id}`);
      setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const editarUsuario = (id: number) => {
    console.log('Editar usuario con ID:', id);
    // Puedes reusar el modal en el futuro para editar, de momento sólo mostrar mensaje
  };

  const agregarUsuario = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <button onClick={agregarUsuario} style={{ marginBottom: '10px' }}>
        <FaPlus /> Agregar Usuario
      </button>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.email}</td>
              <td>{usuario.rol.nombre}</td>
              <td>
                <FaEdit
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => editarUsuario(usuario.id)}
                />
                <FaTrash
                  style={{ cursor: 'pointer', color: 'red' }}
                  onClick={() => eliminarUsuario(usuario.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔽 Modal de Agregar Usuario */}
      <ModalUsuario
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserAdded={() => {
          obtenerUsuarios(); // Recargar usuarios después de agregar
          setIsModalOpen(false); // Cerrar modal
        }}
      />
    </div>
  );
};
