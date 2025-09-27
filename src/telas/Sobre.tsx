import { useNavigate } from 'react-router-dom';
import estilos from './Sobre.module.css';

export function Sobre() {
  const navigate = useNavigate();

  return (
    <div className={estilos.container}>
      <h1 className={estilos.titulo}>Sobre o Projeto</h1>

      <div className={estilos.card}>
        <p>
          <strong>GreenSync</strong> é um projeto desenvolvido como Trabalho de Conclusão de Curso (TCC)
          na ETEC de Hortolândia. O objetivo do projeto é oferecer uma solução para o monitoramento
          e controle de estufas automatizadas, facilitando o cultivo de hortaliças e plantas em ambientes urbanos.
        </p>
        <p>
          Através de sensores e automação, é possível monitorar a temperatura, umidade do ar,
          umidade do solo e luminosidade, garantindo melhores condições para o crescimento das plantas.
        </p>
      </div>

      <h2 className={estilos.subtitulo}>Desenvolvedores</h2>
      <div className={estilos.devList}>
        <p>Gustavo Souza Carreira Filho</p>
        <p>Carlos Daniel Mendes Ferreira</p>
        <p>Gabriel Domingos Herculano</p>
        <p>Livia Beatriz Ranite Campos</p>
      </div>

      <button onClick={() => navigate('/home')} className={estilos.botaoVoltar}>
      Voltar
      </button>
    </div>
  );
}
