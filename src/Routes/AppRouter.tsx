import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from '../components/ui/NavBar/NavBar';
import { Login } from '../auth/pages/Login/Login';
import { Register } from '../auth/pages/Register/Register';
import { Dashboard } from '../components/screens/Dashboard/Dashboard';


export const AppRouter = () => {



  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Dashboard/>} />



        
      </Routes>
    </BrowserRouter>
  );
};
