import { useState } from "react";

function ExercicioDois() {
const [nome, setNome] = useState("");
const [email, setEmail] = useState("");
const [sucesso, setSucesso] = useState(false);

const nomeOk = nome.trim().length >= 3;
const emailOk = email.includes("@");

let mensagemErro = "";
if (!nomeOk) mensagemErro = "Nome inválido";
else if (!emailOk) mensagemErro = "Email inválido";

return (
<>
<h1> Formulario de estags</h1>
<p>Necessario ter @ no campo email e 3 caracteres no nome</p>
<form onSubmit={(event) => {
  event.preventDefault();
  if (nomeOk && emailOk) {
    setSucesso(true);
    setNome("");
    setEmail("");
  } else {
    setSucesso(false);
  }
}}>
<label htmlFor="nome">nome:</label>
  <input
    id="nome"
    name="nome"
    placeholder = "nome"
    value={nome}
    onChange={(e) => { setNome(e.target.value); setSucesso(false); }}
  />
  <label htmlFor="email">email:</label>
  <input
    id="email"
    name="email"
    placeholder = "luquinha@gmail.com"
    value={email}
    onChange={(e) => { setEmail(e.target.value); setSucesso(false); }}
  />
  <button type="submit"
  disabled={!nomeOk || !emailOk}
  >Enviar</button>
  {sucesso && <p>Formulario Enviado</p>}
  <p className="text-xl font-medium mt-2 text-gray-700">{mensagemErro} </p>
</form>
</>
);
}
export default ExercicioDois;
