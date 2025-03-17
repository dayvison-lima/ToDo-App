/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/token/", { username, password });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      router.push("/tarefas"); // ✅ Redireciona para a página de tarefas
    } catch (err) {
      setError("Usuário ou senha incorretos!");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-900 relative"
      style={{
        backgroundImage: "url('/bg-login.jpg')", // 🔹 Troque por um caminho real ou URL válida
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔹 Overlay para melhorar o contraste da tela */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* 🔹 Caixa de login moderna */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-2xl w-96 text-white border border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Bem-vindo!</h2>

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
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg mb-4 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Entrar
        </button>

        <p className="mt-4 text-sm text-center">
          Ainda não tem uma conta?{" "}
          <a href="/cadastro" className="text-blue-400 hover:text-blue-500 transition">
            Cadastre-se aqui
          </a>
        </p>
        <p className="mt-4 text-sm text-center">
          Esqueceu a senha?{" "}
          <a href="/esqueci-senha" className="text-blue-400 hover:underline">
            Redefinir agora
          </a>
        </p>
      </form>
    </div>
  );
}
