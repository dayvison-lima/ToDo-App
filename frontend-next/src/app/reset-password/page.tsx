/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uidb64 = searchParams.get("uidb64");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/password-reset-confirm/${uidb64}/${token}/`,
        { password: newPassword }
      );

      setSuccess("Senha redefinida com sucesso! Você pode fazer login.");
      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      setError("Erro ao redefinir senha. O link pode ter expirado.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-center mb-4">Redefinir Senha</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <form onSubmit={handleResetPassword} className="flex flex-col space-y-3">
          <input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Redefinir Senha
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
