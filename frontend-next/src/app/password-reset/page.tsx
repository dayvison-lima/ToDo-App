/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import axios from "axios";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post("http://127.0.0.1:8000/api/password-reset/", { email });
      setMessage("E-mail de recuperação enviado! Verifique sua caixa de entrada.");
    } catch (err) {
      setError("Erro ao solicitar redefinição de senha.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form onSubmit={handleResetRequest} className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Recuperar Senha</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4 placeholder-gray-600 text-gray-600"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Enviar E-mail
        </button>
        <p className="mt-4 text-sm">
          <a href="/login" className="text-blue-600 hover:underline">
            Voltar para o login
          </a>
        </p>
      </form>
    </div>
  );
}
