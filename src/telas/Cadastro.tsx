import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import estilos from './Cadastro.module.css';
import logo from '../assets/logoFundo2.png'

export function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();

    if (nome.trim() === '' || email.trim() === '' || senha.trim() === '') {
      setErro('Preencha todos os campos!');
      return;
    }

    const usuario = {
      nome,
      email,
      senha,
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    setErro('');
    navigate('/login');
  };

  return (
    <div className={estilos.container}>
    <div className={estilos.wrapper}>
      <h1 className={estilos.title}>Cadastre-se</h1>

      <img src={logo} alt="Logo GreenSync" className={estilos.logo} />

      <form onSubmit={handleCadastro} className={estilos.form}>
        <label className={estilos.label}>Nome</label>
        <input
          type="text"
          placeholder="Fulano da Silva"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

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
          <button
            type="button"
            className={estilos.botao}
            onClick={() => navigate('/')}
          >
            Voltar
          </button>
          <button type="submit" className={estilos.botao}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
