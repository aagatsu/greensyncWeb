import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import estilos from './AdicionarEstufa.module.css';

type Estufa = {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
};

export function AdicionarEstufa() {
  const navigate = useNavigate();
  const [estufas, setEstufas] = useState<Estufa[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');

  useEffect(() => {
    const estufasSalvas = localStorage.getItem('estufas');
    if (estufasSalvas) {
      setEstufas(JSON.parse(estufasSalvas));
    }
  }, []);

  const adicionarEstufa = (e: React.FormEvent) => {
    e.preventDefault();

    const novaEstufa: Estufa = {
      id: Date.now(),
      nome,
      descricao,
      imagem
    };

    const estufasAtualizadas = [...estufas, novaEstufa];

    setEstufas(estufasAtualizadas);
    localStorage.setItem('estufas', JSON.stringify(estufasAtualizadas));

    setNome('');
    setDescricao('');
    setImagem('');

    navigate('/estufas');
  };

  return (
    <div className={estilos.container}>
    <div className={estilos.wrapper}>
      <h1 className={estilos.title}>Adicionar Estufa</h1>

      <form onSubmit={adicionarEstufa} className={estilos.form}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL da imagem"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          required
        />
        <button type="submit" className={estilos.addButton}>Adicionar</button>
      </form>

      <button onClick={() => navigate('/home')} className={estilos.botao}>
          Voltar
      </button>
    </div>
    </div>
  );
}
