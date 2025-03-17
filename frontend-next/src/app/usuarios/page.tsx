/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Usuario = {
  id: number;
  username: string;
  email: string;
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editData, setEditData] = useState({ username: "", email: "" });
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Não autenticado");

        const response = await axios.get("http://127.0.0.1:8000/api/usuarios/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuarios(response.data);
      } catch (err) {
        setError("Erro ao carregar usuários. Faça login novamente.");
      }
    };

    fetchUsuarios();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
  };

  const handleEdit = (usuario: any) => {
    setEditingUser(usuario);
    setEditData({ username: usuario.username, email: usuario.email });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        `http://127.0.0.1:8000/api/usuarios/${editingUser.id}/`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsuarios(
        usuarios.map((u: any) =>
          u.id === editingUser.id ? { ...u, ...editData } : u
        )
      );
      setEditingUser(null);
    } catch (err) {
      setError("Erro ao atualizar usuário.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsuarios(usuarios.filter((usuario: any) => usuario.id !== id));
    } catch (err) {
      setError("Erro ao excluir usuário.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/usuarios/",
        newUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsuarios([...usuarios, response.data]);
      setNewUser({ username: "", email: "", password: "" });
    } catch (err) {
      setError("Erro ao criar usuário.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lista de Usuários</h2>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-600 text-white rounded hover:bg-red-800"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Formulário para Criar Usuário */}
      {!editingUser && (
        <form onSubmit={handleCreate} className="p-4 border rounded mb-4 bg-gray-100">
          <h2 className="text-xl font-bold mb-2 text-gray-900">Adicionar Usuário</h2>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="w-full p-2 border rounded mb-2 placeholder-gray-600 text-gray-600"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full p-2 border rounded mb-2 placeholder-gray-600 text-gray-600"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="w-full p-2 border rounded mb-2 placeholder-gray-600 text-gray-600"
            required
          />
          <button type="submit" className="p-2 bg-green-600 text-white rounded hover:bg-green-800">
            Criar Usuário
          </button>
        </form>
      )}

      {/* Formulário para Editar Usuário */}
      {editingUser && (
        <form onSubmit={handleUpdate} className="p-4 border rounded mb-4 bg-gray-100">
          <h2 className="text-xl font-bold mb-2 text-gray-900">Editar Usuário</h2>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={editData.username}
            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
            className="w-full p-2 border rounded mb-2 placeholder-gray-600 text-gray-600"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            className="w-full p-2 border rounded mb-2 placeholder-gray-600 text-gray-600"
            required
          />
          <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-800">
            Salvar
          </button>
          <button onClick={() => setEditingUser(null)} className="ml-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            Cancelar
          </button>
        </form>
      )}

      <ul>
        {usuarios.length > 0 ? (
          usuarios.map((usuario: any) => (
            <li key={usuario.id} className="p-2 border-b flex justify-between items-center">
              <span>{usuario.username} - {usuario.email}</span>
              <div>
                <button
                  onClick={() => handleEdit(usuario)}
                  className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(usuario.id)}
                  className="p-1 bg-red-600 text-white rounded hover:bg-red-800"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-600">Nenhum usuário encontrado.</p>
        )}
      </ul>
    </div>
  );
}
