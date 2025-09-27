import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import estilos from './Estufas.module.css';
import estufaIcon from '../assets/iconEstufa.png';

type Estufa = {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
};

export function Estufas() {
  const navigate = useNavigate();
  const [estufas, setEstufas] = useState<Estufa[]>([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    const estufasSalvas = localStorage.getItem('estufas');
    if (estufasSalvas) {
      setEstufas(JSON.parse(estufasSalvas));
    }
  }, []);

  const estufasFiltradas = estufas.filter((estufa) =>
    estufa.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className={estilos.container}>
    <div className={estilos.wrapper}>

        <h1 className={estilos.title}>Estufas</h1>

      <div className={estilos.searchContainer}>
        <input
          type="text"
          placeholder="Buscar estufa..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className={estilos.searchInput}
        />
      </div>

      <div className={estilos.grid}>
        {estufasFiltradas.map((estufa) => (
          <div
            key={estufa.id}
            className={estilos.circle}
            onClick={() => navigate(`/estufas/${estufa.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={estufa.imagem || estufaIcon}
              alt={estufa.nome}
              className={estilos.estufaIcon}
            />
          </div>
        ))}

        <div
          className={`${estilos.circle} ${estilos.addCircle}`}
          onClick={() => navigate('/estufas/adicionar')}
          style={{ cursor: 'pointer' }}
        >
          <span className={estilos.plus}>+</span>
        </div>
      </div>
      <button onClick={() => navigate('/home')} className={estilos.botao}>
          Voltar
      </button>
    </div>
    </div>
  );
}
