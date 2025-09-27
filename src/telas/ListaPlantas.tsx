import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import estilos from './ListaPlantas.module.css';
import plantaIcon from '../assets/plantasIcon.png';

type Planta = {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
};

export function ListaPlantas() {
  const navigate = useNavigate();
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    const plantasSalvas = localStorage.getItem('plantas');
    if (plantasSalvas) {
      setPlantas(JSON.parse(plantasSalvas));
    }
  }, []);

  const plantasFiltradas = plantas.filter((planta) =>
    planta.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className={estilos.container}>
    <div className={estilos.wrapper}>
      <div className={estilos.header}>
        <h1 className={estilos.title}>Plantas</h1>
      </div>

      <div className={estilos.searchContainer}>
        <input
          type="text"
          placeholder="Buscar planta..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className={estilos.searchInput}
        />
      </div>

      <div className={estilos.grid}>
        {plantasFiltradas.map((planta) => (
          <div
            key={planta.id}
            className={estilos.circle}
            onClick={() => navigate(`/plantas/${planta.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={planta.imagem || plantaIcon}
              alt={planta.nome}
              className={estilos.plantaIcon}
            />
          </div>
        ))}

        <div
          className={`${estilos.circle} ${estilos.addCircle}`}
          onClick={() => navigate('/plantas/adicionar')}
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
