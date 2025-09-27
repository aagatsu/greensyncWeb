import { useNavigate } from 'react-router-dom';
import estilos from './TelaInicial.module.css'
import logo from '../assets/logoFundo.png'

export function TelaInicial() {
  const navigate = useNavigate();

  return (
    <div className={estilos.container}>
      <h1 className={estilos.logo}>GreenSync</h1>

      <img src={logo} alt="Logo GreenSync" className={estilos.logo} />


      <div className={estilos.btnContainer}>
      <button onClick={() => navigate('/login')} className={estilos.btnLogin}>
        Login
      </button>
      <button onClick={() => navigate('/cadastro')} className={estilos.btnCadastro}>
        Cadastre-se
      </button>
      </div>
    </div>
  );
}
