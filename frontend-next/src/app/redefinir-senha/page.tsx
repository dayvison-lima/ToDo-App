/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

function RedefinirSenhaContent() {
  const searchParams = useSearchParams();
  const uidb64 = searchParams.get("uidb64");
  const token = searchParams.get("token");

  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/password-reset-confirm/${uidb64}/${token}/`,
        { password }
      );
      setMessage(response.data.message);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError("Erro ao redefinir senha. O link pode estar expirado.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Redefinir Senha</h2>
        {message && <p className="text-green-400">{message}</p>}
        {error && <p className="text-red-400">{error}</p>}
        <form onSubmit={handleResetConfirm} className="space-y-3">
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <button type="submit" className="w-full bg-green-500 p-2 rounded hover:bg-green-600">
            Redefinir Senha
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <RedefinirSenhaContent />
    </Suspense>
  )
}
