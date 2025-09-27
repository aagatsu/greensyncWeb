import { useNavigate } from 'react-router-dom';
import estilos from './Home.module.css';
import plantasIcon from '../assets/plantasIcon.png'
import estufaIcon from '../assets/iconEstufa.png'
import perfilIcon from '../assets/perfilIcon.png'
import sobreIcon from '../assets/sobreIcon.png'
import titulo from '../assets/titulo.png'

export function Home() {
  const navigate = useNavigate();

  return (
    <div className={estilos.container}>
      <img src={titulo} alt="Logo GreenSync" className={estilos.logo} />

      <div className={estilos.botoes}>
        <div className={estilos.item}>
          <button
            className={estilos.botao}
            onClick={() => navigate('/plantas')}
          >
            <img className={estilos.imgBotao} src={plantasIcon} />
          </button>
          <p className={estilos.texto}>Plantas</p>
        </div>

        <div className={estilos.item}>
          <button
            className={estilos.botao}
            onClick={() => navigate('/estufas')}
          >
            <img className={estilos.imgBotao} src={estufaIcon} />
          </button>
          <p className={estilos.texto}>Estufas</p>
        </div>

        <div className={estilos.item}>
          <button
            className={estilos.botao}
            onClick={() => navigate('/perfil')}
          >
            <img className={estilos.imgBotao} src={perfilIcon}/> 
          </button>
          <p className={estilos.texto}>Perfil</p>
        </div>

        <div className={estilos.item}>
          <button
            className={estilos.botao}
            onClick={() => navigate('/sobre')}
          >
            <img className={estilos.imgBotao} src={sobreIcon} />
          </button>
          <p className={estilos.texto}>Sobre</p>
        </div>
      </div>
    </div>
  );
}
