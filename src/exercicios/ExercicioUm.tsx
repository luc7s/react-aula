import ExercicioPlaceholder from "../components/ExercicioPlaceholder";
import { useState } from "react";
const MAXIMO = 10;
const MINIMO = 0;
function ExercicioUm() {
  //por toda a logica aqui dentro
const [contador, setContador] = useState(0);
function incrementar() {
  if (contador < MAXIMO ) 
  setContador(contador + 1);
}
const descontar = () => {
  if (contador > MINIMO )
  setContador(contador - 1);
}
const resetar = () => {
  setContador(0);
}
let mensagemLimite = 'Está dentro do permitido!';
if (contador === MINIMO) mensagemLimite = 'Está no minimo'
if (contador === MAXIMO) mensagemLimite = 'Está no maximo'
return (
  <div className="flex flex-col items-center gap-4 p-10">
    <h1 className="text-4xl font-bold">{contador}</h1>

    <div className="flex gap-2">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={incrementar}
      >
        +1
      </button>

      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={descontar}
      >
        -1
      </button>
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded"
        onClick={resetar}
      >
        Reset
      </button>

    </div>
    <p className="text-xl font-medium mt-2 text-gray-700">{mensagemLimite} </p>
  </div>
  
);
}


export default ExercicioUm;
