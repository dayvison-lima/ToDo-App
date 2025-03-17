/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import axios from "axios";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/password-reset/", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError("Erro ao solicitar redefinição de senha. Verifique o e-mail informado.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Esqueci minha senha</h2>
        {message && <p className="text-green-400">{message}</p>}
        {error && <p className="text-red-400">{error}</p>}
        <form onSubmit={handleResetRequest} className="space-y-3">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <button type="submit" className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600">
            Enviar Link de Redefinição
          </button>
        </form>
      </div>
    </div>
  );
}
