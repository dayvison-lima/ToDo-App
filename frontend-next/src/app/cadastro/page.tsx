/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";

export default function CadastroPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/usuarios/", {
        username,
        email,
        password,
      });

      router.push("/login");
    } catch (err) {
      setError("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-900 relative"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <form
        onSubmit={handleCadastro}
        className="relative z-10 p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-2xl w-96 text-white border border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Crie sua Conta</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg mb-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg mb-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg mb-4 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Cadastrar
        </button>

        <p className="mt-4 text-sm text-center">
          Já tem uma conta?{" "}
          <a href="/login" className="text-blue-400 hover:text-blue-500 transition">
            Faça login
          </a>
        </p>
      </form>
    </div>
  );
}
