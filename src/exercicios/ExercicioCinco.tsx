import { useState } from "react";

type Produto = {
  nome: string;
  modelo: string;
  preco: number;
};

const PRODUTOS: Produto[] = [
  { nome: "Livro de magica", modelo: "livros", preco: 50 },
  { nome: "Jabulani", modelo: "bola", preco: 32 },
  { nome: "Livro de receita", modelo: "livros", preco: 33 },
  { nome: "bola da adidas", modelo: "bola", preco: 50 },
];

// Corrigido: Usando "as const" e deixando tudo minúsculo para bater com os produtos
const MODELOS = ["livros", "bola", "todas"] as const;

export default function ExercicioCinco() { // Corrigido: Sem o sinal de "="
  const [busca, setBusca] = useState("");
  const [modelo, setModelo] = useState<(typeof MODELOS)[number]>("todas");

  // O filtro agora fica CORRETAMENTE dentro do componente
  const produtosFiltrados = PRODUTOS.filter((p) => {
    const texto = busca.trim().toLowerCase();
    const bateNoNome =
      texto === "" || p.nome.toLowerCase().includes(texto);
    const bateNoModelo =
      modelo === "todas" || p.modelo.toLowerCase() === modelo;
    
    return bateNoNome && bateNoModelo;
  });

  // Corrigido: Chamando as funções corretamente sem o sinal de "="
  function LimparFiltro() {
    setBusca("");
    setModelo("todas");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Exercício 5</h2>
      
      {/* Inputs para testar o funcionamento */}
      <input 
        type="text" 
        value={busca} 
        onChange={(e) => setBusca(e.target.value)} 
        placeholder="Buscar produto..." 
      />

      <select value={modelo} onChange={(e) => setModelo(e.target.value as any)}>
        {MODELOS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <button onClick={LimparFiltro}>Limpar Filtros</button>

      {/* Lista de produtos filtrados */}
      <ul>
        {produtosFiltrados.map((p, index) => (
          <li key={index}>{p.nome} - R$ {p.preco} ({p.modelo})</li>
        ))}
      </ul>
    </div>
  );
} // Corrigido: A chave do componente fecha aqui, englobando tudo!