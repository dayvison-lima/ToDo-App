/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Edit, Trash, Save, Plus, X } from "lucide-react";
import api from "../utils/api";

type Tarefa = {
  id: number;
  titulo: string;
  descricao?: string;
  concluida: boolean;
};

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [error, setError] = useState("");
  const [editandoTarefaId, setEditandoTarefaId] = useState<number | null>(null);
  const [tituloEditado, setTituloEditado] = useState("");
  const [descricaoEditada, setDescricaoEditada] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await api.get("/tarefas/");
        setTarefas(response.data);
      } catch (err) {
        setError("Erro ao carregar tarefas.");
      }
    };

    fetchTarefas();
  }, [router]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/tarefas/", { titulo: novaTarefa, descricao: novaDescricao });

      setTarefas([...tarefas, response.data]);
      setNovaTarefa("");
      setNovaDescricao("");
      setShowModal(false);
    } catch (err) {
      setError("Erro ao criar tarefa.");
    }
  };

  const handleEditClick = (tarefa: any) => {
    setEditandoTarefaId(tarefa.id);
    setTituloEditado(tarefa.titulo);
    setDescricaoEditada(tarefa.descricao || "");
  };

  const handleSaveEdit = async (id: number) => {
    try {
      await api.patch(`/tarefas/${id}/`, { titulo: tituloEditado, descricao: descricaoEditada });

      setTarefas(
        tarefas.map((tarefa) =>
          tarefa.id === id
            ? { ...tarefa, titulo: tituloEditado, descricao: descricaoEditada }
            : tarefa
        )
      );

      setEditandoTarefaId(null);
    } catch (err) {
      setError("Erro ao editar tarefa.");
    }
  };

  const handleToggleConcluida = async (id: number, concluida: boolean) => {
    try {
      await api.patch(`/tarefas/${id}/`, { concluida: !concluida });

      setTarefas(
        tarefas.map((tarefa) =>
          tarefa.id === id ? { ...tarefa, concluida: !concluida } : tarefa
        )
      );
    } catch (err) {
      setError("Erro ao atualizar tarefa.");
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tarefas/${id}/`);

      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (err) {
      setError("Erro ao excluir tarefa.");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout/");

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/login");
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white relative">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 p-6 w-full max-w-3xl mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Minhas Tarefas</h2>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition"
          >
            Sair
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Botão para abrir o modal */}
        <button
          onClick={() => setShowModal(true)}
          className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Adicionar Tarefa
        </button>

        {/* Modal para adicionar tarefa */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-bold mb-4 text-white">Nova Tarefa</h2>
              <form onSubmit={handleCreate} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Título da Tarefa"
                  value={novaTarefa}
                  onChange={(e) => setNovaTarefa(e.target.value)}
                  className="p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                  required
                />
                <textarea
                  placeholder="Descrição (opcional)"
                  value={novaDescricao}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                  className="p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Criar Tarefa
                </button>
              </form>
            </div>
          </div>
        )}

        <ul className="space-y-3 mt-6">
          {tarefas.map((tarefa: any) => (
            <li key={tarefa.id} className="p-4 rounded-lg shadow-lg bg-gray-800 border border-gray-700 flex justify-between items-center">
              {editandoTarefaId === tarefa.id ? (
                <div className="flex-1">
                  <input
                    type="text"
                    value={tituloEditado}
                    onChange={(e) => setTituloEditado(e.target.value)}
                    className="p-2 bg-gray-600 text-white rounded w-full mb-2"
                  />
                  <textarea
                    value={descricaoEditada}
                    onChange={(e) => setDescricaoEditada(e.target.value)}
                    className="p-2 bg-gray-600 text-white rounded w-full"
                  />
                  <button onClick={() => handleSaveEdit(tarefa.id)}>
                    <Save className="w-5 h-5 text-blue-400 hover:text-blue-500" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{tarefa.titulo}</h3>
                    <p className="text-sm text-gray-400">{tarefa.descricao}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleToggleConcluida(tarefa.id, tarefa.concluida)}>
                      <CheckCircle className={`w-6 h-6 ${tarefa.concluida ? "text-green-400" : "text-gray-400 hover:text-green-400"}`} />
                    </button>
                    <button onClick={() => handleEditClick(tarefa)}>
                      <Edit className="w-5 h-5 text-yellow-400 hover:text-yellow-500" />
                    </button>
                    <button onClick={() => handleDelete(tarefa.id)}>
                      <Trash className="w-5 h-5 text-red-500 hover:text-red-600" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
