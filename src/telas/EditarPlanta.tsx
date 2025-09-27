import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import estilos from './EditarPlanta.module.css';

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

export function EditarPlanta() {
  const { id } = useParams();
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

  const [plantas, setPlantas] = useState<Planta[]>([]);

  useEffect(() => {
    const plantasSalvas = localStorage.getItem('plantas');
    if (plantasSalvas) {
      const lista = JSON.parse(plantasSalvas) as Planta[];
      setPlantas(lista);

      if (id) {
        const encontrada = lista.find((p) => p.id === Number(id));
        if (encontrada) {
          setDescricao(encontrada.descricao);
          setNome(encontrada.nome);
          setTemperaturaIdeal(encontrada.temperaturaIdeal);
          setLuminosidadeIdeal(encontrada.luminosidadeIdeal);
          setUmidadeSoloIdeal(encontrada.umidadeSoloIdeal);
          setUmidadeArIdeal(encontrada.umidadeArIdeal);
          setImagem(encontrada.imagem || '');
        }
      }
    }
  }, [id]);

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
      id: id ? Number(id) : Date.now(),
      descricao,
      nome,
      temperaturaIdeal,
      luminosidadeIdeal,
      umidadeSoloIdeal,
      umidadeArIdeal,
      imagem,
    };

    const atualizadas = id
      ? plantas.map((p) => (p.id === planta.id ? planta : p))
      : [...plantas, planta];

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
          placeholder="Descrição..."
        />

        <label className={estilos.label}>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Hortelã"
        />

        <label className={estilos.label}>Temp ideal</label>
        <input
          type="text"
          value={temperaturaIdeal}
          onChange={(e) => setTemperaturaIdeal(e.target.value)}
          placeholder="25°C"
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
