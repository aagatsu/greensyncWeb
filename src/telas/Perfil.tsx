import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import estilos from './Perfil.module.css';
import perfilIcon from '../assets/perfilIcon.png'; // Ícone padrão caso não tenha foto

type Usuario = {
  nome: string;
  email: string;
  senha: string;
  imagem?: string;
};

export function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuario');
    if (dadosSalvos) {
      const dadosUsuario = JSON.parse(dadosSalvos);
      setUsuario(dadosUsuario);
    }
  }, []);

  return (
    <div className={estilos.container}>
    <div className={estilos.wrapper}>
      <h1 className={estilos.title}>Perfil</h1>

      <div className={estilos.imageCircle}>
        {usuario?.imagem ? (
          <img
            src={usuario.imagem}
            alt="Perfil"
            className={estilos.perfilImg}
          />
        ) : (
          <img
            src={perfilIcon}
            alt="Ícone padrão"
            className={estilos.perfilImg}
          />
        )}
      </div>

      {usuario ? (
        <div className={estilos.info}>
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Senha:</strong> {'*'.repeat(usuario.senha.length)}</p>
        </div>
      ) : (
        <p>Dados não encontrados.</p>
      )}

      <div className={estilos.botoes}>
        <button
          className={estilos.botao}
          onClick={() => navigate('/home')}
        >
          Voltar
        </button>
        <button
          className={estilos.botao}
          onClick={() => navigate('/perfil/editar')}
        >
          Editar
        </button>
      </div>
    </div>
    </div>
  );
}
