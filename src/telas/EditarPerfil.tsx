import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import estilos from './EditarPerfil.module.css';

type Usuario = {
  nome: string;
  email: string;
  senha: string;
  imagem?: string;
};

export function EditarPerfil() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [imagem, setImagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuario');
    if (dadosSalvos) {
      const usuario: Usuario = JSON.parse(dadosSalvos);
      setNome(usuario.nome);
      setEmail(usuario.email);
      setSenha(usuario.senha);
      setImagem(usuario.imagem || '');
    }
  }, []);

  const handleImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setImagem(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();

    if (nome.trim() === '' || email.trim() === '' || senha.trim() === '') {
      setErro('Preencha todos os campos!');
      return;
    }

    const usuarioAtualizado = {
      nome,
      email,
      senha,
      imagem,
    };

    localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));

    setErro('');
    navigate('/perfil');
  };

  return (
    <div className={estilos.container}>
    <div className={estilos.wrapper}>
      <h1 className={estilos.title}>Editar Perfil</h1>

      {/* Botão de imagem */}
      <div
        className={estilos.imageCircle}
        onClick={() => inputRef.current?.click()}
      >
        {imagem ? (
          <img src={imagem} alt="Perfil" className={estilos.perfilImg} />
        ) : (
          <span className={estilos.plus}>+</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleImagem}
      />

      <form onSubmit={handleSalvar} className={estilos.form}>
        <label className={estilos.label}>Nome</label>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label className={estilos.label}>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={estilos.label}>Senha</label>
        <input
          type="text"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <p className={estilos.erro}>{erro}</p>}

        <div className={estilos.botoes}>
          <button
            type="button"
            className={estilos.botao}
            onClick={() => navigate('/perfil')}
          >
            Cancelar
          </button>
          <button type="submit" className={estilos.botao}>
            Salvar
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
