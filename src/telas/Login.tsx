import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import estilos from './Login.module.css';
import logo from '../assets/logoFundo2.png'

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === '' || senha.trim() === '') {
      setErro('Preencha todos os campos!');
      return;
    }

    const dadosSalvos = localStorage.getItem('usuario');

    if (!dadosSalvos) {
      setErro('Nenhum usuário cadastrado!');
      return;
    }

    const usuario = JSON.parse(dadosSalvos);

    if (email === usuario.email && senha === usuario.senha) {
      setErro('');
      navigate('/home');
    } else {
      setErro('Email ou senha inválidos!');
    }
  };

  return (
    <div className={estilos.container}>
    <div className={estilos.wrapper}>
      <h1 className={estilos.title}>Login</h1>

      <img src={logo} alt="Logo GreenSync" className={estilos.logo} />


      <form onSubmit={handleLogin} className={estilos.form}>
        <label className={estilos.label}>Email</label>
        <input
          type="email"
          placeholder="Exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={estilos.label}>Senha</label>
        <input
          type="password"
          placeholder="ExemploSenha123"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <p className={estilos.erro}>{erro}</p>}

        <div className={estilos.botoes}>
          <button type="button" className={estilos.botao} onClick={() => navigate('/')}>
            Voltar
          </button>
          <button type="submit" className={estilos.botao}>
            Entrar
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
