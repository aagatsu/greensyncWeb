import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import estilos from './AdicionarPlanta.module.css';

type Planta = {
  id: number;
  descricao: string;
  nome: string;
  temperaturaIdeal: string;
  luminosidadeIdeal: string;
  umidadeSoloIdeal: string;
  umidadeArIdeal: string;
  imagem?: string;
};

export function AdicionarPlanta() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');
  const [temperaturaIdeal, setTemperaturaIdeal] = useState('');
  const [luminosidadeIdeal, setLuminosidadeIdeal] = useState('');
  const [umidadeSoloIdeal, setUmidadeSoloIdeal] = useState('');
  const [umidadeArIdeal, setUmidadeArIdeal] = useState('');
  const [imagem, setImagem] = useState('');
  const [erro, setErro] = useState('');

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

    if (descricao.trim() === '' || nome.trim() === '') {
      setErro('Preencha os campos obrigatórios!');
      return;
    }

    const planta: Planta = {
      id: Date.now(),
      descricao,
      nome,
      temperaturaIdeal,
      luminosidadeIdeal,
      umidadeSoloIdeal,
      umidadeArIdeal,
      imagem,
    };

    const plantasSalvas = localStorage.getItem('plantas');
    const lista = plantasSalvas ? JSON.parse(plantasSalvas) : [];

    const atualizadas = [...lista, planta];

    localStorage.setItem('plantas', JSON.stringify(atualizadas));

    setErro('');
    navigate('/plantas');
  };

  return (
    <div className={estilos.container}>
    <div className={estilos.wrapper}>
      <h1 className={estilos.title}>Add / editar planta</h1>

      <div
        className={estilos.imageCircle}
        onClick={() => inputRef.current?.click()}
      >
        {imagem ? (
          <img src={imagem} alt="Planta" className={estilos.plantaImg} />
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
        <label className={estilos.label}>Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Lorem ipsum dolor"
        />

        <label className={estilos.label}>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Hortaliça da Silva"
        />

        <label className={estilos.label}>Temp ideal</label>
        <input
          type="text"
          value={temperaturaIdeal}
          onChange={(e) => setTemperaturaIdeal(e.target.value)}
          placeholder="99°C"
        />

        <label className={estilos.label}>Luz</label>
        <input
          type="text"
          value={luminosidadeIdeal}
          onChange={(e) => setLuminosidadeIdeal(e.target.value)}
          placeholder="9 cd"
        />

        <label className={estilos.label}>Umid terra ideal</label>
        <input
          type="text"
          value={umidadeSoloIdeal}
          onChange={(e) => setUmidadeSoloIdeal(e.target.value)}
          placeholder="20%"
        />

        <label className={estilos.label}>Umid Ar ideal</label>
        <input
          type="text"
          value={umidadeArIdeal}
          onChange={(e) => setUmidadeArIdeal(e.target.value)}
          placeholder="9%"
        />

        {erro && <p className={estilos.erro}>{erro}</p>}

        <div className={estilos.botoes}>
          <button
            type="button"
            className={estilos.botao}
            onClick={() => navigate('/plantas')}
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
