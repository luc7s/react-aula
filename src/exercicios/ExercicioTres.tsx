import { useState, type FormEvent } from "react";

function ExercicioTres() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [enviado, setEnviado] = useState(false);

  const pesoOk = peso.trim().length >= 1;
  const alturaOk = altura.trim().length >= 3;
  const resetar = () => {
    setPeso("");
    setAltura("");
    setEnviado(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pesoOk || !alturaOk) return;
    setEnviado(true);
  };

  let mensagemErro = "";
  if (!pesoOk) mensagemErro = "peso inválido";
  else if (!alturaOk) mensagemErro = "altura inválido";

  const pesoNum = Number(peso.replace(",", "."));
  const alturaNum = Number(altura.replace(",", "."));

  let calcImc = "";
  let classificacao = "";

  if (!enviado) {
    calcImc = "Envie o formulário";
    classificacao = "";
  } else if (!pesoOk || !alturaOk) {
    calcImc = "";
    classificacao = "";
  } else if (
    Number.isNaN(pesoNum) ||
    Number.isNaN(alturaNum) ||
    pesoNum <= 0 ||
    alturaNum <= 0
  ) {
    calcImc = "Use números válidos (maiores que zero).";
    classificacao = "";
  } else {
    const imc = pesoNum / (alturaNum * alturaNum);
    calcImc = `IMC: ${imc.toFixed(2)}`;
    if (imc < 17) {
      classificacao = "Muito abaixo do peso";
    } else if (imc < 18.5) {
      classificacao = "Abaixo do peso";
    } else if (imc < 25) {
      classificacao = "Normal";
    } else if (imc < 30) {
      classificacao = "Sobrepeso";
    } else {
      classificacao = "Obesidade";
    }
  }
  return (
    <>
      <h1> Formulario de pesagem</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="peso">peso:</label>
        <input
          id="peso"
          name="peso"
          placeholder=""
          value={peso}
          onChange={(e) => {
            setPeso(e.target.value);
            setEnviado(false);
          }}
        />
        <label htmlFor="altura">altura:</label>
        <input
          id="altura"
          name="altura"
          placeholder=""
          value={altura}
          onChange={(e) => {
            setAltura(e.target.value);
            setEnviado(false);
          }}
        />
        <button type="submit" disabled={!pesoOk || !alturaOk}>
          Enviar
        </button>
      </form>
      <button
        type="button"
        className="px-4 py-2 bg-gray-500 text-white rounded"
        onClick={resetar}
      >
        Reset
      </button>

      <p className="text-xl font-medium mt-2 text-gray-700">{mensagemErro} </p>
      <p className="text-xl font-medium mt-2 text-blue-700">{calcImc}</p>
      <p className="text-xl font-medium mt-2 text-blue-700">{classificacao}</p>

        <p>Limitações: O IMC não diferencia massa muscular de gordura, podendo indicar sobrepeso em pessoas musculosas. </p>
    </>
  );
}

export default ExercicioTres;
