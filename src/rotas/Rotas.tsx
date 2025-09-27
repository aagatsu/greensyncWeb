import { Routes, Route } from 'react-router-dom';
import { Home } from '../telas/Home';
import { TelaInicial } from '../telas/TelaInicial';
import { Login } from '../telas/Login';
import { Cadastro } from '../telas/Cadastro';
import { Perfil } from '../telas/Perfil';
import { EditarPerfil } from '../telas/EditarPerfil';
import { ListaPlantas } from '../telas/ListaPlantas';
import { PlantaDetalhe } from '../telas/PlantaDetalhe';
import { AdicionarPlanta } from '../telas/AdicionarPlanta';
import { Estufas } from '../telas/Estufas';
import { Sobre } from '../telas/Sobre';
import { AdicionarEstufa } from '../telas/AdicionarEstufa';
import { EstufaDetalhe } from '../telas/EstufaDetalhe';
import { EditarPlanta } from '../telas/EditarPlanta';

export function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<TelaInicial />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cadastro' element={<Cadastro />} />
      <Route path='/home' element={<Home />} />
      <Route path='/perfil' element={<Perfil />} />
      <Route path='/perfil/editar' element={<EditarPerfil />} />
      <Route path='/plantas' element={<ListaPlantas />} />
      <Route path="/plantas/:id" element={<PlantaDetalhe />} />
      <Route path='/plantas/adicionar' element={<AdicionarPlanta />} />
      <Route path='/plantas/editar/:id' element={<EditarPlanta />} />
      <Route path='/estufas' element={<Estufas />} />
      <Route path='estufas/adicionar' element={<AdicionarEstufa />} />
      <Route path='estufas/:id' element={<EstufaDetalhe />} />
      <Route path='/sobre' element={<Sobre />} />
    </Routes>
  );
}