import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import estilos from './EstufaDetalhe.module.css';

type Estufa = {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
};

export function EstufaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estufa, setEstufa] = useState<Estufa | null>(null);

  useEffect(() => {
    const estufasSalvas = localStorage.getItem('estufas');
    if (estufasSalvas) {
      const lista = JSON.parse(estufasSalvas) as Estufa[];
      const encontrada = lista.find((e) => e.id === Number(id));
      if (encontrada) {
        setEstufa(encontrada);
      }
    }
  }, [id]);

  if (!estufa) {
    return (
      <div className={estilos.wrapper}>
        <h1>Estufa não encontrada</h1>
        <div
          className={`${estilos.circle} ${estilos.addCircle}`}
          onClick={() => navigate('/estufas')}
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
      <h1 className={estilos.title}>{estufa.nome}</h1>

      <img src={estufa.imagem} alt={estufa.nome} className={estilos.imagem} />
      <p className={estilos.descricao}>{estufa.descricao}</p>

      <div className={estilos.sensores}>
        <h3>Sensores:</h3>
        <p>🌡️ Temperatura: 25°C</p>
        <p>💧 Umidade: 70%</p>
        <p>🔆 Luminosidade: 80%</p>
      </div>

      <button onClick={() => navigate('/estufas')} className={estilos.botao}>
          Voltar
      </button>
    </div>
    </div>
  );
}
