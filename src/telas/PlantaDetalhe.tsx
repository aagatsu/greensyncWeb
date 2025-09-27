import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import estilos from './PlantaDetalhe.module.css';
import plantaIcon from '../assets/plantasIcon.png';

type Planta = {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  temperaturaIdeal?: string;
  luzIdeal?: string;
  umidadeSoloIdeal?: string;
  umidadeArIdeal?: string;
};

export function PlantaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planta, setPlanta] = useState<Planta | null>(null);

  useEffect(() => {
    const plantasSalvas = localStorage.getItem('plantas');
    if (plantasSalvas) {
      const lista = JSON.parse(plantasSalvas) as Planta[];
      const encontrada = lista.find((p) => p.id === Number(id));
      if (encontrada) {
        setPlanta(encontrada);
      }
    }
  }, [id]);

  if (!planta) {
    return (
      <div className={estilos.wrapper}>
        <h1>Planta não encontrada</h1>
        <div
          className={estilos.circle}
          onClick={() => navigate('/plantas')}
          style={{ cursor: 'pointer' }}
        >
          <span className={estilos.plus}>🔙</span>
        </div>
      </div>
    );
  }

  return (
    <div className={estilos.container}>
    <div className={estilos.wrapper}>
      <h1 className={estilos.title}>{planta.nome}</h1>

      <div className={estilos.circle}>
        <img
          src={planta.imagem || plantaIcon}
          alt={planta.nome}
          className={estilos.plantaIcon}
        />
      </div>

      <div className={estilos.descricao}>
        <h3 className={estilos.tituloDesc}>Descrição</h3>
        <p>{planta.descricao}</p>
      </div>

      <div className={estilos.info}>
        <p>🌡️ Temperatura ideal: {planta.temperaturaIdeal || '99°C'}</p>
        <p>🔆 Luz: {planta.luzIdeal || '9 cd'}</p>
        <p>🌱 Umidade terra ideal: {planta.umidadeSoloIdeal || '20%'}</p>
        <p>💨 Umidade ar ideal: {planta.umidadeArIdeal || '9%'}</p>
      </div>

      <div className={estilos.buttons}>
        <button
          className={estilos.button}
          onClick={() => navigate('/plantas')}
        >
        Voltar
        </button>

        <button
          className={estilos.button}
          onClick={() => navigate(`/plantas/editar/${planta.id}`)}
        >
        Editar
        </button>
      </div>
    </div>
    </div>
  );
}
