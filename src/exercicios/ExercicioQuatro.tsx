import { useState, type FormEvent } from "react";

type Tarefa = {
  id: string;
  texto: string;
  concluida: boolean;
};

export default function ExercicioQuatro() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [textoNovo, setTextoNovo] = useState("");
  const [idEditando, setIdEditando] = useState<string | null>(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  function adicionar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const t = textoNovo.trim();
    if (!t) return;
    setTarefas((lista) => [
      ...lista,
      { id: crypto.randomUUID(), texto: t, concluida: false },
    ]);
    setTextoNovo("");
  }

  function excluir(id: string) {
    setTarefas((lista) => lista.filter((item) => item.id !== id));
    setIdEditando((prev) => (prev === id ? null : prev));
  }

  function alternarConcluida(id: string) {
    setTarefas((lista) =>
      lista.map((item) =>
        item.id === id ? { ...item, concluida: !item.concluida } : item,
      ),
    );
  }

  function iniciarEdicao(t: Tarefa) {
    setIdEditando(t.id);
    setTextoEdicao(t.texto);
  }

  function cancelarEdicao() {
    setIdEditando(null);
    setTextoEdicao("");
  }

  function salvarEdicao() {
    if (idEditando === null) return;
    const novo = textoEdicao.trim();
    if (!novo) return;
    setTarefas((lista) =>
      lista.map((item) =>
        item.id === idEditando ? { ...item, texto: novo } : item,
      ),
    );
    setIdEditando(null);
    setTextoEdicao("");
  }

  const total = tarefas.length;

  return (
    <div className="rounded-2xl border border-white/15 bg-zinc-900/80 p-6 text-zinc-100">
      <p className="mb-4 text-sm text-zinc-400">
        Total de tarefas: <span className="font-semibold text-zinc-200">{total}</span>
      </p>

      <form onSubmit={adicionar} className="mb-4 flex gap-2">
        <input
          value={textoNovo}
          onChange={(e) => setTextoNovo(e.target.value)}
          className="flex-1 rounded border border-white/20 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500"
          placeholder="Nova tarefa"
        />
        <button
          type="submit"
          className="rounded bg-red-500/80 px-4 py-2 font-semibold text-white hover:bg-red-500"
        >
          Adicionar
        </button>
      </form>

      <ul className="space-y-2">
        {tarefas.length === 0 ? (
          <li className="text-zinc-400">Nenhuma tarefa ainda.</li>
        ) : (
          tarefas.map((t) => {
            const editando = t.id === idEditando;
            return (
              <li
                key={t.id}
                className="flex flex-wrap items-center gap-2 rounded border border-white/10 bg-zinc-950/50 px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={t.concluida}
                  onChange={() => alternarConcluida(t.id)}
                  disabled={editando}
                  className="h-4 w-4 shrink-0 rounded border-white/30 bg-zinc-950 accent-red-500"
                  aria-label={
                    t.concluida ? "Marcar como pendente" : "Marcar como concluída"
                  }
                />

                {editando ? (
                  <input
                    value={textoEdicao}
                    onChange={(e) => setTextoEdicao(e.target.value)}
                    className="min-w-0 flex-1 rounded border border-white/20 bg-zinc-950 px-2 py-1 text-sm text-zinc-100"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`min-w-0 flex-1 text-sm ${
                      t.concluida ? "text-zinc-500 line-through" : "text-zinc-200"
                    }`}
                  >
                    {t.texto}
                  </span>
                )}

                <div className="ml-auto flex shrink-0 gap-2">
                  {editando ? (
                    <>
                      <button
                        type="button"
                        onClick={salvarEdicao}
                        className="rounded border border-emerald-400/40 bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-200 hover:bg-emerald-500/30"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={cancelarEdicao}
                        className="rounded border border-white/20 px-2 py-1 text-xs text-zinc-300 hover:bg-white/10"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => iniciarEdicao(t)}
                      className="rounded border border-white/20 px-2 py-1 text-xs text-zinc-300 hover:bg-white/10"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => excluir(t.id)}
                    className="text-xs text-red-300 hover:text-red-200"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}