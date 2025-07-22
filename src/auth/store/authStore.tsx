// src/auth/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {  email: string } | null;

  startLogin: (email: string, contrasena: string) => Promise<void>;
  startRegister: (email: string, contrasena: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      user: null,

      startLogin: async (email, contrasena) => {
        try {
          const response = await fetch('http://localhost:9000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contrasena }),
          });

          if (!response.ok) throw new Error('Error al iniciar sesión');

          const data = await response.json();
          set({
            token: data.token,
            isAuthenticated: true,
            user: { email }, 
          });
        } catch (error) {
          console.error('Login error:', error);
        }
      },

      startRegister: async (email, contrasena) => {
        try {
          const response = await fetch('http://localhost:9000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contrasena }),
          });

          if (!response.ok) throw new Error('Error al registrarse');

          const data = await response.json();
          set({
            token: data.token,
            isAuthenticated: true,
            user: data.user,
          });
        } catch (error) {
          console.error('Register error:', error);
        }
      },

      logout: () => {
        set({ token: null, isAuthenticated: false, user: null });
        localStorage.removeItem('auth-storage'); // opcional si usás persistencia local
      },
    }),
    {
      name: 'auth-storage', // Nombre en localStorage
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
